const fs = require('fs');

// Читаем файл
let content = fs.readFileSync('src/data/emojis-ru.json', 'utf8');

// Исправляем неправильно экранированные кавычки в строках
content = content.replace(/"([^"]*)"([^"]*)"([^"]*)"/g, '"$1\\"$2\\"$3"');

// Исправляем неправильно экранированные кавычки в ключах
content = content.replace(/"([^"]*)"([^"]*)"([^"]*)":/g, '"$1\\"$2\\"$3":');

// Удаляем лишние запятые в конце объектов
content = content.replace(/,(\s*})/g, '$1');
content = content.replace(/,(\s*\])/g, '$1');

// Записываем исправленный файл
fs.writeFileSync('src/data/emojis-ru.json', content);

console.log('JSON исправлен');
