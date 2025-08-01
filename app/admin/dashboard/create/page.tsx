'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Heart, ArrowLeft, Upload, Save, Eye } from 'lucide-react'
import Link from 'next/link'

const iconTypes = [
  { value: 'calendar', label: 'Calendar' },
  { value: 'award', label: 'Award' },
  { value: 'users', label: 'Users' },
  { value: 'book', label: 'Book' },
  { value: 'globe', label: 'Globe' },
  { value: 'stethoscope', label: 'Stethoscope' }
]

const gradientOptions = [
  { from: 'from-blue-500', to: 'to-purple-600', label: 'Blue to Purple' },
  { from: 'from-green-500', to: 'to-blue-600', label: 'Green to Blue' },
  { from: 'from-purple-500', to: 'to-pink-600', label: 'Purple to Pink' },
  { from: 'from-yellow-500', to: 'to-red-600', label: 'Yellow to Red' },
  { from: 'from-indigo-500', to: 'to-blue-600', label: 'Indigo to Blue' },
  { from: 'from-red-500', to: 'to-orange-600', label: 'Red to Orange' }
]

export default function CreateNewsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [imageUploading, setImageUploading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    iconType: 'calendar',
    gradientFrom: 'from-blue-500',
    gradientTo: 'to-purple-600',
    published: false
  })

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    router.push('/admin/login')
    return null
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setImageUploading(true)
    const formDataUpload = new FormData()
    formDataUpload.append('file', file)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload
      })

      if (response.ok) {
        const data = await response.json()
        handleInputChange('featuredImage', data.url)
      } else {
        alert('Failed to upload image')
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Error uploading image')
    } finally {
      setImageUploading(false)
    }
  }

  const handleSubmit = async (published: boolean) => {
    if (!formData.title || !formData.excerpt || !formData.content) {
      alert('Please fill in all required fields')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          published
        })
      })

      if (response.ok) {
        const data = await response.json()
        router.push('/admin/dashboard')
      } else {
        alert('Failed to create article')
      }
    } catch (error) {
      console.error('Error creating article:', error)
      alert('Error creating article')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-800 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/admin/dashboard" className="flex items-center space-x-2 hover:text-amber-500 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </Link>
            <div className="flex items-center space-x-2">
                <img src="/logo.svg" alt="Logo" className="w-8 h-8" />
              <span className="text-2xl font-bold">MSIC Admin</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-blue-800">
              Create New Article
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Title */}
            <div>
              <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                Title *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter article title"
                className="mt-1"
              />
            </div>

            {/* Excerpt */}
            <div>
              <Label htmlFor="excerpt" className="text-sm font-medium text-gray-700">
                Excerpt *
              </Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => handleInputChange('excerpt', e.target.value)}
                placeholder="Brief description of the article"
                rows={3}
                className="mt-1"
              />
            </div>

            {/* Featured Image */}
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Featured Image
              </Label>
              <div className="mt-1 space-y-4">
                <div className="flex items-center space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    disabled={imageUploading}
                    onClick={() => document.getElementById('image-upload')?.click()}
                    className="flex items-center space-x-2"
                  >
                    <Upload className="w-4 h-4" />
                    <span>{imageUploading ? 'Uploading...' : 'Upload Image'}</span>
                  </Button>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
                {formData.featuredImage && (
                  <div className="relative">
                    <img
                      src={formData.featuredImage}
                      alt="Featured image preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => handleInputChange('featuredImage', '')}
                      className="absolute top-2 right-2"
                    >
                      Remove
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Icon Type and Gradient */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Icon Type
                </Label>
                <Select value={formData.iconType} onValueChange={(value) => handleInputChange('iconType', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {iconTypes.map((icon) => (
                      <SelectItem key={icon.value} value={icon.value}>
                        {icon.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Gradient Style
                </Label>
                <Select 
                  value={`${formData.gradientFrom}-${formData.gradientTo}`} 
                  onValueChange={(value) => {
                    const [from, to] = value.split('-to-')
                    handleInputChange('gradientFrom', from)
                    handleInputChange('gradientTo', `to-${to}`)
                  }}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {gradientOptions.map((gradient) => (
                      <SelectItem key={`${gradient.from}-${gradient.to}`} value={`${gradient.from}-${gradient.to}`}>
                        {gradient.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Content */}
            <div>
              <Label htmlFor="content" className="text-sm font-medium text-gray-700">
                Content *
              </Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                placeholder="Write your article content here. You can use HTML tags for formatting."
                rows={15}
                className="mt-1 font-mono text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                You can use HTML tags like &lt;p&gt;, &lt;h2&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;ul&gt;, &lt;li&gt;, etc.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                onClick={() => handleSubmit(false)}
                disabled={isLoading}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>{isLoading ? 'Saving...' : 'Save as Draft'}</span>
              </Button>
              <Button
                onClick={() => handleSubmit(true)}
                disabled={isLoading}
                className="bg-blue-800 hover:bg-blue-900 flex items-center space-x-2"
              >
                <Eye className="w-4 h-4" />
                <span>{isLoading ? 'Publishing...' : 'Publish Article'}</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}