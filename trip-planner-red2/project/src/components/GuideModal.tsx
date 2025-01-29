import React from 'react';
import { X, MapPin, Calendar, Clock, DollarSign } from 'lucide-react';
import type { Guide } from '../types/guide';

interface GuideModalProps {
  guide: Guide;
  isOpen: boolean;
  onClose: () => void;
}

export function GuideModal({ guide, isOpen, onClose }: GuideModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">{guide.title}</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          <img 
            src={guide.image} 
            alt={guide.title}
            className="w-full h-[400px] object-cover rounded-xl mb-6"
          />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary-600" />
              <span className="text-gray-600">{guide.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary-600" />
              <span className="text-gray-600">{guide.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary-600" />
              <span className="text-gray-600">{guide.bestTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary-600" />
              <span className="text-gray-600">{guide.budget}</span>
            </div>
          </div>

          <div className="prose max-w-none">
            <h3 className="text-xl font-bold mb-4">Overview</h3>
            <p className="text-gray-600 mb-6">{guide.description}</p>

            <h3 className="text-xl font-bold mb-4">Highlights</h3>
            <ul className="list-disc pl-6 mb-6">
              {guide.highlights.map((highlight, index) => (
                <li key={index} className="text-gray-600 mb-2">{highlight}</li>
              ))}
            </ul>

            {guide.itinerary.map((day, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-xl font-bold mb-4">Day {day.day}: {day.title}</h3>
                <p className="text-gray-600 mb-4">{day.description}</p>
                <ul className="list-disc pl-6">
                  {day.activities.map((activity, actIndex) => (
                    <li key={actIndex} className="text-gray-600 mb-2">{activity}</li>
                  ))}
                </ul>
              </div>
            ))}

            <h3 className="text-xl font-bold mb-4">Tips</h3>
            <ul className="list-disc pl-6 mb-6">
              {guide.tips.map((tip, index) => (
                <li key={index} className="text-gray-600 mb-2">{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}