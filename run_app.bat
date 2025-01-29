@echo off
SET PATH=%PATH%;C:\Users\prath\AppData\Roaming\Python\Python313\Scripts
echo Environment PATH updated!

set NODE_OPTIONS=--openssl-legacy-provider
:: Start the backend server
cd backend
start cmd /k python -m uvicorn main:app --reload

:: Wait a few seconds for the backend to start
timeout /t 5

:: Start the frontend (if you have Node.js installed)
cd ../frontend
start cmd /k npm start

echo Application started! You can close this window.
