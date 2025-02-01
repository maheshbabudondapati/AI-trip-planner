import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Hotel, 
  MapPin, 
  Clock, 
  DollarSign, 
  Star, 
  Calendar,
  Coffee,
  Utensils,
  Info,
  Loader2,
  Navigation,
  MessageSquare
} from 'lucide-react';
import { getMapsLoader } from '../utils/mapsLoader';

const formatDate = (dayIndex, tripData) => {
  if (!tripData?.startDate) {
    return `Day ${dayIndex + 1}`;
  }

  // Create a new date object from the start date
  const date = new Date(tripData.startDate);
  // Add the day index to get the correct date
  date.setDate(date.getDate() + dayIndex);

  return `Day ${dayIndex + 1}: ${date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'numeric',
    day: 'numeric',
    year: 'numeric'
  })}`;
};

const DestinationImage = ({ location }) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    // Get a relevant image for the destination
    const getDestinationImage = async () => {
      try {
        const loader = getMapsLoader();
        await loader.load();

        const service = new google.maps.places.PlacesService(
          document.createElement('div')
        );

        const request = {
          query: `${location} landmarks`,
          fields: ['photos', 'name']
        };

        service.findPlaceFromQuery(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results?.[0]?.photos?.[0]) {
            const photoUrl = results[0].photos[0].getUrl({
              maxWidth: 1920,
              maxHeight: 1080
            });
            setImageUrl(photoUrl);
          } else {
            // Fallback images for popular destinations
            const fallbackImages = {
              'paris': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=2000&q=80',
              'london': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=2000&q=80',
              'new york': 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=2000&q=80',
              'tokyo': 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=2000&q=80',
              'dubai': 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2000&q=80',
              'default': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=2000&q=80'
            };

            const cityKey = Object.keys(fallbackImages).find(
              key => location.toLowerCase().includes(key)
            );
            setImageUrl(fallbackImages[cityKey] || fallbackImages.default);
          }
        });
      } catch (error) {
        console.error('Error loading destination image:', error);
        setImageUrl('https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=2000&q=80');
      }
    };

    if (location) {
      getDestinationImage();
    }
  }, [location]);

  if (!imageUrl) return null;

  return (
    <div className="relative h-[400px] -mt-8 mb-8 rounded-lg overflow-hidden">
      <img 
        src={imageUrl} 
        alt={`${location} view`}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <h1 className="text-4xl font-bold text-white mb-2">{location}</h1>
        <p className="text-white/90 text-lg">Your personalized travel itinerary</p>
      </div>
    </div>
  );
};

