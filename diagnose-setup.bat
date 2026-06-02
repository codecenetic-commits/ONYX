@echo off
REM Diagnostic script to check if frames are properly set up

echo.
echo === SECOND SCROLL ANIMATION DIAGNOSTICS ===
echo.

REM Check if SecondScroll folder exists
if exist "public\SecondScroll" (
    echo [OK] Folder exists: public\SecondScroll\
    
    REM Count PNG files
    setlocal enabledelayedexpansion
    set count=0
    for %%F in ("public\SecondScroll\*.png") do (
        set /a count+=1
    )
    
    if !count! equ 27 (
        echo [OK] Found 27 PNG files - ANIMATION READY
    ) else if !count! gtr 0 (
        echo [WARNING] Found !count! PNG files - Expected 27
        echo [ACTION] Run: setup-second-scroll.bat
    ) else (
        echo [ERROR] Folder is empty - no PNG files found
        echo [ACTION] Run: setup-second-scroll.bat
    )
    endlocal
) else (
    echo [ERROR] Folder does not exist: public\SecondScroll\
    echo [ACTION] Creating folder and copying files...
    mkdir "public\SecondScroll"
    echo [ACTION] Run: setup-second-scroll.bat
)

echo.
echo === CHECKING SOURCE FOLDER ===
echo.

if exist "before footer" (
    echo [OK] Source exists: before footer\
    
    setlocal enabledelayedexpansion
    set srccount=0
    for %%F in ("before footer\*.png") do (
        set /a srccount+=1
    )
    
    echo [INFO] Found !srccount! files in source folder
    
    if !srccount! equ 27 (
        echo [INFO] All 27 source files available - ready to copy
    )
    endlocal
) else (
    echo [ERROR] Source folder not found: before footer\
    echo [INFO] Check folder name and location
)

echo.
echo === RECOMMENDED ACTION ===
echo.
echo 1. Run: setup-second-scroll.bat
echo 2. Wait for completion
echo 3. Restart dev server: npm run dev
echo 4. Refresh browser
echo.
echo === END DIAGNOSTICS ===
echo.
