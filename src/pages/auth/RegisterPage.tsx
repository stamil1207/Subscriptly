import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth-context'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const { register } = useAuth()
  const navigate = useNavigate()

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setSuccess('')
    try {
      await register({ email, password })
      setSuccess('Account created successfully. You can log in now.')
      setTimeout(() => navigate('/login'), 800)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Registration failed')
      }
    }
  }

  return (
    <div className="grid min-h-screen bg-slate-100 md:grid-cols-2">
      <section className="flex items-center justify-center bg-indigo-600 p-10 text-white">
        <div className="max-w-md space-y-3">
          <p className="text-sm uppercase tracking-[0.2em] text-indigo-200">Subscriptly</p>
          <h1 className="text-4xl font-semibold leading-tight">Create your account</h1>
          <p className="text-indigo-100">Start managing projects and access your workspace in minutes.</p>
        </div>
      </section>

      <section className="flex items-center justify-center p-6 md:p-10">
        <form onSubmit={onSubmit} className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200 space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">Register</h2>
          {error && <p className="text-sm text-red-600">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}
          <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          <button className="btn-primary w-full" type="submit">
            Create account
          </button>
          <p className="text-sm text-slate-600">
            Already registered? <Link to="/login" className="text-blue-600">Sign in</Link>
          </p>
        </form>
      </section>
    </div>
  )
}
