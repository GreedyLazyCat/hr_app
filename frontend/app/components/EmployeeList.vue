<script lang="ts" setup>
import * as z from "zod";
import { finalize } from "zod/v4/core";
import useForm from "~/composables/useForm";
import useItemLoader from "~/composables/useItemLoader";

const { $api } = useNuxtApp()

const { filters } = defineProps<{
    filters: {
        fullName: string,
        jobPosition: JobPostion | null,
        department: Department | null
    }
}>();

const {
    items: employees,
    reload,
    loadNextPage,
    shouldShowLoadingSpinner,
    setFilters,
    endReached,
    loadingItems
} = useItemLoader<EmployeeFull>(1, 10, "/employee")

const showEditModal = ref(false);
const currentEmployee = ref<EmployeeFull | null>(null);
const showFireConfirmationModal = ref(false);
const employeeToFire = ref<EmployeeFull | null>(null);
const error = ref<any>(null);
const isSaving = ref(false);

const phoneRegex = /^(\+7|8|7)[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;

const addressRegex = /^[а-яёА-ЯЁ0-9\s.,-\/]{5,100}$/u;
const addressExample = "101000, г. Москва, ул. Примерная, д. 10";

const passportRegex = /^\d{10}$/;

const employeeSchema = z.object({
    firstName: z.string().min(1, "Имя обязательно"),
    lastName: z.string().min(1, "Фамилия обязательна"),
    patronymic: z.string().nullable().optional(),
    birthDate: z.string().min(1, "Дата рождения обязательна"),
    passportSeriesAndNumber: z.string().regex(passportRegex, "Серия и номер паспорта должны быть 10 цифрами"),
    contacts: z.string().regex(phoneRegex, "Контакты должны быть в формате: +7 (XXX) XXX-XX-XX, 8 XXX XXX-XX-XX или 7 XXX XXX-XX-XX"),
    adress: z.string().regex(addressRegex, `Адрес должен быть в формате: ${addressExample}`),
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
        isSaving.value = true;
        try {
            await saveEmployee(fields);
        } finally {
            isSaving.value = false;
        }
    },
    employeeSchema
);

async function fetchEmployees() {
    try {
        error.value = null;
        await reload();
    } catch (err) {
        error.value = err;
        console.error("Failed to fetch employees:", err);
    }
}

async function loadMoreEmployees() {
    try {
        await loadNextPage();
    } catch (err) {
        console.error("Failed to load more employees:", err);
    }
}

function onCloseEditModal() {
    showEditModal.value = false;
    currentEmployee.value = null;
}

function onEditEmployee(employee: EmployeeFull) {
    currentEmployee.value = { ...employee };
    form.fields = {
        ...employee,
        department: employee.department,
        jobPosition: employee.jobPosition
    };
    form.resetErrors()
    showEditModal.value = true;
}

function onAddEmployee() {
    currentEmployee.value = {
        id: -1,
        firstName: "",
        lastName: "",
        patronymic: "",
        birthDate: "",
        passportSeriesAndNumber: "",
        contacts: "",
        adress: "",
        salary: 0,
        hireDate: "",
        isFired: false,
        department: null,
        jobPosition: null,
        fullName: "",
    };
    form.fields = {
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
    };
    showEditModal.value = true;
    form.resetErrors()
}

async function saveEmployee(fields: EmployeeFullWOId) {
    if (currentEmployee.value) {
        try {
            if (currentEmployee.value.id === -1) {
                const response = await $api<EmployeeFull>('/employee', {
                    method: 'POST',
                    body: {
                        ...fields,
                        patronymic: (fields.patronymic === "") ? null : fields.patronymic,
                        departmentId: fields.department?.id,
                        jobPositionId: fields.jobPosition?.id
                    }
                });
                await fetchEmployees();
            } else {
                const response = await $api<EmployeeFull>(`/employee/${currentEmployee.value.id}`, {
                    method: 'PATCH',
                    body: {
                        ...fields,
                        patronymic: (fields.patronymic === "") ? null : fields.patronymic,
                        departmentId: fields.department?.id,
                        jobPositionId: fields.jobPosition?.id
                    }
                });
                await fetchEmployees();
            }
            onCloseEditModal();
        } catch (err) {
            console.error("Failed to save employee:", err);
        }
    }
}

async function onFireEmployee(employee: EmployeeFull) {
    employeeToFire.value = employee;
    showFireConfirmationModal.value = true;
}

async function fireEmployee() {
    if (employeeToFire.value) {
        try {
            await $api(`/employee/${employeeToFire.value.id}`, {
                method: 'PATCH',
                body: {
                    isFired: true
                }
            });
            await fetchEmployees();
            showFireConfirmationModal.value = false;
            employeeToFire.value = null;
        } catch (err) {
            console.error("Failed to fire employee:", err);
        }
    }
}

function cancelFire() {
    showFireConfirmationModal.value = false;
    employeeToFire.value = null;
}

watch(() => filters, async (newFilters) => {
    const newFilterObj: Partial<EmployeeServerFilter> = {};
    if (newFilters.jobPosition) {
        newFilterObj.jobPostionId = newFilters.jobPosition.id;
    }
    if (newFilters.department) {
        newFilterObj.departmentId = newFilters.department.id;
    }
    if (newFilters.fullName !== "") {
        newFilterObj.fullName = newFilters.fullName;
    }
    await setFilters(newFilterObj);
    await fetchEmployees();
}, { deep: true, immediate: true });

onMounted(() => {
    fetchEmployees();
});
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
                    <TextInput v-model="form.fields.passportSeriesAndNumber" placeholder="1234567890"
                        :has-error="!!form.fieldErrors.passportSeriesAndNumber" />
                    <span v-if="form.fieldErrors.passportSeriesAndNumber" class="text-danger text-sm">{{
                        form.fieldErrors.passportSeriesAndNumber }}</span>
                </div>
                <div class="flex flex-col gap-2 w-full">
                    <label for="contacts">Контакты*</label>
                    <TextInput v-model="form.fields.contacts" placeholder="+7 (XXX) XXX-XX-XX"
                        :has-error="!!form.fieldErrors.contacts" />
                    <span v-if="form.fieldErrors.contacts" class="text-danger text-sm">{{ form.fieldErrors.contacts
                        }}</span>
                </div>
                <div class="flex flex-col gap-2 w-full">
                    <label for="adress">Адрес*</label>
                    <TextInput v-model="form.fields.adress" :placeholder="addressExample"
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
                    <Selector key-field="id" modal-title="Выбрать отдел" api-path="/department" display-field="name"
                        v-model="form.fields.department" :has-error="!!form.fieldErrors.department">
                    </Selector>
                    <span v-if="form.fieldErrors.department" class="text-danger text-sm">{{
                        form.fieldErrors.department
                        }}</span>
                </div>
                <div class="flex flex-col gap-2 w-full">
                    <label for="jobPosition">Должность*</label>
                    <Selector key-field="id" modal-title="Выбрать должность" api-path="/job-position"
                        display-field="name" v-model="form.fields.jobPosition"
                        :has-error="!!form.fieldErrors.jobPosition">
                    </Selector>
                    <span v-if="form.fieldErrors.jobPosition" class="text-danger text-sm">{{
                        form.fieldErrors.jobPosition }}</span>
                </div>
                <div class="flex flex-wrap justify-end gap-2 mt-4">
                    <button class="btn px-4" @click="onCloseEditModal()">Отмена</button>
                    <button class="btn px-4" @click="form.submit()" :disabled="isSaving">
                        {{ isSaving ? 'Загрузка...' : 'Сохранить' }}
                    </button>
                </div>
            </div>
        </Modal>

        <Modal title="Подтверждение увольнения" :is-open="showFireConfirmationModal" @close="cancelFire">
            <div class="flex flex-col gap-4">
                <p>Вы уверены, что хотите уволить сотрудника {{ employeeToFire?.fullName }}?</p>
                <div class="flex flex-wrap justify-end gap-2">
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

        <div v-if="error" class="flex flex-col items-center justify-center gap-4 py-8">
            <Icon name="material-symbols:error-outline" class="text-danger text-4xl"></Icon>
            <p class="text-danger text-xl">Что-то пошло не так</p>
            <button class="btn" @click="fetchEmployees">Попробовать снова</button>
        </div>

        <div v-else-if="employees.length === 0 && !loadingItems"
            class="flex flex-col items-center justify-center gap-4 py-8">
            <Icon name="material-symbols:person-off" class="text-text-muted text-4xl"></Icon>
            <p class="text-text-muted text-xl">Список сотрудников пуст</p>
        </div>

        <div v-else class="flex flex-col gap-2 w-full">
            <EmployeeCard v-for="employee in employees" :key="employee.id" :employee="employee"
                @edit-clicked="onEditEmployee(employee)" @fire-clicked="onFireEmployee(employee)">
            </EmployeeCard>

            <LoadingTrigger v-if="!endReached" @intersected="loadMoreEmployees" margin="50px" />

            <div v-if="shouldShowLoadingSpinner" class="flex justify-center py-4">
                <LoadingSpinner width="25px" height="25px" :centered="false"></LoadingSpinner>
            </div>
        </div>
    </div>
</template>