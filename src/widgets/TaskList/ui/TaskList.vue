<template>
    <div
        class="max-h-[60vh] h-fit wrap-task-list flex flex-col mt-30 w-100 bg-blue-100 dark:bg-cyan-800 p-5 rounded-md items-center overflow-hidden gap-10">
        <h2 class="dark:text-white text-black">{{ title }}</h2>
        <AddTask />
        <div
            class=" h-fit p-1 w-full flex gap-10 flex-col overflow-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100 dark:scrollbar-thumb-cyan-600 dark:scrollbar-track-cyan-800">
            <TaskItem v-for="task in taskList" :key="task.id" :task="task" v-lazy-render />
        </div>
    </div>
</template>

<script setup lang="ts">
import TaskItem from '@/entities/Task/ui/TaskItem.vue';
import { computed } from 'vue';
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

const taskList = computed(() => taskStore.tasks.filter((task) => task.status === props.taskType));
</script>

<style scoped>
.scrollbar-thin::-webkit-scrollbar {
    width: 8px;
    /* Ширина скроллбара */
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