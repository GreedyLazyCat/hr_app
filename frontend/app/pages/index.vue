<template>
    <section class="container flex w-full flex-col px-3 gap-2 mx-auto">
        <div class="flex gap-2 w-full">
            <TextInput placeholder="Поиск по ФИО" class="w-full">
                <template #trailing>
                    <Icon name="material-symbols:search" class="text-text-muted text-lg"></Icon>
                </template>
            </TextInput>
            <button class="btn">
                Проверка
            </button>
        </div>
    </section>
</template>