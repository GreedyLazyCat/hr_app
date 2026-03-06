<script lang="ts" setup>

const { placeholder = "", name = "", inputId = "", type = "text", hasError = false } = defineProps<{
    placeholder?: string
    name?: string
    inputId?: string
    type?: string,
    hasError?: boolean
}>()

const model = defineModel<string | number>()
const inputRef = useTemplateRef('input')

function focusInput() {
    if (inputRef.value) {
        inputRef.value.focus()
    }
}

</script>

<template>
    <div class="flex gap-2 items-center bg-bg border px-4 py-3 rounded-xl hover:cursor-text focus-within:border-primary transition-all"
        :class="{ 'border-danger border-2': hasError, 'border-border': !hasError }" @click="focusInput">
        <input :type="type" :id="inputId" :name="name" ref="input" v-model="model" :placeholder="placeholder"
            class="focus:outline-0 w-full text-text-muted">
        <slot name="trailing"></slot>
    </div>
</template>
