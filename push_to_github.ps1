# DEVVERSE Portfolio — GitHub Push Script
# This script automatically pushes your portfolio to GitHub
# Right-click this file → "Run with PowerShell"

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "  DEVVERSE Portfolio — GitHub Uploader" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# Navigate to your project folder
$projectPath = "C:\Users\Akshatha S\.gemini\antigravity\scratch\devverse"
Set-Location $projectPath
Write-Host "✅ Found project at: $projectPath" -ForegroundColor Green

# Initialize git
Write-Host ""
Write-Host "⚙️  Initializing Git repository..." -ForegroundColor Yellow
git init
Write-Host "✅ Git initialized!" -ForegroundColor Green

# Set branch to main
git branch -M main 2>$null
Write-Host "✅ Branch set to: main" -ForegroundColor Green

# Remove old remote if exists and add correct one
Write-Host ""
Write-Host "🔗 Connecting to your GitHub repository..." -ForegroundColor Yellow
git remote remove origin 2>$null
git remote add origin https://github.com/akshatha2820/Akshatha_portfolio.git
Write-Host "✅ Connected to: https://github.com/akshatha2820/Akshatha_portfolio.git" -ForegroundColor Green

# Stage all files
Write-Host ""
Write-Host "📦 Staging all files (this may take a few seconds)..." -ForegroundColor Yellow
git add .
Write-Host "✅ All files staged!" -ForegroundColor Green

# Commit
Write-Host ""
Write-Host "💾 Creating commit..." -ForegroundColor Yellow
git commit -m "DEVVERSE Portfolio - Cosmic React App with 3D Orbit, Audio System, and Resume Viewer"
Write-Host "✅ Commit created!" -ForegroundColor Green

# Push to GitHub
Write-Host ""
Write-Host "🚀 Pushing to GitHub... (A login popup may appear — sign in to continue)" -ForegroundColor Yellow
git push -u origin main --force
Write-Host ""

if ($LASTEXITCODE -eq 0) {
    Write-Host "=========================================" -ForegroundColor Green
    Write-Host "  ✅ SUCCESS! Code pushed to GitHub!" -ForegroundColor Green
    Write-Host "=========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Your repository: https://github.com/akshatha2820/Akshatha_portfolio" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "📌 Next step — Deploy on Vercel (FREE, 1 minute):" -ForegroundColor Yellow
    Write-Host "   1. Go to: https://vercel.com" -ForegroundColor White
    Write-Host "   2. Click 'Sign in with GitHub'" -ForegroundColor White
    Write-Host "   3. Click 'Add New Project'" -ForegroundColor White
    Write-Host "   4. Select 'Akshatha_portfolio' from the list" -ForegroundColor White
    Write-Host "   5. Click 'Deploy' — done!" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host "=========================================" -ForegroundColor Red
    Write-Host "  ⚠️  Push failed. See message above." -ForegroundColor Red
    Write-Host "=========================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Try this: When the browser opens asking you to sign in to GitHub, complete the login." -ForegroundColor Yellow
    Write-Host "Then run this script again." -ForegroundColor Yellow
}

Write-Host "Press any key to close..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
