import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { newsArticles, users } from '../lib/db/schema'
import { eq } from 'drizzle-orm'
import * as dotenv from 'dotenv'

dotenv.config()

async function createNews() {
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
      console.error('❌ Admin user not found. Please run seed script first.')
      return
    }

    const titleMn = "Nomadic PCI 2025 олон улсын эрдэм шинжилгээний хурал амжилттай боллоо"
    const excerptMn = "Монгол Улсад титэм судсан дотуурх оношилгоо, эмчилгээ үүсэж хөгжсөний 25 жилийн ойд зориулсан Nomadic PCI 2025 олон улсын эрдэм шинжилгээний хурал амжилттай боллоо."
    const contentMn = `<p>Монгол Улсад титэм судсан дотуурх оношилгоо, эмчилгээ үүсэж хөгжсөний 25 жилийн ойд зориулсан Nomadic PCI 2025 олон улсын эрдэм шинжилгээний хурал амжилттай боллоо.</p><p><video src="/videos/facebook.mp4" controls style="width: 100%; border-radius: 8px;"></video></p><p>Facebook link: <a href="https://www.facebook.com/reel/1485388082501857" target="_blank" rel="noopener noreferrer">https://www.facebook.com/reel/1485388082501857</a></p>`

    const titleEn = "Nomadic PCI 2025 International Scientific Conference Successfully Held"
    const excerptEn = "The Nomadic PCI 2025 international scientific conference dedicated to the 25th anniversary of the development of coronary intervention diagnosis and treatment in Mongolia was successfully held."
    const contentEn = `<p>The Nomadic PCI 2025 international scientific conference dedicated to the 25th anniversary of the development of coronary intervention diagnosis and treatment in Mongolia was successfully held.</p><p><video src="/videos/facebook.mp4" controls style="width: 100%; border-radius: 8px;"></video></p><p>Facebook link: <a href="https://www.facebook.com/reel/1485388082501857" target="_blank" rel="noopener noreferrer">https://www.facebook.com/reel/1485388082501857</a></p>`

    await db.insert(newsArticles).values({
      titleMn,
      excerptMn,
      contentMn,
      titleEn,
      excerptEn,
      contentEn,
      slug: 'nomadic-pci-2025',
      featuredImage: '/1.png', // Using existing image as placeholder
      isPublished: true,
      publishedAt: new Date(),
      authorId: admin.id,
      iconType: 'calendar',
      gradientFrom: 'from-blue-600',
      gradientTo: 'to-blue-800'
    })

    console.log('✅ Nomadic PCI 2025 News article created successfully!')
  } catch (error) {
    console.error('❌ Error creating news article:', error)
  } finally {
    await pool.end()
  }
}

createNews()
