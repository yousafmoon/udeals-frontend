#!/bin/bash

echo "🚀 Starting deployment of udeals-frontend..."

ssh -o StrictHostKeyChecking=no ujzcufte@50.6.2.178 << 'EOF'
  cd /home2/ujzcufte/public_html/udeals-frontend
  git pull origin main
  npm install
  npm run build
  pm2 restart udeals-frontend
EOF

echo "Deployment complete!"
