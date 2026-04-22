export type UserRole = 'admin' | 'user'

export type AuthUser = {
  id: number
  email: string
  role: UserRole
  is_active?: boolean
}

export type LoginPayload = {
  email: string
  password: string
}

export type RegisterPayload = LoginPayload

export type AuthContextValue = {
  user: AuthUser | null
  loading: boolean
  isAuthenticated: boolean
  login: (payload: LoginPayload) => Promise<AuthUser>
  register: (payload: RegisterPayload) => Promise<void>
  logout: () => void
}
