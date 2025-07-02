#!/bin/bash

echo "🚀 Starting static deployment of udeals-frontend..."

ssh -o StrictHostKeyChecking=no ujzcufte@50.6.2.178 << 'EOF'
  set -e  # Exit if any command fails

  echo "📁 Navigating to Next.js project directory..."
  cd /home2/ujzcufte/udeals-frontend

  echo "📦 Pulling latest code from Git..."
  git pull origin main

  echo "📦 Installing dependencies..."
  npm install

  echo "🛠️ Building and exporting Next.js app..."
  npm run build
  npm run export

  echo "📂 Deploying static files to public_html (no deletion)..."
  rsync -av out/ /home2/ujzcufte/public_html/
EOF

echo "✅ Static site deployment complete!"
