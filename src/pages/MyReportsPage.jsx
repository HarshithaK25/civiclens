import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { useAuth } from '../contexts/AuthContext';
import { useLiveIssues } from '../hooks/useLiveIssues';

export default function MyReportsPage() {
  const { user } = useAuth();
  const { issues, loading, error } = useLiveIssues(user?.id);
  return <div className="page-shell narrow"><PageHeader eyebrow="MY REPORTS" title="Your civic activity" subtitle="Track only the issues you submitted from this account." />{!user && <div className="panel empty-state"><h2>Sign in to view your reports.</h2><Link className="primary-button" to="/auth">Sign in</Link></div>}{user && loading && <div className="empty-state">Loading your reports...</div>}{user && error && <div className="inline-error">{error}</div>}{user && !loading && !error && issues.length === 0 && <div className="panel empty-state"><h2>No reports yet.</h2><Link className="primary-button" to="/report">Report Your First Issue</Link></div>}{user && <div className="reports-list">{issues.map((issue) => <article key={issue.id} className="panel report-item"><div><h3>{issue.title}</h3><span>{issue.location} · Priority {issue.priority_score}/100</span></div><span className={`status-badge ${issue.status.toLowerCase().replace(/\s+/g, '-')}`}>{issue.status}</span></article>)}</div>}</div>;
}
