import { useEffect, useState } from 'react'

type BillingCycle = 'monthly' | 'yearly'

type Subscription = {
  plan: 'free' | 'pro'
  status: 'active' | 'inactive' | 'cancelled'
  cycle: BillingCycle
  validUntil: string | null
}

type PaymentStep = 'options' | 'payment'

export default function BillingPage() {
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly')
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [paymentOption, setPaymentOption] = useState<'card' | 'upi'>('card')
  const [paymentStep, setPaymentStep] = useState<PaymentStep>('options')
  const [cardNumber, setCardNumber] = useState('')
  const [cardName, setCardName] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const [upiId, setUpiId] = useState('')
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const checkoutStatus = params.get('checkout')
    const checkoutCycle = params.get('cycle') as BillingCycle | null

    if (checkoutStatus === 'success') {
      const cycle = checkoutCycle === 'yearly' ? 'yearly' : 'monthly'
      setSubscription({
        plan: 'pro',
        status: 'active',
        cycle,
        validUntil: getValidityDate(cycle),
      })
      setBillingCycle(cycle)
      setNotice('Payment successful. Pro plan activated.')
      window.history.replaceState({}, '', '/app/billing')
      return
    }

    if (checkoutStatus === 'cancel') {
      setNotice('Payment was cancelled.')
      window.history.replaceState({}, '', '/app/billing')
    }

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
    setNotice('')
    setPaymentOption('card')
    setPaymentStep('options')
    setIsPaymentModalOpen(true)
  }

  const activateProPlan = () => {
    setSubscription({
      plan: 'pro',
      status: 'active',
      cycle: billingCycle,
      validUntil: getValidityDate(billingCycle),
    })
    setNotice('Payment successful. Pro plan activated.')
    setIsPaymentModalOpen(false)
  }

  const onProceedToPayment = () => {
    setError('')
    setPaymentStep('payment')
  }

  const onMockPay = async () => {
    setError('')
    setIsProcessingPayment(true)
    await new Promise((resolve) => setTimeout(resolve, 800))
    setIsProcessingPayment(false)
    activateProPlan()
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

      {notice && <p className="mb-3 text-sm text-green-700">{notice}</p>}
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
            <button
              type="button"
              className="btn-primary w-full"
              onClick={onUpgrade}
            >
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

      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold">Complete your upgrade</h3>
            <p className="mt-1 text-sm text-slate-600">
              {paymentStep === 'options'
                ? 'Select a payment option to continue.'
                : paymentOption === 'upi'
                  ? 'Enter your UPI ID.'
                  : 'Enter your card details.'}
            </p>

            {paymentStep === 'options' ? (
              <div className="mt-4 space-y-3">
                <label className="flex cursor-pointer items-center justify-between rounded-lg border border-slate-200 p-3">
                  <div>
                    <p className="text-sm font-medium text-slate-900">Card payment</p>
                    <p className="text-xs text-slate-500">Visa, Mastercard, Amex</p>
                  </div>
                  <input
                    type="radio"
                    name="payment-option"
                    checked={paymentOption === 'card'}
                    onChange={() => setPaymentOption('card')}
                  />
                </label>

                <label className="flex cursor-pointer items-center justify-between rounded-lg border border-slate-200 p-3">
                  <div>
                    <p className="text-sm font-medium text-slate-900">UPI / Wallet</p>
                    <p className="text-xs text-slate-500">Fast payment for India</p>
                  </div>
                  <input
                    type="radio"
                    name="payment-option"
                    checked={paymentOption === 'upi'}
                    onChange={() => setPaymentOption('upi')}
                  />
                </label>
              </div>
            ) : paymentOption === 'card' ? (
              <div className="mt-4 space-y-3">
                <input
                  className="input"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="4242 4242 4242 4242"
                />
                <input
                  className="input"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="Card holder name"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    className="input"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    placeholder="MM/YY"
                  />
                  <input
                    className="input"
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    placeholder="CVV"
                  />
                </div>
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                <input
                  className="input"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="UPI ID (example@upi)"
                />
              </div>
            )}

            <p className="mt-4 text-sm text-slate-600">
              Plan: <strong>{billingCycle === 'monthly' ? 'Pro Monthly' : 'Pro Yearly'}</strong>
            </p>
            <p className="text-sm text-slate-600">
              Amount: <strong>{billingCycle === 'monthly' ? '₹999/month' : '₹9999/year'}</strong>
            </p>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setIsPaymentModalOpen(false)}
                disabled={isProcessingPayment}
              >
                Cancel
              </button>
              {paymentStep === 'payment' && (
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setPaymentStep('options')}
                  disabled={isProcessingPayment}
                >
                  Back
                </button>
              )}
              <button
                type="button"
                className="btn-primary"
                onClick={paymentStep === 'options' ? onProceedToPayment : onMockPay}
                disabled={isProcessingPayment}
              >
                {isProcessingPayment
                  ? 'Processing...'
                  : paymentStep === 'options'
                    ? 'Continue'
                    : `Pay ${billingCycle === 'monthly' ? '₹999' : '₹9999'}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
