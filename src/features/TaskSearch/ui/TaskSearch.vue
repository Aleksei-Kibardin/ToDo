<template>
    <div class="flex flex-col gap-4 w-full">
        <input v-model="searchQuery" type="text" placeholder="Поиск по названию"
            class="w-full p-2 border rounded text-black dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />

    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const searchQuery = ref('');

const emit = defineEmits(['update:searchQuery']);

watch([searchQuery], ([newSearchQuery]) => {
    emit('update:searchQuery', newSearchQuery);
});
</script>