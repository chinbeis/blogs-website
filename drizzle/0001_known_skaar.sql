ALTER TABLE "news_articles" ADD COLUMN "title_mn" text NOT NULL;--> statement-breakpoint
ALTER TABLE "news_articles" ADD COLUMN "excerpt_mn" text NOT NULL;--> statement-breakpoint
ALTER TABLE "news_articles" ADD COLUMN "content_mn" text NOT NULL;--> statement-breakpoint
ALTER TABLE "news_articles" ADD COLUMN "title_en" text NOT NULL;--> statement-breakpoint
ALTER TABLE "news_articles" ADD COLUMN "excerpt_en" text NOT NULL;--> statement-breakpoint
ALTER TABLE "news_articles" ADD COLUMN "content_en" text NOT NULL;--> statement-breakpoint
ALTER TABLE "news_articles" DROP COLUMN "title";--> statement-breakpoint
ALTER TABLE "news_articles" DROP COLUMN "excerpt";--> statement-breakpoint
ALTER TABLE "news_articles" DROP COLUMN "content";