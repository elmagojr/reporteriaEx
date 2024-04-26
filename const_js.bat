@echo off
cd /d C:\SISC\Addons\Reports\js

if exist data.js (
    del data.js
)

ECHO Generando recurso...
set "rutaTxt=%~dp0\js\data.txt"
set "rutaJs=%~dp0\js\data.js"
rem chcp 1252 > nul
PowerShell -Command "Get-Content -Path '%rutaTxt%' -Encoding Default | Set-Content -Path '%rutaJs%' -Encoding UTF8"

set "ruta=%~dp0\plantilla\grafico.html"
start msedge --new-window --disable-prompt-on-repost --app="%ruta%" 