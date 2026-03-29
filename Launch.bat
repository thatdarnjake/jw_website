@echo off
cd /d "%~dp0"
start http://localhost:5139
dotnet run
pause
