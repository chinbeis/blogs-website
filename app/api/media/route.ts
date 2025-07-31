import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db, images } from '@/lib/db'
import { desc } from 'drizzle-orm'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const mediaFiles = await db
      .select({
        id: images.id,
        filename: images.filename,
        originalName: images.originalName,
        url: images.url,
        size: images.size,
        createdAt: images.createdAt,
      })
      .from(images)
      .orderBy(desc(images.createdAt))

    return NextResponse.json(mediaFiles)
  } catch (error) {
    console.error('Error fetching media:', error)
    return NextResponse.json(
      { error: 'Failed to fetch media' },
      { status: 500 }
    )
  }
}