# ToDo

## Технологии, использованные в проекте
            <ul class="list-disc pl-5">
                <li><strong>Vue 3:</strong> Основной фреймворк для создания интерфейса.</li>
                <li><strong>Pinia:</strong> Стейт-менеджмент для Vue 3.</li>
                <li><strong>Tailwind CSS:</strong> Утилитарный CSS-фреймворк для стилизации интерфейса.</li>
                <li><strong>Vue Router:</strong> Для маршрутизации в приложении.</li>
                <li><strong>json-server:</strong> Легкий сервер для моков данных, который используется для имитации
                    работы с API.</li>
                <li><strong>Vitest:</strong> Для юнит-тестирования компонентов.</li>
                <li><strong>Cypress:</strong> Для end-to-end тестирования приложения.</li>
                <li><strong>Vue Toastification:</strong> Для отображения уведомлений.</li>
            </ul>

## Project Setup
##Как скачать и запустить проект

Для того чтобы скачать и запустить проект, выполните следующие шаги:

Клонируйте репозиторий с GitHub: Ссылка на репозиторий

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
Запустите json-server: npm run json-server
```sh
 npm run json-server
```
Откройте приложение в браузере по адресу http://localhost:4173.



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
