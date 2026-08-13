/**
 * Cloudflare R2 Storage Utility
 * Frontend image upload via Cloudflare Worker with base64 fallback.
 * Set REACT_APP_R2_WORKER_URL to enable real R2 uploads.
 */
const WORKER_URL = process.env.REACT_APP_R2_WORKER_URL || "";

export const uploadToR2 = async (file, folder = "uploads") => {
  if (!WORKER_URL) throw new Error("Worker URL not set");
  const response = await fetch(`${WORKER_URL}/upload`, {
    method: "POST",
    headers: {
      "Content-Type": file.type || "application/octet-stream",
      "X-Filename": file.name,
      "X-Folder": folder,
    },
    body: file,
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Upload failed: ${response.status}`);
  }
  const result = await response.json();
  if (!result.success) throw new Error(result.error || "Upload failed");
  return { url: result.url, key: result.key };
};

export const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const compressImage = (file, maxWidth = 1000, quality = 0.8) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => (blob ? resolve(blob) : reject(new Error("compress failed"))),
          file.type || "image/jpeg",
          quality
        );
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export const uploadImage = async (file, folder = "uploads") => {
  if (!file) throw new Error("No file selected");
  if (!file.type.startsWith("image/")) throw new Error("Only image files allowed");
  if (file.size > 10 * 1024 * 1024) throw new Error("File must be under 10MB");

  if (!WORKER_URL) {
    const blob = await compressImage(file, 800, 0.7);
    const base64 = await fileToBase64(new File([blob], file.name, { type: file.type }));
    return { url: base64, type: "base64" };
  }
  try {
    let fileToUpload = file;
    if (file.size > 500 * 1024) {
      const blob = await compressImage(file, 1200, 0.85);
      fileToUpload = new File([blob], file.name, { type: file.type });
    }
    const result = await uploadToR2(fileToUpload, folder);
    return { url: result.url, type: "r2", key: result.key };
  } catch (error) {
    const blob = await compressImage(file, 800, 0.7);
    const base64 = await fileToBase64(new File([blob], file.name, { type: file.type }));
    return { url: base64, type: "base64" };
  }
};

export default { uploadToR2, uploadImage, fileToBase64 };
