import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MapView from '../components/MapView';
import { apiGet } from '../utils/apiUtils';
import { handleError } from '../utils/errorHandlerToast';
import ErrorState from '../components/ErrorState';
import LoadingState from '../components/LoadingState';

interface Photo {
  id: number;
  src: { medium: string };
  alt: string;
}

const PlaceDetails = () => {
  const { placeName } = useParams<{ placeName: string }>();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [info, setInfo] = useState<{ lat: number; lon: number; description: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const [photosData, placeData] = await Promise.all([
          apiGet<{photos: Photo[]}>(`/api/pexels/search?query=${placeName}`),
          apiGet<{lat: number; lon: number; description: string}>(`/api/place-details/${placeName}`)
        ]);
        
        setPhotos(photosData.photos);
        setInfo(placeData);
      } catch (err) {
        setError(err as Error);
        handleError(err, `Failed to load details for ${placeName}`);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPlaceDetails();
  }, [placeName]);

  if (loading) {
    return <LoadingState message={`Loading details for ${placeName}...`} />;
  }
  
  if (error) {
    return (
      <ErrorState 
        message={`We couldn't load details for ${placeName}`} 
        error={error}
        onRetry={() => window.location.reload()} 
      />
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">{placeName}</h1>
      {info && <MapView lat={info.lat} lon={info.lon} />}
      <h2 className="text-xl font-semibold my-2">More Photos</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {photos && photos.length > 0 ? (
          photos.map(photo => (
            <img 
              key={photo.id} 
              src={photo.src.medium} 
              alt={photo.alt || `Photo of ${placeName}`} 
              className="rounded" 
              loading="lazy"
            />
          ))
        ) : (
          <p className="text-muted">No photos available for this location</p>
        )}
      </div>
    </div>
  );
};

export default PlaceDetails;
