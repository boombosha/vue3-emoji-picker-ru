const fs = require('fs');

// Читаем файл
let content = fs.readFileSync('src/data/emojis-ru.json', 'utf8');

// Удаляем лишние запятые в конце объектов
// Паттерн: },} -> } (запятая перед закрывающей скобкой)
content = content.replace(/,(\s*})/g, '$1');

// Паттерн: },] -> }] (запятая перед закрывающей скобкой в массиве)
content = content.replace(/,(\s*\])/g, '$1');

// Записываем исправленный файл
fs.writeFileSync('src/data/emojis-ru.json', content);

console.log('Лишние запятые удалены');