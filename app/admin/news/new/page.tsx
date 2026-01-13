'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Heart, ArrowLeft, Upload, X, FileText, Image as ImageIcon, Eye, EyeOff, Stethoscope, Plus } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import toast from 'react-hot-toast'

interface UploadedImage {
  id: string
  url: string
  alt: string
  originalName: string
}

export default function NewArticle() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [imageUploading, setImageUploading] = useState(false)
  const [formData, setFormData] = useState({
    titleMn: '',
    excerptMn: '',
    contentMn: '',
    titleEn: '',
    excerptEn: '',
    contentEn: '',
    featuredImage: '',
    isPublished: false
  })
  const [additionalImages, setAdditionalImages] = useState<UploadedImage[]>([])

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

  const handleAdditionalImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setImageUploading(true)
    const uploadToast = toast.loading(`Uploading ${files.length} file(s)...`)
    
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        })

        if (response.ok) {
          const data = await response.json()
          return {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            url: data.url,
            alt: file.name.split('.')[0],
            originalName: file.name
          }
        } else {
          throw new Error(`Failed to upload ${file.name}`)
        }
      })

      const uploadedImages = await Promise.all(uploadPromises)
      setAdditionalImages(prev => [...prev, ...uploadedImages])
      toast.success(`${files.length} file(s) uploaded successfully!`, { id: uploadToast })
    } catch (error) {
      console.error('Error uploading files:', error)
      toast.error('Error uploading some files', { id: uploadToast })
    } finally {
      setImageUploading(false)
    }
  }

  const removeImage = () => {
    setFormData(prev => ({ ...prev, featuredImage: '' }))
  }

  const removeAdditionalImage = (imageId: string) => {
    setAdditionalImages(prev => prev.filter(img => img.id !== imageId))
  }

  const updateImageAlt = (imageId: string, alt: string) => {
    setAdditionalImages(prev => 
      prev.map(img => img.id === imageId ? { ...img, alt } : img)
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.titleMn || !formData.excerptMn || !formData.contentMn ||
        !formData.titleEn || !formData.excerptEn || !formData.contentEn) {
      toast.error('Please fill in all required fields in both languages')
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
        body: JSON.stringify({
          ...formData,
          additionalImages
        })
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
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-white">
      {/* Medical-inspired Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle medical cross patterns */}
        <div className="absolute top-20 left-20 w-32 h-32 border border-blue-100/60 rounded-full opacity-40"></div>
        <div className="absolute top-40 right-32 w-24 h-24 border border-blue-200/50 rounded-full opacity-30"></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 border border-blue-150/40 rounded-full opacity-35"></div>
        
        {/* Soft gradient orbs */}
        <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-gradient-to-br from-blue-50/40 to-white/60 rounded-full blur-2xl opacity-60"></div>
        <div className="absolute bottom-1/3 left-1/5 w-48 h-48 bg-gradient-to-tr from-white/50 to-blue-50/40 rounded-full blur-3xl opacity-50"></div>
        
        {/* Medical plus symbols */}
        <div className="absolute top-1/3 left-1/2 w-6 h-6 text-blue-200/60 opacity-40">+</div>
        <div className="absolute top-2/3 left-16 w-4 h-4 text-blue-300/50 opacity-50">+</div>
        <div className="absolute top-1/2 right-16 w-5 h-5 text-blue-200/60 opacity-45">+</div>
      </div>
      
      {/* Clean Medical Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-blue-100/60 shadow-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/admin/dashboard" className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors duration-200 p-2 rounded-lg hover:bg-blue-50">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <img src="/logo.svg" alt="Logo" className="w-8 h-8 text-blue-600" />
                </div>
                <span className="text-xl font-semibold text-gray-800">MSIC Admin</span>
              </Link>
            </div>
            <div className="flex items-center space-x-2 text-blue-600">
              <Stethoscope className="w-5 h-5" />
              <span className="text-sm font-medium">Medical Article Editor</span>
            </div>
          </div>
        </div>
      </header>

      {/* Clean Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Simple Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">Create New Article</h1>
          <p className="text-gray-600">Write and publish a new medical news article</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="shadow-lg border border-blue-100/60 bg-white/98 rounded-xl">
            {/* Clean Card Header */}
            <CardHeader className="bg-gradient-to-r from-blue-50/50 to-white border-b border-blue-100/40">
              <CardTitle className="flex items-center space-x-3 text-gray-800 text-xl">
                <FileText className="w-6 h-6 text-blue-600" />
                <span className="font-semibold">Article Details</span>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-8 p-8">
              {/* Language Tabs */}
              <Tabs defaultValue="mongolian" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-blue-50/50">
                  <TabsTrigger value="mongolian" className="font-medium data-[state=active]:bg-white data-[state=active]:text-blue-700">Mongolian</TabsTrigger>
                  <TabsTrigger value="english" className="font-medium data-[state=active]:bg-white data-[state=active]:text-blue-700">English</TabsTrigger>
                </TabsList>
                
                {/* Mongolian Content */}
                <TabsContent value="mongolian" className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="titleMn" className="text-base font-medium text-gray-700 flex items-center space-x-2">
                      <span>Title (Mongolian)</span>
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="titleMn"
                      name="titleMn"
                      value={formData.titleMn}
                      onChange={handleInputChange}
                      placeholder="Enter article title in Mongolian..."
                      required
                      className="border border-blue-200/60 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 rounded-lg py-3 text-base bg-white/90"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="excerptMn" className="text-base font-medium text-gray-700 flex items-center space-x-2">
                      <span>Description/Excerpt (Mongolian)</span>
                      <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="excerptMn"
                      name="excerptMn"
                      value={formData.excerptMn}
                      onChange={handleInputChange}
                      placeholder="Enter article description in Mongolian..."
                      required
                      rows={3}
                      className="border border-blue-200/60 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 rounded-lg py-3 text-base bg-white/90 resize-none"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="contentMn" className="text-base font-medium text-gray-700 flex items-center space-x-2">
                      <span>Content (Mongolian)</span>
                      <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="contentMn"
                      name="contentMn"
                      value={formData.contentMn}
                      onChange={handleInputChange}
                      placeholder="Enter full article content in Mongolian..."
                      required
                      rows={8}
                      className="border border-blue-200/60 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 rounded-lg py-3 text-base bg-white/90 resize-none"
                    />
                  </div>
                </TabsContent>

                {/* English Content */}
                <TabsContent value="english" className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="titleEn" className="text-base font-medium text-gray-700 flex items-center space-x-2">
                      <span>Title (English)</span>
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="titleEn"
                      name="titleEn"
                      value={formData.titleEn}
                      onChange={handleInputChange}
                      placeholder="Enter article title in English..."
                      required
                      className="border border-blue-200/60 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 rounded-lg py-3 text-base bg-white/90"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="excerptEn" className="text-base font-medium text-gray-700 flex items-center space-x-2">
                      <span>Description/Excerpt (English)</span>
                      <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="excerptEn"
                      name="excerptEn"
                      value={formData.excerptEn}
                      onChange={handleInputChange}
                      placeholder="Enter article description in English..."
                      required
                      rows={3}
                      className="border border-blue-200/60 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 rounded-lg py-3 text-base bg-white/90 resize-none"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="contentEn" className="text-base font-medium text-gray-700 flex items-center space-x-2">
                      <span>Content (English)</span>
                      <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="contentEn"
                      name="contentEn"
                      value={formData.contentEn}
                      onChange={handleInputChange}
                      placeholder="Enter full article content in English..."
                      required
                      rows={8}
                      className="border border-blue-200/60 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 rounded-lg py-3 text-base bg-white/90 resize-none"
                    />
                  </div>
                </TabsContent>
              </Tabs>

              {/* Featured Image Upload */}
              <div className="space-y-4">
                <Label className="text-base font-medium text-gray-700 flex items-center space-x-2">
                  <ImageIcon className="w-5 h-5 text-blue-600" />
                  <span>Featured Image</span>
                </Label>
                {formData.featuredImage ? (
                  <div className="relative">
                    <div className="border border-blue-200/60 rounded-lg overflow-hidden bg-white">
                      <Image
                        src={formData.featuredImage}
                        alt="Featured image preview"
                        width={400}
                        height={250}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-6 right-6 rounded-full bg-red-500 hover:bg-red-600"
                      onClick={removeImage}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-blue-200/60 rounded-lg p-8 text-center bg-blue-50/20 hover:bg-blue-50/30 transition-colors">
                    <Upload className="w-12 h-12 mx-auto mb-3 text-blue-400" />
                    <p className="text-base text-gray-700 mb-2 font-medium">Upload featured image</p>
                    <p className="text-sm text-gray-500 mb-4">Drag and drop or click to browse</p>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={imageUploading}
                      className="max-w-xs mx-auto border border-blue-200/60"
                    />
                    {imageUploading && (
                      <div className="mt-3 flex items-center justify-center text-blue-600">
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent mr-2"></div>
                        <span className="text-sm">Uploading...</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Additional Files Upload */}
              <div className="space-y-4">
                <Label className="text-base font-medium text-gray-700 flex items-center space-x-2">
                  <ImageIcon className="w-5 h-5 text-blue-600" />
                  <span>Attachments / Gallery</span>
                  <span className="text-sm text-gray-500 font-normal">(Images, Videos, PDFs)</span>
                </Label>
                
                {/* Upload Area */}
                <div className="border-2 border-dashed border-blue-200/60 rounded-lg p-6 text-center bg-blue-50/20 hover:bg-blue-50/30 transition-colors">
                  <Plus className="w-10 h-10 mx-auto mb-3 text-blue-400" />
                  <p className="text-base text-gray-700 mb-2 font-medium">Add files</p>
                  <p className="text-sm text-gray-500 mb-4">Select images, videos or PDFs</p>
                  <Input
                    type="file"
                    accept="image/*,application/pdf,video/*"
                    multiple
                    onChange={handleAdditionalImageUpload}
                    disabled={imageUploading}
                    className="max-w-xs mx-auto border border-blue-200/60"
                  />
                  {imageUploading && (
                    <div className="mt-3 flex items-center justify-center text-blue-600">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent mr-2"></div>
                      <span className="text-sm">Uploading...</span>
                    </div>
                  )}
                </div>

                {/* Additional Files Preview */}
                {additionalImages.length > 0 && (
                  <div className="space-y-4">
                    <p className="text-sm font-medium text-gray-700">
                      Files ({additionalImages.length})
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {additionalImages.map((image) => {
                        const isImage = /\.(jpg|jpeg|png|gif|webp|avif)$/i.test(image.originalName);
                        const isVideo = /\.(mp4|webm|ogg)$/i.test(image.originalName);
                        
                        return (
                          <div key={image.id} className="relative group">
                            <div className="border border-blue-200/60 rounded-lg overflow-hidden bg-white h-32 flex items-center justify-center relative">
                              {isImage ? (
                                <Image
                                  src={image.url}
                                  alt={image.alt}
                                  width={200}
                                  height={150}
                                  className="w-full h-32 object-cover"
                                />
                              ) : isVideo ? (
                                <video src={image.url} className="w-full h-32 object-cover" controls />
                              ) : (
                                <div className="flex flex-col items-center justify-center p-4">
                                  <FileText className="w-8 h-8 text-gray-400 mb-2" />
                                  <span className="text-xs text-gray-500 truncate w-full text-center px-2">{image.originalName}</span>
                                </div>
                              )}
                            </div>
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute top-2 right-2 rounded-full bg-red-500 hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => removeAdditionalImage(image.id)}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                            <div className="mt-2">
                              <Input
                                type="text"
                                placeholder="Alt text (optional)"
                                value={image.alt}
                                onChange={(e) => updateImageAlt(image.id, e.target.value)}
                                className="text-xs border border-blue-200/60 focus:ring-1 focus:ring-blue-500/50"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Clean Publish Toggle */}
              <div className="flex items-center justify-between p-4 bg-blue-50/40 rounded-lg border border-blue-200/40">
                <div className="flex items-center space-x-3">
                  {formData.isPublished ? (
                    <Eye className="w-5 h-5 text-green-600" />
                  ) : (
                    <EyeOff className="w-5 h-5 text-orange-500" />
                  )}
                  <div>
                    <Label htmlFor="isPublished" className="text-base font-medium text-gray-800 cursor-pointer">
                      {formData.isPublished ? 'Publish Immediately' : 'Save as Draft'}
                    </Label>
                    <p className="text-sm text-gray-600">
                      {formData.isPublished 
                        ? 'Article will be visible to all users' 
                        : 'Article will be saved as draft'
                      }
                    </p>
                  </div>
                </div>
                <Switch
                  id="isPublished"
                  checked={formData.isPublished}
                  onCheckedChange={handleSwitchChange}
                  className="data-[state=checked]:bg-green-600"
                />
              </div>

              {/* Clean Submit Buttons */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-blue-100/60">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 font-medium rounded-lg shadow-sm hover:shadow-md transition-all"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                      Creating Article...
                    </div>
                  ) : (
                    'Create Article'
                  )}
                </Button>
                
                <Link href="/admin/dashboard">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 px-8 py-3 font-medium rounded-lg"
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
