'use client'

import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, Plus, Edit, Trash2, Eye, LogOut, Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

interface NewsArticle {
  id: string
  title: string
  excerpt: string
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session) {
      router.push('/admin/login')
      return
    }

    fetchArticles()
  }, [session, status, router])

  const fetchArticles = async () => {
    try {
      const response = await fetch('/api/news')
      if (response.ok) {
        const data = await response.json()
        setArticles(data)
      }
    } catch (error) {
      console.error('Error fetching articles:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return

    const deleteToast = toast.loading('Deleting article...')
    
    try {
      const response = await fetch(`/api/news/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setArticles(articles.filter(article => article.id !== id))
        toast.success('Article deleted successfully!', { id: deleteToast })
      } else {
        toast.error('Failed to delete article', { id: deleteToast })
      }
    } catch (error) {
      console.error('Error deleting article:', error)
      toast.error('Error deleting article', { id: deleteToast })
    }
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <header className="shadow-sm border-b bg-[#1A1f2b] border-[#3a3a3a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <Heart className="w-8 h-8 text-[#9e1b1b]" />
                <span className="text-xl font-bold text-[#f5f5f5]">MSIC Admin</span>
              </Link>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <span className="hidden sm:block text-[#f5f5f5]">Welcome, {session.user?.name}</span>
              <span className="sm:hidden text-sm text-[#f5f5f5]">Hi, {session.user?.name?.split(' ')[0]}</span>
              <Button
                variant="outline"
                onClick={handleSignOut}
                className="flex items-center space-x-1 sm:space-x-2 border-[#f5f5f5] text-[#f5f5f5] bg-transparent hover:bg-[#f5f5f5] hover:text-[#1A1f2b] transition-colors"
                 size="sm"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-[#1A1f2b]">News Management</h1>
          <p className="text-[#3a3a3a]">Manage MSIC news articles and content</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Link href="/admin/news/new">
            <Button className="w-full sm:w-auto bg-[#9e1b1b] text-[#f5f5f5] hover:bg-[#7a1515] transition-colors">
              <Plus className="w-4 h-4 mr-2" />
              New Article
            </Button>
          </Link>
          <Link href="/admin/media">
            <Button variant="outline" className="w-full sm:w-auto border-[#3a3a3a] text-[#3a3a3a] bg-transparent hover:bg-[#3a3a3a] hover:text-[#f5f5f5] transition-colors">
              <ImageIcon className="w-4 h-4 mr-2" />
              Media Library
            </Button>
          </Link>
        </div>

        {/* Articles Grid */}
        <div className="grid gap-6">
          {articles.length === 0 ? (
            <Card className="bg-[#ffffff] border-[#3a3a3a]">
              <CardContent className="text-center py-12">
                <div className="mb-4 text-[#3a3a3a]">
                  <Plus className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">No articles yet</p>
                  <p className="text-sm">Create your first news article to get started</p>
                </div>
                <Link href="/admin/news/new">
                  <Button className="bg-[#9e1b1b] text-[#f5f5f5] hover:bg-[#7a1515] transition-colors">
                    Create Article
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            articles.map((article) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow bg-[#ffffff] border-[#3a3a3a]">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2 text-[#1A1f2b]">
                        {article.title}
                      </CardTitle>
                      <p className="text-sm mb-2 text-[#3a3a3a]">
                        {article.excerpt}
                      </p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:space-x-4 text-sm text-[#3a3a3a]">
                        <div className="flex flex-col sm:flex-row gap-1 sm:gap-4">
                          <span>Created: {new Date(article.createdAt).toLocaleDateString()}</span>
                          <span>Updated: {new Date(article.updatedAt).toLocaleDateString()}</span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs self-start sm:self-auto ${
                          article.isPublished 
                            ? 'bg-[#D4AF37] text-[#1A1f2b]' 
                            : 'bg-[#f5f5f5] text-[#3a3a3a] border border-[#3a3a3a]'
                        }`}>
                          {article.isPublished ? 'Published' : 'Draft'}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-2 sm:space-x-2 sm:gap-0">
                    <Link href={`/news/${article.id}`} className="flex-1 sm:flex-none">
                      <Button variant="outline" size="sm" className="w-full sm:w-auto border-[#3a3a3a] text-[#3a3a3a] bg-transparent hover:bg-[#3a3a3a] hover:text-[#f5f5f5] transition-colors">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </Link>
                    <Link href={`/admin/news/edit/${article.id}`} className="flex-1 sm:flex-none">
                      <Button variant="outline" size="sm" className="w-full sm:w-auto border-[#D4AF37] text-[#D4AF37] bg-transparent hover:bg-[#D4AF37] hover:text-[#1A1f2b] transition-colors">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(article.id)}
                      className="w-full sm:w-auto border-[#9e1b1b] text-[#9e1b1b] bg-transparent hover:bg-[#9e1b1b] hover:text-[#f5f5f5] transition-colors"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  )
}