'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Heart, ArrowLeft, Calendar, User, Share2, Eye } from 'lucide-react'
import Link from 'next/link'

interface NewsArticle {
  id: string
  title: string
  content: string
  excerpt: string
  featuredImage?: string
  iconType: 'calendar' | 'award' | 'users' | 'book' | 'globe' | 'stethoscope'
  gradientFrom: string
  gradientTo: string
  publishedAt: string
  createdAt: string
  author?: string
  slug: string
}

export default function NewsArticlePage() {
  const params = useParams()
  const [article, setArticle] = useState<NewsArticle | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (params.id) {
      fetchArticle(params.id as string)
    }
  }, [params.id])

  const fetchArticle = async (id: string) => {
    try {
      const response = await fetch(`/api/news/${id}`)
      if (response.ok) {
        const data = await response.json()
        setArticle(data)
      } else {
        setError('Article not found')
      }
    } catch (error) {
      console.error('Error fetching article:', error)
      setError('Failed to load article')
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

  const shareArticle = async () => {
    if (navigator.share && article) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-blue-800 text-white py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <Link href="/news" className="flex items-center space-x-2 hover:text-amber-500 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to News</span>
              </Link>
              <div className="flex items-center space-x-2">
                <Heart className="w-8 h-8 text-red-600" />
                <span className="text-2xl font-bold">MSIC</span>
              </div>
            </div>
          </div>
        </header>

        {/* Loading Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded mb-4"></div>
            <div className="h-4 bg-gray-300 rounded mb-6 w-1/3"></div>
            <div className="h-64 bg-gray-300 rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-blue-800 text-white py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <Link href="/news" className="flex items-center space-x-2 hover:text-amber-500 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to News</span>
              </Link>
              <div className="flex items-center space-x-2">
                <Heart className="w-8 h-8 text-red-600" />
                <span className="text-2xl font-bold">MSIC</span>
              </div>
            </div>
          </div>
        </header>

        {/* Error Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="text-gray-500">
            <Eye className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <h1 className="text-2xl font-bold mb-2">Article Not Found</h1>
            <p className="text-gray-600 mb-6">
              {error || 'The article you are looking for does not exist or has been removed.'}
            </p>
            <Link href="/news">
              <Button className="bg-blue-800 hover:bg-blue-900">
                Browse All News
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-blue-800 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/news" className="flex items-center space-x-2 hover:text-amber-500 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to News</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Heart className="w-8 h-8 text-red-600" />
              <span className="text-2xl font-bold">MSIC</span>
            </div>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4 leading-tight">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(article.publishedAt || article.createdAt)}</span>
            </div>
            {article.author && (
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>{article.author}</span>
              </div>
            )}
            <Button
              onClick={shareArticle}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </Button>
          </div>

          <p className="text-xl text-gray-700 leading-relaxed">
            {article.excerpt}
          </p>
        </header>

        {/* Featured Image */}
        {article.featuredImage && (
          <div className="mb-8">
            <img
              src={article.featuredImage}
              alt={article.title}
              className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        )}

        {/* Article Content */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-8">
            <div 
              className="prose prose-lg max-w-none"
              style={{
                lineHeight: '1.8',
                fontSize: '1.1rem'
              }}
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </CardContent>
        </Card>

        {/* Article Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-gray-600">
              <p>Published by MSIC on {formatDate(article.publishedAt || article.createdAt)}</p>
            </div>
            <div className="flex space-x-4">
              <Link href="/news">
                <Button variant="outline">
                  More News
                </Button>
              </Link>
              <Link href="/contact">
                <Button className="bg-blue-800 hover:bg-blue-900">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </footer>
      </article>

      {/* Footer */}
      <footer className="bg-blue-800 text-white py-8 mt-16">
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