-- Step 1: Add new columns as nullable first
ALTER TABLE "news_articles" ADD COLUMN "title_mn" text;
ALTER TABLE "news_articles" ADD COLUMN "excerpt_mn" text;
ALTER TABLE "news_articles" ADD COLUMN "content_mn" text;
ALTER TABLE "news_articles" ADD COLUMN "title_en" text;
ALTER TABLE "news_articles" ADD COLUMN "excerpt_en" text;
ALTER TABLE "news_articles" ADD COLUMN "content_en" text;

-- Step 2: Migrate existing data (assuming current data is Mongolian)
UPDATE "news_articles" SET 
  "title_mn" = "title",
  "excerpt_mn" = "excerpt", 
  "content_mn" = "content",
  "title_en" = "title",  -- or provide English translations
  "excerpt_en" = "excerpt",  -- or provide English translations
  "content_en" = "content";  -- or provide English translations

-- Step 3: Make columns NOT NULL after data migration
ALTER TABLE "news_articles" ALTER COLUMN "title_mn" SET NOT NULL;
ALTER TABLE "news_articles" ALTER COLUMN "excerpt_mn" SET NOT NULL;
ALTER TABLE "news_articles" ALTER COLUMN "content_mn" SET NOT NULL;
ALTER TABLE "news_articles" ALTER COLUMN "title_en" SET NOT NULL;
ALTER TABLE "news_articles" ALTER COLUMN "excerpt_en" SET NOT NULL;
ALTER TABLE "news_articles" ALTER COLUMN "content_en" SET NOT NULL;

-- Step 4: Drop old columns
ALTER TABLE "news_articles" DROP COLUMN "title";
ALTER TABLE "news_articles" DROP COLUMN "excerpt";
ALTER TABLE "news_articles" DROP COLUMN "content";