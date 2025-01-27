import React, { useEffect, useRef, useState } from 'react';
import { X, MapPin, Star, Plus } from 'lucide-react';
import { getMapsLoader } from '../utils/mapsLoader';

export function PlaceSearchModal({ isOpen, onClose, onPlaceSelect, mapCenter }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mapsLoaded, setMapsLoaded] = useState(false);
  const searchService = useRef(null);
  const mapDiv = useRef(null);

  useEffect(() => {
    if (!isOpen || mapsLoaded || !mapDiv.current) return;

    const loader = getMapsLoader();
    
    loader.load().then(() => {
      const map = new google.maps.Map(mapDiv.current, {
        center: mapCenter,
        zoom: 15
      });
      searchService.current = new google.maps.places.PlacesService(map);
      setMapsLoaded(true);
    }).catch(err => {
      console.error('Error loading Google Maps:', err);
    });
  }, [isOpen, mapsLoaded, mapCenter]);

  const handleSearch = () => {
    if (!searchService.current || !searchQuery.trim()) return;

    setLoading(true);
    const request = {
      query: searchQuery,
      location: new google.maps.LatLng(mapCenter.lat, mapCenter.lng),
      radius: 5000 // 5km radius
    };

    searchService.current.textSearch(request, (results, status) => {
      setLoading(false);
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        setPlaces(results);
      } else {
        console.error('Places search failed:', status);
        setPlaces([]);
      }
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Add Place</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 border-b border-gray-200">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search for places..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              autoFocus
            />
            <button
              onClick={handleSearch}
              disabled={loading || !mapsLoaded}
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors disabled:opacity-50"
            >
              Search
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {!mapsLoaded ? (
            <div className="text-center py-8 text-gray-600">Loading Google Maps...</div>
          ) : loading ? (
            <div className="text-center py-8 text-gray-600">Searching...</div>
          ) : places.length === 0 ? (
            <div className="text-center py-8 text-gray-600">
              {searchQuery ? 'No places found' : 'Search for places to add to your itinerary'}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {places.map((place) => (
                <div
                  key={place.place_id}
                  className="bg-gray-50 p-4 rounded-lg flex items-start justify-between group hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <h3 className="font-medium text-gray-900">{place.name}</h3>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      {place.formatted_address}
                    </div>
                    {place.rating && (
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                        {place.rating}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => onPlaceSelect(place)}
                    className="p-2 text-yellow-600 hover:bg-yellow-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Hidden map div for Places Service */}
        <div ref={mapDiv} style={{ display: 'none' }} />
      </div>
    </div>
  );
}