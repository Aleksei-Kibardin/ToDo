<template>
    <div class="container mx-auto p-4 mt-20">
        <h1 class="text-2xl font-bold text-center mb-4">Список задач</h1>
        <div v-if="taskStore.loading" class="text-center">Загрузка...</div>
        <div v-else class="flex gap-25 justify-between">
            <TaskList taskType="process" title="В процессе" />
            <TaskList taskType="ready" title="Завершено" />
            <TaskList taskType="deferred" title="Отложено" />
        </div>
    </div>
</template>

<script setup lang="ts">
import TaskList from '@/widgets/TaskList/ui/TaskList.vue';
import { useTaskStore } from '@/entities/Task/model/useTaskStore';
import { onMounted } from 'vue';

const taskStore = useTaskStore();

onMounted(() => {
    taskStore.fetchAllTasks();
});
</script>

<style scoped></style>