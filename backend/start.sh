#!/bin/sh

set -e

echo "Waiting for postgres..."

until pg_isready -h $DB_HOST -p $DB_PORT -U $DB_USER
do
  sleep 2
done

echo "Postgres is ready"

echo "Creating extension pg_trgm if not exists..."

psql "postgresql://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME" \
  -c "CREATE EXTENSION IF NOT EXISTS pg_trgm;"

echo "Running drizzle push..."

npx drizzle-kit push

echo "Starting NestJS server..."

node dist/src/main.js