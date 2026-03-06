<script lang="ts" setup>
const { modalTitle = "Окно селектора", displayField = "name", keyField, hasError = false } = defineProps<{
    displayField: string,
    keyField: string,
    apiPath: string,
    modalTitle: string,
    hasError?: boolean,
}>()

const model = defineModel<Record<string, any> | null>({ default: null })
const selectedInModal = ref<Record<string, any> | null>(null)

const showSelectorModal = ref(false)
const selectorText = computed(() => {
    if (model.value && Object.keys(model.value).includes(displayField)) {
        return model.value[displayField]
    }
    return "Не выбрано"
})
const isSelectedModalNull = computed(() => {
    return selectedInModal.value ? false : true
})

const items = ref([
    {
        id: 1,
        name: "Тестовый 1"
    },
    {
        id: 2,
        name: "Тестовый 2"
    },
])

function openSelectorModal() {
    showSelectorModal.value = true
}

function closeSelectorModal() {
    showSelectorModal.value = false
}

function clearSelectedInModal() {
    selectedInModal.value = null
}

function confirm() {
    model.value = selectedInModal.value
    closeSelectorModal()
}

function isSelected(item: Record<string, any>) {
    if (selectedInModal.value && selectedInModal.value[keyField] === item[keyField]) {
        return true
    }

    return false
}

function selectItem(item: Record<string, any>) {
    selectedInModal.value = item
}

function getItemDisplayField(item: Record<string, any>) {
    if (Object.keys(item).includes(displayField)) {
        return item[displayField]
    }

    return "Название элемента"
}

watch(showSelectorModal, (newVal) => {
    if (newVal) {
        selectedInModal.value = model.value
    }
})

</script>

<template>
    <div class="flex gap-2 items-center justify-between bg-bg border border-border px-4 py-3 rounded-xl hover:cursor-pointer focus-within:border-primary transition-all"
        :class="{ 'border-danger border-2': hasError, 'border-border': !hasError }" @click="openSelectorModal()">
        <div class="flex gap-2">
            <slot name="leading"></slot>
            <span>{{ selectorText }}</span>
        </div>
        <Icon name="material-symbols:keyboard-arrow-down"></Icon>
        <Modal :title="modalTitle" :is-open="showSelectorModal" @close="closeSelectorModal()">
            <div class="flex flex-col gap-4 w-full md:min-w-150">
                <TextInput placeholder="Поиск по названию" class="w-full">
                    <template #trailing>
                        <Icon name="material-symbols:search" class="text-text-muted text-lg"></Icon>
                    </template>
                </TextInput>
                <div class="flex flex-col gap-2 w-full min-h-20 max-h-120 overflow-scroll">
                    <div class="flex items-center justify-between border border-border cursor-pointer w-full px-4 py-3 rounded-xl"
                        :class="{ 'bg-primary text-bg-light': isSelectedModalNull }" @click="clearSelectedInModal()">
                        <span>Не выбрано</span>
                        <Icon name="material-symbols:check" v-if="isSelectedModalNull"></Icon>
                    </div>
                    <div v-for="item in items"
                        class="flex items-center justify-between border border-border cursor-pointer w-full px-4 py-3 rounded-xl"
                        :class="{ 'bg-primary text-bg-light': isSelected(item) }" @click="selectItem(item)">
                        <span>{{ getItemDisplayField(item) }}</span>
                        <Icon name="material-symbols:check" v-if="isSelected(item)"></Icon>
                    </div>
                </div>
                <div class="flex gap-2 justify-end w-full">
                    <button class="btn text-text-muted bg-bg-dark border-border-muted px-4"
                        @click="closeSelectorModal()">Отмена</button>
                    <button class="btn px-4" @click="confirm()">Выбрать</button>
                </div>
            </div>
        </Modal>
    </div>
</template>