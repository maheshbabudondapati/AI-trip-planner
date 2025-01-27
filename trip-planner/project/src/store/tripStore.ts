import { create } from 'zustand';
import { Trip } from '../types/trip';

interface TripState {
  currentTrip: Trip | null;
  setTrip: (trip: Trip) => void;
  clearTrip: () => void;
}

export const useTripStore = create<TripState>((set) => ({
  currentTrip: null,
  setTrip: (trip) => set({ currentTrip: trip }),
  clearTrip: () => set({ currentTrip: null })
}));