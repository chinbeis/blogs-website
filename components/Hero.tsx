import { Button } from "@/components/ui/button"
import { ArrowRight, Heart, Award, Users } from "lucide-react"

export function Hero() {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-[#d97706] rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 border-2 border-[#1e40af] rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-32 right-1/3 w-8 h-8 border-2 border-[#d97706] rounded-full"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2 backdrop-blur-sm rounded-full px-4 py-2 bg-[rgba(245,245,245,0.1)]">
              <Heart className="h-5 w-5 text-[#dc2626]" />
              <span className="text-sm font-medium text-white">Leading Cardiovascular Care in Mongolia</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Advancing
            <span className="text-[#d97706]"> Interventional</span>
            <br />
            <span className="text-[#dc2626]">Cardiology</span> Excellence
          </h1>
          
          <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-100">
            The Mongolian Society of Interventional Cardiology is dedicated to improving cardiovascular health 
            through cutting-edge research, education, and clinical excellence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-[#dc2626] text-white hover:bg-[#b91c1c] transition-colors">
              Join Our Society
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white bg-transparent hover:bg-white hover:text-[#1e40af] transition-colors">
              Learn More
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Users className="h-8 w-8 text-[#1e40af]" />
              </div>
              <div className="text-3xl font-bold mb-1 text-white">500+</div>
               <div className="text-gray-200">Active Members</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Award className="h-8 w-8 text-[#d97706]" />
              </div>
              <div className="text-3xl font-bold mb-1 text-white">15+</div>
               <div className="text-gray-200">Years of Excellence</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Heart className="h-8 w-8 text-[#dc2626]" />
              </div>
              <div className="text-3xl font-bold mb-1 text-white">10,000+</div>
               <div className="text-gray-200">Lives Improved</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}