'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Heart, ArrowLeft, Calendar, User, Share2, Eye, X, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/lib/language-context'

interface NewsImage {
  id: string
  url: string
  alt: string
  originalName: string
}

interface NewsArticle {
  id: string
  titleMn: string
  titleEn: string
  contentMn: string
  contentEn: string
  excerptMn: string
  excerptEn: string
  featuredImage?: string
  iconType: 'calendar' | 'award' | 'users' | 'book' | 'globe' | 'stethoscope'
  gradientFrom: string
  gradientTo: string
  publishedAt: string
  createdAt: string
  author?: string
  slug: string
  images?: NewsImage[]
}

export default function NewsArticlePage() {
  const { t, language } = useLanguage()
  const params = useParams()
  const [article, setArticle] = useState<NewsArticle | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<NewsImage | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

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
    return new Date(dateString).toLocaleDateString(language === 'mn' ? 'mn-MN' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const shareArticle = async () => {
    if (navigator.share && article) {
      const title = language === 'mn' ? article.titleMn : article.titleEn
      const excerpt = language === 'mn' ? article.excerptMn : article.excerptEn
      try {
        await navigator.share({
          title: title,
          text: excerpt,
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

  const openImageModal = (image: NewsImage, index: number) => {
    setSelectedImage(image)
    setCurrentImageIndex(index)
  }

  const closeImageModal = () => {
    setSelectedImage(null)
  }

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!article?.images) return
    
    let newIndex = currentImageIndex
    if (direction === 'prev') {
      newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : article.images.length - 1
    } else {
      newIndex = currentImageIndex < article.images.length - 1 ? currentImageIndex + 1 : 0
    }
    
    setCurrentImageIndex(newIndex)
    setSelectedImage(article.images[newIndex])
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">{t('news.title')}</h1>
          <p className="text-slate-600 mb-6">
            {error || 'The article you are looking for does not exist or has been removed.'}
          </p>
          <Link href="/news">
            <Button className="bg-slate-900 hover:bg-slate-800">
              {t('news.backToNews')}
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const title = language === 'mn' ? article.titleMn : article.titleEn
  const content = language === 'mn' ? article.contentMn : article.contentEn
  const excerpt = language === 'mn' ? article.excerptMn : article.excerptEn

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-slate-900 text-white py-6 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-2 left-10 w-16 h-16 border border-slate-700 rounded-full opacity-20"></div>
          <div className="absolute bottom-2 right-20 w-12 h-12 border border-slate-600 rounded-full opacity-15"></div>
          <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-slate-600 rounded-full opacity-30"></div>
          <div className="absolute top-3 right-1/3 w-3 h-3 bg-slate-700 rounded-full opacity-25"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/news" className="flex items-center space-x-2 hover:text-slate-300 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>{t('news.backToNews')}</span>
            </Link>
            <div className="flex items-center space-x-2">
              <img src="/logo.svg" alt="Logo" className="w-8 h-8 text-red-600" />
              <span className="text-2xl font-bold">MSIC</span>
            </div>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
            {title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-slate-600 mb-6">
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
              className="flex items-center space-x-2 border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              <Share2 className="w-4 h-4" />
              <span>{t('news.share')}</span>
            </Button>
          </div>

          <p className="text-xl text-slate-700 leading-relaxed">
            {excerpt}
          </p>
        </header>

        {/* Featured Image */}
        {article.featuredImage && (
          <div className="mb-8">
            <img
              src={article.featuredImage}
              alt={title}
              className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        )}

        {/* Article Content */}
        <Card className="border-0 shadow-lg bg-white mb-8">
          <CardContent className="p-8">
            <div 
              className="prose prose-lg max-w-none prose-slate"
              style={{
                lineHeight: '1.8',
                fontSize: '1.1rem'
              }}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </CardContent>
        </Card>

        {/* Image Gallery */}
        {article.images && article.images.length > 0 && (
          <Card className="border-0 shadow-lg bg-white mb-8">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
                <Eye className="w-6 h-6 text-blue-600" />
                <span>Image Gallery</span>
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {article.images.map((image, index) => (
                  <div 
                    key={image.id} 
                    className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                    onClick={() => openImageModal(image, index)}
                  >
                    <Image
                      src={image.url}
                      alt={image.alt || `Gallery image ${index + 1}`}
                      width={300}
                      height={200}
                      className="w-full h-32 md:h-40 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                      <Eye className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    {image.alt && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                        <p className="text-white text-xs truncate">{image.alt}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Article Footer */}
        <footer className="mt-12 pt-8 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-slate-600">
              <p>Published by MSIC on {formatDate(article.publishedAt || article.createdAt)}</p>
            </div>
            <div className="flex space-x-4">
              <Link href="/news">
                <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50">
                  More News
                </Button>
              </Link>
              <Link href="/contact">
                <Button className="bg-slate-900 hover:bg-slate-800">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </footer>
      </article>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 mt-16 relative overflow-hidden">
        {/* Subtle decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-2 left-1/4 w-8 h-8 border border-slate-700 rounded-full opacity-15"></div>
          <div className="absolute bottom-2 right-1/4 w-6 h-6 border border-slate-600 rounded-full opacity-20"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <img src="/logo.svg" alt="Logo" className="w-6 h-6 text-red-600" />
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