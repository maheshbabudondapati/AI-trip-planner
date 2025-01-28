export interface DayItinerary {
  day: number;
  title: string;
  description: string;
  activities: string[];
}

export interface Guide {
  id: string;
  title: string;
  image: string;
  description: string;
  duration: string;
  location: string;
  bestTime: string;
  budget: string;
  highlights: string[];
  itinerary: DayItinerary[];
  tips: string[];
}