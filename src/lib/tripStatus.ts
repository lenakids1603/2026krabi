import { DayItinerary } from '../types';

/**
 * Trip status calculations helper functions
 */

export function getCurrentItineraryDay(itinerary: DayItinerary[], currentYear = 2026): DayItinerary | null {
  try {
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();
    const currentFullYear = today.getFullYear();
    
    if (currentFullYear !== currentYear) return null;

    const matched = itinerary.find(day => {
      const [month, d] = day.date.split('.').map(num => parseInt(num, 10));
      return month === currentMonth && d === currentDay;
    });

    return matched || null;
  } catch {
    return null;
  }
}

export function getTripProgress(itinerary: DayItinerary[], currentYear = 2026): { progressPercent: number, currentDayNumber: number } {
  try {
    const today = new Date();
    const currentFullYear = today.getFullYear();
    
    if (currentFullYear < currentYear) {
      return { progressPercent: 0, currentDayNumber: 0 };
    }
    
    const currentDay = getCurrentItineraryDay(itinerary, currentYear);
    if (currentDay) {
      const idx = itinerary.findIndex(day => day.day === currentDay.day);
      const progressPercent = Math.round(((idx + 1) / itinerary.length) * 100);
      return { progressPercent, currentDayNumber: currentDay.day };
    }
    
    // Check if trip is in the future or past
    const firstDay = itinerary[0];
    const lastDay = itinerary[itinerary.length - 1];
    
    const [fMonth, fDay] = firstDay.date.split('.').map(num => parseInt(num, 10));
    const [lMonth, lDay] = lastDay.date.split('.').map(num => parseInt(num, 10));
    
    const firstDateObj = new Date(currentYear, fMonth - 1, fDay);
    const lastDateObj = new Date(currentYear, lMonth - 1, lDay);
    
    if (today.getTime() < firstDateObj.getTime()) {
      return { progressPercent: 0, currentDayNumber: 0 };
    } else if (today.getTime() > lastDateObj.getTime()) {
      return { progressPercent: 100, currentDayNumber: itinerary.length };
    }
  } catch {
    // Return default
  }
  return { progressPercent: 0, currentDayNumber: 0 };
}
