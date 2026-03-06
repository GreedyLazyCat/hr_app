<script lang="ts" setup>
const { centered = true, width = "50px", height = "50px" } = defineProps<{
    /**
     * Центрировать ли индикатор загрузки
     */
    centered?: boolean,
    width?: string,
    height?: string,
}>()

const styles = computed(() => {
    return {
        width,
        height
    }
})

const classes = computed(() => ({
    'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2': centered
}))
</script>

<template>
    <div class="border-4 border-primary/30 border-t-primary/50 rounded-full animate-spin" :style="styles"
        :class="classes">
    </div>
</template>

<style>
@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.animate-spin {
    animation: spin 1s linear infinite;
}
</style>