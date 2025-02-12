<template>
    <div class="container mx-auto p-4 mt-20">
        <h1 class="text-2xl font-bold text-center mb-4">Список задач</h1>

        <TaskList />
    </div>
</template>

<script setup lang="ts">
import TaskList from '@/widgets/TaskList/ui/TaskList.vue';

</script>

<style scoped></style>