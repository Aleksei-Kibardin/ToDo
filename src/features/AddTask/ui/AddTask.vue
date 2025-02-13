<template>
    <button @click="openModal"
        class=" bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-500 flex justify-center items-center w-10 h-5">
        <span class="text-lg">+</span>
    </button>

    <Teleport to="body">
        <TaskModal v-if="isModalOpen" @save="handleSaveTask" @close="closeModal" />
    </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { TaskModal } from '@/widgets';
import type { Task } from '@/shared/types/TaskTypes';
import { useTaskStore } from '@/entities/Task/model/useTaskStore';

const taskStore = useTaskStore();
const isModalOpen = ref(false);

const openModal = () => {
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
};

const handleSaveTask = async (taskData: Omit<Task, 'id'>) => {
    await taskStore.addNewTask(taskData);
    closeModal();
};
</script>