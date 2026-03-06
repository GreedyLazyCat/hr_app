<script lang="ts" setup>
import * as z from "zod";
import useForm from "~/composables/useForm";

const { filters } = defineProps<{
    filters: {
        jobPosition: JobPostion | null,
        department: Department | null
    }
}>()

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
        salary: 123,
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
        salary: 123,
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
const showFireConfirmationModal = ref(false);
const employeeToFire = ref<EmployeeFull | null>(null);

const employeeSchema = z.object({
    firstName: z.string().min(1, "Имя обязательно"),
    lastName: z.string().min(1, "Фамилия обязательна"),
    patronymic: z.string().optional(),
    birthDate: z.string().min(1, "Дата рождения обязательна"),
    passportSeriesAndNumber: z.string().min(1, "Серия и номер паспорта обязательны"),
    contacts: z.string().min(1, "Контакты обязательны"),
    adress: z.string().min(1, "Адрес обязателен"),
    salary: z.number().min(1, "Зарплата обязательна"),
    hireDate: z.string().min(1, "Дата приема на работу обязательна"),
    department: z.object({
        id: z.number(),
        name: z.string()
    }, "Отдел обязателен"),
    jobPosition: z.object({
        id: z.number(),
        name: z.string()
    }, "Должность обязательна"),
});

const form = useForm<EmployeeFullWOId>(
    {
        firstName: "",
        lastName: "",
        patronymic: "",
        birthDate: "",
        passportSeriesAndNumber: "",
        contacts: "",
        adress: "",
        salary: 0,
        hireDate: "",
        department: null,
        jobPosition: null,
    },
    async (fields) => {
        saveEmployee(fields);
    },
    employeeSchema
);

function onCloseEditModal() {
    showEditModal.value = false;
    currentEmployee.value = null;
}

function onEditEmployee(employee: EmployeeFull) {
    currentEmployee.value = { ...employee };
    form.fields = { ...employee };
    form.resetErrors()
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
        salary: 0,
        hireDate: "2025-10-25",
        isFired: false,
        department: null,
        jobPosition: null,
        fullName: "",
    };
    form.fields = {
        firstName: "",
        lastName: "",
        patronymic: "",
        birthDate: "2025-10-25",
        passportSeriesAndNumber: "",
        contacts: "",
        adress: "",
        salary: 0,
        hireDate: "2025-10-25",
        department: null,
        jobPosition: null,
    };
    showEditModal.value = true;
    form.resetErrors()
}

function saveEmployee(fields: EmployeeFullWOId) {
    if (currentEmployee.value) {
        if (currentEmployee.value.id === 0) {
            employees.value.push({ ...fields, id: employees.value.length + 1, fullName: null, isFired: false });
        } else {
            const index = employees.value.findIndex(emp => emp.id === currentEmployee.value!.id);
            if (index !== -1) {
                employees.value[index] = { ...fields, id: currentEmployee.value.id, isFired: currentEmployee.value.isFired, fullName: currentEmployee.value.fullName };
            }
        }
        onCloseEditModal();
    }
}

function onFireEmployee(employee: EmployeeFull) {
    employeeToFire.value = employee;
    showFireConfirmationModal.value = true;
}

function fireEmployee() {
    if (employeeToFire.value) {
        const index = employees.value.findIndex(emp => emp.id === employeeToFire.value!.id);
        if (index !== -1 && employees.value[index]) {
            employees.value[index].isFired = true;
        }
        showFireConfirmationModal.value = false;
        employeeToFire.value = null;
    }
}

function cancelFire() {
    showFireConfirmationModal.value = false;
    employeeToFire.value = null;
}
</script>

