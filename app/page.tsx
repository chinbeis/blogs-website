'use client'

import Image from "next/image";
import { Header } from "@/components/Header"
import { Hero } from "@/components/Hero"
import { FeaturedContent } from "@/components/FeaturedContent"
import { NewsSection } from "@/components/NewsSection"
import { ClinicalGuidelinesSection } from "@/components/ClinicalGuidelinesSection"
import ContactSection from "@/components/ContactSection"
import { Footer } from "@/components/Footer"
import { useLanguage } from "@/lib/language-context"

export default function Home() {
  const { t } = useLanguage()
  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      
      {/* Website Banner Section with Enhanced Effects */}
      <section className="py-8 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-xl overflow-hidden shadow-2xl group">
            {/* Gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10 z-10"></div>
            
              {/* Main banner image with hover effects */}
              <div className="relative overflow-hidden">
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-auto object-cover transform transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                >
                  <source src="/videos/0-02-08-4801caae0193433367ee774006c3b18b48c1c7e3b668b4a7ebdaa1e481c2fc26_222e3a8f266.mp4" type="video/mp4" />
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
      
      <FeaturedContent />
      
      {/* Event Section - Text Left, Image Right with Enhanced Effects */}
      <section className="py-16 bg-white relative overflow-hidden">
        {/* Enhanced decorative elements with animation */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-24 h-24 border-2 border-slate-200/60 rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute bottom-16 right-16 w-20 h-20 border border-slate-300/50 rounded-full opacity-25 animate-bounce" style={{ animationDuration: '3s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-gradient-to-br from-slate-300 to-slate-400 rounded-full opacity-40 animate-ping" style={{ animationDuration: '2s' }}></div>
          <div className="absolute top-1/4 right-1/3 w-3 h-3 bg-slate-300 rounded-full opacity-30"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text Content - Left Side */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                  {t('events.title')}
                </h2>
                <p className="text-xl text-slate-600 leading-relaxed">
                  {t('events.description')}
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4 group">
                  <div className="w-3 h-3 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full mt-2 flex-shrink-0 transition-all duration-300 group-hover:scale-125 group-hover:shadow-lg"></div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg group-hover:text-slate-700 transition-colors">{t('events.expertSpeakers')}</h3>
                    <p className="text-slate-600 mt-1">{t('events.expertSpeakersDesc')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 group">
                  <div className="w-3 h-3 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full mt-2 flex-shrink-0 transition-all duration-300 group-hover:scale-125 group-hover:shadow-lg"></div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg group-hover:text-slate-700 transition-colors">{t('events.workshops')}</h3>
                    <p className="text-slate-600 mt-1">{t('events.workshopsDesc')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 group">
                  <div className="w-3 h-3 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full mt-2 flex-shrink-0 transition-all duration-300 group-hover:scale-125 group-hover:shadow-lg"></div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg group-hover:text-slate-700 transition-colors">{t('events.networking')}</h3>
                    <p className="text-slate-600 mt-1">{t('events.networkingDesc')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 group">
                  <div className="w-3 h-3 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full mt-2 flex-shrink-0 transition-all duration-300 group-hover:scale-125 group-hover:shadow-lg"></div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg group-hover:text-slate-700 transition-colors">{t('events.education')}</h3>
                    <p className="text-slate-600 mt-1">{t('events.educationDesc')}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Image - Right Side with Enhanced Effects */}
            <div className="relative group">
              {/* Background decorative element */}
              <div className="absolute -inset-4 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl opacity-50 blur-sm group-hover:opacity-70 transition-opacity duration-300"></div>
              
              {/* Main image container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl group-hover:shadow-3xl transition-all duration-500">
                {/* Image with multiple effects */}
                <div className="relative overflow-hidden">
                  <Image
                    src="/2.png"
                    alt="MSIC Event Banner"
                    width={800}
                    height={400}
                    className="w-full h-auto object-contain transform transition-all duration-700 group-hover:scale-110 group-hover:brightness-105"
                  />
                  
                  {/* Gradient overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60"></div>
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"></div>
                </div>
                
                {/* Inner border glow */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-white/30 ring-inset"></div>
                
                {/* Outer glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-slate-300/50 to-slate-400/50 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <NewsSection />
      <ClinicalGuidelinesSection />
      <ContactSection />
      <Footer />
    </div>
  );
}