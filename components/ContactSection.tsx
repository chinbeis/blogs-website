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
    <section className="py-16 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a237e] mb-4">
            {t('contactSection.title')}
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            {t('contactSection.description')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="shadow-lg border-0 order-2 lg:order-1">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#1a237e]">{t('contact.getInTouch')}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">{t('contact.name')}</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    required 
                    placeholder={t('contact.name')}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">{t('contact.email')}</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required 
                    placeholder={t('contact.email')}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">{t('contact.subject')}</Label>
                  <Input 
                    id="subject" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required 
                    placeholder={t('contact.subject')}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">{t('contact.message')}</Label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    value={formData.message}
                    onChange={handleChange}
                    required 
                    placeholder={t('contact.message')}
                    rows={5}
                  />
                </div>
                
                <Button type="submit" className="w-full bg-[#1a237e] hover:bg-[#1a237e]/90 text-white py-6 text-lg">
                  <Send className="w-5 h-5 mr-2" />
                  {t('contact.send')}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information Cards */}
          <div className="space-y-6 order-1 lg:order-2">
            <Card className="border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="flex items-center p-6">
                <div className="w-12 h-12 bg-[#4682b4] rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-[#1a237e] font-bold text-lg mb-1">{t('contactSection.address')}</h3>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    Mongolian Society of Interventional Cardiology<br />
                    Shastin's Third State Central Hospital<br />
                    Ard Ayush street-1A, Bayangol District<br />
                    Ulaanbaatar-16081, Mongolia
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="flex items-center p-6">
                <div className="w-12 h-12 bg-[#dc2626] rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-[#1a237e] font-bold text-lg mb-1">{t('contactSection.phone')}</h3>
                  <p className="text-gray-700 text-lg font-medium">
                    +976-88113400
                  </p>
                  <p className="text-gray-600 text-sm">
                    {t('contactSection.available')}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="flex items-center p-6">
                <div className="w-12 h-12 bg-[#16a34a] rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-[#1a237e] font-bold text-lg mb-1">{t('contactSection.email')}</h3>
                  <p className="text-gray-700 text-lg font-medium">
                    contact@msic.mn
                  </p>
                  <p className="text-gray-600 text-sm">
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
