import { useState } from 'react';
import { LocateFixed, MapPin } from 'lucide-react';
import CivicMap from './CivicMap';

function locationMessage(code) {
  if (code === 1) return 'Location access was denied. You can continue by selecting a location manually.';
  if (code === 2) return 'Your location is unavailable right now. You can select a location manually.';
  if (code === 3) return 'Location request timed out. Please try again or select a location manually.';
  return 'Location is not supported by this browser. You can select a location manually.';
}

export default function LocationPicker({ value, onChange }) {
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [center, setCenter] = useState(null);

  const useCurrentLocation = () => {
    setError('');
    setStatus('Requesting your location...');
    if (!navigator.geolocation) {
      setStatus('');
      setError(locationMessage());
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const position = [coords.latitude, coords.longitude];
        onChange(position);
        setCenter(position);
        setStatus('Location captured');
      },
      (locationError) => {
        setStatus('');
        setError(locationMessage(locationError.code));
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    );
  };

  const selectLocation = (position) => {
    onChange(position);
    setCenter(position);
    setStatus('Selected location');
    setError('');
  };

  return (
    <section className="location-picker">
      <div className="location-picker-header">
        <div className="location-row"><MapPin size={18} /><strong>Where is the problem?</strong></div>
        <div className="location-picker-actions">
          <button type="button" className="primary-button small" onClick={useCurrentLocation}><LocateFixed size={15} /> Use My Current Location</button>
          <button type="button" className="ghost-button" onClick={() => setStatus('Click the map to select the exact issue location.')}>Select on Map</button>
        </div>
      </div>
      <p>Choose your current position or click the map. You can drag the marker to refine it.</p>
      {status && <div className="location-success">{status}</div>}
      {error && <div className="inline-error">{error}</div>}
      {value && <div className="coordinate-readout"><strong>{status || 'Selected location'}</strong><span>Latitude {value[0].toFixed(6)} · Longitude {value[1].toFixed(6)}</span></div>}
      <CivicMap selectedPosition={value} center={center} onSelect={selectLocation} interactive height="360px" />
    </section>
  );
}
