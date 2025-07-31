import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db, newsArticles, NewNewsArticle } from '@/lib/db'
import { eq, desc } from 'drizzle-orm'

// GET - Fetch all news articles
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const published = searchParams.get('published')
    
    let articles
    
    if (published === 'true') {
      articles = await db.select().from(newsArticles)
        .where(eq(newsArticles.isPublished, true))
        .orderBy(desc(newsArticles.createdAt))
    } else {
      articles = await db.select().from(newsArticles)
        .orderBy(desc(newsArticles.createdAt))
    }
    
    return NextResponse.json(articles)
  } catch (error) {
    console.error('Error fetching news:', error)
    return NextResponse.json(
      { error: 'Failed to fetch news articles' },
      { status: 500 }
    )
  }
}

// POST - Create new news article
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

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

    const newArticle: NewNewsArticle = {
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
      authorId: session.user.id,
    }

    const [article] = await db.insert(newsArticles).values(newArticle).returning()
    
    return NextResponse.json(article, { status: 201 })
  } catch (error) {
    console.error('Error creating news article:', error)
    return NextResponse.json(
      { error: 'Failed to create news article' },
      { status: 500 }
    )
  }
}