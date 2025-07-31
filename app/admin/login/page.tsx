'use client'

import { useState } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, Lock, Mail, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid email or password')
      } else {
        // Check if sign in was successful
        const session = await getSession()
        if (session) {
          router.push('/admin/dashboard')
        }
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden flex items-center justify-center p-4">
      {/* Subtle Background Decorations */}
      <div className="absolute inset-0">
        {/* Large decorative circles */}
        <div className="absolute top-10 left-10 w-40 h-40 border border-slate-100 rounded-full opacity-60"></div>
        <div className="absolute top-32 right-20 w-32 h-32 border border-slate-200 rounded-full opacity-40"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 border border-slate-150 rounded-full opacity-50"></div>
        <div className="absolute bottom-32 right-1/3 w-20 h-20 border border-slate-200 rounded-full opacity-60"></div>
        
        {/* Small decorative elements */}
        <div className="absolute top-1/4 left-1/2 w-8 h-8 bg-slate-100 rounded-full opacity-70"></div>
        <div className="absolute top-3/4 left-10 w-6 h-6 bg-slate-200 rounded-full opacity-50"></div>
        <div className="absolute top-1/2 right-10 w-10 h-10 bg-slate-150 rounded-full opacity-60"></div>
        
        {/* Geometric shapes */}
        <div className="absolute top-20 right-1/4 w-16 h-16 border border-slate-200 transform rotate-45 opacity-40"></div>
        <div className="absolute bottom-40 left-1/3 w-12 h-12 border border-slate-150 transform rotate-12 opacity-50"></div>
        
        {/* Medical cross patterns */}
        <div className="absolute top-1/3 left-20 w-4 h-12 bg-slate-100 opacity-30"></div>
        <div className="absolute top-1/3 left-16 w-12 h-4 bg-slate-100 opacity-30"></div>
        <div className="absolute bottom-1/3 right-20 w-4 h-12 bg-slate-200 opacity-40"></div>
        <div className="absolute bottom-1/3 right-16 w-12 h-4 bg-slate-200 opacity-40"></div>
        
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/30 to-transparent"></div>
      </div>
      
      <div className="relative w-full max-w-md z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-3 text-slate-900 hover:text-slate-700 transition-colors">
            <div className="p-2 bg-white rounded-full shadow-lg border border-slate-200">
              <Heart className="w-8 h-8 text-red-600" />
            </div>
            <span className="text-3xl font-bold">MSIC</span>
          </Link>
          <p className="text-slate-600 mt-2 font-medium">Admin Portal</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-xl border border-slate-200 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-slate-900">
              Admin Login
            </CardTitle>
            <p className="text-slate-600">
              Sign in to manage MSIC content
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}
              
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-200 bg-white"
                    placeholder="admin@msic.mn"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-12 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-200 bg-white"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 px-4 rounded-lg transition-all duration-200 font-semibold shadow-lg"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link
                href="/"
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors font-medium"
              >
                ← Back to Website
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-slate-500 text-sm">
          © 2024 Mongolian Society of Interventional Cardiology
        </div>
      </div>
    </div>
  )
}