-- Add new multilingual columns (nullable first)
ALTER TABLE news_articles 
ADD COLUMN title_mn TEXT,
ADD COLUMN excerpt_mn TEXT,
ADD COLUMN content_mn TEXT,
ADD COLUMN title_en TEXT,
ADD COLUMN excerpt_en TEXT,
ADD COLUMN content_en TEXT;

-- Copy existing data to English columns
UPDATE news_articles 
SET title_en = title,
    excerpt_en = excerpt,
    content_en = content;

-- For now, copy English to Mongolian (you can update these later)
UPDATE news_articles 
SET title_mn = title,
    excerpt_mn = excerpt,
    content_mn = content;

-- Set NOT NULL constraints after data migration
ALTER TABLE news_articles 
ALTER COLUMN title_mn SET NOT NULL,
ALTER COLUMN excerpt_mn SET NOT NULL,
ALTER COLUMN content_mn SET NOT NULL,
ALTER COLUMN title_en SET NOT NULL,
ALTER COLUMN excerpt_en SET NOT NULL,
ALTER COLUMN content_en SET NOT NULL;

-- Drop old columns
ALTER TABLE news_articles 
DROP COLUMN title,
DROP COLUMN excerpt,
DROP COLUMN content;