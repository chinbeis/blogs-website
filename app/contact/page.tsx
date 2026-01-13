'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import ContactSection from '@/components/ContactSection'
import { useLanguage } from '@/lib/language-context'
import { Sparkles } from 'lucide-react'

export default function ContactPage() {
  const { t, language } = useLanguage()
  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Page Title Section aligned with News page */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden text-center">
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600 rounded-full blur-3xl -ml-48 -mb-48"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles className="w-3 h-3 text-red-400" />
            <span>{language === 'mn' ? 'Холбоо барих' : 'Contact Support'}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-8 tracking-tight">{t('contact.title')}</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed font-medium">
            {t('contact.description')}
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <ContactSection />
      
      <Footer />
    </div>
  )
}
