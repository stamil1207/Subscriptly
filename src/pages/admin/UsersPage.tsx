import { useEffect, useState } from 'react'

type AdminUser = {
  id: number
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
}

export default function UsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [isInviteOpen, setIsInviteOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<'admin' | 'user'>('user')

  useEffect(() => {
    setUsers([
      { id: 1, name: 'Admin User', email: 'admin@example.com', role: 'admin', status: 'active' },
      { id: 2, name: 'Normal User', email: 'user@example.com', role: 'user', status: 'inactive' },
    ])
  }, [])

  const onInvite = () => {
    if (!name.trim() || !email.trim()) return
    setUsers((prev) => [
      {
        id: Date.now(),
        name: name.trim(),
        email: email.trim(),
        role,
        status: 'active',
      },
      ...prev,
    ])
    setName('')
    setEmail('')
    setRole('user')
    setIsInviteOpen(false)
  }

  return (
    <section className="card">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Users</h2>
        <button type="button" className="btn-primary" onClick={() => setIsInviteOpen(true)}>
          Invite User
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-200 text-slate-500">
            <tr>
              <th className="px-3 py-2 font-medium">Email</th>
              <th className="px-3 py-2 font-medium">Role</th>
              <th className="px-3 py-2 font-medium">Status</th>
              <th className="px-3 py-2 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-slate-100">
                <td className="px-3 py-3">{user.email}</td>
                <td className="px-3 py-3 capitalize">{user.role}</td>
                <td className="px-3 py-3 capitalize">{user.status}</td>
                <td className="relative px-3 py-3">
                  <div className="group inline-block">
                    <button
                      type="button"
                      className="rounded-md px-2 py-1 text-lg leading-none text-slate-600 hover:bg-slate-100"
                      aria-label="Open user actions"
                    >
                      &#8942;
                    </button>
                    <div className="invisible absolute right-0 top-8 z-10 min-w-24 rounded-md bg-white p-1 opacity-0 shadow-lg ring-1 ring-slate-200 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                      <button type="button" className="block w-full rounded px-3 py-1.5 text-left text-xs hover:bg-slate-100">
                        Edit
                      </button>
                      <button type="button" className="block w-full rounded px-3 py-1.5 text-left text-xs text-amber-700 hover:bg-slate-100">
                        Block
                      </button>
                      <button type="button" className="block w-full rounded px-3 py-1.5 text-left text-xs text-red-600 hover:bg-slate-100">
                        Delete
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isInviteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h3 className="mb-4 text-lg font-semibold">Invite User</h3>
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Name</label>
                <input
                  className="input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
                <input
                  className="input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  type="email"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Role</label>
                <select
                  className="input"
                  value={role}
                  onChange={(e) => setRole(e.target.value as 'admin' | 'user')}
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button type="button" className="btn-secondary" onClick={() => setIsInviteOpen(false)}>
                Cancel
              </button>
              <button type="button" className="btn-primary" onClick={onInvite}>
                Invite
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
