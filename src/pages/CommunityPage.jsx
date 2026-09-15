import { useState } from 'react';
import { Flame } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { useLiveIssues } from '../hooks/useLiveIssues';
import { toggleIssueSupport } from '../services/civicData';
import { useAuth } from '../contexts/AuthContext';

export default function CommunityPage() {
  const { user } = useAuth();
  const { issues, loading, error } = useLiveIssues();
  const [supported, setSupported] = useState([]);
  const [actionError, setActionError] = useState('');
  const support = async (issue) => {
    if (!user) return setActionError('Sign in to support a civic issue.');
    try { const active = await toggleIssueSupport(issue.id, user.id, supported.includes(issue.id)); setSupported((current) => active ? [...current, issue.id] : current.filter((id) => id !== issue.id)); } catch (supportError) { setActionError(supportError.message || 'Unable to update support.'); }
  };
  return <div className="page-shell"><PageHeader eyebrow="COMMUNITY" title="What your community is tracking" subtitle="Every issue and support count comes from Supabase." />{loading && <div className="empty-state">Loading civic reports...</div>}{(error || actionError) && <div className="inline-error">{error || actionError}</div>}{!loading && !error && issues.length === 0 && <div className="panel empty-state"><h2>No civic issues reported yet.</h2><p>Be the first person to report a problem in your community.</p></div>}<div className="issue-grid">{issues.map((issue) => <article key={issue.id} className="issue-card community-card"><div className="card-tag">{issue.category}</div><h3>{issue.title}</h3><p>{issue.location}</p><div className="card-meta-row"><span><Flame size={14} /> {issue.supportCount + (supported.includes(issue.id) ? 1 : 0)} supporters</span><strong>{issue.priority_score}/100</strong></div><button type="button" onClick={() => support(issue)} className={`support-button community ${supported.includes(issue.id) ? 'active' : ''}`}>{supported.includes(issue.id) ? 'Supported' : 'I support this issue'}</button></article>)}</div></div>;
}
