<template>
    <div class="bg-sky-200 dark:bg-sky-950 p-4 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300">
        <div class="flex justify-between items-center">
            <h3 class="text-lg font-semibold text-sky-800 dark:text-sky-200">
                {{ task.title }}
            </h3>
            <button @click="editTask" class="text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                        d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
            </button>
        </div>

        <div class="mt-2 flex items-center gap-2">
            <span class="px-2 py-1 text-sm rounded-full" :class="priorityClass">
                {{ task.priorityText }}
            </span>
            <span class="text-sm text-sky-600 dark:text-sky-400">
                {{ task.statusText }}
            </span>
        </div>

        <p class="mt-2 text-sm text-sky-700 dark:text-sky-300 line-clamp-3">
            {{ task.description }}
        </p>
    </div>
</template>

<script lang="ts" setup>
import type { Task } from '@/shared/types/TaskTypes';
import { computed } from 'vue';

const props = defineProps({
    task: {
        type: Object as () => Task,
        required: true,
    },
});

const emit = defineEmits(['edit']);

// Классы для приоритета задачи
const priorityClass = computed(() => {
    switch (+props.task.priorityValue) {
        case 3:
            return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'; // Высокий
        case 2:
            return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'; // Средний
        case 1:
            return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'; // Низкий
        default:
            return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'; // По умолчанию
    }
});

// Обработчик редактирования задачи
const editTask = () => {
    emit('edit', props.task);
};
</script>

<style scoped>
.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>