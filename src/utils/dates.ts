/**
 * Safely parses a date string to a Date object
 * @param dateString - The date string to parse
 * @returns Date object or undefined if invalid
 */
export const parseDateSafe = (dateString: string | undefined | null): Date | undefined => {
  if (!dateString) return undefined;
  
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? undefined : date;
};

/**
 * Formats a date using the French locale and specified options
 * @param date - The date to format
 * @param options - Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export const formatDate = (
  date: Date | undefined,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
): string => {
  if (!date) return '';
  return date.toLocaleDateString('fr-FR', options);
};
