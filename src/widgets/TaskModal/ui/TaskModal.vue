<template>
    <div class="fixed inset-0 bg-opacity-20 flex justify-center items-center z-30 backdrop-blur-sm"
        @click.self="closeModal">
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg w-96 shadow-2xl transform transition-all duration-300">
            <h2 class="text-xl font-bold mb-4 text-black dark:text-white">Новая задача</h2>
            <form @submit.prevent="submitTask">

                <InputItem testid="task-title" v-model:searchQuery="task.title" :title="'Название'" />

                <div class="mb-4">
                    <label
                        class="input-description block text-sm font-medium mb-2 text-black dark:text-gray-300">Описание</label>
                    <textarea v-model="task.description"
                        class="w-full p-2 border rounded text-black dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                </div>

                <SelectItem v-model="task.priorityValue" :options="optionsPriority" :title="'Приоритет'" />
                <SelectItem v-model="task.status" :options="optionsStatus" :title="'Статус'" />

                <div class="flex justify-end gap-2 mt-2">
                    <button type="button" @click="closeModal"
                        class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors duration-200">
                        Отмена
                    </button>
                    <button type="submit"
                        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200">
                        Сохранить
                    </button>
                    <button v-if="props.task" type="button" @click="remove"
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
import { SelectItem } from '@/entities/Select';
import { InputItem } from '@/entities/Input';

interface Props {
    taskType?: string;
    task?: Task;
}

const props = defineProps<Props>();
const emit = defineEmits(['save', 'close', 'remove']);

type priorityText = "Средний" | "Высокий" | "Низкий"

const task = ref<Omit<Task, 'id'>>(props.task ? props.task : {
    title: '',
    description: '',
    status: 'process',
    priorityText: 'Средний',
    priorityValue: 2,
    statusText: 'В процессе',
});

const optionsPriority = [
    {
        title: "Высокий",
        value: 3
    },
    {
        title: "Средний",
        value: 2
    },
    {
        title: "Низкий",
        value: 1
    },
]
const optionsStatus = [
    {
        title: "В процессе",
        value: "process"
    },
    {
        title: "Завершено",
        value: "ready"
    },
    {
        title: "Отложенно",
        value: "deferred"
    },
]

const closeModal = () => {
    emit('close');
};

const remove = () => {
    emit('remove');
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