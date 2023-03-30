import { Module } from '@nestjs/common';
import { poolProvider } from "./pool.provider";
import { PdfService } from "./pdf.service";
import { PdfController } from "./pdf.controller";

@Module({
  imports: [],
  controllers: [PdfController],
  providers: [PdfService, poolProvider],
  exports: []
})
// eslint-disable-next-line prettier/prettier
export class PdfModule { }