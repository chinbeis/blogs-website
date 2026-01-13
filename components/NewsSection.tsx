'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import NewsCard from "@/components/NewsCard"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from 'next/link'
import { useLanguage } from "@/lib/language-context"

interface NewsArticle {
  id: string
  titleMn: string
  titleEn: string
  excerptMn: string
  excerptEn: string
  featuredImage?: string
  iconType: 'calendar' | 'award' | 'users' | 'book' | 'globe' | 'stethoscope'
  gradientFrom: string
  gradientTo: string
  publishedAt: string
  createdAt: string
}

export function NewsSection() {
  const { t, language } = useLanguage()
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    try {
      const response = await fetch('/api/news?published=true')
      if (response.ok) {
        const data = await response.json()
        setArticles(data.slice(0, 6))
      }
    } catch (error) {
      console.error('Error fetching articles:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (isLoading) {
    return (
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-blue-600 font-medium">{t('common.loading')}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative accents */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-50/30 skew-x-12 transform origin-top-right -z-10"></div>
      <div className="absolute top-1/4 left-10 text-red-100 opacity-50">
        <Sparkles className="w-12 h-12" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              <span>{language === 'mn' ? 'Мэдээ мэдээлэл' : 'Latest Updates'}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
              {t('news.title')}
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed">
              {t('news.subtitle')}
            </p>
          </div>
          
          <div className="hidden md:block">
            <Link href="/news">
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl px-6 py-6 font-bold transition-all shadow-sm">
                {t('news.browseMore')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
        
        {articles.length === 0 ? (
          <div className="text-center py-24 bg-slate-50 rounded-3xl border border-dashed border-slate-300">
            <p className="text-slate-500 text-lg">{t('news.noArticles')}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {articles.map((article) => (
                <NewsCard 
                  key={article.id} 
                  id={article.id}
                  titleMn={article.titleMn}
                  titleEn={article.titleEn}
                  excerptMn={article.excerptMn}
                  excerptEn={article.excerptEn}
                  featuredImage={article.featuredImage}
                  iconType={article.iconType}
                  gradientFrom={article.gradientFrom}
                  gradientTo={article.gradientTo}
                  date={formatDate(article.publishedAt)}
                  href={`/news/${article.id}`}
                />
              ))}
            </div>
            
            <div className="text-center md:hidden">
              <Link href="/news">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg w-full">
                  {t('news.browseMore')}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
