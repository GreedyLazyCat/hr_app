<script lang="ts" setup>

const { employee } = defineProps<{
    employee: EmployeeFull
}>()

const emit = defineEmits<{
    (e: 'editClicked', employee: EmployeeFull): void;
    (e: 'fireClicked', employee: EmployeeFull): void;
}>()

const passport = computed(() => {
    const series = employee.passportSeriesAndNumber.slice(0, 4)
    const number = employee.passportSeriesAndNumber.slice(4, 10)

    return `${series} ${number}`
})

function fireClicked() {
    emit('fireClicked', employee)
}

function editClicked() {
    emit('editClicked', employee)
}

</script>

<template>
    <div class="flex flex-col gap-2 border bg-bg border-border px-4 py-3 rounded-xl w-full">
        <div class="flex items-start justify-between">
            <h2 class="text-xl">{{ employee.fullName }}</h2>

            <div class="relative bg-primary p-5 rounded-full">
                <Icon name="material-symbols:person"
                    class="text-xl absolute top-1/2 left-1/2 -translate-1/2 text-bg-light" />
            </div>
        </div>

        <div class="flex items-center gap-2">
            <Icon name="material-symbols:work" />
            <span>Должность: {{ employee.jobPosition?.name }}</span>
        </div>

        <div class="flex items-center gap-2">
            <Icon name="material-symbols:home-work" />
            <span>Отдел: {{ employee.department?.name }}</span>
        </div>

        <div class="flex items-center gap-2">
            <Icon name="material-symbols:badge" />
            <span>Паспорт: {{ passport }}</span>
        </div>

        <div class="flex items-center gap-2">
            <Icon name="material-symbols:cake" />
            <span>Дата рождения: {{ employee.birthDate }}</span>
        </div>

        <div class="flex items-center gap-2">
            <Icon name="material-symbols:call" />
            <span>Контакты: {{ employee.contacts }}</span>
        </div>

        <div class="flex items-center gap-2">
            <Icon name="material-symbols:location-on" />
            <span>Адрес: {{ employee.adress }}</span>
        </div>

        <div class="flex items-center gap-2">
            <Icon name="material-symbols:payments" />
            <span>Минимальная зарплата: {{ employee.salary }}</span>
        </div>

        <div class="flex items-center gap-2">
            <Icon name="material-symbols:event" />
            <span>Дата приема на работу: {{ employee.hireDate }}</span>
        </div>

        <div class="flex justify-end gap-2 mt-3 pt-3 border-t border-border">
            <button class="btn flex items-center gap-2 bg-danger border-danger px-4" @click="fireClicked()">
                <Icon name="material-symbols:person-off" />
                <span>Уволить</span>
            </button>

            <button class="btn flex items-center gap-2 px-4" @click="editClicked()">
                <Icon name="material-symbols:edit" />
                <span>Редактировать</span>
            </button>
        </div>
    </div>
</template>