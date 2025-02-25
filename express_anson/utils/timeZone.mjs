// IST Offset is UTC + 5 hours 30 minutes
const IST_OFFSET = 5.5 * 60 * 60 * 1000; // Convert 5.5 hours to milliseconds

// Create a Date object for the current UTC time
const utcNow = new Date(); //It will give Universal Time

// Add the IST offset to the current UTC time to get the current IST time
const indiaTimeNow = new Date(utcNow.getTime() + IST_OFFSET);

export { indiaTimeNow}