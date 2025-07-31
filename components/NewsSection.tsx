'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { NewsCard } from "@/components/NewsCard"
import { ArrowRight } from "lucide-react"
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

export function NewsSection() {
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
        // Take only the first 6 articles for the homepage
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
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">Latest News</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Stay updated with the latest developments, conferences, and achievements in interventional cardiology.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
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
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">Latest News</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Stay updated with the latest developments, conferences, and achievements in interventional cardiology.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
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
        
        <div className="text-center mt-12">
          <Link href="/news">
            <Button size="lg" className="bg-red-600 hover:bg-blue-800">
              View All News
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}