import QRCode from "qrcode";

export const generateQRCode = (
  text: string
): Promise<{ dataUrlQrCode: string }> => {
  return new Promise((resolve, reject) => {
    QRCode.toDataURL(text)
      .then(dataUrlQrCode => {
        // Renvoyer le résultat si nécessaire
        resolve({ dataUrlQrCode });
      })
      .catch(error => {
        console.error("Erreur lors de la génération du QR code : ", error);
        reject(error);
      });
  });
};
