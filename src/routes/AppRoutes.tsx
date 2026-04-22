import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from '../components/guards/ProtectedRoute'
import AdminLayout from '../components/layouts/AdminLayout'
import UserLayout from '../components/layouts/UserLayout'
import { useAuth } from '../hooks/useAuth'
import LoginPage from '../pages/auth/LoginPage'
import RegisterPage from '../pages/auth/RegisterPage'
import AdminOverviewPage from '../pages/admin/AdminOverviewPage'
import AdminSettingsPage from '../pages/admin/AdminSettingsPage'
import SubscriptionsPage from '../pages/admin/SubscriptionsPage'
import UsersPage from '../pages/admin/UsersPage'
import NotFoundPage from '../pages/NotFoundPage'
import BillingPage from '../pages/user/BillingPage'
import DashboardPage from '../pages/user/DashboardPage'
import ProfilePage from '../pages/user/ProfilePage'
import ProjectsPage from '../pages/user/ProjectsPage'

function HomeRedirect() {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return <Navigate to={user.role === 'admin' ? '/admin' : '/app'} replace />
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomeRedirect />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<ProtectedRoute allowedRoles={['user']} />}>
        <Route path="/app" element={<UserLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="billing" element={<BillingPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminOverviewPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="subscriptions" element={<SubscriptionsPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
