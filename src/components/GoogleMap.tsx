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

  // IIM Rohtak coordinates
  const center = { lat: 28.8945, lng: 76.6057 };

  useEffect(() => {
    const loadGoogleMaps = () => {
      // Check if Google Maps is already loaded
      if (window.google && window.google.maps) {
        initializeMap();
        return;
      }

      // For now, show a placeholder since we don't have a real API key
      setError("Google Maps integration requires an API key. Please add your Google Maps API key to complete the setup.");
    };

    const initializeMap = () => {
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

        // Add marker for IIM Rohtak
        new window.google.maps.Marker({
          position: center,
          map,
          title: "IIM Rohtak - Campus Connect",
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