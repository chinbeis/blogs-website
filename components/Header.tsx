'use client'

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, GraduationCap, Mail, X, ChevronDown, FileText, BookOpen, ArrowRight } from "lucide-react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import Image from "next/image"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { useLanguage } from "@/lib/language-context"

export function Header() {
  const { data: session } = useSession()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isEducationOpen, setIsEducationOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { t, language } = useLanguage()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsEducationOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const logoSrc = language === 'mn' ? '/uploads/logo3.jpg' : '/logo.svg'
  const siteName = language === 'mn' ? 'Монгол зүрх судсан дотуурх мэс заслын эмч нарын нийгэмлэг' : 'MSIC'
  const siteSubtitle = language === 'mn' ? '' : 'Mongolian Society of Interventional Cardiology'

  return (
    <header className="bg-white border-b border-blue-100 shadow-sm sticky top-0 z-50 backdrop-blur-md bg-white/90">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-red-500 to-blue-800"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 gap-4">
          {/* Logo section */}
          <Link href="/" className="flex items-center space-x-2 min-w-0 flex-shrink-0 group">
            <div className="bg-white p-0.5 rounded-lg border border-blue-50 shadow-sm overflow-hidden flex-shrink-0">
              <Image 
                src={logoSrc} 
                alt="MSIC Logo" 
                width={64} 
                height={64} 
                className="object-contain h-12 w-auto"
              />
            </div>
            <div className="min-w-0 max-w-[200px] sm:max-w-xs md:max-w-sm lg:max-w-[400px]">
              <h1 className={`${language === 'mn' ? 'text-[11px] sm:text-xs lg:text-sm' : 'text-xl'} font-bold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent leading-tight break-words uppercase`}>
                {siteName}
              </h1>
              {siteSubtitle && (
                <p className="text-[10px] text-blue-600 font-medium hidden lg:block truncate uppercase tracking-wider">
                  {siteSubtitle}
                </p>
              )}
            </div>
          </Link>
          
          {/* Simplified Navigation */}
          <nav className="hidden lg:flex items-center bg-blue-50/50 border border-blue-100/50 px-6 py-2.5 rounded-2xl min-w-0 flex-shrink-0 mx-4 shadow-inner">
            <div className="flex items-center justify-center space-x-6 xl:space-x-10 w-full">
              
              {/* Education Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsEducationOpen(!isEducationOpen)}
                  onMouseEnter={() => setIsEducationOpen(true)}
                  className="flex items-center space-x-2 text-slate-700 hover:text-blue-700 transition-colors whitespace-nowrap text-sm font-black uppercase tracking-tight"
                >
                  <GraduationCap className="h-4 w-4 flex-shrink-0 text-blue-600" />
                  <span className="truncate">{t('header.education')}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isEducationOpen ? 'rotate-180' : ''}`} />
                </button>

                {isEducationOpen && (
                  <div 
                    onMouseLeave={() => setIsEducationOpen(false)}
                    className="absolute top-full left-0 mt-3 w-64 bg-white border border-blue-100 rounded-2xl shadow-2xl py-4 animate-in fade-in slide-in-from-top-2 duration-200 z-[100]"
                  >
                    <Link
                      href="/education"
                      className="flex items-center space-x-3 px-5 py-3 text-sm font-bold text-slate-700 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                      onClick={() => setIsEducationOpen(false)}
                    >
                      <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 group-hover:bg-blue-100">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <span>{language === 'mn' ? 'Сургалтын видео' : 'Video Tutorials'}</span>
                    </Link>
                    
                    <Link
                      href="/guidelines"
                      className="flex items-center space-x-3 px-5 py-3 text-sm font-bold text-slate-700 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                      onClick={() => setIsEducationOpen(false)}
                    >
                      <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center text-red-600">
                        <FileText className="w-5 h-5" />
                      </div>
                      <span>{t('guidelines.title')}</span>
                    </Link>
                  </div>
                )}
              </div>

              <Link href="/news" className="flex items-center space-x-1 text-slate-700 hover:text-blue-700 transition-colors whitespace-nowrap text-sm font-black uppercase tracking-tight">
                <span className="truncate">{t('header.news')}</span>
              </Link>
              <Link href="/contact" className="flex items-center space-x-2 text-slate-700 hover:text-blue-700 transition-colors whitespace-nowrap text-sm font-black uppercase tracking-tight">
                <Mail className="h-4 w-4 flex-shrink-0 text-blue-600" />
                <span className="truncate">{t('header.contact')}</span>
              </Link>
            </div>
          </nav>
          
          {/* Right section */}
          <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
            <div className="hidden sm:block scale-90 origin-right">
              <LanguageSwitcher />
            </div>
            {session?.user ? (
              <Link href="/admin/dashboard" className="hidden md:block">
                <Button variant="outline" size="sm" className="border-blue-600 text-blue-600 bg-white hover:bg-blue-600 hover:text-white transition-all text-xs font-black uppercase rounded-xl shadow-sm">
                  {t('header.dashboard')}
                </Button>
              </Link>
            ) : (
              <Link href="/admin/login" className="hidden md:block">
                <Button variant="outline" size="sm" className="border-blue-600 text-blue-600 bg-white hover:bg-blue-600 hover:text-white transition-all text-xs font-black uppercase rounded-xl shadow-sm">
                  {t('header.login')}
                </Button>
              </Link>
            )}
            <Button 
              variant="ghost"
              size="icon" 
              className="md:hidden text-blue-600 flex-shrink-0 hover:bg-blue-50"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-blue-50/95 backdrop-blur-sm rounded-2xl mt-2 mb-4 border border-blue-100 shadow-xl overflow-hidden animate-in slide-in-from-top duration-300">
            <div className="px-4 pt-4 pb-6 space-y-2">
              
              <div className="space-y-1">
                <div className="px-4 py-2 text-xs font-bold text-blue-400 uppercase tracking-widest">{t('header.education')}</div>
                <Link 
                  href="/education" 
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-black text-slate-700 hover:text-blue-700 hover:bg-white transition-all" 
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <GraduationCap className="h-5 w-5 flex-shrink-0 text-blue-600" />
                  <span className="break-words">{language === 'mn' ? 'Сургалтын видео' : 'Video Tutorials'}</span>
                </Link>
                <Link 
                  href="/guidelines" 
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-black text-slate-700 hover:text-blue-700 hover:bg-white transition-all" 
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FileText className="h-5 w-5 flex-shrink-0 text-red-500" />
                  <span className="break-words">{t('guidelines.title')}</span>
                </Link>
              </div>

              <Link 
                href="/news" 
                className="flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-black text-slate-700 hover:text-blue-700 hover:bg-white transition-all shadow-sm border border-transparent hover:border-blue-100 uppercase" 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="break-words font-bold ml-8">{t('header.news')}</span>
              </Link>
              <Link 
                href="/contact" 
                className="flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-black text-slate-700 hover:text-blue-700 hover:bg-white transition-all shadow-sm border border-transparent hover:border-blue-100 uppercase" 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Mail className="h-5 w-5 flex-shrink-0 text-blue-600" />
                <span className="break-words">{t('header.contact')}</span>
              </Link>
              
              <div className="pt-6 mt-4 border-t border-blue-100 space-y-4">
                <div className="px-4 flex justify-center">
                  <LanguageSwitcher />
                </div>
                <div className="px-4 grid grid-cols-1 gap-3">
                  {session?.user ? (
                    <Link href="/admin/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="outline" size="lg" className="w-full border-blue-600 text-blue-600 bg-white hover:bg-blue-600 hover:text-white transition-all rounded-xl shadow-md font-black uppercase">
                        {t('header.dashboard')}
                      </Button>
                    </Link>
                  ) : (
                    <Link href="/admin/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="outline" size="lg" className="w-full border-blue-600 text-blue-600 bg-white hover:bg-blue-600 hover:text-white transition-all rounded-xl shadow-md font-black uppercase">
                        {t('header.login')}
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
