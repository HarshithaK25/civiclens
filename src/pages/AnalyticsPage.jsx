import PageHeader from '../components/PageHeader';
import { useLiveIssues } from '../hooks/useLiveIssues';
import { summarizeIssues } from '../services/civicData';

export default function AnalyticsPage() {
  const { issues, loading, error } = useLiveIssues();
  const summary = summarizeIssues(issues);
  const categories = issues.reduce((result, issue) => ({ ...result, [issue.category]: (result[issue.category] || 0) + 1 }), {});
  const max = Math.max(1, ...Object.values(categories));
  return <div className="page-shell"><PageHeader eyebrow="CIVIC INTELLIGENCE" title="Understand community trends" subtitle="These metrics are calculated from the reports currently stored in Supabase." />{loading && <div className="empty-state">Loading analytics...</div>}{error && <div className="inline-error">{error}</div>}{!loading && !error && !issues.length && <div className="panel empty-state"><h2>No data available yet.</h2><p>Analytics will appear after the first civic report is submitted.</p></div>}{!loading && !error && !!issues.length && <><div className="stats-grid">{[['Issues reported', summary.total], ['Active issues', summary.active], ['Resolved issues', summary.resolved], ['High priority', summary.highPriority]].map(([label, value]) => <div key={label} className="panel metric-panel"><div className="metric-label">{label}</div><div className="metric-value">{value}</div></div>)}</div><div className="panel chart-panel large-chart"><h2>Reports by category</h2><div className="bar-chart extended">{Object.entries(categories).map(([category, count]) => <div key={category} className="bar" title={`${category}: ${count}`} style={{ height: `${(count / max) * 100}%` }} />)}</div></div></>}</div>;
}
