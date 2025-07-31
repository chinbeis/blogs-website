import { Button } from "@/components/ui/button"
import { ArrowRight, Heart, Award, Users } from "lucide-react"

export function Hero() {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-[#1a237e] via-[#2563eb] to-[#1e40af]">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Large decorative circles */}
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-[#4682b4] rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-32 right-20 w-24 h-24 border-2 border-[#b8860b] rounded-full opacity-30"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 border-2 border-[#4682b4] rounded-full opacity-25"></div>
        <div className="absolute bottom-32 right-1/3 w-16 h-16 border-2 border-[#b8860b] rounded-full opacity-40 animate-pulse"></div>
        
        {/* Additional decorative elements */}
        <div className="absolute top-1/4 left-1/2 w-6 h-6 bg-[#dc2626] rounded-full opacity-60 animate-bounce"></div>
        <div className="absolute top-3/4 left-10 w-4 h-4 bg-[#b8860b] rounded-full opacity-50"></div>
        <div className="absolute top-1/2 right-10 w-8 h-8 bg-[#4682b4] rounded-full opacity-40"></div>
        
        {/* Geometric shapes */}
        <div className="absolute top-20 right-1/4 w-12 h-12 border-2 border-[#dc2626] transform rotate-45 opacity-30"></div>
        <div className="absolute bottom-40 left-1/3 w-10 h-10 border-2 border-[#4682b4] transform rotate-12 opacity-25"></div>
        
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(26,35,126,0.3)] to-transparent"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2 backdrop-blur-sm rounded-full px-6 py-3 bg-[rgba(245,245,245,0.15)] border border-[rgba(255,255,255,0.2)] shadow-lg">
              <Heart className="h-5 w-5 text-[#dc2626] animate-pulse" />
              <span className="text-sm font-medium text-white">Leading Cardiovascular Care in Mongolia</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Advancing
            <span className="text-[#b8860b]"> Interventional</span>
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
            <Button variant="outline" size="lg" className="border-[#b8860b] text-[#b8860b] bg-transparent hover:bg-[#b8860b] hover:text-[#36454f] transition-colors">
              Learn More
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Users className="h-8 w-8 text-[#4682b4]" />
              </div>
              <div className="text-3xl font-bold mb-1 text-white">500+</div>
               <div className="text-gray-200">Active Members</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Award className="h-8 w-8 text-[#b8860b]" />
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