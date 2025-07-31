import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@radix-ui/react-separator"

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Organization Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="h-8 w-8 text-red-600" />
              <div>
                <h3 className="text-xl font-bold">MSIC</h3>
                <p className="text-sm text-slate-300">Mongolian Society of Interventional Cardiology</p>
              </div>
            </div>
            <p className="text-slate-300 mb-6 max-w-md">
              Dedicated to advancing interventional cardiology through education, research, and clinical excellence. 
              Improving cardiovascular health across Mongolia and beyond.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="h-4 w-4 text-slate-400" />
                <span>Ulaanbaatar, Mongolia</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-slate-400" />
                <span>info@msic.mn</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4 text-slate-400" />
                <span>+976 11 123 456</span>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-slate-200">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">About MSIC</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Membership</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Education</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Research</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Guidelines</a></li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-slate-200">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">CME Programs</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Case Reports</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Publications</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Events</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-8 bg-slate-700" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-slate-400 mb-4 md:mb-0">
            © 2024 Mongolian Society of Interventional Cardiology. All rights reserved.
          </div>
          
          <div className="flex space-x-4">
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800">
              <Facebook className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800">
              <Twitter className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800">
              <Linkedin className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}