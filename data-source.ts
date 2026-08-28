import { DataSource } from 'typeorm';

export const appDataSource = new DataSource({
  type: 'better-sqlite3',
  database: 'db.sqlite',
  synchronize: false, // Migrations ke liye isay false rakhte hain
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migrations/*.ts'], // Migrations is folder mein save hongi
});
