import { create } from 'zustand';

export const useTripStore = create((set) => ({
  currentTrip: null,
  setTrip: (trip) => set({ currentTrip: trip }),
  clearTrip: () => set({ currentTrip: null })
}));