'use client'

import { Button } from "@/components/ui/button"
import { ArrowRight, Award, Users, Activity, Stethoscope } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function Hero() {
  const { t } = useLanguage()
  
  return (
    <section className="relative py-20 overflow-hidden bg-white">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        {/* Floating medical crosses */}
        <div className="absolute top-16 left-16 w-8 h-8 opacity-10">
          <div className="absolute inset-0 bg-slate-400 rounded-sm transform rotate-0"></div>
          <div className="absolute top-3 left-1 w-6 h-2 bg-slate-400 rounded-sm"></div>
          <div className="absolute top-1 left-3 w-2 h-6 bg-slate-400 rounded-sm"></div>
        </div>
        <div className="absolute top-40 right-32 w-6 h-6 opacity-15">
          <div className="absolute inset-0 bg-slate-500 rounded-sm transform rotate-12"></div>
          <div className="absolute top-2 left-1 w-4 h-1.5 bg-slate-500 rounded-sm"></div>
          <div className="absolute top-1 left-2 w-1.5 h-4 bg-slate-500 rounded-sm"></div>
        </div>
        
        {/* Elegant decorative circles with gradients */}
        <div className="absolute top-10 left-10 w-40 h-40 border-2 border-slate-200 rounded-full opacity-20">
          <div className="absolute inset-4 border border-slate-300 rounded-full opacity-60"></div>
          <div className="absolute inset-8 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full opacity-40"></div>
        </div>
        <div className="absolute top-32 right-20 w-32 h-32 border border-slate-300 rounded-full opacity-15">
          <div className="absolute inset-3 border border-slate-400 rounded-full opacity-50"></div>
        </div>
        <div className="absolute bottom-20 left-1/4 w-28 h-28 border-2 border-slate-200 rounded-full opacity-25">
          <div className="absolute inset-2 bg-gradient-to-tl from-slate-50 to-slate-100 rounded-full opacity-60"></div>
        </div>
        <div className="absolute bottom-32 right-1/3 w-24 h-24 border border-slate-300 rounded-full opacity-30">
          <div className="absolute inset-2 border border-slate-400 rounded-full opacity-40"></div>
        </div>
        
        {/* Sophisticated floating elements */}
        <div className="absolute top-1/4 left-1/2 w-10 h-10 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full opacity-30 shadow-sm"></div>
        <div className="absolute top-3/4 left-10 w-6 h-6 bg-gradient-to-tr from-slate-300 to-slate-400 rounded-full opacity-25"></div>
        <div className="absolute top-1/2 right-10 w-12 h-12 bg-gradient-to-bl from-slate-200 to-slate-350 rounded-full opacity-35 shadow-lg"></div>
        
        {/* Enhanced geometric shapes */}
        <div className="absolute top-20 right-1/4 w-16 h-16 border-2 border-slate-300 transform rotate-45 opacity-15">
          <div className="absolute inset-2 border border-slate-400 transform -rotate-45 opacity-60"></div>
        </div>
        <div className="absolute bottom-40 left-1/3 w-14 h-14 border-2 border-slate-200 transform rotate-12 opacity-20">
          <div className="absolute inset-1 bg-gradient-to-br from-slate-100 to-slate-200 transform -rotate-12 opacity-50"></div>
        </div>
        
        {/* Heartbeat line decoration */}
        <div className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent opacity-20"></div>
        <div className="absolute top-1/3 left-1/4 w-16 h-px bg-slate-400 opacity-30">
          <div className="absolute -top-2 left-2 w-1 h-4 bg-slate-400 opacity-60"></div>
          <div className="absolute -top-3 left-6 w-1 h-6 bg-slate-400 opacity-60"></div>
          <div className="absolute -top-1 left-10 w-1 h-2 bg-slate-400 opacity-60"></div>
        </div>
        
        {/* Subtle gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/30 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50/20 via-transparent to-slate-50/20"></div>
        
        {/* DNA helix inspired decoration */}
        <div className="absolute bottom-10 right-10 opacity-10">
          <div className="w-2 h-20 relative">
            <div className="absolute top-0 left-0 w-2 h-2 bg-slate-400 rounded-full"></div>
            <div className="absolute top-4 right-0 w-2 h-2 bg-slate-400 rounded-full"></div>
            <div className="absolute top-8 left-0 w-2 h-2 bg-slate-400 rounded-full"></div>
            <div className="absolute top-12 right-0 w-2 h-2 bg-slate-400 rounded-full"></div>
            <div className="absolute top-16 left-0 w-2 h-2 bg-slate-400 rounded-full"></div>
            <div className="absolute top-0 left-1 w-px h-20 bg-slate-400 transform rotate-12"></div>
          </div>
        </div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
          {t('hero.title')}
        </h1>
        
        <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          {t('hero.subtitle')}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            {t('hero.joinSociety')}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline" className="border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            {t('hero.learnMore')}
          </Button>
        </div>
        
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <Users className="h-8 w-8 text-slate-700 mx-auto mb-3" />
            <div className="text-3xl font-bold text-slate-900 mb-1">500+</div>
            <div className="text-sm text-slate-600 font-medium">{t('hero.members')}</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <Activity className="h-8 w-8 text-slate-700 mx-auto mb-3" />
            <div className="text-3xl font-bold text-slate-900 mb-1">50+</div>
            <div className="text-sm text-slate-600 font-medium">{t('hero.events')}</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <Award className="h-8 w-8 text-slate-700 mx-auto mb-3" />
            <div className="text-3xl font-bold text-slate-900 mb-1">200+</div>
            <div className="text-sm text-slate-600 font-medium">{t('hero.publications')}</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <Stethoscope className="h-8 w-8 text-slate-700 mx-auto mb-3" />
            <div className="text-3xl font-bold text-slate-900 mb-1">15+</div>
            <div className="text-sm text-slate-600 font-medium">{t('hero.years')}</div>
          </div>
        </div>
      </div>
    </section>
  )
}