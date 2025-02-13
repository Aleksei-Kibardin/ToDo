<template>
    <button @click="openModal" class="text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
                d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
        </svg>
    </button>

    <TaskModal v-if="isModalOpen" :task="props.task" @save="editTask" @close="closeModal"
        @remove="removeTask(props.task.id)" />
</template>

<script lang="ts" setup>
import type { Task } from '@/shared/types/TaskTypes';
import { TaskModal } from '@/widgets';
import { useTaskStore } from '@/entities/Task/model/useTaskStore';
import { ref } from 'vue';

const taskStore = useTaskStore();
const isModalOpen = ref(false);

const props = defineProps({
    task: {
        type: Object as () => Task,
        required: true,
    },
});

const openModal = () => {
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
};

const removeTask = async (id: string | number) => {
    await taskStore.removeTask(id);
    closeModal();
};

const editTask = async (taskData: Task) => {
    await taskStore.updateExistingTask(taskData);
    closeModal();
};

</script>

<style></style>