<template>
    <div class="flex flex-col gap-2 w-full">
        <Modal title="Редактировать сотрудника" :is-open="showEditModal" @close="onCloseEditModal()">
            <div class="flex flex-col gap-2 w-full md:min-w-150">
                <div class="flex flex-col gap-2 w-full">
                    <label for="lastName">Фамилия*</label>
                    <TextInput v-model="form.fields.lastName" placeholder="Фамилия"
                        :has-error="!!form.fieldErrors.lastName" />
                    <span v-if="form.fieldErrors.lastName" class="text-danger text-sm">{{ form.fieldErrors.lastName
                        }}</span>
                </div>
                <div class="flex flex-col gap-2 w-full">
                    <label for="firstName">Имя*</label>
                    <TextInput v-model="form.fields.firstName" placeholder="Имя"
                        :has-error="!!form.fieldErrors.firstName" />
                    <span v-if="form.fieldErrors.firstName" class="text-danger text-sm">{{ form.fieldErrors.firstName
                        }}</span>
                </div>
                <div class="flex flex-col gap-2 w-full">
                    <label for="patronymic">Отчество</label>
                    <TextInput v-model="form.fields.patronymic" placeholder="Отчество"
                        :has-error="!!form.fieldErrors.patronymic" />
                    <span v-if="form.fieldErrors.patronymic" class="text-danger text-sm">{{ form.fieldErrors.patronymic
                        }}</span>
                </div>
                <div class="flex flex-col gap-2 w-full">
                    <label for="birthDate">Дата рождения*</label>
                    <TextInput v-model="form.fields.birthDate" type="date" placeholder="Дата рождения"
                        :has-error="!!form.fieldErrors.birthDate" />
                    <span v-if="form.fieldErrors.birthDate" class="text-danger text-sm">{{ form.fieldErrors.birthDate
                        }}</span>
                </div>
                <div class="flex flex-col gap-2 w-full">
                    <label for="passportSeriesAndNumber">Серия и номер паспорта*</label>
                    <TextInput v-model="form.fields.passportSeriesAndNumber" placeholder="Серия и номер паспорта"
                        :has-error="!!form.fieldErrors.passportSeriesAndNumber" />
                    <span v-if="form.fieldErrors.passportSeriesAndNumber" class="text-danger text-sm">{{
                        form.fieldErrors.passportSeriesAndNumber }}</span>
                </div>
                <div class="flex flex-col gap-2 w-full">
                    <label for="contacts">Контакты*</label>
                    <TextInput v-model="form.fields.contacts" placeholder="Контакты"
                        :has-error="!!form.fieldErrors.contacts" />
                    <span v-if="form.fieldErrors.contacts" class="text-danger text-sm">{{ form.fieldErrors.contacts
                        }}</span>
                </div>
                <div class="flex flex-col gap-2 w-full">
                    <label for="adress">Адрес*</label>
                    <TextInput v-model="form.fields.adress" placeholder="Адрес"
                        :has-error="!!form.fieldErrors.adress" />
                    <span v-if="form.fieldErrors.adress" class="text-danger text-sm">{{ form.fieldErrors.adress
                        }}</span>
                </div>
                <div class="flex flex-col gap-2 w-full">
                    <label for="salary">Зарплата*</label>
                    <TextInput v-model="form.fields.salary" type="number" placeholder="Зарплата"
                        :has-error="!!form.fieldErrors.salary" />
                    <span v-if="form.fieldErrors.salary" class="text-danger text-sm">{{ form.fieldErrors.salary
                        }}</span>
                </div>
                <div class="flex flex-col gap-2 w-full">
                    <label for="hireDate">Дата приема на работу*</label>
                    <TextInput v-model="form.fields.hireDate" type="date" placeholder="Дата приема на работу"
                        :has-error="!!form.fieldErrors.hireDate" />
                    <span v-if="form.fieldErrors.hireDate" class="text-danger text-sm">{{ form.fieldErrors.hireDate
                        }}</span>
                </div>
                <div class="flex flex-col gap-2 w-full">
                    <label for="department">Отдел*</label>
                    <Selector key-field="id" modal-title="Выбрать отдел" api-path="/departments" display-field="name"
                        v-model="form.fields.department" :has-error="!!form.fieldErrors.department">
                    </Selector>
                    <span v-if="form.fieldErrors.department" class="text-danger text-sm">{{ form.fieldErrors.department
                        }}</span>
                </div>
                <div class="flex flex-col gap-2 w-full">
                    <label for="jobPosition">Должность*</label>
                    <Selector key-field="id" modal-title="Выбрать должность" api-path="/jobPositions"
                        display-field="name" v-model="form.fields.jobPosition"
                        :has-error="!!form.fieldErrors.jobPosition">
                    </Selector>
                    <span v-if="form.fieldErrors.jobPosition" class="text-danger text-sm">{{
                        form.fieldErrors.jobPosition }}</span>
                </div>
                <div class="flex justify-end gap-2 mt-4">
                    <button class="btn" @click="onCloseEditModal()">Отмена</button>
                    <button class="btn" @click="form.submit()">Сохранить</button>
                </div>
            </div>
        </Modal>

        <Modal title="Подтверждение увольнения" :is-open="showFireConfirmationModal" @close="cancelFire">
            <div class="flex flex-col gap-4">
                <p>Вы уверены, что хотите уволить сотрудника {{ employeeToFire?.fullName }}?</p>
                <div class="flex justify-end gap-2">
                    <button class="btn" @click="cancelFire">Отмена</button>
                    <button class="btn bg-danger border-danger" @click="fireEmployee">Уволить</button>
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
            @edit-clicked="onEditEmployee(employee)" @fire-clicked="onFireEmployee(employee)">
        </EmployeeCard>
    </div>
</template>