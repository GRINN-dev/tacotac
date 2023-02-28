import puppeteer from "puppeteer";
import QRCode from "qrcode";
import fs from "fs";
import path from "path";
import { createHtmlTemplate } from "./createHtmlTemplate";

export interface IGeneratePdfFilesPayload {
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

const generatePdf = async (htmlContent: any): Promise<Buffer> => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent(htmlContent, {
    waitUntil: "networkidle0",
  });
  await page.emulateMediaType("print");
  const buffer = await page.pdf({ format: "a4", printBackground: true });

  await browser.close();
  return buffer;
};

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

export const generateQRCode = async text => {
  try {
    // a delete quand test fini
    const filePath = path.join(__dirname, "Qr-Code.png");
    const qrCodeFile = await QRCode.toFile(filePath, text, {
      type: "png",
      errorCorrectionLevel: "M",
      margin: 1,
      width: 256,
      quality: 0.92,
    });
    // const pdfBuffer = await generatePdf("test");
    generatePdf("test").then(buffer => {
      // write buffer to file at /./pdf/filename.pdf
      fs.writeFileSync("./test.pdf", buffer);
    });
    //a garder
    const qrCode = await QRCode.toString(text);
    const dataUrlQrCode = await QRCode.toDataURL(text);

    // Renvoyer le résultat si nécessaire
    return { qrCode, dataUrlQrCode, qrCodeFile };
  } catch (error) {
    console.error("Erreur lors de la génération du QR code : ", error);
    throw error;
  }
};
