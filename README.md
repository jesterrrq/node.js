mkdir gulp-layout && cd gulp-layout
npm init -y
npm i -D gulp gulp-sass sass gulp-autoprefixer gulp-clean-css gulp-rename gulp-plumber browser-sync


// js вместо скрипта
"scripts": {
  "start": "gulp",
  "build": "gulp styles html"
}

//запуск
npm start   # разработка: компиляция SCSS → CSS, сборка HTML, live-reload сервер
npm run build # продакшн-сборка в папку dist/ 
