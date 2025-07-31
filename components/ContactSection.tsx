import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function ContactSection() {
  return (
    <section className="py-16 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a237e] mb-4">
            Contact MSIC
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Get in touch with the Mongolian Society of Interventional Cardiology for inquiries, membership, or collaboration opportunities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Contact Information Cards */}
          <Card className="border-gray-200 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-[#4682b4] rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-[#1a237e]">Address</CardTitle>
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
              <CardTitle className="text-[#1a237e]">Phone</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-700 text-lg font-medium">
                +976-88113400
              </p>
              <p className="text-gray-600 text-sm mt-2">
                Available during business hours
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-200 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-[#b8860b] rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-[#36454f]" />
              </div>
              <CardTitle className="text-[#1a237e]">Email</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-700 text-lg font-medium">
                contact@msic.mn
              </p>
              <p className="text-gray-600 text-sm mt-2">
                We'll respond within 24 hours
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Button size="lg" className="bg-[#dc2626] hover:bg-[#b91c1c] text-white">
            <Send className="w-5 h-5 mr-2" />
            Send us a Message
          </Button>
        </div>
      </div>
    </section>
  )
}