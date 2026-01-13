'use client'

import { Sparkles } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function Hero() {
  const { t, language } = useLanguage()
  
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-white">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        {/* Floating medical crosses */}
        <div className="absolute top-16 left-16 w-8 h-8 opacity-20">
          <div className="absolute inset-0 bg-blue-400 rounded-sm transform rotate-0"></div>
          <div className="absolute top-3 left-1 w-6 h-2 bg-blue-400 rounded-sm"></div>
          <div className="absolute top-1 left-3 w-2 h-6 bg-blue-400 rounded-sm"></div>
        </div>
        <div className="absolute top-40 right-32 w-6 h-6 opacity-25">
          <div className="absolute inset-0 bg-red-400 rounded-sm transform rotate-12"></div>
          <div className="absolute top-2 left-1 w-4 h-1.5 bg-red-400 rounded-sm"></div>
          <div className="absolute top-1 left-2 w-1.5 h-4 bg-red-400 rounded-sm"></div>
        </div>
        
        {/* Elegant decorative circles with gradients */}
        <div className="absolute top-10 left-10 w-40 h-40 border-2 border-blue-100 rounded-full opacity-40">
          <div className="absolute inset-4 border border-blue-50 rounded-full opacity-60"></div>
          <div className="absolute inset-8 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-full opacity-40"></div>
        </div>
        <div className="absolute bottom-20 left-1/4 w-28 h-28 border-2 border-red-100 rounded-full opacity-30">
          <div className="absolute inset-2 bg-gradient-to-tl from-red-50 to-red-100/50 rounded-full opacity-60"></div>
        </div>
        
        {/* Gradients */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50/30 skew-x-12 transform origin-top-right -z-10"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-red-50/20 -skew-x-12 transform origin-bottom-left -z-10"></div>
        
        {/* Sophisticated floating elements */}
        <div className="absolute top-1/4 left-1/2 w-10 h-10 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full opacity-30 shadow-sm animate-pulse"></div>
        <div className="absolute top-1/2 right-10 w-12 h-12 bg-gradient-to-bl from-red-200 to-red-300 rounded-full opacity-20 shadow-lg animate-bounce" style={{ animationDuration: '4s' }}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-bold uppercase tracking-wider mb-8 shadow-sm text-center mx-auto">
          <Sparkles className="w-4 h-4 text-red-500" />
          <span>{language === 'mn' ? 'Монголын Интервеншн Кардиологийн Нийгэмлэг' : 'Since 2010'}</span>
        </div>

        <h1 className="text-4xl md:text-7xl font-black text-slate-900 mb-8 leading-tight tracking-tight">
          <span className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-800 bg-clip-text text-transparent">
            {t('hero.title')}
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
          {t('hero.subtitle')}
        </p>
      </div>
    </section>
  )
}
