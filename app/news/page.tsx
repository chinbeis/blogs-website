'use client'

import { useState, useEffect, Suspense } from 'react'
import NewsCard from '@/components/NewsCard'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Search, Sparkles } from 'lucide-react'
import { useSearchParams, useRouter } from 'next/navigation'
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
  category: string
  publishedAt: string
  createdAt: string
}

function NewsContent() {
  const { t, language } = useLanguage()
  const searchParams = useSearchParams()
  const router = useRouter()
  const categoryParam = searchParams.get('category')
  
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [filteredArticles, setFilteredArticles] = useState<NewsArticle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchArticles()
  }, [categoryParam])

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
    setIsLoading(true)
    try {
      const url = categoryParam 
        ? `/api/news?published=true&category=${categoryParam}` 
        : '/api/news?published=true'
      const response = await fetch(url)
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

  const categoryTitle = () => {
    if (!categoryParam) return t('news.title')
    switch(categoryParam) {
      case 'women': return t('header.education.women')
      case 'cme': return t('header.education.cme')
      case 'cases': return t('header.education.cases')
      default: return t('news.title')
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Page Title Section */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600 rounded-full blur-3xl -ml-48 -mb-48"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles className="w-3 h-3 text-red-400" />
            <span>{language === 'mn' ? 'Мэдээ мэдээлэл' : 'News & Updates'}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-8 tracking-tight">{categoryTitle()}</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {t('news.subtitle')}
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-blue-50/50 border-b border-blue-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
            <input
              type="text"
              placeholder={t('news.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-blue-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-900"
            />
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {isLoading ? (
            <div className="text-center py-24">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-blue-600 font-medium">{t('common.loading')}</p>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-24 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
              <p className="text-slate-500 text-lg mb-8">{t('news.noArticles')}</p>
              <Button onClick={() => router.push('/news')} variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 rounded-xl px-8 py-6 font-bold transition-all">
                {language === 'mn' ? 'Бүх мэдээг харах' : 'View all news'}
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
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

export default function NewsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewsContent />
    </Suspense>
  )
}
