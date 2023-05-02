@echo off


start "" "http://192.168.0.75:8080/"

set port1=3000
set port2=3333

netstat -ano | findstr :%port1% | find /i "listening" > nul
if %errorlevel% equ 0 (
    echo Port %port1% is already in use.
    goto end
)

netstat -ano | findstr :%port2% | find /i "listening" > nul
if %errorlevel% equ 0 (
    echo Port %port2% is already in use.
    goto end
)

echo Starting ACE and Angular servers...

start /B "ACE Server" cmd /k "cd C:\Users\ti03\Desktop\AppTecFinal\AppTecidosBack && node ace serve"
start /B "Angular Server" cmd /k "cd C:\Users\ti03\Desktop\AppTecFinal\AppTecidosFront && live-server --host=192.168.0.75 --no-browser"


:end
