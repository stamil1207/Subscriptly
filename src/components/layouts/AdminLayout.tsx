import { Link, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/auth-context'
import './layout.css'

const nav = [
  { to: '/admin', label: 'Overview' },
  { to: '/admin/users', label: 'Users' },
  { to: '/admin/subscriptions', label: 'Subscriptions' },
]

export default function AdminLayout() {
  const { pathname } = useLocation()
  const { logout, user } = useAuth()
  const membershipLabel = user?.role === 'admin' ? 'PRO' : 'FREE'

  return (
    <div className="app-layout">
      <header className="app-header">
        <div className="app-header-inner">
          <p className="app-brand">Subscriptly</p>

          <nav className="app-header-nav">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`app-nav-link ${
                  pathname === item.to ? 'app-nav-link-active' : 'app-nav-link-inactive'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="app-header-actions">
            <span className="app-membership-label">{membershipLabel}</span>
            <button
              type="button"
              aria-label="Notifications"
              className="app-notification-button"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="app-notification-icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 1 4.62 1.478A8.967 8.967 0 0 1 18 9.75V9a6 6 0 1 0-12 0v.75a8.967 8.967 0 0 1-1.478 8.81A23.848 23.848 0 0 1 9.143 17.08m5.714.002a24.255 24.255 0 0 0-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
              </svg>
            </button>

            <div className="app-profile-menu group">
              <button
                type="button"
                className="app-profile-avatar"
              >
                A
              </button>
              <div className="app-profile-dropdown">
                <Link to="/admin/settings" className="app-profile-link">
                  Settings
                </Link>
                <button type="button" onClick={logout} className="app-profile-button">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="app-content">
        <nav className="app-mobile-nav">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`app-mobile-nav-link ${
                pathname === item.to ? 'app-mobile-nav-link-active' : 'app-mobile-nav-link-inactive'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Outlet />
      </div>
    </div>
  )
}
