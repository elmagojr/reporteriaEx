@echo off
set "ruta=%~dp0\plantilla\grafico.html"
start msedge --new-window --disable-prompt-on-repost --app="%ruta%"