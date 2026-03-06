<script lang="ts" setup>

const filters = reactive<{
    jobPosition: JobPostion | null,
    department: Department | null,
}>({
    jobPosition: null,
    department: null,
})

function clearFilters() {
    filters.department = null
    filters.jobPosition = null
}

</script>
<template>
    <section class="container flex w-full flex-col px-3 mx-auto">
        <h1 class="text-3xl my-5">Отдел HR</h1>
        <div class="flex flex-col gap-2 w-full">
            <TextInput placeholder="Поиск по ФИО" class="w-full">
                <template #trailing>
                    <Icon name="material-symbols:search" class="text-text-muted text-lg"></Icon>
                </template>
            </TextInput>
            <div class="flex flex-col border border-border px-4 py-3 bg-bg rounded-xl">
                <div class="flex items-center gap-1 pb-3">
                    <Icon name="material-symbols:filter-alt" class="text-xl"></Icon>
                    <h2 class="text-xl">Фильтры</h2>
                </div>
                <div class="flex flex-col gap-3">
                    <div class="flex flex-col md:flex-row gap-3">
                        <div class="flex flex-col gap-2 w-full">
                            <label for="">Отдел</label>
                            <Selector key-field="id" modal-title="Выбрать отдел" api-path="/department"
                                display-field="name" v-model="filters.department">
                            </Selector>
                        </div>
                        <div class="flex flex-col gap-2 w-full">
                            <label for="">Должность</label>
                            <Selector api-path="/job-position" key-field="id" modal-title="Выбрать должность"
                                display-field="name" v-model="filters.jobPosition">
                            </Selector>
                        </div>
                    </div>
                    <button class="btn" @click="clearFilters()">Сбросить фильтры</button>
                </div>
            </div>
        </div>
        <div class="flex gap-2 py-4">
            <EmployeeList :filters="filters"></EmployeeList>
        </div>
    </section>
</template>