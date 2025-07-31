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
      <header className="bg-blue-800 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 hover:text-amber-500 transition-colors">
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
      <section className="bg-gradient-to-r from-blue-800 to-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            MSIC News & Updates
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Stay informed about the latest developments, conferences, and achievements in interventional cardiology.
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search news articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(9)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg animate-pulse">
                  <div className="h-48 bg-gray-300 rounded-t-lg"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-6 bg-gray-300 rounded mb-3"></div>
                    <div className="h-4 bg-gray-300 rounded mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-500 mb-4">
                <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2">
                  {searchTerm ? 'No articles found' : 'No news articles yet'}
                </h3>
                <p className="text-gray-600">
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
                  className="mt-4"
                >
                  Clear Search
                </Button>
              )}
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-blue-800 mb-2">
                  {searchTerm ? `Search Results (${filteredArticles.length})` : `All News (${filteredArticles.length})`}
                </h2>
                {searchTerm && (
                  <p className="text-gray-600">
                    Showing results for "{searchTerm}"
                    <Button
                      onClick={() => setSearchTerm('')}
                      variant="link"
                      className="ml-2 p-0 h-auto text-blue-800"
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
      <footer className="bg-blue-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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