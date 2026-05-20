/**
 * Time utility helper functions
 */

export function formatTripDate(dateStr: string): string {
  // E.g. "06.28" -> "6月28日"
  if (!dateStr || !dateStr.includes('.')) return dateStr;
  const [month, day] = dateStr.split('.');
  return `${parseInt(month, 10)}月${parseInt(day, 10)}日`;
}

export function isCurrentDate(dateStr: string, currentYear = 2026): boolean {
  try {
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();
    const tripYear = today.getFullYear();
    
    // Check if matching currentYear
    if (tripYear !== currentYear) return false;
    
    const [month, day] = dateStr.split('.').map(num => parseInt(num, 10));
    return currentMonth === month && currentDay === day;
  } catch {
    return false;
  }
}

export function getDaysRemaining(targetDateStr: string, currentYear = 2026): number {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const [month, day] = targetDateStr.split('.').map(num => parseInt(num, 10));
    const targetDate = new Date(currentYear, month - 1, day);
    const diffTime = targetDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  } catch {
    return 0;
  }
}
