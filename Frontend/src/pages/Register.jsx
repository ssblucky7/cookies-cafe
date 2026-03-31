import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiUser, FiMail, FiLock, FiPhone } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone
      })
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-darkBrown text-center mb-6">Create Account</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-brown font-semibold mb-2">Full Name</label>
            <div className="relative">
              <FiUser className="absolute left-3 top-3 text-brown" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-10 pr-4 py-2 border border-brown rounded-lg focus:outline-none focus:ring-2 focus:ring-caramel"
                placeholder="John Doe"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-brown font-semibold mb-2">Email</label>
            <div className="relative">
              <FiMail className="absolute left-3 top-3 text-brown" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 pr-4 py-2 border border-brown rounded-lg focus:outline-none focus:ring-2 focus:ring-caramel"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-brown font-semibold mb-2">Phone</label>
            <div className="relative">
              <FiPhone className="absolute left-3 top-3 text-brown" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full pl-10 pr-4 py-2 border border-brown rounded-lg focus:outline-none focus:ring-2 focus:ring-caramel"
                placeholder="+1234567890"
              />
            </div>
          </div>

          <div>
            <label className="block text-brown font-semibold mb-2">Password</label>
            <div className="relative">
              <FiLock className="absolute left-3 top-3 text-brown" />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-10 pr-4 py-2 border border-brown rounded-lg focus:outline-none focus:ring-2 focus:ring-caramel"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-brown font-semibold mb-2">Confirm Password</label>
            <div className="relative">
              <FiLock className="absolute left-3 top-3 text-brown" />
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full pl-10 pr-4 py-2 border border-brown rounded-lg focus:outline-none focus:ring-2 focus:ring-caramel"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-brown">
            Already have an account?{' '}
            <Link to="/login" className="text-caramel font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
