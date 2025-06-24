@echo off
setlocal EnableDelayedExpansion

set "folder=merged_json"
echo const files = [

for %%F in (%folder%\*.json) do (
    set "file=%%~nxF"
    echo     "%folder%/!file!",
)

echo ];
pause
