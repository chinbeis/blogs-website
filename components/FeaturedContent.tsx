'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, FileText, Calendar, ArrowRight, Star, Sparkles } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function FeaturedContent() {
  const { t } = useLanguage()
  
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
      {/* Animated Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-slate-200/40 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-slate-300/30 rounded-full opacity-50 animate-bounce" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-br from-slate-200/30 to-slate-300/20 rounded-full opacity-40 animate-ping" style={{ animationDuration: '3s' }}></div>
        
        {/* Gradient orbs */}
        <div className="absolute top-1/4 right-1/3 w-40 h-40 bg-gradient-to-br from-blue-100/20 to-slate-200/30 rounded-full blur-xl opacity-50"></div>
        <div className="absolute bottom-1/4 left-1/5 w-56 h-56 bg-gradient-to-tr from-slate-100/30 to-blue-50/40 rounded-full blur-2xl opacity-40"></div>
        
        {/* Scattered dots */}
        <div className="absolute top-16 left-1/3 w-2 h-2 bg-slate-400/50 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-slate-300/60 rounded-full animate-bounce" style={{ animationDuration: '2s' }}></div>
        <div className="absolute bottom-20 right-1/3 w-2 h-2 bg-slate-400/40 rounded-full animate-ping" style={{ animationDuration: '2.5s' }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header Section */}
        <div className="text-center mb-16 relative">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-2 opacity-60">
              <Star className="w-4 h-4 text-slate-400 animate-pulse" />
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
              <Sparkles className="w-4 h-4 text-slate-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
              <Star className="w-4 h-4 text-slate-400 animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 relative">
            {t('featured.title')}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-slate-300 via-slate-500 to-slate-300 rounded-full opacity-60"></div>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            {t('featured.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Clinical Guidelines Card */}
          <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                {t('featured.guidelines')}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-slate-600 mb-6 leading-relaxed">
                {t('featured.guidelinesDesc')}
              </p>
              <Button className="group/btn bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-300 hover:shadow-lg">
                {t('featured.learnMore')}
                <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>

          {/* CME Programs Card */}
          <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-4 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                {t('featured.cme')}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-slate-600 mb-6 leading-relaxed">
                {t('featured.cmeDesc')}
              </p>
              <Button className="group/btn bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg transition-all duration-300 hover:shadow-lg">
                {t('featured.viewAll')}
                <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>

          {/* Case Studies Card */}
          <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                {t('featured.cases')}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-slate-600 mb-6 leading-relaxed">
                {t('featured.casesDesc')}
              </p>
              <Button className="group/btn bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-all duration-300 hover:shadow-lg">
                {t('featured.learnMore')}
                <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}