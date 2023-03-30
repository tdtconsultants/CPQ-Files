import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { PdfService } from "./pdf.service";

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) { }

  @Post('/getReport')
  public async getReport(@Res() response: Response, @Body() data: any): Promise<Response> {

    if (!data) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Invalid data',
        status: HttpStatus.BAD_REQUEST,
        data: {},
      });
    }

    const reportUrl = data.url

    if (!reportUrl) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Invalid url',
        status: HttpStatus.BAD_REQUEST,
        data: {},
      });
    }

    const buffer = await this.pdfService.generatePdfFromUrl(reportUrl)

    const pdfUrl = await this.pdfService.storeBuffer(buffer, 'report', 'pdf')
    // Return the buffer and an url to the pdf
    if (buffer) {
      return response.status(HttpStatus.CREATED).json({
        message: 'Report created successfully',
        status: HttpStatus.CREATED,
        data: {
          buffer,
          pdfUrl
        },
      });
    } else {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Report not created',
        status: HttpStatus.BAD_REQUEST,
        data: {},
      });
    }
  }
}