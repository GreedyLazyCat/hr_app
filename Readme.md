## Описание проекта
### Стек
 - NestJS
 - PostgreSQL
 - NuxtJS
 - Для общения с бд используется ORM - DrizzleORM
 - Nginx
 - Docker
### Структура папок
 - backend - бэк на NestJs
 - frontend - фронт на Nuxt
 - dbmodel - здесь лежит ERD базы данных для Oracle Sql Developer, но так же есть скриншот самой модели. Самый актуальный вариант - backend/src/db/schema.ts
### Запуск
Поскольку это небольшое тестовое задания я оставил .env файл в репозитории, поэтому можно просто запускать через docker compose.
```
docker compose up -d
```
