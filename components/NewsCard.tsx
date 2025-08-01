'use client'

import { useLanguage } from '@/lib/language-context'
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Calendar, Award, Users, Book, Globe, Stethoscope } from 'lucide-react'
import Link from 'next/link'

const iconMap = {
  calendar: Calendar,
  award: Award,
  users: Users,
  book: Book,
  globe: Globe,
  stethoscope: Stethoscope,
}

interface NewsCardProps {
  id: string
  titleMn: string
  titleEn: string
  excerptMn: string
  excerptEn: string
  featuredImage?: string
  iconType: string
  gradientFrom: string
  gradientTo: string
  date: string
  href: string
}

export default function NewsCard({
  id,
  titleMn,
  titleEn,
  excerptMn,
  excerptEn,
  featuredImage,
  iconType,
  gradientFrom,
  gradientTo,
  date,
  href
}: NewsCardProps) {
  const { language } = useLanguage()
  
  const title = language === 'mn' ? titleMn : titleEn
  const excerpt = language === 'mn' ? excerptMn : excerptEn
  
  const Icon = iconMap[iconType as keyof typeof iconMap] || Calendar
  
  return (
    <Card className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <CardHeader className="p-0">
        {featuredImage ? (
          <div className="h-48 relative overflow-hidden">
            <img 
              src={featuredImage} 
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
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
          <Link href={href}>
            Read more
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

// Also export as named export for compatibility
export { NewsCard }