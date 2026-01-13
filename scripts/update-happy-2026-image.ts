import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { newsArticles } from '../lib/db/schema'
import { eq } from 'drizzle-orm'
import * as dotenv from 'dotenv'

dotenv.config()

async function updateHappy2026Image() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  })

  const db = drizzle(pool)

  try {
    // Find existing article
    const [article] = await db.select().from(newsArticles).where(eq(newsArticles.slug, 'happy-new-year-2026'))
    
    if (article) {
      await db.update(newsArticles)
        .set({ featuredImage: '/uploads/2026.jpeg' })
        .where(eq(newsArticles.id, article.id))
      console.log('✅ Happy New Year 2026 featured image updated successfully!')
    } else {
      console.error('❌ Article not found to update.')
    }
  } catch (error) {
    console.error('❌ Error updating news article:', error)
  } finally {
    await pool.end()
  }
}

updateHappy2026Image()
