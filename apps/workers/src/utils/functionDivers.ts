import { S3 } from "@aws-sdk/client-s3";

export function generateBase64Buffer(data: string) {
  const base64Data = Buffer.from(
    data.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );
  const type = data.split(";")[0].split("/")[1];
  const image_name = Date.now() + "-" + Math.floor(Math.random() * 1000);

  return { base64Data, type, image_name };
}

export const putToS3 = async (key, body, contentType) => {
  let errorMessage: string;
  const s3 = new S3({
    endpoint:
      process.env.BUCKET_HOST || "https://cellar-c2.services.clever-cloud.com",
    region: process.env.BUCKET_REGION,
    credentials: {
      accessKeyId: process.env.BUCKET_KEY!,
      secretAccessKey: process.env.BUCKET_SECRET!,
    },
  });

  const s3Params = {
    Bucket: process.env.BUCKET_NAME!,
    Key: key,
    Body: body,
    ACL: "public-read",
    ContentEncoding: "base64", // required
    ContentType: contentType, // required. Notice the back ticks
  };

  s3.putObject(s3Params, (err: any, data: any) => {
    if (err) {
      errorMessage = err.message;
      console.log("err: ", err.message);
    }
  });

  return { errorMessage };
};
