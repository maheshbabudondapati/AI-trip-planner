import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
  Clock, 
  Trash2, 
  GripVertical, 
  MapPin, 
  Timer, 
  Route, 
  Calendar, 
  DollarSign, 
  Save, 
  X,
  AlertCircle,
  Link
} from 'lucide-react';
import { calculateDistance, calculateTravelTime } from '../utils/distanceCalculator';

export function SortableActivityItem({ activity, onRemove, number, nextActivity }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: activity.title,
    startTime: activity.startTime || '',
    endTime: activity.endTime || '',
    notes: activity.notes || '',
    price: activity.price || '',
    url: activity.url || ''
  });
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: activity.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 1
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    Object.assign(activity, formData);
    setIsEditing(false);
    setHasUnsavedChanges(false);
  };

  const handleCancel = () => {
    setFormData({
      title: activity.title,
      startTime: activity.startTime || '',
      endTime: activity.endTime || '',
      notes: activity.notes || '',
      price: activity.price || '',
      url: activity.url || ''
    });
    setIsEditing(false);
    setHasUnsavedChanges(false);
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

  const validateTimes = () => {
    if (formData.startTime && formData.endTime) {
      const start = new Date(`2000-01-01T${formData.startTime}`);
      const end = new Date(`2000-01-01T${formData.endTime}`);
      return end > start;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateTimes()) {
      alert('End time must be after start time');
      return;
    }
    handleSave();
  };

  return (
    <div className="relative">
      <div
        ref={setNodeRef}
        style={style}
        className={`bg-gray-50 rounded-lg group relative hover:bg-gray-100 transition-colors ${
          isDragging ? 'shadow-lg' : ''
        }`}
      >
        {/* Activity Number */}
        <div 
          className="absolute -left-2 -top-2 w-5 h-5 sm:w-6 sm:h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-medium shadow-sm"
          aria-label={`Activity ${number}`}
        >
          {number}
        </div>

        <div className="p-3 sm:p-4">
          <div className="flex items-start gap-2 sm:gap-3">
            <button
              type="button"
              {...attributes}
              {...listeners}
              className="mt-1 text-gray-400 hover:text-gray-600 cursor-move touch-none p-1 rounded-lg hover:bg-gray-200 transition-colors"
              aria-label="Drag to reorder activity"
            >
              <GripVertical className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <div className="flex-1 min-w-0">
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label htmlFor={`title-${activity.id}`} className="block text-xs font-medium text-gray-700 mb-1">
                      Activity Title
                    </label>
                    <input
                      id={`title-${activity.id}`}
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Enter activity title"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor={`start-${activity.id}`} className="block text-xs font-medium text-gray-700 mb-1">
                        Start Time
                      </label>
                      <input
                        id={`start-${activity.id}`}
                        type="time"
                        value={formData.startTime}
                        onChange={(e) => handleInputChange('startTime', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label htmlFor={`end-${activity.id}`} className="block text-xs font-medium text-gray-700 mb-1">
                        End Time
                      </label>
                      <input
                        id={`end-${activity.id}`}
                        type="time"
                        value={formData.endTime}
                        onChange={(e) => handleInputChange('endTime', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor={`price-${activity.id}`} className="block text-xs font-medium text-gray-700 mb-1">
                        Price
                      </label>
                      <input
                        id={`price-${activity.id}`}
                        type="text"
                        value={formData.price}
                        onChange={(e) => handleInputChange('price', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Optional"
                      />
                    </div>
                    <div>
                      <label htmlFor={`url-${activity.id}`} className="block text-xs font-medium text-gray-700 mb-1">
                        Website URL
                      </label>
                      <input
                        id={`url-${activity.id}`}
                        type="url"
                        value={formData.url}
                        onChange={(e) => handleInputChange('url', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Optional"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor={`notes-${activity.id}`} className="block text-xs font-medium text-gray-700 mb-1">
                      Notes
                    </label>
                    <textarea
                      id={`notes-${activity.id}`}
                      value={formData.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                      placeholder="Add any notes or details"
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!hasUnsavedChanges}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Save className="w-3.5 h-3.5" />
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                <button 
                  onClick={() => setIsEditing(true)} 
                  className="w-full text-left space-y-2 p-1 -m-1 rounded-lg hover:bg-gray-200/50 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    <h3 className="font-medium text-gray-900 text-sm sm:text-base">
                      {activity.title}
                    </h3>
                    {activity.location && (
                      <div className="flex items-center text-xs sm:text-sm text-gray-600">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                        <span className="truncate">{activity.location.name}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    {(activity.startTime || activity.endTime) && (
                      <div className="flex items-center text-xs text-gray-600">
                        <Clock className="w-3 h-3 mr-1 flex-shrink-0" />
                        {activity.startTime}
                        {activity.endTime && ` - ${activity.endTime}`}
                      </div>
                    )}
                    {activity.price && (
                      <div className="flex items-center text-xs text-gray-600">
                        <DollarSign className="w-3 h-3 mr-1 flex-shrink-0" />
                        {activity.price}
                      </div>
                    )}
                    {activity.url && (
                      <div className="flex items-center text-xs text-primary-600">
                        <Link className="w-3 h-3 mr-1 flex-shrink-0" />
                        Website
                      </div>
                    )}
                  </div>

                  {activity.notes && (
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {activity.notes}
                    </p>
                  )}
                </button>
              )}
            </div>

            <button
              onClick={() => onRemove(activity.id)}
              className="text-gray-400 hover:text-primary-600 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity p-1.5 rounded-full hover:bg-gray-200"
              aria-label={`Remove ${activity.title}`}
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
          <div className="ml-14 my-2 flex items-center gap-2 text-xs text-gray-500">
            <Timer className="w-3 h-3 flex-shrink-0" />
            <span>{travelInfo.minutes} mins</span>
            <Route className="w-3 h-3 flex-shrink-0 ml-2" />
            <span>{travelInfo.distance} mi</span>
          </div>
        </div>
      )}
    </div>
  );
}