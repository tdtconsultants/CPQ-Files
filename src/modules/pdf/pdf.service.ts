import { Inject, Injectable } from "@nestjs/common";
import { Pool } from "generic-pool";
import * as fs from "fs";

@Injectable()
export class PdfService {
  constructor(@Inject('GENERIC_POOL') private readonly pool: Pool<any>) { }

  /**
   * Generate a pdf from an url using a puppeteer instance from the pool
   * @param url
   * @returns {Promise<Buffer>}
   */
  async generatePdfFromUrl(url) : Promise<Buffer> {
    // Get puppeteer instance from the pool
    const puppeteer = await this.pool.acquire();

    try {
      // Create a new page from url
      const page = await puppeteer.newPage();
      await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 })
      await page.goto(url);

      // Generate the pdf
      return await page.pdf({ height: "1123px", width: "794px", margin: { top: "20px", left: "50px", right: "50px", bottom: "20px" } });
    } catch (e) {
      console.error(e);
      return null;
    } finally {
      await this.pool.release(puppeteer);
    }
  }

  /**
   * Store the buffer and return the path
   * @param buffer The buffer to store
   * @param filename The filename to use
   * @param extension The extension to use
   */
  async storeBuffer(buffer: Buffer, filename: string, extension: string) : Promise<string> {
    // Store the buffer in a file for now
    // TODO: Store the buffer in a aws s3 bucket

    const path = `./${filename}.${extension}`;
    await fs.promises.writeFile(path, buffer);

    return path;
  }

}
