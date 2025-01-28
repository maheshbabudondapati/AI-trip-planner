import React from 'react';
import { MapPin, Calendar, Info } from 'lucide-react';

const wonders = [
  {
    name: "Great Wall of China",
    location: "China",
    image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    description: "An ancient series of walls and fortifications spanning over 13,000 miles, built as early as the 7th century BCE."
  },
  {
    name: "Petra",
    location: "Jordan",
    image: "https://images.unsplash.com/photo-1579606037885-46c0ee5d0c67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    description: "An ancient city carved into rose-colored rock face, featuring stunning architecture and water conduit systems."
  },
  {
    name: "Christ the Redeemer",
    location: "Brazil",
    image: "https://images.unsplash.com/photo-1594387295585-34ba4c251eea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    description: "An Art Deco statue of Jesus Christ standing 98 feet tall, overlooking Rio de Janeiro."
  }
];

export function Wonders() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            The 7 Wonders of the World
          </h2>
          <p className="text-lg text-gray-600">
            Explore these magnificent monuments that showcase human ingenuity and natural beauty
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wonders.map((wonder) => (
            <div 
              key={wonder.name}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-64">
                <img 
                  src={wonder.image} 
                  alt={wonder.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <MapPin className="w-5 h-5 text-yellow-600 mr-2" />
                  <span className="text-sm text-gray-600">{wonder.location}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{wonder.name}</h3>
                <p className="text-gray-600 mb-4">{wonder.description}</p>
                <div className="flex gap-2">
                  <button className="flex items-center gap-1 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                    <Calendar className="w-4 h-4" />
                    Plan Visit
                  </button>
                  <button className="flex items-center gap-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <Info className="w-4 h-4" />
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}