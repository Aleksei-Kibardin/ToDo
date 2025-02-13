# ToDo
## Примечание для корректной работы хоста
перед тем как начать изучение сайта, запустите локальный json-server как указанно ниже
ссылка на хост:  https://todo-obidzoda.netlify.app/

## Описание проекта

ToDo — это веб-приложение для управления задачами. Оно позволяет пользователям создавать, редактировать, фильтровать и удалять задачи. Приложение построено на основе Vue 3, TypeScript, Tailwind CSS и использует архитектуру FSD (Feature-Sliced Design).

## Основной функционал

- Создание, редактирование и удаление задач
- Фильтрация задач (по статусу, приоритету и другим параметрам)
- Сохранение задач в localStorage
- Поддержка темной и светлой темы

## Технологии, использованные в проекте
- Vue 3: Основной фреймворк для создания интерфейса.
- Pinia: Стейт-менеджмент для Vue 3.
- Tailwind CSS: Утилитарный CSS-фреймворк для стилизации интерфейса.
- Vue Router: Для маршрутизации в приложении.
- json-server: Легкий сервер для моков данных, который используется для имитации работы с API.
- Vitest: Для юнит-тестирования компонентов.
- Cypress: Для end-to-end тестирования приложения.
- Vue Toastification: Для отображения уведомлений.

структура проекта:
  /src
      /app        - инициализация приложения
      /entities   - основные сущности (задачи, пользователи и т. д.)
      /features   - функциональные модули (CRUD для задач, фильтрация и т. д.)
      /shared     - общие компоненты, утилиты, API, типы
      /widgets    - крупные компоненты (панели, списки и т. д.)
      /pages      - страницы приложения

## Как скачать и запустить проект

Для того чтобы скачать и запустить проект, выполните следующие шаги:

Клонируйте репозиторий 
```sh
git clone https://github.com/Aleksei-Kibardin/ToDo.git
```

Перейдите в каталог проекта: 
```sh
cd ToDo
```
Установите зависимости:
```sh
npm install
```
Запустите проект в режиме разработки:
```sh
npm run dev
```
Запустите json-server
```sh
 npm run json-server
```
Откройте приложение в браузере по адресу http://localhost:4173.

## API (json-server)

Запустите json-server
```sh
 npm run json-server
```

Приложение использует json-server для работы с фейковым API. Доступные эндпоинты:

GET /tasks — получить список задач

POST /tasks — создать задачу

PATCH /tasks/:id — обновить задачу

DELETE /tasks/:id — удалить задачу


## Остальные скрипты:

Сборка проекта для продакшн.
```sh
npm run build.
```
Просмотр предварительного результата сборки
```sh
npm run preview.
```
Запуск юнит-тестов с использованием Vitest
```sh
npm run test.
```

Запуск end-to-end тестов с Cypress
```sh
npm run test:e2e.
```
