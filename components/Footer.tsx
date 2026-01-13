'use client'

import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"

export function Footer() {
  const { t } = useLanguage()
  
  return (
    <footer className="bg-blue-950 text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-red-500 to-blue-800 opacity-50"></div>
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-900/10 rounded-full blur-3xl -ml-32 -mb-32"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Organization Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-white/10 p-2 rounded-xl backdrop-blur-sm border border-white/10">
                <Image 
                  src="/logo.svg" 
                  alt="MSIC Logo" 
                  width={40} 
                  height={40} 
                  className="h-10 w-10"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold tracking-tight">MSIC</h3>
                <p className="text-xs text-blue-300 font-medium uppercase tracking-widest">{t('hero.title')}</p>
              </div>
            </div>
            <p className="text-blue-100/80 mb-8 max-w-md leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-sm text-blue-200 hover:text-white transition-colors group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-red-500/20 transition-all">
                  <MapPin className="h-5 w-5 text-red-400" />
                </div>
                <span>Ulaanbaatar, Mongolia</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-blue-200 hover:text-white transition-colors group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-blue-500/20 transition-all">
                  <Mail className="h-5 w-5 text-blue-400" />
                </div>
                <span>contact@msic.mn</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-blue-200 hover:text-white transition-colors group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-blue-500/20 transition-all">
                  <Phone className="h-5 w-5 text-blue-400" />
                </div>
                <span>+976-88113400</span>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white border-l-4 border-red-500 pl-3">{t('footer.quickLinks')}</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-blue-200/70 hover:text-white hover:translate-x-1 inline-block transition-all">{t('footer.about')}</Link></li>
              <li><Link href="/" className="text-blue-200/70 hover:text-white hover:translate-x-1 inline-block transition-all">{t('footer.membership')}</Link></li>
              <li><Link href="/guidelines" className="text-blue-200/70 hover:text-white hover:translate-x-1 inline-block transition-all">{t('footer.education')}</Link></li>
              <li><Link href="/" className="text-blue-200/70 hover:text-white hover:translate-x-1 inline-block transition-all">{t('footer.research')}</Link></li>
              <li><Link href="/" className="text-blue-200/70 hover:text-white hover:translate-x-1 inline-block transition-all">{t('footer.events')}</Link></li>
              <li><Link href="/contact" className="text-blue-200/70 hover:text-white hover:translate-x-1 inline-block transition-all">{t('footer.contact')}</Link></li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white border-l-4 border-blue-500 pl-3">{t('footer.resources')}</h4>
            <ul className="space-y-3">
              <li><Link href="/guidelines" className="text-blue-200/70 hover:text-white hover:translate-x-1 inline-block transition-all">{t('footer.guidelines')}</Link></li>
              <li><Link href="/" className="text-blue-200/70 hover:text-white hover:translate-x-1 inline-block transition-all">{t('footer.cme')}</Link></li>
              <li><Link href="/" className="text-blue-200/70 hover:text-white hover:translate-x-1 inline-block transition-all">{t('footer.caseReports')}</Link></li>
              <li><Link href="/" className="text-blue-200/70 hover:text-white hover:translate-x-1 inline-block transition-all">{t('footer.publications')}</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="my-10 h-px bg-white/10 w-full"></div>
        
        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-blue-200/50 text-sm font-medium">
            {t('footer.copyright')}
          </p>
          
          {/* Social Media */}
          <div className="flex space-x-3">
            <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl bg-white/5 text-blue-200 hover:text-white hover:bg-blue-600 transition-all" asChild>
              <a href="https://www.facebook.com/msic.mn/" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl bg-white/5 text-blue-200 hover:text-white hover:bg-blue-400 transition-all">
              <Twitter className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl bg-white/5 text-blue-200 hover:text-white hover:bg-blue-700 transition-all">
              <Linkedin className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}
