<script lang="ts" setup>

const { margin = "0px", root } = defineProps<{
    /**
     * Насколько заранее или позже детектить появление компонента на экране.
     * Наиболее точное описание - описание rootMargin в документации
     * IntersectionObserver от MDN Web Docs.
     */
    margin?: string,
    root: HTMLElement | null,
}>()

const emit = defineEmits<{
    (e: 'intersected'): void
}>()

const loadinTrigger = useTemplateRef('loadingTrigger')
let observer: IntersectionObserver | null = null

onMounted(() => {
    observer = new IntersectionObserver(entries => {
        if (entries[0] && entries[0].isIntersecting) {
            emit('intersected')
        }
    },
        {
            // root,
            threshold: 1,
            rootMargin: margin
        })
    if (loadinTrigger.value) {
        observer.observe(loadinTrigger.value)
    }
})

onBeforeUnmount(() => {
    if (observer && loadinTrigger.value) {
        observer.unobserve(loadinTrigger.value)
    }
})

</script>

<template>
    <div class="w-full h-[2px] shrink-0" ref="loadingTrigger"></div>
</template>
