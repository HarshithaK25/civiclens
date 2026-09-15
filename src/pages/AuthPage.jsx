import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { useAuth } from '../contexts/AuthContext';

export default function AuthPage() {
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState('sign-in');
  const [form, setForm] = useState({ fullName: '', email: '', password: '' });
  const [state, setState] = useState({ loading: false, error: '', success: '' });

  const submit = async (event) => {
    event.preventDefault();
    setState({ loading: true, error: '', success: '' });
    try {
      if (mode === 'sign-up') {
        await signUp(form);
        setState({ loading: false, error: '', success: 'Account created. Check your email if confirmation is enabled, then sign in.' });
      } else {
        await signIn(form);
        navigate('/dashboard');
      }
    } catch (error) {
      setState({ loading: false, error: error.message || 'Authentication failed.', success: '' });
    }
  };

  return <div className="page-shell narrow"><PageHeader eyebrow="CIVICLENS ACCOUNT" title={mode === 'sign-in' ? 'Sign in to take part' : 'Create your civic account'} subtitle="Your reports and community actions stay connected to your account." /><form className="panel form-panel" onSubmit={submit}>{mode === 'sign-up' && <label className="form-field"><span>Full name</span><input required value={form.fullName} onChange={(event) => setForm({ ...form, fullName: event.target.value })} /></label>}<label className="form-field"><span>Email</span><input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></label><label className="form-field"><span>Password</span><input required minLength={6} type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} /></label>{state.error && <div className="inline-error">{state.error}</div>}{state.success && <div className="location-success">{state.success}</div>}<button className="primary-button submit-button" disabled={state.loading}>{state.loading ? 'Working...' : mode === 'sign-in' ? 'Sign in' : 'Create account'}</button><button type="button" className="ghost-button auth-switch" onClick={() => setMode(mode === 'sign-in' ? 'sign-up' : 'sign-in')}>{mode === 'sign-in' ? 'Need an account? Sign up' : 'Already registered? Sign in'}</button></form></div>;
}
