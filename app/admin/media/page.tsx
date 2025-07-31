'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Upload, Trash2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface MediaFile {
  id: string
  filename: string
  originalName: string
  url: string
  size: number
  createdAt: string
}

export default function MediaLibrary() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [media, setMedia] = useState<MediaFile[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/admin/login')
      return
    }
    fetchMedia()
  }, [session, status, router])

  const fetchMedia = async () => {
    try {
      const response = await fetch('/api/media')
      if (response.ok) {
        const data = await response.json()
        setMedia(data)
      }
    } catch (error) {
      console.error('Error fetching media:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (status === 'loading' || isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-[#3a3a3a]">Media Library</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {media.map((file) => (
            <Card key={file.id} className="overflow-hidden">
              <div className="aspect-square relative">
                <Image
                  src={file.url}
                  alt={file.originalName}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-3">
                <p className="text-sm font-medium truncate">{file.originalName}</p>
                <p className="text-xs text-gray-500">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {media.length === 0 && (
          <div className="text-center py-12">
            <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">No media files uploaded yet</p>
          </div>
        )}
      </div>
    </div>
  )
}