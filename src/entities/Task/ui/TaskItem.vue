<template>
    <div
        class="task-item bg-sky-200 dark:bg-sky-950 p-4 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300">
        <div class="flex justify-between items-center">
            <h3 class="text-lg font-semibold text-sky-800 dark:text-sky-200">
                {{ task.title }}
            </h3>
            <EditTask :task="props.task" />
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
import EditTask from '@/features/EditTask/ui/EditTask.vue';
import type { Task } from '@/shared/types/TaskTypes';
import { computed } from 'vue';

const props = defineProps({
    task: {
        type: Object as () => Task,
        required: true,
    },
});

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