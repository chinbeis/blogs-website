-- Step 1: Add new columns
ALTER TABLE news_articles 
ADD COLUMN title_mn TEXT,
ADD COLUMN excerpt_mn TEXT,
ADD COLUMN content_mn TEXT,
ADD COLUMN title_en TEXT,
ADD COLUMN excerpt_en TEXT,
ADD COLUMN content_en TEXT;

-- Step 2: Copy existing data
UPDATE news_articles 
SET title_en = title,
    excerpt_en = excerpt,
    content_en = content,
    title_mn = title,
    excerpt_mn = excerpt,
    content_mn = content;