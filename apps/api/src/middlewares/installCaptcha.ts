import express, { Express } from "express";
import axios from "axios";

interface GoogleRecaptchaResponse {
  success: boolean;
  score: number;
  action: string;
  challenge_ts: string;
  hostname: string;
  "error-codes"?: string[];
}

export const installCaptcha = (app: Express) => {
  app.use(express.json());
  app.post("/verify_captcha", async (req, res, _next) => {
    if (req.method === "POST") {
      try {
        const axiosRes = await axios({
          method: "post",
          url: "https://www.google.com/recaptcha/api/siteverify",
          params: {
            secret: process.env.CAPTCHA_KEY_SECRET,
            response: req.body.gRecaptchaToken,
          },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });
        const reCaptchaRes: GoogleRecaptchaResponse = axiosRes.data;

        // Utilisation d'une condition ternaire pour rendre le code plus lisible
        const status =
          reCaptchaRes?.score > 0.5
            ? {
                status: "success",
                message: "Enquiry submitted successfully",
              }
            : {
                status: "failure",
                message: "Google ReCaptcha Failure",
              };

        res.status(200).json(status);
      } catch (err) {
        res.status(405).json({
          status: "failure",
          message: "Error submitting the enquiry form",
        });
      }
    } else {
      res.status(405);
      res.end();
    }
  });
};
