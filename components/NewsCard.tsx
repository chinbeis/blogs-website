import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Award, Users, BookOpen, Globe, Stethoscope } from "lucide-react"
import { cn } from "@/lib/utils"

interface NewsCardProps {
  title: string
  date: string
  excerpt: string
  href?: string
  iconType?: 'calendar' | 'award' | 'users' | 'book' | 'globe' | 'stethoscope'
  gradientFrom: string
  gradientTo: string
  featuredImage?: string
}

const iconMap = {
  calendar: Calendar,
  award: Award,
  users: Users,
  book: BookOpen,
  globe: Globe,
  stethoscope: Stethoscope,
}

export function NewsCard({ 
  title, 
  date, 
  excerpt, 
  href = "#", 
  iconType = 'calendar',
  gradientFrom,
  gradientTo,
  featuredImage
}: NewsCardProps) {
  const Icon = iconMap[iconType]
  
  return (
    <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border-0">
      <CardHeader className="p-0">
        {featuredImage ? (
          <div className="h-48 relative overflow-hidden">
            <img 
              src={featuredImage} 
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <Icon className="w-12 h-12 text-white drop-shadow-lg" />
            </div>
          </div>
        ) : (
          <div className={cn(
            "h-48 flex items-center justify-center",
            `bg-gradient-to-br ${gradientFrom} ${gradientTo}`
          )}>
            <Icon className="w-16 h-16 text-white" />
          </div>
        )}
      </CardHeader>
      <CardContent className="p-6">
        <div className="text-sm text-yellow-600 font-medium mb-2">{date}</div>
        <h3 className="text-xl font-bold text-blue-800 mb-3 line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-700 mb-4 line-clamp-3">
          {excerpt}
        </p>
        <Button variant="link" className="p-0 h-auto font-medium group" asChild>
          <a href={href}>
            Read more
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </Button>
      </CardContent>
    </Card>
  )
}