import { pgTable, text, timestamp, uuid, boolean, integer } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// Users table for admin authentication
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  name: text('name').notNull(),
  role: text('role').notNull().default('admin'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

// News articles table
export const newsArticles = pgTable('news_articles', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  excerpt: text('excerpt').notNull(),
  content: text('content').notNull(),
  featuredImage: text('featured_image'),
  iconType: text('icon_type').notNull().default('calendar'),
  gradientFrom: text('gradient_from').notNull().default('from-blue-800'),
  gradientTo: text('gradient_to').notNull().default('to-red-600'),
  isPublished: boolean('is_published').notNull().default(false),
  publishedAt: timestamp('published_at'),
  authorId: uuid('author_id').notNull().references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

// Images table for article attachments
export const images = pgTable('images', {
  id: uuid('id').primaryKey().defaultRandom(),
  filename: text('filename').notNull(),
  originalName: text('original_name').notNull(),
  mimeType: text('mime_type').notNull(),
  size: integer('size').notNull(),
  url: text('url').notNull(),
  alt: text('alt'),
  articleId: uuid('article_id').references(() => newsArticles.id),
  uploadedBy: uuid('uploaded_by').notNull().references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  articles: many(newsArticles),
  images: many(images),
}))

export const newsArticlesRelations = relations(newsArticles, ({ one, many }) => ({
  author: one(users, {
    fields: [newsArticles.authorId],
    references: [users.id],
  }),
  images: many(images),
}))

export const imagesRelations = relations(images, ({ one }) => ({
  article: one(newsArticles, {
    fields: [images.articleId],
    references: [newsArticles.id],
  }),
  uploader: one(users, {
    fields: [images.uploadedBy],
    references: [users.id],
  }),
}))

// Types
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type NewsArticle = typeof newsArticles.$inferSelect
export type NewNewsArticle = typeof newsArticles.$inferInsert
export type Image = typeof images.$inferSelect
export type NewImage = typeof images.$inferInsert