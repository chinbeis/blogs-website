'use client'

import { useState, useEffect } from 'react'
import NewsCard from '@/components/NewsCard'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Search } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/lib/language-context'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

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

export default function NewsPage() {
  const { t, language } = useLanguage()
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [filteredArticles, setFilteredArticles] = useState<NewsArticle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchArticles()
  }, [])

  useEffect(() => {
    if (searchTerm) {
      const filtered = articles.filter(article => {
        const title = language === 'mn' ? article.titleMn : article.titleEn
        const excerpt = language === 'mn' ? article.excerptMn : article.excerptEn
        return title.toLowerCase().includes(searchTerm.toLowerCase()) ||
               excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      })
      setFilteredArticles(filtered)
    } else {
      setFilteredArticles(articles)
    }
  }, [searchTerm, articles, language])

  const fetchArticles = async () => {
    try {
      const response = await fetch('/api/news?published=true')
      if (response.ok) {
        const data = await response.json()
        setArticles(data)
        setFilteredArticles(data)
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

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Page Title Section */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">{t('news.title')}</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {t('news.subtitle')}
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder={t('news.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {searchTerm && (
              <Button
                onClick={() => setSearchTerm('')}
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                {t('news.clearSearch')}
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-slate-600">{t('common.loading')}</p>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-600 mb-4">{t('news.noArticles')}</p>
              {searchTerm && (
                <Button onClick={() => setSearchTerm('')} variant="outline">
                  {t('news.clearSearch')}
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
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
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  )
}
