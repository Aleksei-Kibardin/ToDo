<template>
  <div
    class="flex relative items-center justify-center h-full w-full bg-gradient-to-r from-blue-200 to-blue-500 dark:from-[#071734] dark:to-[#00001b] animate-gradient">
    <!-- Слой звезд (только в тёмной теме) -->
    <div class="fixed inset-0 dark:block hidden pointer-events-none">
      <div v-for="(star, index) in stars" :key="index" class="absolute bg-white rounded-full opacity-80 animate-twinkle"
        :style="{
          width: `${star.size}px`,
          height: `${star.size}px`,
          top: `${star.top}%`,
          left: `${star.left}%`
        }"></div>
    </div>
    <ThemeToggle class="absolute top-4 right-4" />
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import ThemeToggle from "@/features/ThemeToggle/ui/ThemeToggle.vue";

interface Star {
  top: number;
  left: number;
  size: number;
}

const stars = ref<Star[]>([]);

onMounted(() => {
  const starCount = Math.floor(Math.random() * 11) + 20;
  stars.value = Array.from({ length: starCount }, () => ({
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() * 2 + 1
  }));
});
</script>

<style scoped>
@keyframes gradient-animation {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient-animation 6s ease infinite;
}

@keyframes twinkle {
  0% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
}

.animate-twinkle {
  animation: twinkle 2s infinite alternate ease-in-out;
}
</style>
