@echo off
setlocal EnableExtensions

REM Vercel へデプロイする（Windows cmd）
REM 使い方:
REM   scripts\deploy.cmd           → Preview
REM   scripts\deploy.cmd prod      → Production

cd /d "%~dp0.."
if errorlevel 1 (
  echo failed to cd to project root
  exit /b 1
)

where npm >nul 2>&1
if errorlevel 1 (
  echo npm が見つかりません。Node.js を入れてから再実行してください。
  exit /b 1
)

if not exist "node_modules\" (
  echo npm install...
  call npm install
  if errorlevel 1 exit /b 1
)

set MODE=%~1
if /I "%MODE%"=="prod" (
  echo Deploying to Production...
  call npx --yes vercel --prod --yes
) else (
  echo Deploying to Preview...
  call npx --yes vercel --yes
)

exit /b %ERRORLEVEL%
