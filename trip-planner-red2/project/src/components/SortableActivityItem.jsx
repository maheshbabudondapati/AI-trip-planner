import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Clock, Trash2, GripVertical, MapPin, Timer, Route } from 'lucide-react';
import { calculateDistance, calculateTravelTime } from '../utils/distanceCalculator';

export function SortableActivityItem({ activity, onRemove, number, nextActivity }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(activity.title);
  const [startTime, setStartTime] = useState(activity.startTime || '');
  const [endTime, setEndTime] = useState(activity.endTime || '');

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: activity.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleSave = () => {
    activity.title = title;
    activity.startTime = startTime;
    activity.endTime = endTime;
    setIsEditing(false);
  };

  // Calculate travel info if both current and next activities have locations
  const travelInfo = React.useMemo(() => {
    if (nextActivity?.location?.coordinates && activity?.location?.coordinates) {
      const [lat1, lon1] = activity.location.coordinates;
      const [lat2, lon2] = nextActivity.location.coordinates;
      
      const distance = calculateDistance(lat1, lon1, lat2, lon2);
      const minutes = calculateTravelTime(distance);
      
      return {
        distance,
        minutes
      };
    }
    return null;
  }, [activity, nextActivity]);

  return (
    <div className="relative">
      <div
        ref={setNodeRef}
        style={style}
        className="bg-gray-50 rounded-lg group relative"
      >
        {/* Activity Number */}
        <div className="absolute -left-2 -top-2 w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
          {number}
        </div>

        <div className="p-4">
          <div className="flex items-start gap-3">
            <div
              {...attributes}
              {...listeners}
              className="mt-1 text-gray-400 hover:text-gray-600 cursor-move"
            >
              <GripVertical className="w-5 h-5" />
            </div>

            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Activity title"
                  />
                  <div className="flex gap-3">
                    <input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                    <input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-3 py-1 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div onClick={() => setIsEditing(true)} className="cursor-pointer">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-gray-900">{activity.title}</h3>
                    {activity.location && (
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-1" />
                        {activity.location.name}
                      </div>
                    )}
                  </div>
                  {(activity.startTime || activity.endTime) && (
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <Clock className="w-4 h-4 mr-1" />
                      {activity.startTime}
                      {activity.endTime && ` - ${activity.endTime}`}
                    </div>
                  )}
                </div>
              )}
            </div>

            <button
              onClick={() => onRemove(activity.id)}
              className="text-gray-400 hover:text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Travel info to next activity */}
      {travelInfo && (
        <div className="relative">
          <div className="absolute left-7 w-px h-12 bg-gray-300"></div>
          <div className="ml-14 my-2 flex items-center gap-2 text-sm text-gray-500">
            <Timer className="w-4 h-4" />
            <span>{travelInfo.minutes} mins</span>
            <Route className="w-4 h-4 ml-2" />
            <span>{travelInfo.distance} mi</span>
          </div>
        </div>
      )}
    </div>
  );
}