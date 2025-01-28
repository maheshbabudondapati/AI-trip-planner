import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Clock, Trash2, GripVertical, MapPin } from 'lucide-react';
import { Activity } from '../types/itinerary';

interface SortableActivityItemProps {
  activity: Activity;
  onRemove: (id: string) => void;
  number: number;
}

export function SortableActivityItem({ activity, onRemove, number }: SortableActivityItemProps) {
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

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-gray-50 rounded-lg group relative"
    >
      {/* Activity Number */}
      <div className="absolute -left-2 -top-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  placeholder="Activity title"
                />
                <div className="flex gap-3">
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  />
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
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
                    className="px-3 py-1 text-sm bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
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
            className="text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}