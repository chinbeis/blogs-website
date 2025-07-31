'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, Heart, Users, BookOpen, Calendar, X } from "lucide-react"
import { useSession } from "next-auth/react"
import Link from "next/link"

export function Header() {
  const { data: session } = useSession()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-red-600" />
              <div>
                <h1 className="text-xl font-bold text-slate-900">MSIC</h1>
                <p className="text-sm text-slate-600">Mongolian Society of Interventional Cardiology</p>
              </div>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-8 bg-slate-100 px-6 py-2 rounded-lg">
            <Link href="/" className="flex items-center space-x-1 text-slate-700 hover:text-slate-900 transition-colors">
              <Users className="h-4 w-4" />
              <span>About</span>
            </Link>
            <Link href="/" className="flex items-center space-x-1 text-slate-700 hover:text-slate-900 transition-colors">
              <BookOpen className="h-4 w-4" />
              <span>Education</span>
            </Link>
            <Link href="/" className="flex items-center space-x-1 text-slate-700 hover:text-slate-900 transition-colors">
              <Calendar className="h-4 w-4" />
              <span>Events</span>
            </Link>
            <Link href="/news" className="flex items-center space-x-1 text-slate-700 hover:text-slate-900 transition-colors">
              <span>News</span>
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            {session?.user ? (
              <Link href="/admin/dashboard">
                <Button variant="outline" size="sm" className="hidden md:inline-flex border-slate-900 text-slate-900 bg-white hover:bg-slate-900 hover:text-white transition-colors">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/admin/login">
                <Button variant="outline" size="sm" className="hidden md:inline-flex border-slate-900 text-slate-900 bg-white hover:bg-slate-900 hover:text-white transition-colors">
                  Login
                </Button>
              </Link>
            )}
            <Button 
                variant="ghost"
                size="icon" 
                className="md:hidden text-slate-700"
                onClick={toggleMobileMenu}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-slate-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/" className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                <Users className="h-4 w-4" />
                <span>About</span>
              </Link>
              <Link href="/" className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                <BookOpen className="h-4 w-4" />
                <span>Education</span>
              </Link>
              <Link href="/" className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                <Calendar className="h-4 w-4" />
                <span>Events</span>
              </Link>
              <Link href="/news" className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                <span>News</span>
              </Link>
              <div className="pt-4 pb-3 border-t border-slate-200">
                {session?.user ? (
                  <Link href="/admin/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full border-slate-900 text-slate-900 bg-white">
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <Link href="/admin/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full border-slate-900 text-slate-900 bg-white">
                      Login
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}