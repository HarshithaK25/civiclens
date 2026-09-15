import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { LocateFixed, Search } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import CivicMap from '../components/CivicMap';
import { fetchIssues } from '../services/civicData';

export default function MapPage() {
  const [issues, setIssues] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [userPosition, setUserPosition] = useState(null);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [locationError, setLocationError] = useState('');
  const [state, setState] = useState({ loading: true, error: '' });

  useEffect(() => {
    fetchIssues()
      .then((items) => setIssues(items))
      .catch((error) => setState({ loading: false, error: error.message || 'Unable to load reports. Please try again.' }))
      .finally(() => setState((current) => ({ ...current, loading: false })));
  }, []);

  const visibleIssues = useMemo(() => issues.filter((issue) => {
    const matchesFilter = filter === 'all'
      || (filter === 'active' && issue.status !== 'Resolved')
      || (filter === 'resolved' && issue.status === 'Resolved')
      || (filter === 'high' && Number(issue.priority_score) >= 70);
    const term = search.trim().toLowerCase();
    return matchesFilter && (!term || `${issue.title} ${issue.category} ${issue.location}`.toLowerCase().includes(term));
  }), [filter, issues, search]);

  const findLocation = () => {
    setLocationError('');
    if (!navigator.geolocation) {
      setLocationError('Location is not supported by this browser. You can select an issue manually on the map.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => setUserPosition([coords.latitude, coords.longitude]),
      ({ code }) => setLocationError(code === 1 ? 'Location access was denied. You can select an issue manually on the map.' : code === 2 ? 'Your location is unavailable right now. Please select a location manually.' : 'Location request timed out. Please try again.'),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    );
  };

  return (
    <div className="page-shell">
      <PageHeader
        eyebrow="CIVIC MAP"
        title="Explore reported issues"
        subtitle="Track hotspots, patterns and reported concerns across your city."
      />

      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="panel map-view-panel">
        <div className="map-toolbar">
          <label className="map-search compact">
            <Search size={16} />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search issues or locations..." />
          </label>

          <div className="map-toolbar-actions">
            {['all', 'active', 'resolved', 'high'].map((value) => (
              <button key={value} type="button" className={`ghost-button ${filter === value ? 'active-filter' : ''}`} onClick={() => setFilter(value)}>
                {value === 'high' ? 'High Priority' : value[0].toUpperCase() + value.slice(1)}
              </button>
            ))}
            <button type="button" className="icon-button" aria-label="Find My Location" onClick={findLocation}><LocateFixed size={15} /></button>
          </div>
        </div>

        {locationError && <div className="inline-error">{locationError}</div>}
        {state.loading && <div className="empty-state">Loading civic reports...</div>}
        {state.error && <div className="inline-error">{state.error}</div>}
        {!state.loading && !state.error && !visibleIssues.some((issue) => Number.isFinite(Number(issue.latitude)) && Number.isFinite(Number(issue.longitude))) && (
          <div className="map-empty-overlay">No civic issues have been reported yet.</div>
        )}
        <CivicMap issues={visibleIssues} userPosition={userPosition} onOpenIssue={setSelectedIssue} height="620px" />
        {selectedIssue && <div className="panel issue-detail"><button type="button" className="icon-button" onClick={() => setSelectedIssue(null)} aria-label="Close issue details">×</button><h2>{selectedIssue.title}</h2><p>{selectedIssue.description}</p><span>{selectedIssue.category} · {selectedIssue.severity} · {selectedIssue.status}</span><strong>Priority {selectedIssue.priority_score}/100 · {selectedIssue.supportCount} supports</strong></div>}
      </motion.div>
    </div>
  );
}
