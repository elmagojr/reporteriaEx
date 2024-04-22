@echo off
set "ruta=%~dp0\plantilla\chart copy.html"
start msedge --new-window --disable-prompt-on-repost --app="%ruta%"