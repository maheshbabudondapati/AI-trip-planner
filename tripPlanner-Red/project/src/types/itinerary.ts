export interface Activity {
  id: string;
  title: string;
  description?: string;
  location?: {
    name: string;
    coordinates: [number, number];
  };
  startTime?: string;
  endTime?: string;
  type: 'attraction' | 'restaurant' | 'hotel' | 'transport' | 'other';
}

export interface DayPlan {
  date: string;
  activities: Activity[];
}

export interface ItineraryState {
  days: DayPlan[];
  selectedDay: number;
  addActivity: (dayIndex: number, activity: Activity) => void;
  removeActivity: (dayIndex: number, activityId: string) => void;
  reorderActivities: (dayIndex: number, startIndex: number, endIndex: number) => void;
  setSelectedDay: (dayIndex: number) => void;
}