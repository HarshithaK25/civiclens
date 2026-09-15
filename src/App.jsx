import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  Bell,
  FileText,
  Home,
  Map,
  Menu,
  Moon,
  Plus,
  Search,
  ShieldCheck,
  SunMedium,
  User,
  Users,
  X,
} from 'lucide-react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import ReportPage from './pages/ReportPage';
import MapPage from './pages/MapPage';
import CommunityPage from './pages/CommunityPage';
import AnalyticsPage from './pages/AnalyticsPage';
import MyReportsPage from './pages/MyReportsPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import AuthPage from './pages/AuthPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import './App.css';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: Home },
  { name: 'Report', path: '/report', icon: Plus },
  { name: 'Map', path: '/map', icon: Map },
  { name: 'Community', path: '/community', icon: Users },
  { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  { name: 'My Reports', path: '/my-reports', icon: FileText },
  { name: 'Profile', path: '/profile', icon: User },
  { name: 'Admin', path: '/admin', icon: ShieldCheck },
];

function AppShell() {
  const { user, authNotice, setAuthNotice, signOut } = useAuth();
  const [dark, setDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className={dark ? 'app-shell dark-theme' : 'app-shell light-theme'}>
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark"><Map size={20} /></div>
          <div>
            <div className="brand-name">CivicLens</div>
            <div className="brand-tag">CIVIC INTELLIGENCE</div>
          </div>
        </div>

        <div className="topbar-tools">
          <button type="button" className="icon-button search-button" aria-label="Search">
            <Search size={18} />
          </button>
          <button type="button" className="icon-button" aria-label="Toggle theme" onClick={() => setDark((value) => !value)}>
            {dark ? <SunMedium size={18} /> : <Moon size={18} />}
          </button>
          <button type="button" className="icon-button" aria-label="Notifications">
            <Bell size={18} />
          </button>
          {user ? <button type="button" className="avatar-pill" onClick={signOut} title="Sign out">{(user.user_metadata?.full_name || user.email || 'U')[0].toUpperCase()}</button> : <NavLink className="auth-link" to="/auth">Sign in</NavLink>}
          <button type="button" className="menu-toggle" aria-label="Open navigation" onClick={() => setMobileOpen((value) => !value)}>
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      <div className="layout-shell">
        <aside className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
          <div className="sidebar-section-title">PLATFORM</div>

          <nav className="nav-stack">
            {navItems.map(({ name, path, icon: Icon }) => (
              <NavLink
                key={name}
                to={path}
                end={path === '/dashboard'}
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                <Icon size={18} />
                <span>{name}</span>
              </NavLink>
            ))}
          </nav>

          <div className="sidebar-card">
            <div className="sidebar-card-label">COMMUNITY DATA</div>
            <div className="sidebar-card-value">Live</div>
            <div className="sidebar-card-status">USER REPORTED</div>
          </div>
        </aside>

        <main className="main-panel">
          {authNotice && <div className="auth-notice" role="status"><span>{authNotice}</span><button type="button" onClick={() => setAuthNotice('')} aria-label="Dismiss confirmation message">×</button></div>}
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/report" element={<ReportPage user={user} />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/my-reports" element={<MyReportsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider><AppShell /></AuthProvider>
    </BrowserRouter>
  );
}
