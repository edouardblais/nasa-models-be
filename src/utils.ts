// Function to format date to "YYYY-MM-DDTHH:MM:SSZ"
export function formatDate(date: Date): string {
  return date.toISOString().slice(0, 19) + "Z";
}

// Function to get temporal filter for the last 24 hours
export function getTemporalFilter(): string {
  const end = new Date(); // Current time
  const start = new Date(end.getTime() - 30 * 86400000); // Time 30 days ago

  return `${formatDate(start)}/${formatDate(end)}`;
}
