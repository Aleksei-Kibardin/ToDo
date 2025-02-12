<template>
    <div class="space-y-2 flex gap-20 flex-col mt-30">
        <TaskItem v-for="task in 21" :key="task" :task="task" />
    </div>
</template>

<script setup lang="ts">
import TaskItem from '@/entities/Task/ui/TaskItem.vue';

</script>
