/**
 * Formats a date string to a readable format
 * @param dateString - ISO date string
 * @param locale - Locale string (default: "en-US")
 * @returns Formatted date string (e.g., "Jan 15, 2024")
 */
export function formatDate(
  dateString: string,
  locale: string = "en-US",
): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Formats a date string to a long readable format (e.g., "January 15, 2024")
 * @param dateString - ISO date string
 * @param locale - Locale string (default: "en-US")
 * @returns Formatted date string with full month name
 */
export function formatLongDate(
  dateString: string,
  locale: string = "en-US",
): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Formats a date string to a relative time format (e.g., "Yesterday", "3 days ago")
 * @param dateString - ISO date string
 * @returns Relative time string or formatted date if older than 7 days
 */
export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    return "Yesterday";
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else {
    return formatDate(dateString);
  }
}
