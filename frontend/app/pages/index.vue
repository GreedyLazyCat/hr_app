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
                    <Icon name="material-symbols:filter-alt"></Icon>
                    <h2>Фильтры</h2>
                </div>
                <div class="flex flex-col gap-3">
                    <div class="flex flex-col md:flex-row gap-3">
                        <div class="flex flex-col gap-2 w-full">
                            <label for="">Отдел</label>
                            <TextInput placeholder="Отдел"></TextInput>
                        </div>
                        <div class="flex flex-col gap-2 w-full">
                            <label for="">Должность</label>
                            <TextInput placeholder="Должность"></TextInput>
                        </div>
                    </div>
                    <button class="btn">Сбросить фильтры</button>
                </div>
            </div>
        </div>
        <div class="flex gap-2">
            <EmployeeList></EmployeeList>
            <div></div>
        </div>
    </section>
</template>