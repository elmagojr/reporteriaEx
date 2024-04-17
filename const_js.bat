@echo off
cd /d C:\SISC\Addons\Reports\js

if exist data.js (
    del data.js
)
ren data.txt data.js

start msedge --new-window --disable-prompt-on-repost --app="C:\SISC\Addons\Reports\plantilla\chart copy.html" 


