import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import bcrypt from 'bcryptjs'
import { users } from '../lib/db/schema'

async function seed() {
  const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER || 'msic_user',
    password: process.env.DB_PASSWORD || 'msic_password',
    database: process.env.DB_NAME || 'msic_db',
  })

  const db = drizzle(pool)

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash('admin123', 12)

    // Insert admin user
    await db.insert(users).values({
      email: 'admin@msic.mn',
      password: hashedPassword,
      name: 'MSIC Admin',
      role: 'admin'
    })

    console.log('✅ Admin user created successfully!')
    console.log('Email: admin@msic.mn')
    console.log('Password: admin123')
  } catch (error) {
    console.error('❌ Error creating admin user:', error)
  } finally {
    await pool.end()
  }
}

seed()