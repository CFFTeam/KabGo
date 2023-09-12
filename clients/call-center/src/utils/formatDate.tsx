export const formatDate = (localTime: any) => {
    const dateInUTC = new Date(localTime);
    // Extract hours, minutes, and AM/PM
    const hours = dateInUTC.getUTCHours();
    const minutes = dateInUTC.getUTCMinutes();
    const am_pm = hours >= 12 ? "PM" : "AM";
    
    // Convert hours to 12-hour format
    const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
    
    // Format the date as DD/MM/YYYY
    const day = dateInUTC.getUTCDate().toString().padStart(2, '0');
    const month = (dateInUTC.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = dateInUTC.getUTCFullYear();
    
    // Create the final formatted string
    const formattedDate = `${formattedHours}:${minutes.toString().padStart(2, '0')} ${am_pm} - ${day}/${month}/${year}`;
    return formattedDate;
}

// Hàm để đổi chỗ ngày và tháng trong định dạng "DD/MM/YYYY"
export const swapDayAndMonth = (dateString: string) => {
    const [day, month, year] = dateString.split("/");
    return `${month}/${day}/${year}`;
  }