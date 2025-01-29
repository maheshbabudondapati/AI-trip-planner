import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Loader } from '@googlemaps/js-api-loader';
import { 
  Plus, 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  MoreHorizontal,
  Clock,
  MapPin,
  Sparkles,
  Route
} from 'lucide-react';
import { useTripStore } from '../store/tripStore';
import { useItineraryStore } from '../store/itineraryStore';
import { Activity } from '../types/itinerary';
import { SortableActivityItem } from '../components/SortableActivityItem';
import { PlaceSearchModal } from '../components/PlaceSearchModal';

export function ItineraryPage() {
  const navigate = useNavigate();
  const trip = useTripStore((state) => state.currentTrip);
  const { days, selectedDay, addActivity, removeActivity, reorderActivities, setSelectedDay } = useItineraryStore();
  const [expandedDay, setExpandedDay] = useState(0);
  const [isPlaceSearchOpen, setIsPlaceSearchOpen] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: 32.7767, lng: -96.7970 }); // Dallas coordinates

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    if (!trip) {
      navigate('/plan-trip');
      return;
    }

    const start = new Date(trip.startDate);
    const end = new Date(trip.endDate);
    const dayCount = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    
    if (days.length === 0) {
      const newDays = Array.from({ length: dayCount }, (_, i) => ({
        date: new Date(start.getTime() + i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        activities: []
      }));
      useItineraryStore.setState({ days: newDays });
    }

    // Load Google Maps API
    const loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      version: "weekly",
      libraries: ["places"]
    });

    loader.load();
  }, [trip, days.length, navigate]);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      const oldIndex = days[selectedDay].activities.findIndex(
        (activity) => activity.id === active.id
      );
      const newIndex = days[selectedDay].activities.findIndex(
        (activity) => activity.id === over.id
      );
      
      reorderActivities(selectedDay, oldIndex, newIndex);
    }
  };

  const handlePlaceSelect = (place: any) => {
    const newActivity: Activity = {
      id: Math.random().toString(36).substr(2, 9),
      title: place.name,
      description: place.formatted_address,
      location: {
        name: place.formatted_address,
        coordinates: [place.geometry.location.lat(), place.geometry.location.lng()]
      },
      type: 'attraction'
    };
    addActivity(selectedDay, newActivity);
    setIsPlaceSearchOpen(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatDateRange = (start: string, end: string) => {
    return `${new Date(start).getMonth() + 1}/${new Date(start).getDate()} - ${new Date(end).getMonth() + 1}/${new Date(end).getDate()}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Itinerary</h1>
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
            <Calendar className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-600">
              {trip && formatDateRange(trip.startDate, trip.endDate)}
            </span>
          </div>
        </div>

        <div className="space-y-6">
          {days.map((day, index) => (
            <div key={day.date} className="bg-white rounded-lg shadow">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {formatDate(day.date)}
                    </h2>
                    <div className="flex items-center gap-2">
                      <button className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
                        <Sparkles className="w-4 h-4" />
                        Auto-fill day
                      </button>
                      <button className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
                        <Route className="w-4 h-4" />
                        Optimize route
                      </button>
                      <span className="text-sm text-gray-500">• 34 mins, 26.5 mi</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setExpandedDay(expandedDay === index ? -1 : index)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    {expandedDay === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              {expandedDay === index && (
                <div className="p-4">
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext
                      items={day.activities.map(a => a.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      <div className="space-y-4">
                        {day.activities.map((activity, actIndex) => (
                          <SortableActivityItem
                            key={activity.id}
                            activity={activity}
                            onRemove={(id) => removeActivity(index, id)}
                            number={actIndex + 1}
                          />
                        ))}
                      </div>
                    </SortableContext>
                  </DndContext>

                  <div className="mt-4 flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-lg text-gray-600 hover:bg-gray-100">
                    <MapPin className="w-5 h-5" />
                    <button
                      onClick={() => {
                        setSelectedDay(index);
                        setIsPlaceSearchOpen(true);
                      }}
                      className="flex-1 text-left"
                    >
                      Add a place
                    </button>
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-gray-200 rounded-lg">
                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDZWMTJNMTIgMTJWMThNMTIgMTJIMThNMTIgMTJINiIgc3Ryb2tlPSIjNjQ3NDhCIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K" alt="Add" className="w-5 h-5" />
                      </button>
                      <button className="p-2 hover:bg-gray-200 rounded-lg">
                        <MoreHorizontal className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <PlaceSearchModal
        isOpen={isPlaceSearchOpen}
        onClose={() => setIsPlaceSearchOpen(false)}
        onPlaceSelect={handlePlaceSelect}
        mapCenter={mapCenter}
      />
    </div>
  );
}