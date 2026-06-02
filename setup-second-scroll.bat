@echo off
REM Setup script to copy "before footer" frames to public/SecondScroll directory
REM Run this from project root

setlocal enabledelayedexpansion

set "sourceDir=%cd%\before footer"
set "destDir=%cd%\public\SecondScroll"

REM Create destination directory if it doesn't exist
if not exist "%destDir%" (
    mkdir "%destDir%"
    echo. Created directory: %destDir%
)

REM Copy all PNG files from source to destination
echo Copying frames...
for %%F in ("%sourceDir%\*.png") do (
    copy "%%F" "%destDir%\" >nul
    echo. Copied: %%~nxF
)

REM Count files
setlocal enabledelayedexpansion
set count=0
for %%F in ("%destDir%\*.png") do (
    set /a count+=1
)

if !count! gtr 0 (
    echo.
    echo. Successfully copied !count! frames to public/SecondScroll/
    echo. Second scroll animation is ready to use!
) else (
    echo. Error: No PNG files were copied
    exit /b 1
)

endlocal
