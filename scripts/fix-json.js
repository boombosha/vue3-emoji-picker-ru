const fs = require('fs');
const path = require('path');

// Читаем файл
const filePath = path.join(__dirname, '../src/data/emojis-ru.json');
let content = fs.readFileSync(filePath, 'utf8');

// Исправляем JSON
content = content
  .replace(/^(\s*)(\w+):/gm, '$1"$2":')  // Добавляем кавычки к ключам
  .replace(/^(\s*)n:/gm, '$1"n":')       // Исправляем n:
  .replace(/^(\s*)u:/gm, '$1"u":')       // Исправляем u:
  .replace(/^(\s*)v:/gm, '$1"v":')       // Исправляем v:
  .replace(/^(\s*)r:/gm, '$1"r":')       // Исправляем r:
  .replace(/,\s*}/g, '}')                // Убираем лишние запятые
  .replace(/,\s*]/g, ']');               // Убираем лишние запятые

// Сохраняем исправленный файл
fs.writeFileSync(filePath, content, 'utf8');

console.log('✅ JSON файл исправлен!');
