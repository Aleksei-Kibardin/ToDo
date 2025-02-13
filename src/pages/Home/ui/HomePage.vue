<template>
    <div class="relative flex items-center justify-center h-screen w-full">

        <div class="text-center text-black dark:text-white relative z-10">
            <h1 class="text-4xl font-bold">Добро пожаловать в постановщик задач</h1>
            <button
                class="mt-20 text-lg inline-flex items-center justify-center p-0.5 font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white">
                <router-link to="/tasks"
                    class="px-5 py-2.5 duration-75 bg-[#ffffff] dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                    Начать
                </router-link>
            </button>
        </div>
    </div>
</template>
