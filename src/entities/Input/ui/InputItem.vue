<template>
    <div class="flex flex-col gap-4 w-full">
        <label v-if="title" class="block text-sm font-medium mb-2 text-black dark:text-gray-300">
            {{ props.title }}
        </label>
        <input :data-testid="testid" v-model="searchQuery" type="text" :placeholder="props.placeholder"
            :required="props.required"
            class="w-full p-2 border rounded text-black dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

interface Props {
    title?: string;
    testid?: string;
    placeholder?: string;
    modelValue: string | number | null;
    required?: boolean;
}

const props = defineProps<Props>();

const searchQuery = ref(props.modelValue);

const emit = defineEmits(["update:modelValue"]);

watch([searchQuery], ([newSearchQuery]) => {
    emit('update:modelValue', newSearchQuery);
});
</script>
