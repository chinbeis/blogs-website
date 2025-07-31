import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { put } from '@vercel/blob'
import { db, images, NewImage } from '@/lib/db'
import sharp from 'sharp'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const articleId = formData.get('articleId') as string
    const alt = formData.get('alt') as string

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      )
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size must be less than 5MB' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Generate unique filename
    const timestamp = Date.now()
    const originalName = file.name
    const extension = originalName.split('.').pop()
    const filename = `${timestamp}-${Math.random().toString(36).substring(2)}.${extension}`

    // Optimize image with Sharp
    let processedBuffer = buffer
    if (file.type.startsWith('image/')) {
      processedBuffer = await sharp(buffer)
        .resize(1200, 800, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 85 })
        .toBuffer()
    }

    // Upload to Vercel Blob
    const blob = await put(filename, processedBuffer, {
      access: 'public',
    })

    // Save to database
    const imageData: NewImage = {
      filename,
      originalName,
      mimeType: file.type,
      size: processedBuffer.length,
      url: blob.url,
      alt: alt || '',
      articleId: articleId || null,
      uploadedBy: session.user.id,
    }

    const [savedImage] = await db.insert(images).values(imageData).returning()

    return NextResponse.json(savedImage, { status: 201 })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}