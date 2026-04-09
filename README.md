# 🗂️ Astro Portfolio Template

Шаблон личного сайта-портфолио для IT-специалистов.
Заполни один Markdown-файл — получи готовый сайт.

👉 [Посмотреть демо](https://az-portfolio-test.netlify.app/)

---

## Для кого

Для тех, кто хочет выделиться среди кандидатов с резюме только на hh.ru или LinkedIn:

разработчики · аналитики · project managers · архитекторы · дизайнеры · тестировщики

---

## Как это работает

1. Нажми кнопку **Use this template** → **Create a new repository**
2. Отредактируй `content.md` прямо в браузере — вставь свои данные
3. Замени `src/assets/images/profile.jpg` своей фотографией и `public/cv.pdf` своим резюме
4. Задеплой сайт — кнопкой ниже

Всё. Больше ничего устанавливать не нужно.

> **Важно:** используй именно «Use this template», а не «Fork» — это создаст твой личный репозиторий с чистой историей коммитов.

---

## Публикация сайта

Самый простой способ — через Netlify или Vercel. Оба сервиса бесплатны.
Потребуется регистрация — можно войти через GitHub аккаунт в один клик.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/alexzah-droid/astro-portfolio-template)

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/alexzah-droid/astro-portfolio-template)

Нажми кнопку → войди через GitHub → сайт будет готов через 2 минуты.
После этого каждое изменение в `content.md` будет автоматически обновлять твой сайт.

> **Как работают кнопки деплоя:** после первого сохранения изменений в `content.md` GitHub автоматически обновит ссылки в кнопках так, чтобы они указывали на твой репозиторий.

---

## Что можно настроить

Открой `content.md` и заполни своими данными:

- Имя, должность, краткое описание
- Контакты — email, Telegram, LinkedIn, GitHub
- Опыт работы
- Проекты и кейсы
- Навыки

Дополнительно можно выбрать стиль отображения опыта работы:

```yaml
experience_view: "timeline"  # вертикальный таймлайн в секции «О себе»
experience_view: "cards"     # подробные карточки в отдельной секции «Опыт работы»
```

Каждая секция сопровождается комментарием-подсказкой прямо в файле.

---

## Локальная разработка

Если хочешь посмотреть результат до публикации — можно запустить локально.
Потребуется [Node.js](https://nodejs.org/) версии 18 или выше.
```bash
git clone https://github.com/alexzah-droid/astro-portfolio-template.git
cd astro-portfolio-template
npm install
npm run dev
```

Открой `http://localhost:4321` в браузере.

---

## Структура проекта

```
astro-portfolio-template/
├── content.md                      # ← твои данные здесь
├── public/
│   └── cv.pdf                      # ← твоё резюме здесь
├── src/
│   └── assets/
│       └── images/
│           └── profile.jpg         # ← твоё фото здесь
└── README.md
```

### Как добавить резюме

Замени файл `public/cv.pdf` своим резюме — кнопка «Скачать CV» на сайте автоматически начнёт отдавать твой файл.

Файл должен называться именно `cv.pdf`.

---

## Технологии

- [Astro](https://astro.build/) — статическая генерация сайта
- Markdown — для хранения данных
- Чистый CSS — без лишних зависимостей

---

## Лицензия

MIT — используй свободно, в том числе в коммерческих целях.

---

*Нашёл баг или есть идея? Открывай [issue](https://github.com/alexzah-droid/astro-portfolio-template/issues) — буду рад.*
