import { NextRequest, NextResponse } from 'next/server'
import { db, newsArticles, images } from '@/lib/db'
import { eq } from 'drizzle-orm'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Fetch the article
    const [article] = await db.select().from(newsArticles)
      .where(eq(newsArticles.id, id))
      .limit(1)

    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      )
    }

    // Fetch associated images
    const articleImages = await db.select().from(images)
      .where(eq(images.articleId, id))

    // Combine article with images
    const articleWithImages = {
      ...article,
      images: articleImages
    }

    return NextResponse.json(articleWithImages)
  } catch (error) {
    console.error('Error fetching article:', error)
    return NextResponse.json(
      { error: 'Failed to fetch article' },
      { status: 500 }
    )
  }
}