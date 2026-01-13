import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { newsArticles } from '../lib/db/schema'
import { eq } from 'drizzle-orm'
import * as dotenv from 'dotenv'

dotenv.config()

async function updateNewYearVideo() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  })

  const db = drizzle(pool)

  try {
    // Find existing New Year article
    const [article] = await db.select().from(newsArticles).where(eq(newsArticles.slug, 'happy-new-year-2026'))
    
    if (article) {
      const contentMn = `<p>2026 оны шинэ оны мэнд хүргэе!</p><p><video src="/videos/facebook.mp4" controls style="width: 100%; border-radius: 8px;"></video></p>`
      const contentEn = `<p>Happy New Year 2026!</p><p><video src="/videos/facebook.mp4" controls style="width: 100%; border-radius: 8px;"></video></p>`

      await db.update(newsArticles)
        .set({ contentMn, contentEn })
        .where(eq(newsArticles.id, article.id))
      console.log('✅ New Year news video updated to facebook.mp4!')
    } else {
      console.error('❌ New Year article not found to update.')
    }
  } catch (error) {
    console.error('❌ Error updating news article:', error)
  } finally {
    await pool.end()
  }
}

updateNewYearVideo()
