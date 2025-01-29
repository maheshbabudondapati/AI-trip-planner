import React from 'react';
import { MapPin, Star, ArrowRight } from 'lucide-react';

const destinations = [
  {
    name: "New York City",
    state: "New York",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    rating: 4.9,
    description: "Experience the vibrant energy of Times Square, Central Park's tranquility, and world-class museums.",
    highlights: ["Times Square", "Central Park", "Empire State Building", "Broadway Shows"]
  },
  {
    name: "Grand Canyon",
    state: "Arizona",
    image: "https://images.unsplash.com/photo-1615551043360-33de8b5f410c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    rating: 4.8,
    description: "Marvel at one of nature's most spectacular creations, with breathtaking views and hiking trails.",
    highlights: ["South Rim", "Bright Angel Trail", "Desert View Drive", "Sunset Points"]
  },
  {
    name: "San Francisco",
    state: "California",
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    rating: 4.7,
    description: "Discover iconic landmarks, diverse neighborhoods, and the famous Golden Gate Bridge.",
    highlights: ["Golden Gate Bridge", "Alcatraz", "Fisherman's Wharf", "Cable Cars"]
  },
  {
    name: "Yellowstone",
    state: "Wyoming",
    image: "https://images.unsplash.com/photo-1576434795764-7e27901b7af1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    rating: 4.9,
    description: "Explore geothermal wonders, wildlife, and pristine wilderness in America's first national park.",
    highlights: ["Old Faithful", "Grand Prismatic Spring", "Wildlife Tours", "Mammoth Hot Springs"]
  },
  {
    name: "Miami Beach",
    state: "Florida",
    image: "https://images.unsplash.com/photo-1535498730771-e735b998cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    rating: 4.6,
    description: "Enjoy pristine beaches, vibrant nightlife, and the colorful Art Deco Historic District.",
    highlights: ["South Beach", "Ocean Drive", "Art Deco District", "Little Havana"]
  },
  {
    name: "Las Vegas",
    state: "Nevada",
    image: "https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    rating: 4.7,
    description: "Experience the entertainment capital with world-class shows, casinos, and dining.",
    highlights: ["The Strip", "Fremont Street", "Shows & Entertainment", "World-class Dining"]
  }
];

export function UsaDestinations() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Explore the USA
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From bustling cities to natural wonders, discover the most iconic destinations across America
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <div 
              key={destination.name}
              className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-medium">{destination.rating}</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm text-gray-600">{destination.state}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{destination.name}</h3>
                <p className="text-gray-600 mb-4">{destination.description}</p>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Highlights:</h4>
                  <div className="flex flex-wrap gap-2">
                    {destination.highlights.map((highlight) => (
                      <span 
                        key={highlight}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                  Plan Your Visit <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 px-6 py-3 border-2 border-yellow-600 text-yellow-600 font-medium rounded-lg hover:bg-yellow-50 transition-colors">
            Discover More Destinations
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}