# Deployment Guide: Vercel + Railway

This guide will help you deploy your n-port-fetcher application using Vercel for the frontend and Railway for the backend.

## Prerequisites

1. **GitHub Account** - Your code should be in a GitHub repository
2. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
3. **Railway Account** - Sign up at [railway.app](https://railway.app)

## Step 1: Deploy Backend to Railway

### 1.1 Connect Railway to GitHub
1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your `n-port-fetcher` repository

### 1.2 Configure Backend Service
1. Railway will automatically detect it's a Python project
2. Set the **Root Directory** to `/backend`
3. Railway will automatically:
   - Install dependencies from `requirements.txt`
   - Use the `Procfile` for startup command
   - Use `runtime.txt` for Python version

### 1.3 Get Backend URL
1. Once deployed, Railway will provide a URL like: `https://your-app-name.railway.app`
2. Copy this URL - you'll need it for the frontend

## Step 2: Deploy Frontend to Vercel

### 2.1 Connect Vercel to GitHub
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository: `uniqualid/n-port-fetcher`

### 2.2 Configure Frontend Settings
1. **Framework Preset**: Vite
2. **Root Directory**: `/frontend`
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`
5. **Install Command**: `npm install`

### 2.3 Set Environment Variables
1. In the Vercel project settings, go to "Environment Variables"
2. Add a new variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://your-app-name.railway.app` (use your Railway URL)
   - **Environment**: Production, Preview, Development

### 2.4 Deploy
1. Click "Deploy"
2. Vercel will build and deploy your frontend
3. You'll get a URL like: `https://your-app-name.vercel.app`

## Step 3: Test Your Deployment

1. **Frontend**: Visit your Vercel URL
2. **Backend API**: Visit `https://your-app-name.railway.app/docs`
3. **Test the app**: Try searching for a CIK (e.g., `0000320193` for Apple)

## Environment Variables

### Railway (Backend)
- `PORT`: Automatically set by Railway
- `PYTHON_VERSION`: Automatically set to 3.11

### Vercel (Frontend)
- `VITE_API_URL`: Your Railway backend URL

## Troubleshooting

### Common Issues

1. **CORS Errors**:
   - Make sure your Railway URL is in the CORS allowlist
   - Check that `VITE_API_URL` is set correctly in Vercel

2. **Build Failures**:
   - Check Railway logs for Python dependency issues
   - Check Vercel logs for Node.js build issues

3. **API Not Found**:
   - Verify the Railway service is running
   - Check the health endpoint: `https://your-app-name.railway.app/health`

### Useful Commands

```bash
# Check Railway logs
railway logs

# Check Vercel deployment status
vercel ls

# Redeploy Railway
railway up

# Redeploy Vercel
vercel --prod
```

## Cost

- **Vercel**: Free tier includes 100GB bandwidth/month
- **Railway**: Free tier includes $5 credit/month (usually enough for small apps)

## Next Steps

1. **Custom Domain**: Add your own domain to Vercel
2. **Monitoring**: Set up Railway monitoring
3. **CI/CD**: Both platforms support automatic deployments from Git

## Support

- **Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **Railway**: [docs.railway.app](https://docs.railway.app) 