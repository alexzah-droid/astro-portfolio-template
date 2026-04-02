import { existsSync, copyFileSync } from 'fs';

const src = 'content.example.md';
const dest = 'content.md';

if (existsSync(dest)) {
  console.log('ℹ️  content.md уже существует — пропускаем копирование.');
  console.log('   Откройте content.md и заполните своими данными.');
} else {
  copyFileSync(src, dest);
  console.log('✅ Готово! Откройте content.md и заполните своими данными.');
  console.log('   Затем замените src/assets/images/profile.jpg своей фотографией.');
}
