import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { newsArticles, users } from '../lib/db/schema'
import { eq } from 'drizzle-orm'
import * as dotenv from 'dotenv'

dotenv.config()

async function createHappy2026News() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  })

  const db = drizzle(pool)

  try {
    // Find admin user
    const [admin] = await db.select().from(users).where(eq(users.email, 'admin@msic.mn'))
    
    if (!admin) {
      console.error('❌ Admin user not found.')
      return
    }

    const titleMn = "Шинэ оны мэнд хүргэе - 2026"
    const excerptMn = "2026 оны шинэ оны мэнд хүргэе!"
    const contentMn = `<p>2026 оны шинэ оны мэнд хүргэе!</p><p><video src="/videos/0-02-08-4801caae0193433367ee774006c3b18b48c1c7e3b668b4a7ebdaa1e481c2fc26_222e3a8f266.mp4" controls style="width: 100%; border-radius: 8px;"></video></p>`

    const titleEn = "Happy New Year 2026"
    const excerptEn = "Wishing you a Happy New Year 2026!"
    const contentEn = `<p>Happy New Year 2026!</p><p><video src="/videos/0-02-08-4801caae0193433367ee774006c3b18b48c1c7e3b668b4a7ebdaa1e481c2fc26_222e3a8f266.mp4" controls style="width: 100%; border-radius: 8px;"></video></p>`

    await db.insert(newsArticles).values({
      titleMn,
      excerptMn,
      contentMn,
      titleEn,
      excerptEn,
      contentEn,
      slug: 'happy-new-year-2026',
      featuredImage: '/1.png',
      isPublished: true,
      publishedAt: new Date(),
      authorId: admin.id,
      iconType: 'calendar',
      gradientFrom: 'from-red-500',
      gradientTo: 'to-red-700'
    })

    console.log('✅ Happy New Year 2026 News article created successfully!')
  } catch (error) {
    console.error('❌ Error creating news article:', error)
  } finally {
    await pool.end()
  }
}

createHappy2026News()
