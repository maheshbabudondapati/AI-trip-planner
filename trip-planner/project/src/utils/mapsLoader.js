import { Loader } from '@googlemaps/js-api-loader';

let loader = null;

export function getMapsLoader() {
  if (!loader) {
    loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
      version: "weekly",
      libraries: ["places"]
    });
  }
  return loader;
}