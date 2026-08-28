import { DataSource } from 'typeorm';

export const appDataSource = new DataSource({
  type: 'better-sqlite3',
  database: 'db.sqlite',
  synchronize: false,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
});
