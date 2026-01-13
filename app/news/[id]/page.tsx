'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Heart, ArrowLeft, Calendar, User, Share2, Eye, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/lib/language-context'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

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
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center py-24">
          <div className="text-center max-w-md px-4">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">{t('news.title')}</h1>
            <p className="text-slate-600 mb-8 leading-relaxed">
              {error || 'The article you are looking for does not exist or has been removed.'}
            </p>
            <Link href="/news">
              <Button className="bg-blue-600 hover:bg-blue-700 rounded-xl px-8 py-6 font-bold shadow-lg shadow-blue-600/20">
                {t('news.backToNews')}
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const title = language === 'mn' ? article.titleMn : article.titleEn
  const content = language === 'mn' ? article.contentMn : article.contentEn
  const excerpt = language === 'mn' ? article.excerptMn : article.excerptEn

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Article Header */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600 rounded-full blur-3xl -ml-48 -mb-48"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link href="/news" className="inline-flex items-center space-x-2 text-blue-300 hover:text-white transition-colors mb-8 group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold">{t('news.backToNews')}</span>
          </Link>
          
          <h1 className="text-4xl md:text-6xl font-extrabold mb-8 leading-tight tracking-tight uppercase">
            {title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-slate-300">
            <div className="flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <Calendar className="w-4 h-4 text-red-400" />
              <span className="font-medium">{formatDate(article.publishedAt || article.createdAt)}</span>
            </div>
            {article.author && (
              <div className="flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                <User className="w-4 h-4 text-blue-400" />
                <span className="font-medium uppercase tracking-wider text-xs">{article.author}</span>
              </div>
            )}
            <Button
              onClick={shareArticle}
              variant="outline"
              size="sm"
              className="rounded-full border-white/20 text-white hover:bg-white/10 px-6 font-bold uppercase text-xs tracking-widest h-10"
            >
              <Share2 className="w-4 h-4 mr-2" />
              <span>{t('news.share')}</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-12">
          <p className="text-2xl text-slate-600 leading-relaxed font-bold border-l-8 border-red-500 pl-8 uppercase tracking-tight">
            {excerpt}
          </p>
        </div>

        {/* Featured Image */}
        {article.featuredImage && (
          <div className="mb-16 relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-red-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <img
              src={article.featuredImage}
              alt={title}
              className="relative w-full h-[400px] md:h-[500px] object-cover rounded-xl shadow-2xl"
            />
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white rounded-3xl p-8 md:p-16 border border-slate-100 shadow-2xl shadow-blue-900/5 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 opacity-50"></div>
          <div 
            className="prose prose-lg max-w-none prose-slate prose-headings:text-slate-900 prose-headings:font-black prose-headings:uppercase prose-p:text-slate-600 prose-p:leading-relaxed prose-p:font-medium prose-a:text-blue-600 prose-img:rounded-2xl prose-img:shadow-xl"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>

        {/* Image Gallery */}
        {article.images && article.images.length > 0 && (
          <div className="mb-16">
            <h3 className="text-3xl font-black text-slate-900 mb-8 flex items-center space-x-3 uppercase tracking-tight">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center shadow-inner">
                <Eye className="w-7 h-7 text-blue-600" />
              </div>
              <span>Image Gallery</span>
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {article.images.map((image, index) => (
                <div 
                  key={image.id} 
                  className="relative group cursor-pointer overflow-hidden rounded-[2rem] shadow-xl aspect-square border-4 border-white"
                  onClick={() => openImageModal(image, index)}
                >
                  <Image
                    src={image.url}
                    alt={image.alt || `Gallery image ${index + 1}`}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-md p-4 rounded-full scale-50 group-hover:scale-100 transition-all duration-500">
                      <Eye className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Article Footer */}
        <footer className="pt-12 border-t border-slate-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 bg-blue-50 p-10 rounded-[2.5rem] border border-blue-100/50 shadow-inner">
            <div>
              <p className="text-slate-900 font-black text-xl mb-1 uppercase tracking-tight">MSIC Editorial Team</p>
              <p className="text-slate-500 font-bold">Published on {formatDate(article.publishedAt || article.createdAt)}</p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
              <Link href="/news" className="flex-1 md:flex-none">
                <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-100 hover:border-blue-300 rounded-xl px-8 h-14 font-black uppercase transition-all tracking-wider">
                  More News
                </Button>
              </Link>
              <Link href="/contact" className="flex-1 md:flex-none">
                <Button className="w-full bg-slate-900 hover:bg-black text-white rounded-xl px-8 h-14 font-black uppercase shadow-lg transition-all tracking-wider">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </footer>
      </article>

      <Footer />

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4" onClick={closeImageModal}>
          <Button 
            variant="ghost" 
            className="absolute top-4 right-4 text-white hover:bg-white/10 rounded-full h-14 w-14 z-[110]"
            onClick={closeImageModal}
          >
            <X className="h-10 w-10" />
          </Button>
          
          <div className="relative w-full max-w-6xl h-[85vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <Button 
              variant="ghost" 
              className="absolute left-0 text-white hover:bg-white/10 rounded-full h-20 w-20 z-10 hidden md:flex"
              onClick={() => navigateImage('prev')}
            >
              <ChevronLeft className="h-12 w-12" />
            </Button>
            
            <div className="relative w-full h-full">
              <Image
                src={selectedImage.url}
                alt={selectedImage.alt || "Gallery image"}
                fill
                className="object-contain"
                priority
              />
            </div>

            <Button 
              variant="ghost" 
              className="absolute right-0 text-white hover:bg-white/10 rounded-full h-20 w-20 z-10 hidden md:flex"
              onClick={() => navigateImage('next')}
            >
              <ChevronRight className="h-12 w-12" />
            </Button>
          </div>
          
          <div className="absolute bottom-10 text-white text-center z-[110]" onClick={(e) => e.stopPropagation()}>
            <p className="text-xl font-bold mb-2 uppercase tracking-wide">{selectedImage.alt || selectedImage.originalName}</p>
            <p className="text-white/50 font-bold uppercase tracking-widest text-xs">Image {currentImageIndex + 1} of {article.images?.length}</p>
          </div>
        </div>
      )}
    </div>
  )
}
