#!/bin/bash

echo "🚀 Starting deployment of udeals-frontend..."

ssh -o StrictHostKeyChecking=no user@your-server-ip << 'EOF'
  cd /var/www/udeals-frontend
  git pull origin main
  npm install
  npm run build
  pm2 restart udeals-frontend
EOF

echo "Deployment complete!"
