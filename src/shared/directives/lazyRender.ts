import type { DirectiveBinding } from 'vue'

export const lazyRender = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          binding.value?.() // Вызываем callback, если он передан
          observer.unobserve(el) // Прекращаем наблюдение
        }
      },
      { rootMargin: '0px', threshold: 0.1 },
    )

    observer.observe(el) // Начинаем наблюдение
  },
}
