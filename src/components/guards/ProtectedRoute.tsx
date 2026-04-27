import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/auth-context'
import LoadingScreen from '../common/LoadingScreen'
import type { UserRole } from '../../types/auth'

type ProtectedRouteProps = {
  allowedRoles?: UserRole[]
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { user, loading } = useAuth()

  if (loading) return <LoadingScreen />
  if (!user) return <Navigate to="/login" replace />
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/app'} replace />
  }

  return <Outlet />
}
