export function getImageUrl(imageId) {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  return `${baseUrl}uploads/${imageId}`;
}
export function transformDateToLocalString(dateString) {
  let date = new Date(dateString);  
  if (isNaN(date)) {
      return "Invalid date format";
  }
  return date.toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
  });
}


export function getTimeDifferenceFromNow(dateString) {
  let givenDate = new Date(dateString);
  let currentDate = new Date(); 

  if (isNaN(givenDate)) {
      return "Invalid date format";
  }
  let diffMs = currentDate - givenDate;

  let diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  let diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  return  `${diffDays}:${diffHours}:${diffMinutes}` 
  
}


