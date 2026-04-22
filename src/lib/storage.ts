import type { AuthUser } from '../types/auth'

const ACCESS_TOKEN_KEY = 'pm_access_token'
const USER_KEY = 'pm_user'

const safeGet = (key: string): string | null => {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

const safeSet = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value)
  } catch {
    // Frontend-only mode should still work without persistent storage.
  }
}

const safeRemove = (key: string) => {
  try {
    localStorage.removeItem(key)
  } catch {
    // Ignore storage errors in restricted browser modes.
  }
}

export const storage = {
  getToken: (): string | null => safeGet(ACCESS_TOKEN_KEY),
  setToken: (token: string) => safeSet(ACCESS_TOKEN_KEY, token),
  clearToken: () => safeRemove(ACCESS_TOKEN_KEY),
  getUser: (): AuthUser | null => {
    const raw = safeGet(USER_KEY)
    if (!raw) return null
    try {
      return JSON.parse(raw) as AuthUser
    } catch {
      return null
    }
  },
  setUser: (user: AuthUser) => safeSet(USER_KEY, JSON.stringify(user)),
  clearUser: () => safeRemove(USER_KEY),
  clearSession: () => {
    safeRemove(ACCESS_TOKEN_KEY)
    safeRemove(USER_KEY)
  },
}
