<template>
    <div class="flex flex-col gap-4 w-full">
        <label v-if="title" class="block text-sm font-medium mb-2 text-black dark:text-gray-300">
            {{ title }}
        </label>
        <select v-model="localValue"
            class="w-full p-2 border rounded dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option v-for="option in options" :key="option.value" :value="option.value">
                {{ option.title }}
            </option>
        </select>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Option {
    title: string;
    value: string | number | null;
}

interface Props {
    title?: string;
    options: Option[];
    modelValue: string | number | null;
}

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);

const localValue = computed({
    get: () => props.modelValue,
    set: (newValue) => emit("update:modelValue", newValue),
});
</script>