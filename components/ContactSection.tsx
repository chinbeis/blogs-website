'use client'

import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useLanguage } from '@/lib/language-context'

export default function ContactSection() {
  const { t } = useLanguage()
  
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Contact Information Cards */}
          <Card className="border-gray-200 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-[#4682b4] rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-[#1a237e]">{t('contactSection.address')}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-700 leading-relaxed">
                Mongolian Society of Interventional Cardiology<br />
                Shastin's Third State Central Hospital<br />
                Ard Ayush street-1A, Bayangol District<br />
                Ulaanbaatar-16081, Mongolia
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-200 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-[#dc2626] rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-[#1a237e]">{t('contactSection.phone')}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-700 text-lg font-medium">
                +976-88113400
              </p>
              <p className="text-gray-600 text-sm mt-2">
                {t('contactSection.available')}
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-200 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-[#16a34a] rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-[#1a237e]">{t('contactSection.email')}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-700 text-lg font-medium">
                info@msic.mn
              </p>
              <p className="text-gray-600 text-sm mt-2">
                {t('contactSection.available')}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Button className="bg-[#1a237e] hover:bg-[#1a237e]/90 text-white px-8 py-3 text-lg">
            <Send className="w-5 h-5 mr-2" />
            {t('contactSection.sendMessage')}
          </Button>
        </div>
      </div>
    </section>
  )
}