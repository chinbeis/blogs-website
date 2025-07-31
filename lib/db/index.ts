import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER || 'msic_user',
  password: process.env.DB_PASSWORD || 'msic_password',
  database: process.env.DB_NAME || 'msic_db',
  ssl: false,
})

export const db = drizzle(pool, { schema })

export * from './schema'