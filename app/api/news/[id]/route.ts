import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db, newsArticles } from '@/lib/db'
import { eq } from 'drizzle-orm'

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET - Fetch single news article
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params
    const [article] = await db
      .select()
      .from(newsArticles)
      .where(eq(newsArticles.id, id))
      .limit(1)

    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(article)
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
  { params }: RouteParams
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
    const { title, excerpt, content, featuredImage, iconType, gradientFrom, gradientTo, isPublished } = body

    if (!title || !excerpt || !content) {
      return NextResponse.json(
        { error: 'Title, excerpt, and content are required' },
        { status: 400 }
      )
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    const updateData = {
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      iconType: iconType || 'calendar',
      gradientFrom: gradientFrom || 'from-blue-800',
      gradientTo: gradientTo || 'to-red-600',
      isPublished: isPublished || false,
      publishedAt: isPublished ? new Date() : null,
      updatedAt: new Date(),
    }

    const [updatedArticle] = await db
      .update(newsArticles)
      .set(updateData)
      .where(eq(newsArticles.id, id))
      .returning()

    if (!updatedArticle) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      )
    }

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
  { params }: RouteParams
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
    const [deletedArticle] = await db
      .delete(newsArticles)
      .where(eq(newsArticles.id, id))
      .returning()

    if (!deletedArticle) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: 'Article deleted successfully' })
  } catch (error) {
    console.error('Error deleting article:', error)
    return NextResponse.json(
      { error: 'Failed to delete article' },
      { status: 500 }
    )
  }
}