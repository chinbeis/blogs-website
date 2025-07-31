import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, FileText, Calendar, ArrowRight } from "lucide-react"

export function FeaturedContent() {
  return (
    <section className="py-16 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#1a237e] mb-4">Featured Content</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Explore our educational resources, case studies, and upcoming events designed to advance your knowledge in interventional cardiology.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* CME Section */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-[#4682b4] rounded-full flex items-center justify-center mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl text-[#1a237e]">Continuing Medical Education</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-700 mb-6">
                Access our comprehensive CME programs designed to keep you updated with the latest advances in interventional cardiology.
              </p>
              <div className="space-y-3 mb-6">
                <div className="text-left">
                  <h4 className="font-semibold text-[#1a237e] text-sm">Latest Course</h4>
                  <p className="text-sm text-gray-700">Advanced PCI Techniques</p>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-[#1a237e] text-sm">Credits Available</h4>
                  <p className="text-sm text-gray-700">15 CME Credits</p>
                </div>
              </div>
              <Button className="w-full bg-[#dc2626] text-white hover:bg-[#b91c1c] transition-colors">
                View CME Programs
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
          
          {/* Case Reports Section */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-[#b8860b] rounded-full flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-[#36454f]" />
              </div>
              <CardTitle className="text-xl text-[#1a237e]">Case Reports</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-700 mb-6">
                Explore detailed case studies and clinical reports from leading interventional cardiologists in Mongolia and beyond.
              </p>
              <div className="space-y-3 mb-6">
                <div className="text-left">
                  <h4 className="font-semibold text-[#1a237e] text-sm">Recent Case</h4>
                  <p className="text-sm text-gray-700">Complex CTO Intervention</p>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-[#1a237e] text-sm">Total Cases</h4>
                  <p className="text-sm text-gray-700">150+ Published Cases</p>
                </div>
              </div>
              <Button className="w-full bg-[#b8860b] text-[#36454f] hover:bg-[#996f0a] transition-colors">
                Browse Case Reports
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
          
          {/* Upcoming Events Section */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-[#4682b4] rounded-full flex items-center justify-center mb-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl text-[#1a237e]">Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-700 mb-6">
                Join us for upcoming conferences, workshops, and training sessions to enhance your interventional cardiology skills.
              </p>
              <div className="space-y-3 mb-6">
                <div className="text-left">
                  <h4 className="font-semibold text-[#1a237e] text-sm">Next Event</h4>
                  <p className="text-sm text-gray-700">Annual MSIC Conference 2024</p>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-[#1a237e] text-sm">Date</h4>
                  <p className="text-sm text-gray-700">March 15-17, 2024</p>
                </div>
              </div>
              <Button className="w-full bg-[#dc2626] text-white hover:bg-[#b91c1c] transition-colors">
                View All Events
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}