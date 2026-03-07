#!/bin/sh
set -e

MARKER_FILE=/run_marker/initialized.txt

if [ -f "$MARKER_FILE" ]; then
    echo "Migrations and seeding already done, skipping..."
else
    echo "First run: running migrations and seeding"

    echo "Waiting for Postgres..."
    until pg_isready -h $DB_HOST -p $DB_PORT -U $DB_USER; do
      sleep 2
    done

    echo "Postgres is ready"

    psql "postgresql://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME" \
      -c "CREATE EXTENSION IF NOT EXISTS pg_trgm;"

    npx drizzle-kit push

    psql "postgresql://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME" <<EOF
INSERT INTO department (name) VALUES
('Инженерия'),('Отдел кадров'),('Финансы'),('Маркетинг'),('Продажи'),('ИТ поддержка'),
('Юридический отдел'),('Производство'),('Логистика'),('Закупки'),('Исследования и разработки'),
('Обслуживание клиентов');

INSERT INTO job_postion (name) VALUES
('Программист'),('Менеджер продукта'),('HR специалист'),('Маркетолог'),('Менеджер по продажам'),
('Системный администратор'),('Юрист'),('Инженер производства'),('Логист'),('Закупщик'),
('Исследователь'),('Специалист по работе с клиентами');
EOF

    echo "initialized" > "$MARKER_FILE"
    echo "Migrations and seeding completed!"
fi

node dist/src/main.js