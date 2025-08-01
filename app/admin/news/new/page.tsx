'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Heart, ArrowLeft, Upload, X, FileText, Image as ImageIcon, Eye, EyeOff, Sparkles } from 'lucide-react'
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
      {/* Enhanced Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated geometric shapes */}
        <div className="absolute top-10 left-10 w-40 h-40 border-2 border-slate-200/40 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-32 right-20 w-32 h-32 border border-slate-300/50 rounded-full opacity-40 animate-bounce" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-28 h-28 border-2 border-slate-200/60 rounded-full opacity-35 animate-ping" style={{ animationDuration: '3s' }}></div>
        <div className="absolute bottom-32 right-1/3 w-24 h-24 border border-slate-300/40 rounded-full opacity-30"></div>
        
        {/* Gradient orbs */}
        <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-gradient-to-br from-blue-50/30 to-slate-100/40 rounded-full blur-2xl opacity-50"></div>
        <div className="absolute bottom-1/3 left-1/5 w-64 h-64 bg-gradient-to-tr from-slate-50/40 to-blue-50/30 rounded-full blur-3xl opacity-40"></div>
        
        {/* Small decorative elements */}
        <div className="absolute top-1/4 left-1/2 w-8 h-8 bg-gradient-to-br from-slate-300/60 to-slate-400/40 rounded-full opacity-50 animate-pulse"></div>
        <div className="absolute top-3/4 left-10 w-6 h-6 bg-slate-300/50 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-10 w-10 h-10 bg-gradient-to-br from-slate-200/70 to-slate-300/50 rounded-full opacity-40 animate-ping" style={{ animationDuration: '2s' }}></div>
        
        {/* Geometric shapes */}
        <div className="absolute top-20 right-1/4 w-16 h-16 border-2 border-slate-200/50 transform rotate-45 opacity-30 animate-spin" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-40 left-1/3 w-12 h-12 border border-slate-300/60 transform rotate-12 opacity-35"></div>
        
        {/* Scattered dots */}
        <div className="absolute top-16 left-1/3 w-3 h-3 bg-slate-400/40 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-slate-300/60 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-24 right-1/5 w-4 h-4 bg-slate-300/50 rounded-full animate-ping" style={{ animationDuration: '2.5s' }}></div>
      </div>
      
      {/* Enhanced Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-200/60 shadow-lg relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-6">
              <Link href="/admin/dashboard" className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-all duration-300 hover:scale-105 p-2 rounded-full hover:bg-slate-100">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <Heart className="w-10 h-10 text-red-600 group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute -inset-1 bg-red-600/20 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"></div>
                </div>
                <span className="text-2xl font-bold text-slate-900 group-hover:text-slate-700 transition-colors duration-300">MSIC Admin</span>
              </Link>
            </div>
            <div className="flex items-center space-x-2 text-slate-500">
              <Sparkles className="w-5 h-5 animate-pulse" />
              <span className="text-sm font-medium">Article Editor</span>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Main Content */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Enhanced Header Section */}
        <div className="mb-12 text-center relative">
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-2 opacity-60">
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
              <FileText className="w-4 h-4 text-slate-400 animate-pulse" />
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 relative">
            Create New Article
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-slate-300 via-slate-500 to-slate-300 rounded-full opacity-60"></div>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">Write and publish a new news article for your audience</p>
        </div>

        <form onSubmit={handleSubmit} className="relative">
          {/* Background glow effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-slate-200/30 via-white/40 to-slate-200/30 rounded-3xl blur-xl opacity-60"></div>
          
          <Card className="relative shadow-2xl border-0 bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden">
            {/* Enhanced Card Header */}
            <CardHeader className="bg-gradient-to-r from-slate-50/80 to-slate-100/60 border-b border-slate-200/60 relative">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-400 via-slate-600 to-slate-400"></div>
              <CardTitle className="flex items-center space-x-3 text-slate-900 text-2xl">
                <div className="relative">
                  <FileText className="w-7 h-7" />
                  <div className="absolute -inset-1 bg-slate-400/20 rounded-full opacity-50 animate-pulse"></div>
                </div>
                <span className="font-bold">Article Details</span>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-10 p-10">
              {/* Enhanced Title */}
              <div className="space-y-4 group">
                <Label htmlFor="title" className="text-lg font-bold text-slate-800 flex items-center space-x-2">
                  <span>Title</span>
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter an engaging article title..."
                  required
                  className="border-2 border-slate-300 focus:ring-2 focus:ring-slate-500 focus:border-slate-500 rounded-xl py-4 text-lg font-medium shadow-sm hover:shadow-md transition-all duration-300 bg-white/80"
                />
              </div>

              {/* Enhanced Excerpt */}
              <div className="space-y-4 group">
                <Label htmlFor="excerpt" className="text-lg font-bold text-slate-800 flex items-center space-x-2">
                  <span>Description/Excerpt</span>
                  <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  placeholder="Write a compelling description that summarizes your article..."
                  rows={4}
                  required
                  className="border-2 border-slate-300 focus:ring-2 focus:ring-slate-500 focus:border-slate-500 rounded-xl text-base shadow-sm hover:shadow-md transition-all duration-300 bg-white/80"
                />
              </div>

              {/* Enhanced Featured Image */}
              <div className="space-y-4">
                <Label className="text-lg font-bold text-slate-800 flex items-center space-x-3">
                  <ImageIcon className="w-6 h-6 text-slate-600" />
                  <span>Featured Image</span>
                </Label>
                {formData.featuredImage ? (
                  <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 shadow-lg">
                    <div className="relative overflow-hidden rounded-xl shadow-xl">
                      <Image
                        src={formData.featuredImage}
                        alt="Featured image"
                        width={500}
                        height={250}
                        className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-8 right-8 shadow-2xl hover:scale-110 transition-transform duration-300 rounded-full"
                      onClick={removeImage}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-slate-300 rounded-2xl p-12 text-center bg-gradient-to-br from-slate-50/80 to-white hover:from-slate-100/80 hover:to-slate-50 transition-all duration-300 shadow-inner group">
                    <div className="relative">
                      <Upload className="w-16 h-16 mx-auto mb-4 text-slate-400 group-hover:text-slate-600 group-hover:scale-110 transition-all duration-300" />
                      <div className="absolute -inset-2 border border-slate-300/50 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"></div>
                    </div>
                    <p className="text-lg text-slate-700 mb-4 font-semibold">Upload featured image</p>
                    <p className="text-sm text-slate-500 mb-6">Drag and drop or click to browse</p>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={imageUploading}
                      className="max-w-xs mx-auto border-2 border-slate-300 rounded-lg font-medium"
                    />
                    {imageUploading && (
                      <div className="mt-4 flex items-center justify-center text-slate-600">
                        <div className="animate-spin rounded-full h-6 w-6 border-2 border-slate-600 border-t-transparent mr-3"></div>
                        <span className="font-medium">Uploading image...</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Enhanced Content */}
              <div className="space-y-4 group">
                <Label htmlFor="content" className="text-lg font-bold text-slate-800 flex items-center space-x-2">
                  <span>Content</span>
                  <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="Write your article content here. Use paragraphs to structure your content effectively..."
                  rows={16}
                  required
                  className="border-2 border-slate-300 focus:ring-2 focus:ring-slate-500 focus:border-slate-500 rounded-xl text-base leading-relaxed shadow-sm hover:shadow-md transition-all duration-300 bg-white/80"
                />
              </div>

              {/* Enhanced Publish Toggle */}
              <div className="relative">
                <div className="flex items-center justify-between p-6 bg-gradient-to-r from-slate-100/80 to-slate-50/60 rounded-2xl border-2 border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="flex items-center space-x-4">
                    {formData.isPublished ? (
                      <Eye className="w-6 h-6 text-green-600" />
                    ) : (
                      <EyeOff className="w-6 h-6 text-orange-500" />
                    )}
                    <div>
                      <Label htmlFor="isPublished" className="text-lg font-bold text-slate-800 cursor-pointer">
                        {formData.isPublished ? 'Publish Immediately' : 'Save as Draft'}
                      </Label>
                      <p className="text-sm text-slate-600 mt-1">
                        {formData.isPublished 
                          ? 'Article will be visible to all users immediately' 
                          : 'Article will be saved as draft for later publishing'
                        }
                      </p>
                    </div>
                  </div>
                  <div className="relative">
                    <Switch
                      id="isPublished"
                      checked={formData.isPublished}
                      onCheckedChange={handleSwitchChange}
                      className="scale-125 data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-slate-400"
                    />
                  </div>
                </div>
                
                {/* Status indicator */}
                <div className={`absolute -top-2 -right-2 px-3 py-1 rounded-full text-xs font-bold shadow-lg ${
                  formData.isPublished 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : 'bg-orange-100 text-orange-800 border border-orange-200'
                }`}>
                  {formData.isPublished ? 'LIVE' : 'DRAFT'}
                </div>
              </div>

              {/* Enhanced Submit Buttons */}
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 pt-8 border-t-2 border-slate-200/60">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-slate-800 to-slate-900 text-white hover:from-slate-700 hover:to-slate-800 transition-all duration-300 px-10 py-4 font-bold text-lg shadow-xl hover:shadow-2xl rounded-xl hover:scale-105 group"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent mr-3"></div>
                      Creating Article...
                    </div>
                  ) : (
                    <span className="flex items-center">
                      Create Article
                      <Sparkles className="ml-2 w-5 h-5 group-hover:animate-pulse" />
                    </span>
                  )}
                </Button>
                
                <Link href="/admin/dashboard">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="border-2 border-slate-300 text-slate-700 bg-white/80 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-400 transition-all duration-300 px-10 py-4 font-bold text-lg shadow-lg hover:shadow-xl rounded-xl hover:scale-105"
                  >
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