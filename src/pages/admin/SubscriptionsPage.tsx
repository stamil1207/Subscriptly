import { useEffect, useState } from 'react'

type SubscriptionItem = {
  id: number
  user: string
  plan: 'free' | 'pro'
  status: 'active' | 'inactive' | 'cancelled'
  expiry: string
}

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<SubscriptionItem[]>([])

  useEffect(() => {
    setSubscriptions([
      { id: 1, user: 'admin@example.com', plan: 'pro', status: 'active', expiry: '31 Dec 2026' },
      { id: 2, user: 'user@example.com', plan: 'free', status: 'inactive', expiry: 'No expiry' },
    ])
  }, [])

  return (
    <section className="card">
      <h2 className="mb-4 text-lg font-semibold">Subscriptions</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-200 text-slate-500">
            <tr>
              <th className="px-3 py-2 font-medium">User</th>
              <th className="px-3 py-2 font-medium">Plan</th>
              <th className="px-3 py-2 font-medium">Status</th>
              <th className="px-3 py-2 font-medium">Expiry</th>
              <th className="px-3 py-2 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((sub) => (
              <tr key={sub.id} className="border-b border-slate-100">
                <td className="px-3 py-3">{sub.user}</td>
                <td className="px-3 py-3 uppercase">{sub.plan}</td>
                <td className="px-3 py-3 capitalize">{sub.status}</td>
                <td className="px-3 py-3">{sub.expiry}</td>
                <td className="relative px-3 py-3">
                  <div className="group inline-block">
                    <button
                      type="button"
                      className="rounded-md px-2 py-1 text-lg leading-none text-slate-600 hover:bg-slate-100"
                      aria-label="Open subscription actions"
                    >
                      &#8942;
                    </button>
                    <div className="invisible absolute right-0 top-8 z-10 min-w-24 rounded-md bg-white p-1 opacity-0 shadow-lg ring-1 ring-slate-200 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                      <button type="button" className="block w-full rounded px-3 py-1.5 text-left text-xs hover:bg-slate-100">
                        Edit
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
    </section>
  )
}
