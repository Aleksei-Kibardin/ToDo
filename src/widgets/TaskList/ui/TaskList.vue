<template>
    <div
        class=" h-lvh min-h-200 wrap-task-list flex flex-col mt-30 w-[100%] bg-blue-100 dark:bg-cyan-800 p-5 rounded-md items-center overflow-hidden gap-10">
        <h2 class="dark:text-white text-black">{{ title }}</h2>
        <AddTask />

        <InputItem v-model="searchQuery" placeholder="Поиск по названию" />

        <div class="select-filter">
            <SelectItem v-model="priorityFilter" :options="optionsPriorityFilter" />
        </div>

        <div
            class=" min-h-50 p-1 w-full flex gap-5 flex-col overflow-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100 dark:scrollbar-thumb-cyan-600 dark:scrollbar-track-cyan-800">
            <TaskItem v-for="task in filteredTaskList" :key="task.id" :task="task" v-lazy-render />
        </div>
    </div>
</template>

<script setup lang="ts">
import { TaskItem } from '@/entities/Task';
import { InputItem } from '@/entities/Input';
import { SelectItem } from '@/entities/Select';
import { computed, ref } from 'vue';
import { useTaskStore } from '@/entities/Task/model/useTaskStore';
import AddTask from '@/features/AddTask/ui/AddTask.vue';

const taskStore = useTaskStore();

const props = defineProps({
    taskType: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
});

const optionsPriorityFilter = [
    {
        title: "Все приоритеты",
        value: null
    },
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

const searchQuery = ref('');
const priorityFilter = ref(null);

const taskList = computed(() => taskStore.tasks.filter((task) => task.status === props.taskType));

// Фильтрация задач по поиску и приоритету
const filteredTaskList = computed(() => {
    return taskList.value.filter((task) => {
        const matchesSearch = task.title.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesPriority = +priorityFilter.value! ? +task.priorityValue === +priorityFilter.value! : true;
        return matchesSearch && matchesPriority;
    });
});
</script>

<style scoped>
.scrollbar-thin::-webkit-scrollbar {
    width: 8px;
}

.scrollbar-thin::-webkit-scrollbar-track {
    background: #dbeafe;
    border-radius: 4px;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
    background: #93c5fd;
    border-radius: 4px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background: #60a5fa;
}

/* Темный режим */
.dark .scrollbar-thin::-webkit-scrollbar-track {
    background: #1e3a8a;
}

.dark .scrollbar-thin::-webkit-scrollbar-thumb {
    background: #3b82f6;
}

.dark .scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background: #2563eb;
}
</style>