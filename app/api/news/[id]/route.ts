import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
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

// PUT - Update news article
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = await params
    const body = await request.json()
    const { title, excerpt, content, featuredImage, isPublished } = body

    if (!title || !excerpt || !content) {
      return NextResponse.json(
        { error: 'Title, excerpt, and content are required' },
        { status: 400 }
      )
    }

    // Check if article exists
    const [existingArticle] = await db.select().from(newsArticles)
      .where(eq(newsArticles.id, id))
      .limit(1)

    if (!existingArticle) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      )
    }

    // Update the article
    const [updatedArticle] = await db.update(newsArticles)
      .set({
        titleMn: title,
        titleEn: title,
        excerptMn: excerpt,
        excerptEn: excerpt,
        contentMn: content,
        contentEn: content,
        featuredImage: featuredImage || null,
        isPublished: isPublished ?? false,
        updatedAt: new Date()
      })
      .where(eq(newsArticles.id, id))
      .returning()

    return NextResponse.json(updatedArticle)
  } catch (error) {
    console.error('Error updating article:', error)
    return NextResponse.json(
      { error: 'Failed to update article' },
      { status: 500 }
    )
  }
}

// DELETE - Delete news article
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = await params

    // Check if article exists
    const [existingArticle] = await db.select().from(newsArticles)
      .where(eq(newsArticles.id, id))
      .limit(1)

    if (!existingArticle) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      )
    }

    // Delete associated images first
    await db.delete(images)
      .where(eq(images.articleId, id))

    // Delete the article
    await db.delete(newsArticles)
      .where(eq(newsArticles.id, id))

    return NextResponse.json(
      { message: 'Article deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting article:', error)
    return NextResponse.json(
      { error: 'Failed to delete article' },
      { status: 500 }
    )
  }
}