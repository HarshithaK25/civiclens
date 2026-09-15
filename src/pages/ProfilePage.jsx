import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { useAuth } from '../contexts/AuthContext';
import { useLiveIssues } from '../hooks/useLiveIssues';

export default function ProfilePage() {
  const { user } = useAuth();
  const { issues, loading } = useLiveIssues(user?.id);
  if (!user) return <div className="page-shell narrow"><PageHeader eyebrow="PROFILE" title="Your civic profile" subtitle="Sign in to see your account activity." /><div className="panel empty-state"><Link className="primary-button" to="/auth">Sign in</Link></div></div>;
  return <div className="page-shell narrow"><PageHeader eyebrow="PROFILE" title={user.user_metadata?.full_name || user.email} subtitle="Your civic presence is based on your actual account activity." /><div className="profile-card panel"><div className="profile-header"><div className="avatar">{(user.user_metadata?.full_name || user.email)[0].toUpperCase()}</div><div><h3>{user.user_metadata?.full_name || 'CivicLens member'}</h3><p>{user.email}</p></div></div><div className="profile-stats"><div className="mini-stat"><span>Reports filed</span><strong>{loading ? '...' : issues.length}</strong></div><div className="mini-stat"><span>Resolved reports</span><strong>{loading ? '...' : issues.filter((issue) => issue.status === 'Resolved').length}</strong></div></div></div></div>;
}
