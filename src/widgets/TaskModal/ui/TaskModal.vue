<template>
    <div class="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-30 backdrop-blur-sm">
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg w-96 shadow-2xl transform transition-all duration-300">
            <h2 class="text-xl font-bold mb-4 text-black dark:text-white">Новая задача</h2>
            <form @submit.prevent="submitTask">
                <div class="mb-4">
                    <label class="block text-sm font-medium mb-2 text-black dark:text-gray-300">Название</label>
                    <input v-model="task.title" type="text"
                        class="w-full p-2 border rounded dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium mb-2 text-black dark:text-gray-300">Описание</label>
                    <textarea v-model="task.description"
                        class="w-full p-2 border rounded dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium mb-2 text-black dark:text-gray-300">Приоритет</label>
                    <select v-model="task.priorityValue"
                        class="w-full p-2 border rounded dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="3">Высокий</option>
                        <option value="2">Средний</option>
                        <option value="1">Низкий</option>
                    </select>
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium mb-2 text-black dark:text-gray-300">Статус</label>
                    <select v-model="task.status"
                        class="w-full p-2 border rounded dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="process">В процессе</option>
                        <option value="ready">Завершено</option>
                        <option value="deferred">Отложено</option>
                    </select>
                </div>
                <div class="flex justify-end gap-2">
                    <button type="button" @click="closeModal"
                        class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors duration-200">
                        Отмена
                    </button>
                    <button type="submit"
                        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200">
                        Сохранить
                    </button>
                    <button v-if="props.tasks" type="button"
                        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200">
                        Удалить
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Task } from '@/shared/types/TaskTypes';

interface Props {
    taskType?: string
    tasks?: Task
}

const props: Props = defineProps({});
const emit = defineEmits(['save', 'close']);

type priorityText = "Средний" | "Высокий" | "Низкий"

const task = ref<Omit<Task, 'id'>>({
    title: '',
    description: '',
    status: 'process',
    priorityText: 'Средний',
    priorityValue: 2,
    statusText: 'В процессе',
});

if (props.tasks) {
    task.value = props.tasks
}


const closeModal = () => {
    emit('close');
};

const submitTask = () => {
    task.value.priorityText = getPriorityText(task.value.priorityValue);
    task.value.statusText = getStatusText(task.value.status);
    emit('save', task.value);
    closeModal();
};

const getPriorityText = (priorityValue: number): priorityText => {
    switch (+priorityValue) {
        case 3:
            return 'Высокий';
        case 2:
            return 'Средний';
        case 1:
            return 'Низкий';
        default:
            throw new Error('Неизвестное значение приоритета');
    }
};

const getStatusText = (statusValue: string) => {
    switch (statusValue) {
        case 'process':
            return 'В процессе';
        case 'ready':
            return 'Завершено';
        case 'deferred':
            return 'Отложено';
        default:
            throw new Error('Неизвестное значение Статуса');
    }
};
</script>