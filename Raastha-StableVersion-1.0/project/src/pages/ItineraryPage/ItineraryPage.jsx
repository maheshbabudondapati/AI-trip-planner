import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GeneratedItinerary } from '../../components/GeneratedItinerary';
import { Loader2 } from 'lucide-react';

export default function ItineraryPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [tripPlan, setTripPlan] = useState(null);

  useEffect(() => {
    // Log the incoming data
    console.log('Location State:', location.state);

    if (location.state?.aiGeneratedPlan) {
      console.log('Setting Trip Plan:', location.state.aiGeneratedPlan);
      setTripPlan(location.state.aiGeneratedPlan);
    } else {
      console.log('No trip plan found in state');
      navigate('/plan-trip');
    }
  }, [location.state, navigate]);

  if (!tripPlan) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-primary-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your itinerary...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <GeneratedItinerary tripPlan={tripPlan} />
    </div>
  );
}