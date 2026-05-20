/**
 * Phone formatting and integration helpers
 */

export function cleanPhoneNumber(phoneStr: string): string {
  // E.g. "+66 (0) 81-876-5432" -> "+66818765432"
  if (!phoneStr) return '';
  return phoneStr.replace(/[^+\d]/g, '');
}

export function formatInternationalPhone(phoneStr: string): string {
  if (!phoneStr) return '';
  return phoneStr;
}

export function makePhoneCall(phoneStr: string): void {
  const cleaned = cleanPhoneNumber(phoneStr);
  if (cleaned) {
    window.location.href = `tel:${cleaned}`;
  }
}
