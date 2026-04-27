import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { authApi } from '../api/services'
import { storage } from '../lib/storage.ts'
import { AuthContext } from './auth-context'
import type { AuthContextValue, AuthUser, LoginPayload, RegisterPayload } from '../types/auth'

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(storage.getUser())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Frontend-only mode: restore cached session without backend validation.
    setLoading(false)
  }, [])

  const login = async (payload: LoginPayload) => {
    const role = payload.email?.includes('admin') ? 'admin' : 'user'
    const localUser: AuthUser = {
      id: Date.now(),
      email: payload.email || 'user@example.com',
      role,
    }
    storage.setToken('frontend-only-token')
    setUser(localUser)
    storage.setUser(localUser)
    return localUser
  }

  const register = async (payload: RegisterPayload) => {
    void payload
  }

  const logout = () => {
    storage.clearSession()
    setUser(null)
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
    }),
    [user, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
