import React, { useEffect, useRef, useState } from 'react';
import { X, MapPin, Star, Plus, Search, Loader2 } from 'lucide-react';
import { getMapsLoader } from '../utils/mapsLoader';

export function PlaceSearchModal({ isOpen, onClose, onPlaceSelect, mapCenter }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mapsLoaded, setMapsLoaded] = useState(false);
  const [error, setError] = useState('');
  const searchService = useRef(null);
  const mapDiv = useRef(null);
  const searchInput = useRef(null);
  const modalRef = useRef(null);

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
      
      // Focus search input after maps load
      if (searchInput.current) {
        searchInput.current.focus();
      }
    }).catch(err => {
      console.error('Error loading Google Maps:', err);
      setError('Failed to load Google Maps. Please try again later.');
    });
  }, [isOpen, mapsLoaded, mapCenter]);

  useEffect(() => {
    if (isOpen) {
      // Focus search input when modal opens
      setTimeout(() => {
        searchInput.current?.focus();
      }, 100);

      // Handle escape key
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  const handleSearch = () => {
    if (!searchService.current || !searchQuery.trim()) {
      setError('Please enter a search term');
      return;
    }

    setError('');
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
        setError('No places found. Try a different search term or location.');
      }
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Handle click outside to close
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4"
      onClick={handleClickOutside}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-xl max-w-2xl w-full h-[90vh] sm:h-auto sm:max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-3 sm:p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 id="modal-title" className="text-base sm:text-lg font-semibold text-gray-900">
            Add Place to Itinerary
          </h2>
          <button 
            onClick={onClose}
            className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-3 sm:p-4 border-b border-gray-200">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                ref={searchInput}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Search for places..."
                className="w-full pl-9 pr-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                aria-label="Search places"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            <button
              onClick={handleSearch}
              disabled={loading || !mapsLoaded}
              className="px-3 sm:px-4 py-2 bg-primary-600 text-white text-sm sm:text-base rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 whitespace-nowrap flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="hidden sm:inline">Searching...</span>
                </>
              ) : (
                'Search'
              )}
            </button>
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4">
          {!mapsLoaded ? (
            <div className="text-center py-8 text-gray-600">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3" />
              <p className="text-sm sm:text-base">Loading Google Maps...</p>
            </div>
          ) : loading ? (
            <div className="text-center py-8 text-gray-600">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3" />
              <p className="text-sm sm:text-base">Searching...</p>
            </div>
          ) : places.length === 0 ? (
            <div className="text-center py-8 text-gray-600">
              <p className="text-sm sm:text-base">
                {searchQuery ? 'No places found' : 'Search for places to add to your itinerary'}
              </p>
            </div>
          ) : (
            <div 
              className="space-y-3"
              role="listbox"
              aria-label="Search results"
            >
              {places.map((place) => (
                <div
                  key={place.place_id}
                  className="bg-gray-50 p-3 sm:p-4 rounded-lg flex items-start justify-between group hover:bg-gray-100 transition-colors"
                  role="option"
                  aria-selected="false"
                >
                  <div className="flex-1 min-w-0 mr-2">
                    <h3 className="font-medium text-gray-900 text-sm sm:text-base mb-1 truncate">
                      {place.name}
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                      <div className="flex items-center text-xs sm:text-sm text-gray-600">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                        <span className="truncate">{place.formatted_address}</span>
                      </div>
                      {place.rating && (
                        <div className="flex items-center text-xs sm:text-sm text-gray-600">
                          <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1 fill-primary-400 text-primary-400 flex-shrink-0" />
                          <span>{place.rating} stars</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => onPlaceSelect(place)}
                    className="p-1.5 sm:p-2 text-primary-600 hover:bg-primary-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 focus:opacity-100"
                    title={`Add ${place.name} to itinerary`}
                    aria-label={`Add ${place.name} to itinerary`}
                  >
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
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