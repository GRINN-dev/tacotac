import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";
import { PDFDocument, rgb } from "pdf-lib";
import { createHtmlTemplate } from "./createHtmlTemplate";

interface IGeneratePdfFilesPayload {
  pdfData: {
    template: any;
    linked_ressource_id: string;
    document_type: string;
  };
}

interface CreateAttestationPayload {
  temp: {
    id?: string;
    first_name?: string;
    last_name?: string;
  };
}

const generatePdfFilePayload: IGeneratePdfFilesPayload = {
  pdfData: {
    template: createHtmlTemplate<CreateAttestationPayload>(
      {
        temp: null,
      },
      "invitation"
    ),
    linked_ressource_id: null,
    document_type: "ATTESTATION",
  },
};

export const generatePdf = async (htmlContent: any): Promise<Buffer> => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setContent(htmlContent, {
      waitUntil: "networkidle0",
    });
    await page.emulateMediaType("print");
    const buffer = await page.pdf({ format: "a4", printBackground: true });
    await browser.close();
    return buffer;
  } catch (error) {
    console.error("Erreur lors de la génération du PDF : ", error);
    throw error;
  }
};

export const mergePDFBuffers = async (pdfs: any): Promise<Uint8Array> => {
  try {
    const mergedPdf = await PDFDocument.create();
    for (const pdf of pdfs) {
      const pdfDoc = await PDFDocument.load(pdf);
      const copiedPages = await mergedPdf.copyPages(
        pdfDoc,
        pdfDoc.getPageIndices()
      );
      copiedPages.forEach(page => mergedPdf.addPage(page));
    }
    const mergedPdfBuffer = await mergedPdf.save({ useObjectStreams: false });
    return mergedPdfBuffer;
  } catch (error) {
    console.error("Erreur lors du merge PDF : ", error);
    throw error;
  }
};
