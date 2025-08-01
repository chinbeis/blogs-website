import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db, newsArticles, images, NewNewsArticle, NewImage } from '@/lib/db'
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
    const { 
      titleMn, excerptMn, contentMn,
      titleEn, excerptEn, contentEn,
      featuredImage, iconType, gradientFrom, gradientTo, isPublished,
      additionalImages = []
    } = body

    if (!titleMn || !excerptMn || !contentMn || !titleEn || !excerptEn || !contentEn) {
      return NextResponse.json(
        { error: 'All title, excerpt, and content fields are required in both languages' },
        { status: 400 }
      )
    }

    // Generate slug from English title
    const slug = titleEn
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    const newArticle: NewNewsArticle = {
      titleMn,
      excerptMn,
      contentMn,
      titleEn,
      excerptEn,
      contentEn,
      slug,
      featuredImage,
      iconType: iconType || 'calendar',
      gradientFrom: gradientFrom || 'from-blue-800',
      gradientTo: gradientTo || 'to-red-600',
      isPublished: isPublished || false,
      publishedAt: isPublished ? new Date() : null,
      authorId: session.user.id,
    }

    const [article] = await db.insert(newsArticles).values(newArticle).returning()
    
    // Insert additional images if any
    if (additionalImages.length > 0) {
      const imageRecords: NewImage[] = additionalImages.map((img: any) => ({
        filename: img.url.split('/').pop() || 'unknown',
        originalName: img.originalName,
        mimeType: 'image/jpeg', // You might want to detect this properly
        size: 0, // You might want to store actual file size
        url: img.url,
        alt: img.alt || '',
        articleId: article.id,
        uploadedBy: session.user.id,
      }))

      await db.insert(images).values(imageRecords)
    }
    
    return NextResponse.json(article, { status: 201 })
  } catch (error) {
    console.error('Error creating news article:', error)
    return NextResponse.json(
      { error: 'Failed to create news article' },
      { status: 500 }
    )
  }
}