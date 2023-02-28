import {
  createPresignedPost,
  PresignedPost,
  PresignedPostOptions,
} from "@aws-sdk/s3-presigned-post";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
/*
Commande pour modification des cors : s3cmd setcors ./cors.xml s3://test-izicredit
Commande pour modification des policies : s3cmd setpolicy ./policy.json s3://test-izicredit
*/
const client = new S3Client({
  endpoint:
    process.env.BUCKET_HOST || "https://cellar-c2.services.clever-cloud.com",
  region: "EU",
  credentials: {
    accessKeyId: process.env.BUCKET_KEY!,
    secretAccessKey: process.env.BUCKET_SECRET!,
  },
});

export const generateUrl = async (
  presignedPostOptions: PresignedPostOptions
): Promise<PresignedPost> => {
  const presignedPost: PresignedPost = await createPresignedPost(
    client,
    presignedPostOptions
  );
  return presignedPost;
};
