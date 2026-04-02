# Проект: Сайт-портфолио Александра Захарова

## Обзор
Одностраничный сайт-портфолио IT-эксперта (бизнес-анализ, бизнес-архитектура, автоматизация производства).

## Принципы
- Язык сайта: только русский
- Все данные читаются из единственного файла content.md в корне проекта
- Минимализм: чистый дизайн, много воздуха, шрифт Inter
- Никаких готовых тем Astro — всё с нуля
- Никаких React/Vue — только Astro-компоненты и ванильный JS при необходимости

## Технический стек
- Astro (последняя стабильная версия)
- Tailwind CSS
- TypeScript
- @astrojs/sitemap

## Архитектура
- Одностраничник: все секции на index.astro, навигация по якорям (#about, #projects, #cases, #experience)
- content.md → парсится утилитой src/lib/content-parser.ts → данные импортируются компонентами
- Тёмная/светлая тема с переключателем, сохранение в localStorage

## Навигация
О себе | Проекты | Кейсы | Опыт

## Секции главной страницы
1. Hero: имя, роль, тэглайн, фото-заглушка, кнопки "Связаться" и "Скачать CV"
2. О себе (#about): биография, таймлайн карьеры, навыки
3. Проекты (#projects): сетка карточек проектов
4. Кейсы (#cases): карточки с Задача → Решение → Результат
5. Опыт (#experience): подробные карточки опыта работы

## Дизайн
- Палитра: нейтральные серые + акцент teal-600 (#0d9488)
- Mobile-first, адаптивная вёрстка
- Анимации: плавное появление при скролле (CSS + IntersectionObserver)
- Переходы темы: плавные через CSS transition

## Ограничения
- НЕ использовать: блог, i18n, услуги/цены, React/Vue
- НЕ менять формат content.md без согласования
- НЕ устанавливать лишние зависимости

## Текущий статус: ГОТОВ ✓

- [x] Этап 1: Фундамент (Astro, Tailwind, парсер, Hero, Header, Footer, ThemeToggle)
- [x] Этап 2: О себе + Таймлайн + Навыки
- [x] Этап 3: Проекты + Кейсы
- [x] Этап 4: Опыт + SEO + Полировка

## Структура файлов (финальная)
```
portfolio-simple/
├── content.md              # единственный источник данных
├── CLAUDE.md               # договорённости проекта
├── astro.config.mjs        # site + sitemap + @tailwindcss/vite
├── vercel.json             # конфиг деплоя Vercel
├── package.json
├── tsconfig.json
├── public/
│   ├── favicon.svg
│   ├── favicon.ico
│   └── robots.txt          # Allow: /, Sitemap: ссылка
└── src/
    ├── components/
    │   ├── Header.astro        # sticky навигация + бургер-меню
    │   ├── Footer.astro        # контакты из content.md + копирайт
    │   ├── ThemeToggle.astro   # dark/light переключатель
    │   ├── BackToTop.astro     # кнопка «наверх», появляется при скролле > 400px
    │   ├── About.astro         # биография (full text, max-width 65ch)
    │   ├── Timeline.astro      # компактный таймлайн для секции «О себе»
    │   ├── Skills.astro        # бейджи hard skills + теги soft skills
    │   ├── ProjectCard.astro   # карточка проекта (title, desc, tech, year, link)
    │   ├── Projects.astro      # сетка 2 колонки из getProjects()
    │   ├── CaseCard.astro      # карточка кейса (задача→решение→результат+метрики)
    │   ├── Cases.astro         # вертикальный список из getCases()
    │   ├── ExperienceCard.astro # подробная карточка опыта (period badge, company, position, bullets)
    │   └── Experience.astro    # список карточек из getExperience()
    ├── layouts/
    │   └── BaseLayout.astro    # html lang="ru", OG, JSON-LD, Inter, anti-flash, scroll-observer, BackToTop
    ├── lib/
    │   └── content-parser.ts   # парсер content.md
    ├── pages/
    │   └── index.astro         # Hero + #about + #projects + #cases + #experience
    └── styles/
        └── global.css          # Tailwind v4 + CSS-переменные тем + .fade-up + .card
```

## Решения и заметки

### Установленные пакеты
| Пакет | Версия | Назначение |
|---|---|---|
| astro | 6.1.2 | фреймворк |
| tailwindcss | 4.2.2 | стили |
| @tailwindcss/vite | 4.2.2 | интеграция Tailwind v4 с Vite (вместо устаревшего @astrojs/tailwind) |
| @astrojs/sitemap | 3.7.2 | генерация sitemap.xml |
| yaml | 2.8.3 | парсинг YAML-блоков в content.md |

Tailwind v4 подключается через Vite-плагин в `astro.config.mjs`, не через Astro-интеграцию.

### content-parser.ts
Файл `content.md` разбит на 6 секций разделителем `---`. Каждая секция — YAML-блок с заголовком `# ...`.

Алгоритм парсинга:
1. Читает файл через `readFileSync` (синхронно, при сборке)
2. Разбивает по `\n---\n`
3. Из каждого чанка удаляет строку-заголовок `# ...`
4. Парсит оставшийся текст как YAML через библиотеку `yaml`
5. Результат кэшируется в переменной модуля (однократная загрузка)

Секции по индексам: 0 — info (плоские поля), 1 — about, 2 — experience, 3 — projects, 4 — cases, 5 — skills.

Экспорты: `getInfo()`, `getAbout()`, `getExperience()`, `getProjects()`, `getCases()`, `getSkills()` — все возвращают строго типизированные объекты (интерфейсы в том же файле).

### ThemeToggle
- При первом визите читает `prefers-color-scheme` через `window.matchMedia`
- Сохранённое значение из `localStorage` имеет приоритет
- Класс `dark` устанавливается на `<html>` через inline-скрипт в `BaseLayout.astro` до рендера (предотвращает flash)
- CSS-переменные `--bg`, `--text`, `--accent` и др. определены на `:root` (светлая) и `.dark` (тёмная), все компоненты используют только переменные — переход темы без перезагрузки
- Transition `0.2s ease` на `body` для плавной смены фона/текста

### Этап 2: О себе + Таймлайн + Навыки

**Компоненты:**
- `About.astro` — текст `about.full` из content.md, разбивается на параграфы по `\n\n`, отображается с `max-width: 65ch`
- `Timeline.astro` — список `experience[]`, каждый элемент: период (teal, uppercase) → компания (subtle) → должность (semibold) → описание (bullets через `\n`). Вертикальная линия — `position: absolute; width: 1px`, точки-маркеры — `width: 16px; border-radius: 50%` с teal-цветом и box-shadow ring
- `Skills.astro` — hard skills: бейджи `{name} + {level}`, soft skills: простые теги

**Анимация скролла:**
- CSS-класс `.fade-up`: `opacity: 0; transform: translateY(24px); transition: 0.55s ease`
- Класс `.visible` добавляется через `IntersectionObserver` в `BaseLayout.astro` (глобально, один observer на всю страницу)
- `unobserve` после первого срабатывания — анимация проигрывается один раз
- `threshold: 0.1, rootMargin: 0px 0px -48px 0px` — элемент становится видимым чуть раньше нижней границы viewport
- CSS-stagger через `nth-child` delay (0.08s шаг) для дочерних элементов
- `@media (prefers-reduced-motion: reduce)` — анимация отключается

**Цвета уровней навыков:**
| Уровень | Фон | Текст |
|---|---|---|
| Эксперт | `var(--accent-light)` (teal-100 / teal-dark) | `var(--accent)` (teal-600/400) |
| Продвинутый | `var(--level-adv-bg)` (#dbeafe / #1e3a5f) | `var(--level-adv-text)` (#1e40af / #93c5fd) |
| Средний | `var(--surface)` (нейтральный) | `var(--text-muted)` (серый) |

Переменные `--level-adv-bg` и `--level-adv-text` добавлены в `global.css` для корректной работы в обеих темах.

### Этап 3: Проекты + Кейсы

**Компоненты:**
- `ProjectCard.astro` — принимает props (title, description, technologies[], year, link). Если `link` непустой — показывает иконку внешней ссылки. Технологии — teal-бейджи. Год — справа внизу серым. CSS-класс `.card` из global.css даёт border + hover-эффект
- `Projects.astro` — `grid sm:grid-cols-2`, данные из `getProjects()`, рендерит `<ProjectCard>`
- `CaseCard.astro` — три секции с метками `ЗАДАЧА / ЧТО СДЕЛАНО / РЕЗУЛЬТАТ` (uppercase, tracking-widest, subtle). Метрики — отдельный блок с teal-фоном (`--accent-light`), строка метрики парсится: `"Label: Value"` → label мелко, value жирно teal-цветом
- `Cases.astro` — вертикальный `flex flex-col gap-5`, данные из `getCases()`, рендерит `<CaseCard>`

**Стиль карточек (CSS-класс `.card` в global.css):**
- `background: var(--bg-secondary)` + `border: 1px solid var(--border)` + `border-radius: 12px`
- Hover: `border-color: var(--accent)` + teal box-shadow (8% opacity в светлой, 12% в тёмной)
- Transition 0.2s ease — плавный ховер без скачков

**Fade-up в карточках:** класс `.fade-up` вешается прямо на `<article>` в `ProjectCard` и `CaseCard` — глобальный observer из `BaseLayout.astro` подхватывает их автоматически.

### Этап 4: Опыт + SEO + Полировка

**Секция #experience:**
- `ExperienceCard.astro` — детальная карточка: period (teal badge), company (h3 крупно), position (muted), горизонтальный разделитель, bullets описания с teal-точками. Использует `.card` класс из global.css
- `Experience.astro` — `flex flex-col gap-4`, данные из `getExperience()`

**SEO:**
- JSON-LD (`@type: Person`) формируется в `BaseLayout.astro` из данных `getInfo()` и вставляется через `<script type="application/ld+json" set:html={JSON.stringify(jsonLd)} />`. Поля: name, jobTitle, description, url, email, sameAs (telegram, linkedin, github)
- sitemap.xml генерируется `@astrojs/sitemap` автоматически при сборке. Конфиг: `site: "https://alexzakharov.dev"` в `astro.config.mjs`
- `public/robots.txt`: `Allow: /`, указывает на `sitemap-index.xml`
- OG image: абсолютный URL через `new URL(ogImage, Astro.site)`
- `og:locale: ru_RU` добавлен в BaseLayout

**Кнопка «Наверх» (`BackToTop.astro`):**
- `position: fixed`, bottom-right, z-40
- Слушает `scroll` event (passive), показывается при `scrollY > 400`
- Появление/скрытие через opacity + translateY (CSS transition)
- Клик — `window.scrollTo({ top: 0, behavior: 'smooth' })`
- Монтируется прямо в `<body>` через BaseLayout

**Деплой:**
- `vercel.json`: `buildCommand: npm run build`, `outputDirectory: dist`, `framework: astro`
- Для Netlify достаточно подключить репо — Netlify определяет Astro автоматически

## Деплой

### Vercel (рекомендуется)
1. Push репо на GitHub
2. Импорт в vercel.com → New Project
3. Framework: Astro (определяется автоматически)
4. Build Command: `npm run build`, Output: `dist`
5. Деплой

### Netlify
1. Push репо на GitHub
2. Netlify → Add new site → Import from Git
3. Build Command: `npm run build`, Publish directory: `dist`
4. Деплой

### Вручную
```bash
npm run build   # сборка в ./dist
npm run preview # локальный предпросмотр production-версии
```

После деплоя: обновить `site` в `astro.config.mjs` и `Sitemap:` в `robots.txt` на реальный домен.