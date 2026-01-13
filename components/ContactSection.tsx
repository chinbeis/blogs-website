'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Send, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useLanguage } from '@/lib/language-context'

export default function ContactSection() {
  const { t, language } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Create mailto link
    const mailtoLink = `mailto:contact@msic.mn?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`
    window.location.href = mailtoLink
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }
  
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Design accents */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50/50 skew-x-12 transform origin-top-right -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3 h-3 text-red-500" />
            <span>{language === 'mn' ? 'Холбоо барих' : 'Get in touch'}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            {t('contactSection.title')}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {t('contactSection.description')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <Card className="shadow-2xl shadow-blue-900/10 border-0 rounded-[2rem] overflow-hidden order-2 lg:order-1">
            <div className="h-2 bg-gradient-to-r from-blue-600 to-red-600 w-full"></div>
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-3xl font-extrabold text-slate-900">{t('contact.getInTouch')}</CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-4">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-slate-700 font-bold ml-1">{t('contact.name')}</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={formData.name}
                      onChange={handleChange}
                      required 
                      placeholder={t('contact.name')}
                      className="h-14 rounded-xl border-slate-200 focus:ring-blue-500 focus:border-blue-500 bg-slate-50/50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-700 font-bold ml-1">{t('contact.email')}</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required 
                      placeholder={t('contact.email')}
                      className="h-14 rounded-xl border-slate-200 focus:ring-blue-500 focus:border-blue-500 bg-slate-50/50"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-slate-700 font-bold ml-1">{t('contact.subject')}</Label>
                  <Input 
                    id="subject" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required 
                    placeholder={t('contact.subject')}
                    className="h-14 rounded-xl border-slate-200 focus:ring-blue-500 focus:border-blue-500 bg-slate-50/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-slate-700 font-bold ml-1">{t('contact.message')}</Label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    value={formData.message}
                    onChange={handleChange}
                    required 
                    placeholder={t('contact.message')}
                    rows={5}
                    className="rounded-xl border-slate-200 focus:ring-blue-500 focus:border-blue-500 bg-slate-50/50 resize-none p-4"
                  />
                </div>
                
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white h-16 text-lg font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all transform hover:-translate-y-1">
                  <Send className="w-5 h-5 mr-3" />
                  {t('contact.send')}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information Cards */}
          <div className="space-y-6 order-1 lg:order-2">
            <Card className="border-0 shadow-xl shadow-blue-900/5 rounded-2xl overflow-hidden group hover:shadow-blue-900/10 transition-all duration-300">
              <CardContent className="flex items-center p-8">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mr-8 flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm">
                  <MapPin className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-slate-900 font-extrabold text-xl mb-2">{t('contactSection.address')}</h3>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    Mongolian Society of Interventional Cardiology<br />
                    Shastin's Third State Central Hospital<br />
                    Ulaanbaatar-16081, Mongolia
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl shadow-blue-900/5 rounded-2xl overflow-hidden group hover:shadow-blue-900/10 transition-all duration-300">
              <CardContent className="flex items-center p-8">
                <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mr-8 flex-shrink-0 group-hover:bg-red-500 group-hover:text-white transition-all duration-500 shadow-sm text-red-600 group-hover:text-white">
                  <Phone className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-slate-900 font-extrabold text-xl mb-2">{t('contactSection.phone')}</h3>
                  <p className="text-slate-900 text-2xl font-black mb-1">
                    +976-88113400
                  </p>
                  <p className="text-slate-500 font-medium">
                    {t('contactSection.available')}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl shadow-blue-900/5 rounded-2xl overflow-hidden group hover:shadow-blue-900/10 transition-all duration-300">
              <CardContent className="flex items-center p-8">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mr-8 flex-shrink-0 group-hover:bg-blue-800 group-hover:text-white transition-all duration-500 shadow-sm text-blue-700 group-hover:text-white">
                  <Mail className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-slate-900 font-extrabold text-xl mb-2">{t('contactSection.email')}</h3>
                  <p className="text-slate-900 text-2xl font-black mb-1">
                    contact@msic.mn
                  </p>
                  <p className="text-slate-500 font-medium">
                    {t('contactSection.available')}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
