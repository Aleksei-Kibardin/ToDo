<template>
    <button @click="toggleTheme"
        class="px-4 fixed py-2 rounded-md flex items-center gap-2 transition-all duration-300 z-10"
        :class="isDark ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'">
        <span v-if="isDark">🌙 Dark</span>
        <span v-else>☀️ Light</span>
    </button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isDark = ref(localStorage.getItem('theme') === 'dark')

const toggleTheme = () => {
    isDark.value = !isDark.value
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')

    if (isDark.value) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }
}

onMounted(() => {
    if (isDark.value) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }
})
</script>