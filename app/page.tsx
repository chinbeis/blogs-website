'use client'

import Image from "next/image";
import { Header } from "@/components/Header"
import { Hero } from "@/components/Hero"
import { NewsSection } from "@/components/NewsSection"
import ContactSection from "@/components/ContactSection"
import { Footer } from "@/components/Footer"
import { useLanguage } from "@/lib/language-context"

export default function Home() {
  const { t, language } = useLanguage()
  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      
      {/* Website Banner Section with Enhanced Effects */}
      <section className="py-12 bg-blue-50/50 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl -ml-32 -mt-32"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-red-100/20 rounded-full blur-3xl -mr-32 -mb-32"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl group border-4 border-white">
            {/* Gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-transparent to-red-900/10 z-10"></div>
            
              {/* Main banner image with hover effects */}
              <div className="relative overflow-hidden aspect-video lg:aspect-[21/9]">
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-full object-cover transform transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                >
                  <source src="/videos/facebook.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Shimmer effect on hover */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
            </div>
            
            {/* Subtle border glow */}
            <div className="absolute inset-0 rounded-xl ring-1 ring-white/20 ring-inset"></div>
          </div>
        </div>
      </section>
      
      {/* Event Section - Text Left, Image Right with Enhanced Effects */}
      <section className="py-24 bg-white relative overflow-hidden border-t border-blue-50">
        {/* Enhanced decorative elements with animation */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-24 h-24 border-2 border-blue-100 rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute bottom-16 right-16 w-20 h-20 border border-red-100 rounded-full opacity-25 animate-bounce" style={{ animationDuration: '3s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-40 animate-ping" style={{ animationDuration: '2s' }}></div>
          <div className="absolute top-1/4 right-1/3 w-3 h-3 bg-red-400 rounded-full opacity-30"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text Content - Left Side */}
            <div className="space-y-8">
              <div>
                <div className="inline-block px-4 py-1.5 mb-4 bg-blue-50 border border-blue-100 rounded-full text-blue-600 text-sm font-bold tracking-wide uppercase">
                  {language === 'mn' ? 'Үйл ажиллагаа' : 'Activities'}
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">
                  {t('events.title')}
                </h2>
                <p className="text-xl text-slate-600 leading-relaxed">
                  {t('events.description')}
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
                <div className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg">
                    <div className="w-2.5 h-2.5 bg-blue-600 rounded-full group-hover:bg-white transition-colors"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors">{t('events.expertSpeakers')}</h3>
                    <p className="text-slate-600 mt-1 text-sm leading-relaxed">{t('events.expertSpeakersDesc')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-red-500 group-hover:text-white group-hover:shadow-lg">
                    <div className="w-2.5 h-2.5 bg-red-500 rounded-full group-hover:bg-white transition-colors"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg group-hover:text-red-500 transition-colors">{t('events.workshops')}</h3>
                    <p className="text-slate-600 mt-1 text-sm leading-relaxed">{t('events.workshopsDesc')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg">
                    <div className="w-2.5 h-2.5 bg-blue-600 rounded-full group-hover:bg-white transition-colors"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors">{t('events.networking')}</h3>
                    <p className="text-slate-600 mt-1 text-sm leading-relaxed">{t('events.networkingDesc')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-red-500 group-hover:text-white group-hover:shadow-lg">
                    <div className="w-2.5 h-2.5 bg-red-500 rounded-full group-hover:bg-white transition-colors"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg group-hover:text-red-500 transition-colors">{t('events.education')}</h3>
                    <p className="text-slate-600 mt-1 text-sm leading-relaxed">{t('events.educationDesc')}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Image - Right Side with Enhanced Effects */}
            <div className="relative group">
              {/* Background decorative element */}
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-100 to-red-100 rounded-3xl opacity-50 blur-sm group-hover:opacity-70 transition-opacity duration-300"></div>
              
              {/* Main image container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl group-hover:shadow-3xl transition-all duration-500 border-4 border-white">
                {/* Image with multiple effects */}
                <div className="relative overflow-hidden">
                  <Image
                    src="/2.png"
                    alt="MSIC Event Banner"
                    width={800}
                    height={600}
                    className="w-full h-auto object-contain transform transition-all duration-700 group-hover:scale-110 group-hover:brightness-105"
                  />
                  
                  {/* Gradient overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent opacity-60"></div>
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"></div>
                </div>
                
                {/* Inner border glow */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-white/30 ring-inset"></div>
                
                {/* Outer glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-300/50 to-red-300/50 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <div className="bg-gradient-to-b from-white to-blue-50/30">
        <NewsSection />
      </div>
      <ContactSection />
      <Footer />
    </div>
  );
}
