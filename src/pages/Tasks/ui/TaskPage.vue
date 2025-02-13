<template>
    <div class="Tasks container mx-auto p-4 mt-20">
        <h1 class="text-2xl font-bold text-center mt-50">Список задач</h1>

        <div v-if="taskStore.loading" class="text-center">Загрузка...</div>

        <div v-else
            class="flex flex-col gap-8 md:gap-12 items-center lg:flex-row lg:gap-16 justify-center lg:justify-between">
            <TaskList taskType="process" title="В процессе" />
            <TaskList taskType="ready" title="Завершено" />
            <TaskList taskType="deferred" title="Отложено" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import TaskList from '@/widgets/TaskList/ui/TaskList.vue';
import { useTaskStore } from '@/entities/Task/model/useTaskStore';

const taskStore = useTaskStore();

onMounted(() => {
    taskStore.fetchAllTasks();
});
</script>