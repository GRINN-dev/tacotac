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
  certificate: {
    /* 
    id
    */
    id?: string;
    /* 
    prénom
    */
    first_name?: string;
    /* 
    nom de famille
    */
    last_name?: string;
    /* 
    emprunteur : seul ou à deux
    */
    as_co_borrower?: string;
    /* 
    montant du bien souhaité
    */
    project_price: string;
    /* 
    crédits mensuels
    */
    monthly_reimbursements?: number;
    /* 
    type de bien : neuf ou ancien
    */
    property_type?: string;
    /* 
    revenus mensuels
    */
    monthly_income?: number;
    /* 
    apport personnel
    */
    financial_contribution?: number;
    /* 
    type de parcours choisi
    */
    type_of_path?: number;
    /*
    montant total du prêt
    */
    loan_total_amount?: string;
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
        certificate: null,
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
    const filePath = path.join(__dirname, "Machin.png");
    const test = await QRCode.toFile(filePath, text, {
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

    // Renvoyer le résultat si nécessaire
    return qrCode;
  } catch (error) {
    console.error("Erreur lors de la génération du QR code : ", error);
    throw error;
  }
};
