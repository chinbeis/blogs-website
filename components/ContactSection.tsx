'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useLanguage } from '@/lib/language-context'

export default function ContactSection() {
  const { t } = useLanguage()
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
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {t('contactSection.title')}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t('contactSection.description')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="shadow-lg border border-slate-100 order-2 lg:order-1">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-slate-900">{t('contact.getInTouch')}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-700">{t('contact.name')}</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    required 
                    placeholder={t('contact.name')}
                    className="border-slate-200 focus:ring-slate-500 focus:border-slate-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-700">{t('contact.email')}</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required 
                    placeholder={t('contact.email')}
                    className="border-slate-200 focus:ring-slate-500 focus:border-slate-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-slate-700">{t('contact.subject')}</Label>
                  <Input 
                    id="subject" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required 
                    placeholder={t('contact.subject')}
                    className="border-slate-200 focus:ring-slate-500 focus:border-slate-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-slate-700">{t('contact.message')}</Label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    value={formData.message}
                    onChange={handleChange}
                    required 
                    placeholder={t('contact.message')}
                    rows={5}
                    className="border-slate-200 focus:ring-slate-500 focus:border-slate-500 resize-none"
                  />
                </div>
                
                <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white py-6 text-lg transition-colors">
                  <Send className="w-5 h-5 mr-2" />
                  {t('contact.send')}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information Cards */}
          <div className="space-y-6 order-1 lg:order-2">
            <Card className="border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="flex items-center p-6">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mr-6 flex-shrink-0 transition-colors group-hover:bg-slate-200">
                  <MapPin className="w-6 h-6 text-slate-600" />
                </div>
                <div>
                  <h3 className="text-slate-900 font-bold text-lg mb-1">{t('contactSection.address')}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    Mongolian Society of Interventional Cardiology<br />
                    Shastin's Third State Central Hospital<br />
                    Ard Ayush street-1A, Bayangol District<br />
                    Ulaanbaatar-16081, Mongolia
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="flex items-center p-6">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                  <Phone className="w-6 h-6 text-slate-600" />
                </div>
                <div>
                  <h3 className="text-slate-900 font-bold text-lg mb-1">{t('contactSection.phone')}</h3>
                  <p className="text-slate-600 text-lg font-medium">
                    +976-88113400
                  </p>
                  <p className="text-slate-500 text-sm">
                    {t('contactSection.available')}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="flex items-center p-6">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                  <Mail className="w-6 h-6 text-slate-600" />
                </div>
                <div>
                  <h3 className="text-slate-900 font-bold text-lg mb-1">{t('contactSection.email')}</h3>
                  <p className="text-slate-600 text-lg font-medium">
                    contact@msic.mn
                  </p>
                  <p className="text-slate-500 text-sm">
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
