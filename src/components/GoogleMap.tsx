import { useEffect, useRef, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

// Extend Window interface for Google Maps
declare global {
  interface Window {
    google: any;
  }
}

interface GoogleMapProps {
  className?: string;
  height?: string;
  zoom?: number;
}

const GoogleMap = ({ 
  className = "", 
  height = "400px", 
  zoom = 15 
}: GoogleMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Location coordinates from provided Google Maps link
  const center = { lat: 28.8949, lng: 76.6046 };

  useEffect(() => {
    const loadGoogleMaps = () => {
      // Check if Google Maps is already loaded
      if (window.google && window.google.maps) {
        initializeMap();
        return;
      }

      // Use Google Maps Embed API for free integration
      loadEmbedMap();
    };

    const loadEmbedMap = () => {
      if (!mapRef.current) return;

      // Use Google Maps Embed API (free version)
      const embedUrl = "https://maps.app.goo.gl/NGuiJgyQUb3j2zmw5";
      
      mapRef.current.innerHTML = `
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3496.1234567890123!2d76.6046!3d28.8949!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDUzJzQxLjYiTiA3NsKwMzYnMTYuNiJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style="border:0; border-radius: 8px;"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          title="Location Map">
        </iframe>
      `;
      
      setIsLoaded(true);
    };

    const initializeMap = () => {
      // Fallback method for when Google Maps JavaScript API is available
      if (!mapRef.current) return;

      try {
        const map = new window.google.maps.Map(mapRef.current, {
          center,
          zoom,
          styles: [
            {
              featureType: "all",
              elementType: "geometry.fill",
              stylers: [{ color: "#f5f5f5" }]
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#e1f3ff" }]
            }
          ]
        });

        // Add marker
        new window.google.maps.Marker({
          position: center,
          map,
          title: "Location",
          animation: window.google.maps.Animation.DROP
        });

        setIsLoaded(true);
      } catch (err) {
        setError("Failed to initialize Google Maps. Please try again later.");
      }
    };

    loadGoogleMaps();
  }, [zoom]);

  if (error) {
    return (
      <Alert className="border-orange-200 bg-orange-50">
        <AlertTriangle className="h-4 w-4 text-orange-600" />
        <AlertDescription className="text-orange-800">
          {error}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div 
        ref={mapRef}
        className="w-full rounded-lg border shadow-sm bg-muted"
        style={{ height }}
        role="img"
        aria-label="Google Map showing IIM Rohtak location"
      >
        {/* Fallback content while loading */}
        <div className="flex items-center justify-center h-full">
          <div className="text-center p-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="font-semibold text-foreground mb-2">IIM Rohtak Location</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Management City, Delhi Road, Rohtak, Haryana 124001
            </p>
            <p className="text-xs text-muted-foreground">
              Interactive map will load when Google Maps API is configured
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleMap;