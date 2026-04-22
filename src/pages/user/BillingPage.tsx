import { useEffect, useState } from 'react'

type BillingCycle = 'monthly' | 'yearly'

type Subscription = {
  plan: 'free' | 'pro'
  status: 'active' | 'inactive' | 'cancelled'
  cycle: BillingCycle
  validUntil: string | null
}

export default function BillingPage() {
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly')
  const [error, setError] = useState('')

  useEffect(() => {
    setSubscription({
      plan: 'free',
      status: 'active',
      cycle: 'monthly',
      validUntil: null,
    })
  }, [])

  const getValidityDate = (cycle: BillingCycle) => {
    const next = new Date()
    if (cycle === 'monthly') {
      next.setMonth(next.getMonth() + 1)
    } else {
      next.setFullYear(next.getFullYear() + 1)
    }
    return next.toISOString()
  }

  const onUpgrade = () => {
    setError('')
    setSubscription({
      plan: 'pro',
      status: 'active',
      cycle: billingCycle,
      validUntil: getValidityDate(billingCycle),
    })
  }

  const onCancel = () => {
    setSubscription({
      plan: 'free',
      status: 'cancelled',
      cycle: billingCycle,
      validUntil: null,
    })
  }

  return (
    <section className="space-y-5">
      <div className="flex flex-col items-center justify-center">
        <h2 className="mb-3 text-lg font-semibold">Subscription</h2>
        <div className="inline-flex rounded-full bg-indigo-100 p-1 ring-1 ring-indigo-200">
          <button
            type="button"
            onClick={() => setBillingCycle('monthly')}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${billingCycle === 'monthly' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-700'}`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setBillingCycle('yearly')}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${billingCycle === 'yearly' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-700'}`}
          >
            Yearly
          </button>
        </div>
      </div>

      {error && <p className="mb-3 text-sm text-red-600">{error}</p>}

      <div className="grid gap-4 md:grid-cols-2">
        <article className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <div className="mb-3 flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold">Free Plan</h3>
              <p className="mt-1 text-3xl font-bold text-slate-900">₹0</p>
              <p className="text-sm text-slate-600">3 projects</p>
            </div>
            {subscription?.plan === 'free' && (
              <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">Current plan</span>
            )}
          </div>
          <ul className="mb-4 list-disc space-y-1 pl-5 text-sm text-slate-600">
            <li>Access to dashboard and basic analytics</li>
            <li>Maximum of 3 active projects</li>
            <li>Standard support with email response</li>
            <li>Basic billing and usage overview</li>
            <li>Community updates and release notes</li>
          </ul>
          {subscription?.plan !== 'free' ? (
            <button type="button" className="btn-secondary w-full" onClick={onCancel}>
              Switch to Free
            </button>
          ) : null}
        </article>

        <article className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <div className="mb-3 flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold">Pro Plan</h3>
              <p className="mt-1 text-3xl font-bold text-slate-900">
                {billingCycle === 'monthly' ? '₹999/month' : '₹9999/year'}
              </p>
              <p className="text-sm text-slate-600">Unlimited projects</p>
            </div>
            {subscription?.plan === 'pro' && (
              <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">Current plan</span>
            )}
          </div>
          <ul className="mb-4 list-disc space-y-1 pl-5 text-sm text-slate-600">
            <li>Unlimited active projects and workspaces</li>
            <li>Priority support with faster responses</li>
            <li>Advanced reports and export options</li>
            <li>Early access to premium features</li>
            <li>Improved team and permission controls</li>
          </ul>
          {subscription?.plan !== 'pro' ? (
            <button type="button" className="btn-primary w-full" onClick={onUpgrade}>
              Upgrade
            </button>
          ) : (
            <p className="text-sm text-green-700">You are currently on Pro ({subscription.cycle}).</p>
          )}
        </article>
      </div>

      <div className="card max-w-2xl">
        <h3 className="mb-2 text-base font-semibold">Plan details</h3>
        <p className="text-sm text-slate-600">
          Current plan: <strong>{subscription?.plan === 'pro' ? 'Pro' : 'Free'}</strong>
        </p>
        <p className="text-sm text-slate-600">
          Status: <strong>{subscription?.status || 'inactive'}</strong>
        </p>
        {subscription?.plan === 'pro' && subscription.validUntil ? (
          <p className="text-sm text-slate-600">
            Validity: <strong>Valid until {new Date(subscription.validUntil).toLocaleDateString()}</strong>
          </p>
        ) : (
          <p className="text-sm text-slate-600">
            Validity: <strong>Free plan (no expiry)</strong>
          </p>
        )}

      </div>
    </section>
  )
}
