'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, Users, BookOpen, Calendar, X } from "lucide-react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import Image from "next/image"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { useLanguage } from "@/lib/language-context"

export function Header() {
  const { data: session } = useSession()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { t } = useLanguage()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 gap-4">
          {/* Logo section - now more compact */}
          <div className="flex items-center space-x-2 min-w-0 flex-shrink-0">
            <Image 
              src="/logo.svg" 
              alt="MSIC Logo" 
              width={32} 
              height={32} 
              className="h-8 w-8 flex-shrink-0"
            />
            <div className="min-w-0">
              <h1 className="text-xl font-bold text-slate-900">MSIC</h1>
              {/* Hide subtitle on smaller screens to save space */}
              <p className="text-xs text-slate-600 hidden lg:block truncate">
                Mongolian Society of Interventional Cardiology
              </p>
            </div>
          </div>
          
          {/* Navigation - more responsive spacing */}
          <nav className="hidden lg:flex items-center bg-slate-100 px-4 py-2 rounded-lg min-w-0 flex-1 max-w-2xl">
            <div className="flex items-center justify-center space-x-4 xl:space-x-6 w-full">
              <Link href="/" className="flex items-center space-x-1 text-slate-700 hover:text-slate-900 transition-colors whitespace-nowrap text-sm">
                <Users className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">{t('header.about')}</span>
              </Link>
              <Link href="/" className="flex items-center space-x-1 text-slate-700 hover:text-slate-900 transition-colors whitespace-nowrap text-sm">
                <BookOpen className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">{t('header.education')}</span>
              </Link>
              <Link href="/" className="flex items-center space-x-1 text-slate-700 hover:text-slate-900 transition-colors whitespace-nowrap text-sm">
                <Calendar className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">{t('header.events')}</span>
              </Link>
              <Link href="/news" className="flex items-center space-x-1 text-slate-700 hover:text-slate-900 transition-colors whitespace-nowrap text-sm">
                <span className="truncate">{t('header.news')}</span>
              </Link>
            </div>
          </nav>

          {/* Medium screens - simplified nav without background */}
          <nav className="hidden md:flex lg:hidden items-center space-x-4">
            <Link href="/" className="text-slate-700 hover:text-slate-900 transition-colors text-sm whitespace-nowrap">
              {t('header.about')}
            </Link>
            <Link href="/" className="text-slate-700 hover:text-slate-900 transition-colors text-sm whitespace-nowrap">
              {t('header.education')}
            </Link>
            <Link href="/" className="text-slate-700 hover:text-slate-900 transition-colors text-sm whitespace-nowrap">
              {t('header.events')}
            </Link>
            <Link href="/news" className="text-slate-700 hover:text-slate-900 transition-colors text-sm whitespace-nowrap">
              {t('header.news')}
            </Link>
          </nav>
          
          {/* Right section - more compact */}
          <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
            {session?.user ? (
              <Link href="/admin/dashboard" className="hidden md:block">
                <Button variant="outline" size="sm" className="border-slate-900 text-slate-900 bg-white hover:bg-slate-900 hover:text-white transition-colors text-xs xl:text-sm whitespace-nowrap">
                  {t('header.dashboard')}
                </Button>
              </Link>
            ) : (
              <Link href="/admin/login" className="hidden md:block">
                <Button variant="outline" size="sm" className="border-slate-900 text-slate-900 bg-white hover:bg-slate-900 hover:text-white transition-colors text-xs xl:text-sm whitespace-nowrap">
                  {t('header.login')}
                </Button>
              </Link>
            )}
            <Button 
              variant="ghost"
              size="icon" 
              className="md:hidden text-slate-700 flex-shrink-0"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu - improved */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-slate-100 rounded-b-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                href="/" 
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-200 transition-colors" 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Users className="h-4 w-4 flex-shrink-0" />
                <span className="break-words">{t('header.about')}</span>
              </Link>
              <Link 
                href="/" 
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-200 transition-colors" 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <BookOpen className="h-4 w-4 flex-shrink-0" />
                <span className="break-words">{t('header.education')}</span>
              </Link>
              <Link 
                href="/" 
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-200 transition-colors" 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Calendar className="h-4 w-4 flex-shrink-0" />
                <span className="break-words">{t('header.events')}</span>
              </Link>
              <Link 
                href="/news" 
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-200 transition-colors" 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="break-words">{t('header.news')}</span>
              </Link>
              
              {/* Mobile menu bottom section */}
              <div className="pt-4 pb-3 border-t border-slate-200 space-y-3">
                <div className="px-3">
                  <LanguageSwitcher />
                </div>
                <div className="px-3">
                  {session?.user ? (
                    <Link href="/admin/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="outline" size="sm" className="w-full border-slate-900 text-slate-900 bg-white hover:bg-slate-900 hover:text-white transition-colors">
                        <span className="break-words">{t('header.dashboard')}</span>
                      </Button>
                    </Link>
                  ) : (
                    <Link href="/admin/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="outline" size="sm" className="w-full border-slate-900 text-slate-900 bg-white hover:bg-slate-900 hover:text-white transition-colors">
                        <span className="break-words">{t('header.login')}</span>
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}