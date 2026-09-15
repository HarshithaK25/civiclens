import { useEffect, useMemo } from 'react';
import { CircleMarker, MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const FALLBACK_CENTER = [20, 0];
const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const issueColor = (issue) => {
  if (issue.severity === 'Critical') return '#ef4444';
  if (issue.category === 'Water') return '#3b82f6';
  if (issue.category === 'Garbage') return '#12b981';
  if (issue.category === 'Pothole') return '#f59e0b';
  if (issue.category === 'Traffic') return '#ef4444';
  return '#8b5cf6';
};

function MapViewport({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.flyTo(center, zoom, { duration: 0.7 });
  }, [center, map, zoom]);
  return null;
}

function ClickHandler({ onSelect }) {
  useMapEvents({ click: (event) => onSelect([event.latlng.lat, event.latlng.lng]) });
  return null;
}

function IssuePopup({ issue, onOpen }) {
  return (
    <div className="map-popup">
      <strong>{issue.title}</strong>
      <span>{issue.category} · {issue.severity}</span>
      <span>Priority {issue.priority_score ?? 'Not assessed'}/100</span>
      <span>{issue.status} · {issue.supportCount ?? 0} supports</span>
      <button type="button" onClick={() => onOpen?.(issue)}>Open issue</button>
    </div>
  );
}

export default function CivicMap({
  issues = [],
  selectedPosition,
  userPosition,
  onSelect,
  onOpenIssue,
  center,
  zoom = 13,
  interactive = false,
  height = '620px',
}) {
  const validIssues = useMemo(
    () => issues.filter((issue) => Number.isFinite(Number(issue.latitude)) && Number.isFinite(Number(issue.longitude))),
    [issues],
  );
  const mapCenter = center ?? selectedPosition ?? userPosition ?? (validIssues[0] ? [Number(validIssues[0].latitude), Number(validIssues[0].longitude)] : FALLBACK_CENTER);

  return (
    <div className="civic-map" style={{ height }}>
      <MapContainer center={mapCenter} zoom={validIssues.length || selectedPosition || userPosition ? zoom : 2} scrollWheelZoom className="leaflet-map">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapViewport center={center ?? selectedPosition ?? userPosition} zoom={zoom} />
        {interactive && <ClickHandler onSelect={onSelect} />}
        {validIssues.map((issue) => (
          <CircleMarker
            key={issue.id}
            center={[Number(issue.latitude), Number(issue.longitude)]}
            radius={10}
            pathOptions={{ color: issueColor(issue), fillColor: issueColor(issue), fillOpacity: 0.85 }}
          >
            <Popup><IssuePopup issue={issue} onOpen={onOpenIssue} /></Popup>
          </CircleMarker>
        ))}
        {userPosition && (
          <CircleMarker center={userPosition} radius={8} pathOptions={{ color: '#2563eb', fillColor: '#60a5fa', fillOpacity: 0.9 }}>
            <Popup>Your current location</Popup>
          </CircleMarker>
        )}
        {selectedPosition && (
          <Marker
            position={selectedPosition}
            icon={markerIcon}
            draggable={interactive}
            eventHandlers={{ dragend: (event) => onSelect?.([event.target.getLatLng().lat, event.target.getLatLng().lng]) }}
          >
            <Popup>Selected issue location</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
