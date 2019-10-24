call ng build --prod
call copy .\dist\pwa-poc\index.html .\dist\pwa-poc\200.html
call surge .\dist\pwa-poc\ allianz1.surge.sh
pause