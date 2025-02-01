import { create } from 'zustand';

/**
 * @typedef {import('../types/itinerary').Activity} Activity
 * @typedef {import('../types/itinerary').ItineraryState} ItineraryState
 */

/**
 * @type {import('zustand').StateCreator<ItineraryState>}
 */
const createItineraryStore = (set) => ({
  days: [],
  selectedDay: 0,
  addActivity: (dayIndex, activity) =>
    set((state) => ({
      days: state.days.map((day, idx) =>
        idx === dayIndex
          ? { ...day, activities: [...day.activities, activity] }
          : day
      ),
    })),
  removeActivity: (dayIndex, activityId) =>
    set((state) => ({
      days: state.days.map((day, idx) =>
        idx === dayIndex
          ? { ...day, activities: day.activities.filter((a) => a.id !== activityId) }
          : day
      ),
    })),
  reorderActivities: (dayIndex, startIndex, endIndex) =>
    set((state) => {
      const newDays = [...state.days];
      const [removed] = newDays[dayIndex].activities.splice(startIndex, 1);
      newDays[dayIndex].activities.splice(endIndex, 0, removed);
      return { days: newDays };
    }),
  setSelectedDay: (dayIndex) => set({ selectedDay: dayIndex }),
});

export const useItineraryStore = create(createItineraryStore);