<script lang="ts" setup>
const employees = ref<EmployeeFull[]>(
    [
        {
            id: 1,
            firstName: "Иван",
            lastName: "Иванов",
            patronymic: "Иванович",
            birthDate: "2025-10-25",
            passportSeriesAndNumber: "1010234567",
            contacts: "asldf",
            adress: "sdfa",
            salary: 123,
            hireDate: "2025-20-10",
            isFired: false,
            department: {
                id: 1,
                name: "Отдел"
            },
            jobPosition: {
                id: 1,
                name: "Позиция"
            },
            fullName: "Иванов Иван Иванович",
        },
        {
            id: 2,
            firstName: "Иван",
            lastName: "Иванов",
            patronymic: "Иванович",
            birthDate: "2025-10-25",
            passportSeriesAndNumber: "1010234567",
            contacts: "asldf",
            adress: "sdfa",
            salary: 123,
            hireDate: "2025-20-10",
            isFired: false,
            department: {
                id: 1,
                name: "Отдел"
            },
            jobPosition: {
                id: 1,
                name: "Позиция"
            },
            fullName: "Иванов Иван Иванович",
        }
    ]
)
const showEditModal = ref(false)

function onCloseEditModal() {
    showEditModal.value = false
}

</script>
<template>
    <div class="flex flex-col gap-2 w-full">
        <Modal title="Редактировать сотрудника" :is-open="showEditModal" @close="onCloseEditModal()">
            <div class="w-100"></div>
        </Modal>
        <EmployeeCard v-for="employee in employees" :employee="employee" @edit-clicked="showEditModal = true">
        </EmployeeCard>
    </div>
</template>