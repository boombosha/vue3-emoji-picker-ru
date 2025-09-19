const fs = require('fs');
const path = require('path');

// Читаем оригинальные данные
const originalEmojis = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/emojis.json'), 'utf8'));

// Читаем русские переводы
const russianEmojis = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/emojis-ru.json'), 'utf8'));

// Функция для объединения названий
function mergeEmojiNames(original, russian) {
  if (!russian) return original;
  
  return {
    ...original,
    n: [...original.n, ...russian.n]
  };
}

// Объединяем данные
const mergedEmojis = {};

Object.keys(originalEmojis).forEach(groupKey => {
  mergedEmojis[groupKey] = originalEmojis[groupKey].map(emoji => {
    const russianGroup = russianEmojis[groupKey];
    if (!russianGroup) return emoji;
    
    const russianEmoji = russianGroup.find(ru => ru.u === emoji.u);
    if (!russianEmoji) return emoji;
    
    return mergeEmojiNames(emoji, russianEmoji);
  });
});

// Сохраняем объединенные данные
fs.writeFileSync(
  path.join(__dirname, '../src/data/emojis-localized.json'),
  JSON.stringify(mergedEmojis, null, 2),
  'utf8'
);

console.log('✅ Локализованные данные смайлов созданы!');
