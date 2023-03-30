import { Factory, Options, Pool, createPool } from 'generic-pool';
import { Provider } from '@nestjs/common';
import puppeteer from 'puppeteer';

/**
 * Pool for puppeteer instances
 */
export const poolProvider: Provider = {
  provide: 'GENERIC_POOL',
  useFactory: (): Pool<any> => {
    const factory: Factory<any> = {
      create: async () => {
        try {
          return await puppeteer.launch({
            executablePath: '/usr/bin/chromium-browser', // 'chromium'
            headless: true,
            args: [
              "--no-sandbox",
              "--disable-setuid-sandbox",
              '--use-gl=egl'
            ]
          });
        } catch (e) {
          console.error(e);
          return null;
        }
      },
      destroy: async (puppeteerInstance) => {
        await puppeteerInstance.close();
      },
    };

    const options: Options = {
      // Additional generic-pool options
    };

    return createPool(factory, options);
  },
};