const HotelCard = ({ hotel }) => {
  const handleDirections = () => {
    const query = encodeURIComponent(`${hotel.name} ${hotel.address}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  const handleReviews = () => {
    const query = encodeURIComponent(`${hotel.name} reviews`);
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {hotel.imageUrl && (
        <div className="relative h-40">
          <img 
            src={hotel.imageUrl} 
            alt={hotel.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{hotel.name}</h3>
          <div className="flex items-center gap-1 text-primary-600">
            <Star className="w-4 h-4 fill-current" />
            <span>{hotel.rating}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
          <MapPin className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">{hotel.address}</span>
        </div>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{hotel.description}</p>
        <div className="flex items-center justify-between">
          <div className="text-primary-600 font-semibold">{hotel.pricePerNight}</div>
          <div className="flex gap-2">
            <button 
              onClick={handleDirections}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 tooltip"
              title="Get Directions"
            >
              <Navigation className="w-5 h-5" />
            </button>
            <button 
              onClick={handleReviews}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 tooltip"
              title="Read Reviews"
            >
              <MessageSquare className="w-5 h-5" />
            </button>
            <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ActivityCard = ({ activity }) => {
  const handleDirections = () => {
    const query = encodeURIComponent(activity.name);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  const handleReviews = () => {
    const query = encodeURIComponent(`${activity.name} reviews`);
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {activity.imageUrl && (
        <div className="relative h-40">
          <img 
            src={activity.imageUrl} 
            alt={activity.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h4 className="font-semibold text-gray-900">{activity.name}</h4>
          {activity.price && (
            <span className="text-primary-600 font-medium text-sm">{activity.price}</span>
          )}
        </div>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{activity.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-3 text-xs text-gray-600">
            {activity.duration && (
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {activity.duration}
              </div>
            )}
            {activity.bestTimeToVisit && (
              <div className="flex items-center gap-1">
                <Info className="w-3.5 h-3.5" />
                Best time: {activity.bestTimeToVisit}
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <button 
              onClick={handleDirections}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 tooltip"
              title="Get Directions"
            >
              <Navigation className="w-5 h-5" />
            </button>
            <button 
              onClick={handleReviews}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 tooltip"
              title="Read Reviews"
            >
              <MessageSquare className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const RestaurantCard = ({ restaurant }) => {
  const handleDirections = () => {
    const query = encodeURIComponent(`${restaurant.name} ${restaurant.address}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  const handleReviews = () => {
    const query = encodeURIComponent(`${restaurant.name} reviews`);
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {restaurant.imageUrl && (
        <div className="relative h-32">
          <img 
            src={restaurant.imageUrl} 
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h4 className="font-semibold text-gray-900">{restaurant.name}</h4>
          <span className="text-sm text-gray-600">{restaurant.priceRange}</span>
        </div>
        {restaurant.cuisine && (
          <div className="text-sm text-gray-600 mb-2">{restaurant.cuisine} Cuisine</div>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{restaurant.address}</span>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={handleDirections}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 tooltip"
              title="Get Directions"
            >
              <Navigation className="w-5 h-5" />
            </button>
            <button 
              onClick={handleReviews}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 tooltip"
              title="Read Reviews"
            >
              <MessageSquare className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function GeneratedItinerary() {
  const location = useLocation();
  const navigate = useNavigate();
  const [tripPlan, setTripPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Location State:', location.state);
    
    if (!location.state?.aiGeneratedPlan) {
      console.log('No trip plan found, redirecting...');
      navigate('/plan-trip');
      return;
    }

    try {
      const plan = location.state.aiGeneratedPlan;
      console.log('Setting trip plan:', plan);
      setTripPlan(plan);
    } catch (error) {
      console.error('Error processing trip plan:', error);
    } finally {
      setLoading(false);
    }
  }, [location.state, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-primary-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your itinerary...</p>
        </div>
      </div>
    );
  }

  if (!tripPlan) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No itinerary data available.</p>
          <button 
            onClick={() => navigate('/plan-trip')}
            className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Create New Trip
          </button>
        </div>
      </div>
    );
  }

  const { tripDetails, hotels = [], dailyItinerary = [] } = tripPlan;

  // Ensure dailyItinerary is an array
  const itineraryArray = Array.isArray(dailyItinerary) 
    ? dailyItinerary 
    : Object.values(dailyItinerary);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add Destination Image */}
        <DestinationImage location={tripPlan?.tripDetails?.location} />

        {/* Trip Overview */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Trip Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-gray-600">Location</div>
              <div className="font-medium">{tripDetails?.location || 'Not specified'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Duration</div>
              <div className="font-medium">{tripDetails?.duration || 'Not specified'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Travelers</div>
              <div className="font-medium">{tripDetails?.travelers || 'Not specified'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Budget</div>
              <div className="font-medium capitalize">{tripDetails?.budget || 'Not specified'}</div>
            </div>
          </div>
        </div>

        {/* Hotel Options */}
        {hotels && hotels.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended Hotels</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotels.map((hotel, index) => (
                <HotelCard key={index} hotel={hotel} />
              ))}
            </div>
          </section>
        )}

        {/* Daily Itinerary */}
        {itineraryArray && itineraryArray.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Daily Itinerary</h2>
            <div className="space-y-8">
              {itineraryArray.map((day, dayIndex) => (
                <div key={dayIndex} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="bg-primary-600 px-6 py-4">
                    <div className="flex items-center gap-2 text-white">
                      <Calendar className="w-5 h-5" />
                      <h3 className="text-lg font-semibold">
                        {formatDate(dayIndex, location.state?.tripData)}
                      </h3>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    {/* Activities */}
                    {day.activities && day.activities.length > 0 && (
                      <div className="mb-8">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <Coffee className="w-5 h-5 text-primary-600" />
                          Activities
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {day.activities.map((activity, index) => (
                            <ActivityCard key={index} activity={activity} />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Restaurants */}
                    {day.restaurants && day.restaurants.length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <Utensils className="w-5 h-5 text-primary-600" />
                          Restaurants
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {day.restaurants.map((restaurant, index) => (
                            <RestaurantCard key={index} restaurant={restaurant} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

// Export the component as default
export default GeneratedItinerary;

export { GeneratedItinerary }