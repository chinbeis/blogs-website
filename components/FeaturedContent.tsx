import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, FileText, Calendar, ArrowRight, Star, Sparkles } from "lucide-react"

export function FeaturedContent() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
      {/* Animated Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-slate-200/40 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-slate-300/30 rounded-full opacity-50 animate-bounce" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-br from-slate-200/30 to-slate-300/20 rounded-full opacity-40 animate-ping" style={{ animationDuration: '3s' }}></div>
        
        {/* Gradient orbs */}
        <div className="absolute top-1/4 right-1/3 w-40 h-40 bg-gradient-to-br from-blue-100/20 to-slate-200/30 rounded-full blur-xl opacity-50"></div>
        <div className="absolute bottom-1/4 left-1/5 w-56 h-56 bg-gradient-to-tr from-slate-100/30 to-blue-50/40 rounded-full blur-2xl opacity-40"></div>
        
        {/* Scattered dots */}
        <div className="absolute top-16 left-1/3 w-2 h-2 bg-slate-400/50 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-slate-300/60 rounded-full animate-bounce" style={{ animationDuration: '2s' }}></div>
        <div className="absolute bottom-20 right-1/3 w-2 h-2 bg-slate-400/40 rounded-full animate-ping" style={{ animationDuration: '2.5s' }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header Section */}
        <div className="text-center mb-16 relative">
          {/* Decorative elements around title */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-2 opacity-60">
              <Star className="w-4 h-4 text-slate-400 animate-pulse" />
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
              <Sparkles className="w-4 h-4 text-slate-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
              <Star className="w-4 h-4 text-slate-400 animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 relative">
            Featured Content
            {/* Subtle text decoration */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-slate-300 via-slate-500 to-slate-300 rounded-full opacity-60"></div>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Explore our educational resources, case studies, and upcoming events designed to advance your knowledge in interventional cardiology.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* CME Section */}
          <div className="group relative">
            {/* Card background glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-slate-200/50 to-slate-300/50 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <Card className="relative border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden group-hover:-translate-y-2">
              {/* Decorative top border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-600 via-slate-700 to-slate-600"></div>
              
              {/* Floating particles */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-slate-300/60 rounded-full animate-bounce opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute top-8 right-8 w-1 h-1 bg-slate-400/40 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ animationDelay: '1s' }}></div>
              
              <CardHeader className="text-center pb-6 pt-8">
                <div className="relative mx-auto w-20 h-20 mb-6">
                  {/* Icon background with gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-600 to-slate-800 rounded-full shadow-lg group-hover:shadow-xl transition-shadow duration-300"></div>
                  {/* Outer ring animation */}
                  <div className="absolute -inset-2 border-2 border-slate-300/30 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-spin transition-opacity duration-300" style={{ animationDuration: '3s' }}></div>
                  <div className="relative w-full h-full flex items-center justify-center">
                    <BookOpen className="w-10 h-10 text-white group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>
                <CardTitle className="text-2xl text-slate-900 group-hover:text-slate-700 transition-colors duration-300">
                  Continuing Medical Education
                </CardTitle>
              </CardHeader>
              
              <CardContent className="text-center px-8 pb-8">
                <p className="text-slate-600 mb-8 leading-relaxed">
                  Access our comprehensive CME programs designed to keep you updated with the latest advances in interventional cardiology.
                </p>
                
                {/* Enhanced info boxes */}
                <div className="space-y-4 mb-8">
                  <div className="text-left p-4 bg-slate-50/80 rounded-xl group-hover:bg-slate-100/80 transition-colors duration-300">
                    <h4 className="font-bold text-slate-900 text-sm mb-1">Latest Course</h4>
                    <p className="text-sm text-slate-600">Advanced PCI Techniques</p>
                  </div>
                  <div className="text-left p-4 bg-slate-50/80 rounded-xl group-hover:bg-slate-100/80 transition-colors duration-300">
                    <h4 className="font-bold text-slate-900 text-sm mb-1">Credits Available</h4>
                    <p className="text-sm text-slate-600">15 CME Credits</p>
                  </div>
                </div>
                
                <Button className="w-full bg-gradient-to-r from-slate-800 to-slate-900 text-white hover:from-slate-700 hover:to-slate-800 transition-all duration-300 rounded-xl py-3 shadow-lg hover:shadow-xl group/btn">
                  <span className="flex items-center justify-center">
                    View CME Programs
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </span>
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Case Reports Section */}
          <div className="group relative">
            {/* Card background glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-slate-300/50 to-slate-400/50 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <Card className="relative border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden group-hover:-translate-y-2">
              {/* Decorative top border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-500 via-slate-600 to-slate-500"></div>
              
              {/* Floating particles */}
              <div className="absolute top-6 right-6 w-2 h-2 bg-slate-400/50 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ animationDelay: '0.3s' }}></div>
              <div className="absolute top-12 right-12 w-1 h-1 bg-slate-300/60 rounded-full animate-bounce opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ animationDelay: '0.8s' }}></div>
              
              <CardHeader className="text-center pb-6 pt-8">
                <div className="relative mx-auto w-20 h-20 mb-6">
                  {/* Icon background with gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-500 to-slate-700 rounded-full shadow-lg group-hover:shadow-xl transition-shadow duration-300"></div>
                  {/* Pulse effect */}
                  <div className="absolute -inset-3 bg-slate-400/20 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"></div>
                  <div className="relative w-full h-full flex items-center justify-center">
                    <FileText className="w-10 h-10 text-white group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>
                <CardTitle className="text-2xl text-slate-900 group-hover:text-slate-700 transition-colors duration-300">
                  Case Reports
                </CardTitle>
              </CardHeader>
              
              <CardContent className="text-center px-8 pb-8">
                <p className="text-slate-600 mb-8 leading-relaxed">
                  Explore detailed case studies and clinical reports from leading interventional cardiologists in Mongolia and beyond.
                </p>
                
                {/* Enhanced info boxes */}
                <div className="space-y-4 mb-8">
                  <div className="text-left p-4 bg-slate-50/80 rounded-xl group-hover:bg-slate-100/80 transition-colors duration-300">
                    <h4 className="font-bold text-slate-900 text-sm mb-1">Recent Case</h4>
                    <p className="text-sm text-slate-600">Complex CTO Intervention</p>
                  </div>
                  <div className="text-left p-4 bg-slate-50/80 rounded-xl group-hover:bg-slate-100/80 transition-colors duration-300">
                    <h4 className="font-bold text-slate-900 text-sm mb-1">Total Cases</h4>
                    <p className="text-sm text-slate-600">150+ Published Cases</p>
                  </div>
                </div>
                
                <Button className="w-full bg-gradient-to-r from-slate-600 to-slate-700 text-white hover:from-slate-500 hover:to-slate-600 transition-all duration-300 rounded-xl py-3 shadow-lg hover:shadow-xl group/btn">
                  <span className="flex items-center justify-center">
                    Browse Case Reports
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </span>
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Upcoming Events Section */}
          <div className="group relative">
            {/* Card background glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-slate-200/50 to-slate-400/50 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <Card className="relative border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden group-hover:-translate-y-2">
              {/* Decorative top border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-600 via-slate-700 to-slate-600"></div>
              
              {/* Floating particles */}
              <div className="absolute top-5 right-5 w-2 h-2 bg-slate-300/50 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ animationDelay: '0.7s' }}></div>
              <div className="absolute top-10 right-10 w-1 h-1 bg-slate-400/60 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ animationDelay: '0.2s' }}></div>
              
              <CardHeader className="text-center pb-6 pt-8">
                <div className="relative mx-auto w-20 h-20 mb-6">
                  {/* Icon background with gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-600 to-slate-800 rounded-full shadow-lg group-hover:shadow-xl transition-shadow duration-300"></div>
                  {/* Rotating border */}
                  <div className="absolute -inset-2 border-2 border-dashed border-slate-300/40 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-spin transition-opacity duration-300" style={{ animationDuration: '4s' }}></div>
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Calendar className="w-10 h-10 text-white group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>
                <CardTitle className="text-2xl text-slate-900 group-hover:text-slate-700 transition-colors duration-300">
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              
              <CardContent className="text-center px-8 pb-8">
                <p className="text-slate-600 mb-8 leading-relaxed">
                  Join us for upcoming conferences, workshops, and training sessions to enhance your interventional cardiology skills.
                </p>
                
                {/* Enhanced info boxes */}
                <div className="space-y-4 mb-8">
                  <div className="text-left p-4 bg-slate-50/80 rounded-xl group-hover:bg-slate-100/80 transition-colors duration-300">
                    <h4 className="font-bold text-slate-900 text-sm mb-1">Next Event</h4>
                    <p className="text-sm text-slate-600">Annual MSIC Conference 2024</p>
                  </div>
                  <div className="text-left p-4 bg-slate-50/80 rounded-xl group-hover:bg-slate-100/80 transition-colors duration-300">
                    <h4 className="font-bold text-slate-900 text-sm mb-1">Date</h4>
                    <p className="text-sm text-slate-600">March 15-17, 2024</p>
                  </div>
                </div>
                
                <Button className="w-full bg-gradient-to-r from-slate-800 to-slate-900 text-white hover:from-slate-700 hover:to-slate-800 transition-all duration-300 rounded-xl py-3 shadow-lg hover:shadow-xl group/btn">
                  <span className="flex items-center justify-center">
                    View All Events
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </span>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}