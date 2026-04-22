import { Link } from 'react-router-dom'

export default function DashboardPage() {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      <div className="card">
        <h2 className="mb-2 text-lg font-semibold">Welcome</h2>
        <p className="mb-3 text-sm text-slate-600">Manage projects, track your plan, and keep billing up to date.</p>
        <Link to="/app/projects" className="btn-primary inline-flex">Go to projects</Link>
      </div>
      <div className="card">
        <h2 className="mb-2 text-lg font-semibold">Subscription</h2>
        <p className="mb-3 text-sm text-slate-600">Free plan allows up to 3 projects. Upgrade to Pro for unlimited projects.</p>
        <Link to="/app/billing" className="btn-secondary inline-flex">Manage billing</Link>
      </div>
    </section>
  )
}
