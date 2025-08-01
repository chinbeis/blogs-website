'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Heart, ArrowLeft, Upload, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import toast from 'react-hot-toast'

interface NewsArticle {
  id: string
  title: string
  excerpt: string
  content: string
  featuredImage: string | null
  isPublished: boolean
}

export default function EditArticle({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [imageUploading, setImageUploading] = useState(false)
  const [loading, setLoading] = useState(true)
  const [articleId, setArticleId] = useState<string>('')
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    isPublished: false
  })

  useEffect(() => {
    const initializeParams = async () => {
      const resolvedParams = await params
      setArticleId(resolvedParams.id)
    }
    initializeParams()
  }, [params])

  useEffect(() => {
    if (articleId) {
      fetchArticle()
    }
  }, [articleId])

  const fetchArticle = async () => {
    try {
      const response = await fetch(`/api/news/${articleId}`)
      if (response.ok) {
        const article: NewsArticle = await response.json()
        setFormData({
          title: article.title,
          excerpt: article.excerpt,
          content: article.content,
          featuredImage: article.featuredImage || '',
          isPublished: article.isPublished
        })
      } else {
        alert('Article not found')
        router.push('/admin/dashboard')
      }
    } catch (error) {
      console.error('Error fetching article:', error)
      alert('Error loading article')
      router.push('/admin/dashboard')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, isPublished: checked }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setImageUploading(true)
    const uploadToast = toast.loading('Uploading image...')
    
    try {
      const uploadFormData = new FormData()
      uploadFormData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData
      })

      if (response.ok) {
        const data = await response.json()
        setFormData(prev => ({ ...prev, featuredImage: data.url }))
        toast.success('Image uploaded successfully!', { id: uploadToast })
      } else {
        toast.error('Failed to upload image', { id: uploadToast })
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      toast.error('Error uploading image', { id: uploadToast })
    } finally {
      setImageUploading(false)
    }
  }

  const removeImage = () => {
    setFormData(prev => ({ ...prev, featuredImage: '' }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title || !formData.excerpt || !formData.content) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsLoading(true)
    const loadingToast = toast.loading('Updating article...')
    
    try {
      const response = await fetch(`/api/news/${articleId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        toast.success('Article updated successfully!', { id: loadingToast })
        router.push('/admin/dashboard')
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to update article', { id: loadingToast })
      }
    } catch (error) {
      console.error('Error updating article:', error)
      toast.error('Error updating article', { id: loadingToast })
    } finally {
      setIsLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/admin/dashboard" className="flex items-center space-x-2">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <Link href="/" className="flex items-center space-x-2">
                <img src="/logo.svg" alt="Logo" className="w-8 h-8 text-red-600" />
                <span className="text-xl font-bold text-blue-800">MSIC Admin</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-800 mb-2">Edit Article</h1>
          <p className="text-gray-600">Update your news article</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Article Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter article title"
                  required
                />
              </div>

              {/* Excerpt */}
              <div className="space-y-2">
                <Label htmlFor="excerpt">Description/Excerpt *</Label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  placeholder="Brief description of the article"
                  rows={3}
                  required
                />
              </div>

              {/* Featured Image */}
              <div className="space-y-2">
                <Label>Featured Image</Label>
                {formData.featuredImage ? (
                  <div className="relative">
                    <Image
                      src={formData.featuredImage}
                      alt="Featured image"
                      width={400}
                      height={200}
                      className="rounded-lg object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={removeImage}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600 mb-2">Upload featured image</p>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={imageUploading}
                      className="max-w-xs mx-auto"
                    />
                    {imageUploading && (
                      <p className="text-sm text-blue-600 mt-2">Uploading...</p>
                    )}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="Write your article content here..."
                  rows={12}
                  required
                />
              </div>

              {/* Publish Toggle */}
              <div className="flex items-center space-x-2">
                <Switch
                  id="isPublished"
                  checked={formData.isPublished}
                  onCheckedChange={handleSwitchChange}
                />
                <Label htmlFor="isPublished">Published</Label>
              </div>

              {/* Submit Buttons */}
              <div className="flex space-x-4 pt-6">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-blue-800 hover:bg-blue-900"
                >
                  {isLoading ? 'Updating...' : 'Update Article'}
                </Button>
                <Link href="/admin/dashboard">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </form>
      </main>
    </div>
  )
}