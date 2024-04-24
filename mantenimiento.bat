@echo off
set "ruta=%~dp0\plantilla\mantenimiento.html"
start msedge --new-window --disable-prompt-on-repost --app="%ruta%" 