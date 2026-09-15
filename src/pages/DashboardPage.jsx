import { Link } from 'react-router-dom';
import { ArrowUpRight, FilePlus2 } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import CivicMap from '../components/CivicMap';
import { useLiveIssues } from '../hooks/useLiveIssues';
import { summarizeIssues } from '../services/civicData';

export default function DashboardPage() {
  const { issues, loading, error } = useLiveIssues();
  const summary = summarizeIssues(issues);
  const stats = [
    ['Issues Reported', summary.total, 'teal', 'plus'],
    ['Active Issues', summary.active, 'amber', 'alert'],
    ['Resolved Issues', summary.resolved, 'green', 'check'],
    ['Community Supports', summary.supports, 'blue', 'clock'],
  ];
  return <div className="page-shell"><PageHeader eyebrow="COMMUNITY COMMAND CENTER" title="See what your community has reported" subtitle="CivicLens shows only reports submitted by authenticated residents." /><div className="stats-grid">{stats.map(([label, value, tone, icon]) => <StatCard key={label} label={label} value={String(value)} tone={tone} icon={icon} />)}</div>{loading && <div className="empty-state">Loading civic reports...</div>}{error && <div className="inline-error">{error}</div>}{!loading && !error && issues.length === 0 && <div className="panel empty-state"><FilePlus2 size={28} /><h2>No civic issues reported yet.</h2><p>Be the first person to report a problem in your community.</p><Link className="primary-button" to="/report">Report an Issue</Link></div>}{!loading && !error && issues.length > 0 && <><div className="panel dashboard-map"><CivicMap issues={issues} height="360px" /></div><div className="section-header"><h2>Recent Civic Issues</h2><Link to="/community">View all <ArrowUpRight size={15} /></Link></div><div className="issue-grid">{issues.slice(0, 6).map((issue) => <article key={issue.id} className="issue-card"><div className="issue-card-top"><span className={`status-badge ${String(issue.severity).toLowerCase()}`}>{issue.severity}</span><span className="category-pill">{issue.category}</span></div><h3>{issue.title}</h3><div className="issue-location">{issue.location}</div><div className="issue-card-bottom"><span className="tiny-status">• {issue.status}</span><span>{issue.supportCount} supports</span></div></article>)}</div></>}</div>;
}
