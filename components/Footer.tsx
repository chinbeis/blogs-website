'use client'

import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@radix-ui/react-separator"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"

export function Footer() {
  const { t } = useLanguage()
  
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Organization Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Image 
                src="/logo.svg" 
                alt="MSIC Logo" 
                width={32} 
                height={32} 
                className="h-8 w-8"
              />
              <div>
                <h3 className="text-xl font-bold">MSIC</h3>
                <p className="text-sm text-slate-300">{t('hero.title')}</p>
              </div>
            </div>
            <p className="text-slate-300 mb-6 max-w-md">
              {t('footer.description')}
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="h-4 w-4 text-slate-400" />
                <span>Ulaanbaatar, Mongolia</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-slate-400" />
                <span>contact@msic.mn</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4 text-slate-400" />
                <span>+976-88113400</span>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-slate-200">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">{t('footer.about')}</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">{t('footer.membership')}</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">{t('footer.education')}</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">{t('footer.research')}</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">{t('footer.events')}</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">{t('footer.contact')}</a></li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-slate-200">{t('footer.resources')}</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">{t('footer.guidelines')}</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">{t('footer.cme')}</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">{t('footer.caseReports')}</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">{t('footer.publications')}</a></li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-8 bg-slate-700" />
        
        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm mb-4 md:mb-0">
            {t('footer.copyright')}
          </p>
          
          {/* Social Media */}
          <div className="flex space-x-4">
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white" asChild>
              <a href="https://www.facebook.com/msic.mn/" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
              <Twitter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
              <Linkedin className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}