'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import NewsCard from "@/components/NewsCard"
import { ArrowRight } from "lucide-react"
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
  const { t } = useLanguage()
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-slate-600">{t('common.loading')}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            {t('news.title')}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {t('news.subtitle')}
          </p>
        </div>
        
        {articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-600">{t('news.noArticles')}</p>
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
              ))})
            </div>
            
            <div className="text-center">
              <Link href="/news">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
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