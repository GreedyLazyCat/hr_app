<script lang="ts" setup>

const departmentFilter = ref<Department | null>(
    {
        id: 1,
        name: "Отдел"
    }
)

const jobPositionFilter = ref<JobPostion | null>({
    id: 1,
    name: "Разработчик"
})

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
                            <Selector key-field="id" modal-title="Выбрать отдел" api-path="/" display-field="name"
                                v-model="departmentFilter">
                            </Selector>
                        </div>
                        <div class="flex flex-col gap-2 w-full">
                            <label for="">Должность</label>
                            <Selector key-field="id" modal-title="Выбрать должность" api-path="/" display-field="name"
                                v-model="jobPositionFilter">
                            </Selector>
                        </div>
                    </div>
                    <button class="btn">Сбросить фильтры</button>
                </div>
            </div>
        </div>
        <div class="flex gap-2 py-4">
            <EmployeeList></EmployeeList>
        </div>
    </section>
</template>