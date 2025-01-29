import React from 'react';
import { 
  Calendar, 
  Users, 
  DollarSign, 
  Plane, 
  Download, 
  Map 
} from 'lucide-react';

const features = [
  {
    icon: Calendar,
    title: "Custom Itinerary Builder",
    description: "Plan your journey hour by hour with our intuitive itinerary builder."
  },
  {
    icon: Users,
    title: "Collaboration Tools",
    description: "Share and plan trips with friends and family in real-time."
  },
  {
    icon: DollarSign,
    title: "Budget Planner",
    description: "Keep track of expenses and plan your budget effectively."
  },
  {
    icon: Plane,
    title: "Hotel & Flight Integration",
    description: "Find and book the best deals for your accommodation and travel."
  },
  {
    icon: Download,
    title: "Offline Access",
    description: "Access your travel plans anytime, even without internet connection."
  },
  {
    icon: Map,
    title: "Map View & Navigation",
    description: "Visualize your journey with integrated maps and navigation."
  }
];

export function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Plan Your Perfect Trip
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to create unforgettable travel experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div 
                key={feature.title}
                className="group p-8 bg-gray-50 rounded-xl hover:bg-primary-600 transition-colors duration-300"
              >
                <Icon className="w-8 h-8 text-primary-600 group-hover:text-white mb-4" />
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 group-hover:text-white/90">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}