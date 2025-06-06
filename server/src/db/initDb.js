import { db } from '../config/knex.js';

export async function init() {
  try {
    const user = await db.schema.hasTable('users');
    if (!user) {
      await db.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('email').unique().notNullable();
        table.string('password').notNullable();
        table.timestamps(true, true);
      });

      console.log('users table created!');
    } else {
      console.log('users table already exists');
    }

    const hasBoards = await db.schema.hasTable('boards');
    if (!hasBoards) {
      await db.schema.createTable('boards', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table
          .integer('createdBy')
          .unsigned()
          .references('id')
          .inTable('users')
          .onDelete('CASCADE');
        table.timestamps(true, true);
      });

      console.log('boards table created!');
    } else {
      console.log('boards table already exists');
    }

    const hasTasks = await db.schema.hasTable('tasks');
    if (!hasTasks) {
      await db.schema.createTable('tasks', (table) => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.text('description');
        table
          .integer('boardId')
          .unsigned()
          .references('id')
          .inTable('boards')
          .onDelete('CASCADE');
        table
          .integer('createdBy')
          .unsigned()
          .references('id')
          .inTable('users')
          .onDelete('CASCADE');
        table.string('status').notNullable().defaultTo('todo');
        table.boolean('completed').defaultTo(false);
        table.timestamps(true, true);
      });

      console.log('tasks table created!');
    } else {
      console.log('tasks table already exists');
    }
  } catch (error) {
    console.error('Error creating tables:', error);
  } finally {
    await db.destroy();
    process.exit(0);
  }
}

init();
