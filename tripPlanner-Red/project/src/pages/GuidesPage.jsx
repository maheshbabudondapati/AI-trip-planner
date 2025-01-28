import React, { useState } from 'react';
import { MapPin, Calendar, ArrowRight, Clock, DollarSign } from 'lucide-react';
import { Guide } from '../types/guide';
import { GuideModal } from '../components/GuideModal';

// ... (keep existing guides data)

export function GuidesPage() {
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openGuide = (guide) => {
    setSelectedGuide(guide);
    setIsModalOpen(true);
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[400px]">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80")'
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative h-full flex items-center justify-center text-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Travel Guides</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto px-4">
              Comprehensive guides to help you plan your next adventure
            </p>
          </div>
        </div>
      </section>

      {/* World Guides */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">International Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {worldGuides.map((guide) => (
              <div 
                key={guide.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48">
                  <img 
                    src={guide.image} 
                    alt={guide.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-primary-600" />
                      <span className="text-sm text-gray-600">{guide.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-primary-600" />
                      <span className="text-sm text-gray-600">{guide.location}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{guide.title}</h3>
                  <p className="text-gray-600 mb-4">{guide.description}</p>
                  <button 
                    onClick={() => openGuide(guide)}
                    className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Read Guide <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USA Guides */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">USA Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {usaGuides.map((guide) => (
              <div 
                key={guide.id}
                className="bg-gray-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48">
                  <img 
                    src={guide.image} 
                    alt={guide.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-primary-600" />
                      <span className="text-sm text-gray-600">{guide.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-primary-600" />
                      <span className="text-sm text-gray-600">{guide.location}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{guide.title}</h3>
                  <p className="text-gray-600 mb-4">{guide.description}</p>
                  <button 
                    onClick={() => openGuide(guide)}
                    className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Read Guide <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guide Modal */}
      {selectedGuide && (
        <GuideModal
          guide={selectedGuide}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}