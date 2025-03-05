export function getImageUrl(imageId) {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  return `${baseUrl}uploads/${imageId}`;
}
