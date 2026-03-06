<script lang="ts" setup>
const employees = ref<EmployeeFull[]>([
    {
        id: 1,
        firstName: "Иван",
        lastName: "Иванов",
        patronymic: "Иванович",
        birthDate: "2025-10-25",
        passportSeriesAndNumber: "1010234567",
        contacts: "asldf",
        adress: "sdfa",
        salary: "123",
        hireDate: "2025-10-25",
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
        salary: "123",
        hireDate: "2025-10-25",
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
]);

const showEditModal = ref(false);
const currentEmployee = ref<EmployeeFull | null>(null);

function onCloseEditModal() {
    showEditModal.value = false;
    currentEmployee.value = null;
}

function onEditEmployee(employee: EmployeeFull) {
    currentEmployee.value = { ...employee };
    showEditModal.value = true;
}

function onAddEmployee() {
    currentEmployee.value = {
        id: 0,
        firstName: "",
        lastName: "",
        patronymic: "",
        birthDate: "2025-10-25",
        passportSeriesAndNumber: "",
        contacts: "",
        adress: "",
        salary: "0",
        hireDate: "2025-10-25",
        isFired: false,
        department: null,
        jobPosition: null,
        fullName: "",
    };
    showEditModal.value = true;
}

function saveEmployee() {
    if (currentEmployee.value) {
        if (currentEmployee.value.id === 0) {
            employees.value.push({ ...currentEmployee.value, id: employees.value.length + 1 });
        } else {
            const index = employees.value.findIndex(emp => emp.id === currentEmployee.value!.id);
            if (index !== -1) {
                employees.value[index] = { ...currentEmployee.value };
            }
        }
        onCloseEditModal();
    }
}
</script>

<template>
    <div class="flex flex-col gap-2 w-full">
        <Modal title="Редактировать сотрудника" :is-open="showEditModal" @close="onCloseEditModal()">
            <div class="flex flex-col gap-2 w-full md:min-w-150">
                <div class="flex flex-col gap-2 w-full">
                    <label for="lastName">Фамилия*</label>
                    <TextInput v-model="currentEmployee!.lastName" placeholder="Фамилия" />
                </div>
                <div class="flex flex-col gap-2 w-full">
                    <label for="firstName">Имя*</label>
                    <TextInput v-model="currentEmployee!.firstName" placeholder="Имя" />
                </div>
                <div class="flex flex-col gap-2 w-full">
                    <label for="patronymic">Отчество</label>
                    <TextInput v-model="currentEmployee!.patronymic" placeholder="Отчество" />
                </div>
                <div class="flex flex-col gap-2 w-full">
                    <label for="birthDate">Дата рождения*</label>
                    <TextInput v-model="currentEmployee!.birthDate" type="date" placeholder="Дата рождения" />
                </div>
                <div class="flex flex-col gap-2 w-full">
                    <label for="passportSeriesAndNumber">Серия и номер паспорта*</label>
                    <TextInput v-model="currentEmployee!.passportSeriesAndNumber"
                        placeholder="Серия и номер паспорта" />
                </div>
                <div class="flex flex-col gap-2 w-full">
                    <label for="contacts">Контакты*</label>
                    <TextInput v-model="currentEmployee!.contacts" placeholder="Контакты" />
                </div>
                <div class="flex flex-col gap-2 w-full">
                    <label for="adress">Адрес*</label>
                    <TextInput v-model="currentEmployee!.adress" placeholder="Адрес" />
                </div>
                <div class="flex flex-col gap-2 w-full">
                    <label for="salary">Зарплата*</label>
                    <TextInput v-model="currentEmployee!.salary" type="number" placeholder="Зарплата" />
                </div>
                <div class="flex flex-col gap-2 w-full">
                    <label for="hireDate">Дата приема на работу*</label>
                    <TextInput v-model="currentEmployee!.hireDate" type="date" placeholder="Дата приема на работу" />
                </div>
                <div class="flex flex-col gap-2 w-full">
                    <label for="department">Отдел*</label>
                    <Selector key-field="id" modal-title="Выбрать отдел" api-path="/departments" display-field="name"
                        v-model="currentEmployee!.department">
                    </Selector>
                </div>
                <div class="flex flex-col gap-2 w-full">
                    <label for="jobPosition">Должность*</label>
                    <Selector key-field="id" modal-title="Выбрать должность" api-path="/jobPositions"
                        display-field="name" v-model="currentEmployee!.jobPosition">
                    </Selector>
                </div>
                <div class="flex justify-end gap-2 mt-4">
                    <button class="btn" @click="onCloseEditModal()">Отмена</button>
                    <button class="btn" @click="saveEmployee()">Сохранить</button>
                </div>
            </div>
        </Modal>
        <button class="btn flex gap-2 items-center px-4 text-text-muted border-border-muted bg-bg w-fit self-end"
            @click="onAddEmployee()">
            <Icon name="material-symbols:add"></Icon>
            <span>
                Добавить сотрудника
            </span>
        </button>
        <EmployeeCard v-for="employee in employees" :key="employee.id" :employee="employee"
            @edit-clicked="onEditEmployee(employee)">
        </EmployeeCard>
    </div>
</template>