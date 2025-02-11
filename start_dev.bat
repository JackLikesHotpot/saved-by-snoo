@echo off

REM Start Flask backend
start "Backend" cmd /c "cd /d D:\Own Things\Code\saved-by-snoo\backend && pipenv run flask run --debug"

REM Start frontend
start "Frontend" cmd /c "cd /d D:\Own Things\Code\saved-by-snoo\frontend && npm run dev"

timeout /t 5 >nul

start chrome http://localhost:3000

exit
