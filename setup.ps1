# Setup script for the SRL Sidebar monorepo

Write-Host "🚀 Setting up SRL Sidebar monorepo..." -ForegroundColor Cyan

# Install root dependencies
Write-Host "`n📦 Installing root dependencies..." -ForegroundColor Yellow
npm install

# Install package dependencies
Write-Host "`n📦 Installing package dependencies..." -ForegroundColor Yellow
npm install -w @rwm/srl-sidebar

# Install demo dependencies
Write-Host "`n📦 Installing demo dependencies..." -ForegroundColor Yellow
npm install -w @rwm/srl-sidebar-demo

Write-Host "`n✅ Setup complete!" -ForegroundColor Green
Write-Host "`nAvailable commands:" -ForegroundColor Cyan
Write-Host "  npm run dev          - Start demo app" -ForegroundColor White
Write-Host "  npm test             - Run component tests" -ForegroundColor White
Write-Host "  npm run build        - Build component package" -ForegroundColor White
Write-Host "  npm run build:demo   - Build demo app" -ForegroundColor White
Write-Host "`nHappy coding! 🎉" -ForegroundColor Magenta
