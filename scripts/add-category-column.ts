import { Pool } from 'pg'
import * as dotenv from 'dotenv'

dotenv.config()

async function addCategoryColumn() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  })

  try {
    const client = await pool.connect()
    await client.query("ALTER TABLE news_articles ADD COLUMN IF NOT EXISTS category TEXT NOT NULL DEFAULT 'news';")
    client.release()
    console.log('✅ category column added successfully!')
  } catch (error) {
    console.error('❌ Error adding column:', error)
  } finally {
    await pool.end()
  }
}

addCategoryColumn()
