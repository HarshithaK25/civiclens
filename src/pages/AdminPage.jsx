import PageHeader from '../components/PageHeader';
import { useLiveIssues } from '../hooks/useLiveIssues';
import { summarizeIssues } from '../services/civicData';

export default function AdminPage() {
  const { issues, loading, error } = useLiveIssues();
  const summary = summarizeIssues(issues);
  return <div className="page-shell"><PageHeader eyebrow="ADMIN" title="Operations overview" subtitle="Only database-backed issue records appear here. Admin authorization is enforced by Supabase RLS." />{loading && <div className="empty-state">Loading operations data...</div>}{error && <div className="inline-error">{error}</div>}{!loading && !error && !issues.length && <div className="panel empty-state"><h2>No civic issues reported yet.</h2></div>}{!loading && !error && !!issues.length && <><div className="stats-grid admin-grid">{[['Reported', summary.total], ['Active', summary.active], ['Resolved', summary.resolved]].map(([label, value]) => <div key={label} className="panel admin-card"><div className="stat-value">{value}</div><div className="stat-label">{label}</div></div>)}</div><div className="panel admin-table"><h3>Issue queue</h3>{issues.map((issue) => <div className="table-row" key={issue.id}><span>{issue.title}</span><span>{issue.priority_score}/100</span><span>{issue.category}</span><span>{issue.status}</span></div>)}</div></>}</div>;
}
