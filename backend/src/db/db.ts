import { Inject } from '@nestjs/common';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';

const db = drizzle(
  `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
);

export const dbProvider = {
  provide: 'DB_PROVIDER',
  useValue: db,
};

export const InjectDb = () => Inject('DB_PROVIDER');

export type DbType = typeof db;
