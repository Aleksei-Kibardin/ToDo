<template>
    <div class="max-w-4xl h-[100vh] mx-auto mt-20 px-4 py-8 text-black dark:text-white">
        <header class="text-center mb-10">
            <h1 class="text-4xl font-bold text-blue-600 dark:text-blue-400">Документация проекта ToDo</h1>
            <p class="text-lg text-gray-600">Описание технологий, шаги по установке и запуску.</p>
        </header>

        <section class="mb-8">
            <h2 class="text-3xl font-semibold text-blue-500 dark:text-blue-300 mb-4">Технологии, использованные в
                проекте</h2>
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
        </section>

        <section class="mb-8">
            <h2 class="text-3xl font-semibold text-blue-500 dark:text-blue-300 mb-4">Как скачать и запустить проект</h2>
            <p class="mb-4">Для того чтобы скачать и запустить проект, выполните следующие шаги:</p>
            <ol class="list-decimal pl-5">
                <li>Клонируйте репозиторий с GitHub:
                    <a href="https://github.com/Aleksei-Kibardin/ToDo" target="_blank"
                        class="text-blue-600 dark:text-blue-400">Ссылка на
                        репозиторий</a>
                </li>
                <li>Перейдите в каталог проекта:
                    <code class="text-white bg-gray-800 px-2 py-1">cd ToDo</code>
                </li>
                <li>Установите зависимости:
                    <code class="text-white bg-gray-800 px-2 py-1">npm install</code>
                </li>
                <li>Запустите проект в режиме разработки:
                    <code class="text-white bg-gray-800 px-2 py-1">npm run dev</code>
                </li>
                <li>Запустите json-server:
                    <code class="text-white bg-gray-800 px-2 py-1">npm run json-server</code>
                </li>
                <li>Откройте приложение в браузере по адресу <code class="px-2 py-1">http://localhost:4173</code>.</li>
            </ol>
        </section>

        <section class="mb-8">
            <h2 class="text-3xl font-semibold text-blue-500 dark:text-blue-300 mb-4">Остальные скрипты:</h2>
            <ul class="list-disc pl-5">
                <li><strong>npm run build:</strong> Сборка проекта для продакшн.</li>
                <li><strong>npm run preview:</strong> Просмотр предварительного результата сборки.</li>
                <li><strong>npm run test:</strong> Запуск юнит-тестов с использованием Vitest.</li>
                <li><strong>npm run test:e2e:</strong> Запуск end-to-end тестов с Cypress.</li>
            </ul>
        </section>
    </div>
</template>