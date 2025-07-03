@echo off
setlocal EnableDelayedExpansion

set "folder=json/audio/"
echo const files = [

for %%F in (%folder%\*.json) do (
    set "file=%%~nxF"
    echo     "%folder%/!file!",
)

echo ];
pause
