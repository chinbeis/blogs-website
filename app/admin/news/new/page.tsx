'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Heart, ArrowLeft, Upload, X, FileText, Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import toast from 'react-hot-toast'

export default function NewArticle() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [imageUploading, setImageUploading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    isPublished: false
  })

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
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
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
    const loadingToast = toast.loading('Creating article...')
    
    try {
      const response = await fetch('/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        toast.success('Article created successfully!', { id: loadingToast })
        router.push('/admin/dashboard')
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to create article', { id: loadingToast })
      }
    } catch (error) {
      console.error('Error creating article:', error)
      toast.error('Error creating article', { id: loadingToast })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Subtle Background Decorations */}
      <div className="absolute inset-0">
        {/* Large decorative circles */}
        <div className="absolute top-10 left-10 w-32 h-32 border border-white/60 rounded-full opacity-40"></div>
        <div className="absolute top-32 right-20 w-24 h-24 border border-white/80 rounded-full opacity-30"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 border border-white/70 rounded-full opacity-35"></div>
        <div className="absolute bottom-32 right-1/3 w-16 h-16 border border-white/60 rounded-full opacity-40"></div>
        
        {/* Small decorative elements */}
        <div className="absolute top-1/4 left-1/2 w-6 h-6 bg-white/50 rounded-full opacity-60"></div>
        <div className="absolute top-3/4 left-10 w-4 h-4 bg-white/70 rounded-full opacity-40"></div>
        <div className="absolute top-1/2 right-10 w-8 h-8 bg-white/60 rounded-full opacity-50"></div>
        
        {/* Geometric shapes */}
        <div className="absolute top-20 right-1/4 w-12 h-12 border border-white/50 transform rotate-45 opacity-30"></div>
        <div className="absolute bottom-40 left-1/3 w-10 h-10 border border-white/60 transform rotate-12 opacity-35"></div>
      </div>
      
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/admin/dashboard" className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <Link href="/" className="flex items-center space-x-2">
                <Heart className="w-8 h-8 text-red-600" />
                <span className="text-xl font-bold text-slate-900">MSIC Admin</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-slate-900">Create New Article</h1>
          <p className="text-slate-600">Write and publish a new news article</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="shadow-lg border border-slate-200 bg-white/95 backdrop-blur-sm">
            <CardHeader className="bg-slate-50/50 border-b border-slate-200">
              <CardTitle className="flex items-center space-x-2 text-slate-900">
                <FileText className="w-5 h-5" />
                <span>Article Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 p-8">
              {/* Title */}
              <div className="space-y-3">
                <Label htmlFor="title" className="text-sm font-semibold text-slate-700">Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter article title"
                  required
                  className="border-slate-300 focus:ring-slate-900 focus:border-slate-900 rounded-lg py-3 text-lg"
                />
              </div>

              {/* Excerpt */}
              <div className="space-y-3">
                <Label htmlFor="excerpt" className="text-sm font-semibold text-slate-700">Description/Excerpt *</Label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  placeholder="Brief description of the article"
                  rows={3}
                  required
                  className="border-slate-300 focus:ring-slate-900 focus:border-slate-900 rounded-lg"
                />
              </div>

              {/* Featured Image */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-slate-700 flex items-center space-x-2">
                  <ImageIcon className="w-4 h-4" />
                  <span>Featured Image</span>
                </Label>
                {formData.featuredImage ? (
                  <div className="relative bg-slate-50 rounded-lg p-4">
                    <Image
                      src={formData.featuredImage}
                      alt="Featured image"
                      width={400}
                      height={200}
                      className="rounded-lg object-cover shadow-md"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-6 right-6 shadow-lg"
                      onClick={removeImage}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center bg-slate-50/50 hover:bg-slate-50 transition-colors">
                    <Upload className="w-10 h-10 mx-auto mb-3 text-slate-400" />
                    <p className="text-sm text-slate-600 mb-3 font-medium">Upload featured image</p>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={imageUploading}
                      className="max-w-xs mx-auto border-slate-300"
                    />
                    {imageUploading && (
                      <p className="text-sm text-slate-600 mt-3 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-600 mr-2"></div>
                        Uploading...
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="space-y-3">
                <Label htmlFor="content" className="text-sm font-semibold text-slate-700">Content *</Label>
                <Textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="Write your article content here..."
                  rows={12}
                  required
                  className="border-slate-300 focus:ring-slate-900 focus:border-slate-900 rounded-lg"
                />
              </div>

              {/* Publish Toggle */}
              <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                <Switch
                  id="isPublished"
                  checked={formData.isPublished}
                  onCheckedChange={handleSwitchChange}
                />
                <Label htmlFor="isPublished" className="text-sm font-medium text-slate-700">Publish immediately</Label>
              </div>

              {/* Submit Buttons */}
              <div className="flex space-x-4 pt-6 border-t border-slate-200">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-slate-900 text-white hover:bg-slate-800 transition-colors px-8 py-3 font-semibold shadow-lg"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating...
                    </div>
                  ) : (
                    'Create Article'
                  )}
                </Button>
                <Link href="/admin/dashboard">
                  <Button type="button" variant="outline" className="border-slate-300 text-slate-700 bg-white hover:bg-slate-50 hover:text-slate-900 transition-colors px-8 py-3 font-semibold">
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