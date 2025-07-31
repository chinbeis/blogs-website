# Vercel Deployment Guide for MSIC Blog

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Database**: Set up a PostgreSQL database (recommended: Neon, Supabase, or Vercel Postgres)
3. **Google OAuth**: Configure Google OAuth credentials for authentication

## Environment Variables

Set up the following environment variables in your Vercel project:

### Required Variables

```bash
# Database
DATABASE_URL="postgresql://username:password@host:port/database?sslmode=require"

# NextAuth Configuration
NEXTAUTH_URL="https://your-domain.vercel.app"
NEXTAUTH_SECRET="your-secret-key-here"

# Google OAuth (for admin authentication)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

## Deployment Steps

### 1. Database Setup

**Option A: Neon (Recommended)**
1. Go to [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string
4. Add `?sslmode=require` to the end

**Option B: Vercel Postgres**
1. In your Vercel dashboard, go to Storage
2. Create a new Postgres database
3. Copy the connection string

### 2. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
5. Set authorized redirect URIs:
   - `https://your-domain.vercel.app/api/auth/callback/google`
   - `http://localhost:3000/api/auth/callback/google` (for development)

### 3. Deploy to Vercel

**Method 1: Vercel CLI**
```bash
npm i -g vercel
vercel
```

**Method 2: GitHub Integration**
1. Push your code to GitHub
2. Import project in Vercel dashboard
3. Connect your GitHub repository
4. Configure environment variables
5. Deploy

### 4. Database Migration

After deployment, run the database migration:

```bash
# Using Vercel CLI
vercel env pull .env.local
npm run db:push
```

Or manually execute the SQL from `drizzle/0000_lame_centennial.sql` in your database.

### 5. Verify Deployment

1. Visit your deployed URL
2. Test Google OAuth login at `/admin/login`
3. Create a test article in the admin dashboard
4. Verify image uploads work correctly

## Post-Deployment Configuration

### Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Navigate to Settings → Domains
3. Add your custom domain
4. Update `NEXTAUTH_URL` environment variable

### Performance Optimization

- Images are automatically optimized by Next.js
- Static pages are pre-rendered for better performance
- API routes are serverless functions

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure `DATABASE_URL` includes `?sslmode=require`
   - Check database credentials

2. **OAuth Error**
   - Verify redirect URIs in Google Console
   - Check `NEXTAUTH_URL` matches your domain

3. **Build Errors**
   - Run `npm run build` locally first
   - Check TypeScript errors

### Environment Variables Check

```bash
# Verify all required variables are set
echo $DATABASE_URL
echo $NEXTAUTH_URL
echo $NEXTAUTH_SECRET
echo $GOOGLE_CLIENT_ID
echo $GOOGLE_CLIENT_SECRET
```

## Production Checklist

- [ ] Database is set up and accessible
- [ ] All environment variables are configured
- [ ] Google OAuth is working
- [ ] Admin login is functional
- [ ] Article creation/editing works
- [ ] Image uploads are working
- [ ] Custom domain is configured (if applicable)
- [ ] SSL certificate is active

## Support

For deployment issues:
1. Check Vercel function logs
2. Review build logs
3. Test locally with production environment variables

---

**Note**: This application uses Next.js 15 with the App Router and requires Node.js 18+ for deployment.