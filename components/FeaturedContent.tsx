'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, FileText, Calendar, ArrowRight, Star, Sparkles } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"

export function FeaturedContent() {
  const { t, language } = useLanguage()
  
  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-red-50 relative overflow-hidden">
      {/* Animated Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-blue-200/40 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-red-200/30 rounded-full opacity-50 animate-bounce" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-br from-blue-200/30 to-blue-300/20 rounded-full opacity-40 animate-ping" style={{ animationDuration: '3s' }}></div>
        
        {/* Gradient orbs */}
        <div className="absolute top-1/4 right-1/3 w-40 h-40 bg-gradient-to-br from-blue-400/10 to-blue-600/10 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-1/4 left-1/5 w-56 h-56 bg-gradient-to-tr from-red-400/10 to-red-600/10 rounded-full blur-3xl opacity-40"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header Section */}
        <div className="text-center mb-20 relative">
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-3 opacity-60">
              <Star className="w-4 h-4 text-blue-400 animate-pulse" />
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>
              <Sparkles className="w-5 h-5 text-red-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>
              <Star className="w-4 h-4 text-blue-400 animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
          </div>
          
          <div className="inline-block px-4 py-1.5 mb-6 bg-white border border-blue-100 rounded-full text-blue-600 text-sm font-bold tracking-wide uppercase shadow-sm">
            {language === 'mn' ? 'Бид юу хийдэг вэ?' : 'What we do'}
          </div>

          <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-8 relative tracking-tight">
            {t('featured.title')}
          </h2>
          
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium">
            {t('featured.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Clinical Guidelines Card */}
          <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white shadow-xl shadow-blue-900/5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-600"></div>
            <CardHeader className="text-center pb-4 relative z-10">
              <div className="mx-auto mb-6 p-5 bg-blue-600 rounded-2xl w-20 h-20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-lg shadow-blue-600/30 text-white">
                <BookOpen className="w-10 h-10" />
              </div>
              <CardTitle className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                {t('featured.guidelines')}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center relative z-10">
              <p className="text-slate-600 mb-8 leading-relaxed h-20 overflow-hidden">
                {t('featured.guidelinesDesc')}
              </p>
              <Link href="/guidelines">
                <Button className="group/btn bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-blue-600/40 text-lg font-bold w-full">
                  {t('featured.learnMore')}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* CME Programs Card */}
          <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white shadow-xl shadow-blue-900/5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-red-600"></div>
            <CardHeader className="text-center pb-4 relative z-10">
              <div className="mx-auto mb-6 p-5 bg-red-600 rounded-2xl w-20 h-20 flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 shadow-lg shadow-red-600/30 text-white">
                <FileText className="w-10 h-10" />
              </div>
              <CardTitle className="text-2xl font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                {t('featured.cme')}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center relative z-10">
              <p className="text-slate-600 mb-8 leading-relaxed h-20 overflow-hidden">
                {t('featured.cmeDesc')}
              </p>
              <Button className="group/btn bg-red-600 hover:bg-red-700 text-white px-8 py-6 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-red-600/40 text-lg font-bold w-full">
                {t('featured.viewAll')}
                <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>

          {/* Case Studies Card */}
          <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white shadow-xl shadow-blue-900/5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-slate-900"></div>
            <CardHeader className="text-center pb-4 relative z-10">
              <div className="mx-auto mb-6 p-5 bg-slate-900 rounded-2xl w-20 h-20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-lg shadow-slate-900/30 text-white">
                <Calendar className="w-10 h-10" />
              </div>
              <CardTitle className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                {t('featured.cases')}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center relative z-10">
              <p className="text-slate-600 mb-8 leading-relaxed h-20 overflow-hidden">
                {t('featured.casesDesc')}
              </p>
              <Button className="group/btn bg-slate-900 hover:bg-slate-800 text-white px-8 py-6 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-slate-900/40 text-lg font-bold w-full">
                {t('featured.learnMore')}
                <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
