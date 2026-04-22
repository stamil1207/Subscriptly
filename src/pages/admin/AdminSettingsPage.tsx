import { useAuth } from '../../hooks/useAuth'

export default function AdminSettingsPage() {
  const { user } = useAuth()

  return (
    <section className="card max-w-2xl space-y-2">
      <h2 className="text-lg font-semibold">Settings</h2>
      <p className="text-sm text-slate-600">Email: <strong>{user?.email}</strong></p>
      <p className="text-sm text-slate-600">Role: <strong>{user?.role}</strong></p>
      <p className="text-sm text-slate-600">Panel: <strong>Admin</strong></p>
    </section>
  )
}
