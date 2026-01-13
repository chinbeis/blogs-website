'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import ContactSection from '@/components/ContactSection'
import { useLanguage } from '@/lib/language-context'

export default function ContactPage() {
  const { t } = useLanguage()
  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Page Title Section aligned with News page */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">{t('contact.title')}</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
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
