import cloudinary from "@/lib/cloudinary";
import streamifier from "streamifier";

export async function saveFile(file: File): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "dx14mtfkw", resource_type: "auto" },
        (error, result) => {
          if (error || !result) {
            console.error("Cloudinary Upload Error:", error);
            reject(error || new Error("Upload result is undefined."));
            return;
          }
          console.log("Uploaded file URL:", result.secure_url);
          resolve(result.secure_url);
        }
      );

      // Convert File to Stream before uploading
      streamifier.createReadStream(Buffer.from(await file.arrayBuffer())).pipe(uploadStream);
    } catch (err) {
      console.error("File Processing Error:", err);
      reject(err);
    }
  });
}
