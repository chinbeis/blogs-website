'use client'

import { useState, useEffect } from 'react'
import { NewsCard } from '@/components/NewsCard'
import { Button } from '@/components/ui/button'
import { Heart, ArrowLeft, Search } from 'lucide-react'
import Link from 'next/link'

interface NewsArticle {
  id: string
  title: string
  excerpt: string
  featuredImage?: string
  iconType: 'calendar' | 'award' | 'users' | 'book' | 'globe' | 'stethoscope'
  gradientFrom: string
  gradientTo: string
  publishedAt: string
  createdAt: string
}

export default function NewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [filteredArticles, setFilteredArticles] = useState<NewsArticle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchArticles()
  }, [])

  useEffect(() => {
    if (searchTerm) {
      const filtered = articles.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredArticles(filtered)
    } else {
      setFilteredArticles(articles)
    }
  }, [searchTerm, articles])

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
      {/* Header */}
      <header className="bg-slate-900 text-white py-6 relative overflow-hidden">
        {/* Subtle decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-2 left-10 w-16 h-16 border border-slate-700 rounded-full opacity-20"></div>
          <div className="absolute bottom-2 right-20 w-12 h-12 border border-slate-600 rounded-full opacity-15"></div>
          <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-slate-600 rounded-full opacity-30"></div>
          <div className="absolute top-3 right-1/3 w-3 h-3 bg-slate-700 rounded-full opacity-25"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 hover:text-slate-300 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Heart className="w-8 h-8 text-red-600" />
              <span className="text-2xl font-bold">MSIC</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white text-slate-900 py-16 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 border border-slate-200 rounded-full opacity-30"></div>
          <div className="absolute top-20 right-20 w-24 h-24 border border-slate-300 rounded-full opacity-20"></div>
          <div className="absolute bottom-10 left-1/4 w-20 h-20 border border-slate-200 rounded-full opacity-25"></div>
          <div className="absolute bottom-20 right-1/3 w-16 h-16 border border-slate-300 rounded-full opacity-30"></div>
          
          {/* Medical cross decorations */}
          <div className="absolute top-1/4 right-1/4 w-6 h-6 opacity-10">
            <div className="absolute inset-0 bg-slate-400 rounded-sm"></div>
            <div className="absolute top-2 left-1 w-4 h-1.5 bg-slate-400 rounded-sm"></div>
            <div className="absolute top-1 left-2 w-1.5 h-4 bg-slate-400 rounded-sm"></div>
          </div>
          
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50/30 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
            MSIC News & Updates
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Stay informed about the latest developments, conferences, and achievements in interventional cardiology.
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-slate-50 relative">
        {/* Subtle decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-2 left-1/4 w-4 h-4 bg-slate-300 rounded-full opacity-20"></div>
          <div className="absolute bottom-2 right-1/4 w-3 h-3 bg-slate-400 rounded-full opacity-25"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search news articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent bg-white shadow-sm transition-all duration-200"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(9)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg animate-pulse border border-slate-200">
                  <div className="h-48 bg-slate-200 rounded-t-lg"></div>
                  <div className="p-6">
                    <div className="h-4 bg-slate-200 rounded mb-2"></div>
                    <div className="h-6 bg-slate-200 rounded mb-3"></div>
                    <div className="h-4 bg-slate-200 rounded mb-4"></div>
                    <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-slate-500 mb-4">
                <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2 text-slate-900">
                  {searchTerm ? 'No articles found' : 'No news articles yet'}
                </h3>
                <p className="text-slate-600">
                  {searchTerm 
                    ? `No articles match "${searchTerm}". Try a different search term.`
                    : 'Check back soon for the latest news and updates.'
                  }
                </p>
              </div>
              {searchTerm && (
                <Button
                  onClick={() => setSearchTerm('')}
                  variant="outline"
                  className="mt-4 border-slate-300 text-slate-700 hover:bg-slate-50"
                >
                  Clear Search
                </Button>
              )}
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  {searchTerm ? `Search Results (${filteredArticles.length})` : `All News (${filteredArticles.length})`}
                </h2>
                {searchTerm && (
                  <p className="text-slate-600">
                    Showing results for "{searchTerm}"
                    <Button
                      onClick={() => setSearchTerm('')}
                      variant="link"
                      className="ml-2 p-0 h-auto text-slate-900 hover:text-slate-700"
                    >
                      Clear
                    </Button>
                  </p>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article) => (
                  <NewsCard
                    key={article.id}
                    title={article.title}
                    date={formatDate(article.publishedAt || article.createdAt)}
                    excerpt={article.excerpt}
                    href={`/news/${article.id}`}
                    iconType={article.iconType}
                    gradientFrom={article.gradientFrom}
                    gradientTo={article.gradientTo}
                    featuredImage={article.featuredImage}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 relative overflow-hidden">
        {/* Subtle decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-2 left-1/4 w-8 h-8 border border-slate-700 rounded-full opacity-15"></div>
          <div className="absolute bottom-2 right-1/4 w-6 h-6 border border-slate-600 rounded-full opacity-20"></div>
          <div className="absolute top-1/2 left-10 w-3 h-3 bg-slate-700 rounded-full opacity-25"></div>
          <div className="absolute top-1/2 right-10 w-4 h-4 bg-slate-600 rounded-full opacity-20"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Heart className="w-6 h-6 text-red-600" />
            <span className="text-xl font-bold">MSIC</span>
          </div>
          <p className="text-white/80">
            © 2024 Mongolian Society of Interventional Cardiology. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}