import '@babel/polyfill';
import pool from '../config';

const createTables = `
  CREATE TABLE IF NOT EXISTS users (
   user_id SERIAL PRIMARY KEY,
   email VARCHAR,
   first_name VARCHAR(20),
   last_name VARCHAR(20),
   password VARCHAR,
   is_verified BOOLEAN,
   is_admin BOOLEAN
  );
  CREATE TABLE IF NOT EXISTS bus (
   ID SERIAL PRIMARY KEY,
   number_plate VARCHAR,
   manufacturer VARCHAR,
   model VARCHAR,
   year INT,
   capacity INT
  );
  CREATE TABLE IF NOT EXISTS trips (
   id SERIAL PRIMARY KEY,
   bus_id INT,
   origin VARCHAR,
   destination VARCHAR,
   trip_date DATE,
   fare FLOAT,
   status VARCHAR
  );
  CREATE TABLE IF NOT EXISTS bookings (
   id SERIAL PRIMARY KEY,
   trip_id INT,
   user_id INT,
   bus_id INT,
   trip_date DATE,
   seat_number INT,
   first_name VARCHAR,
   origin VARCHAR,
   destination VARCHAR,
   last_name VARCHAR,
   email VARCHAR,
   status VARCHAR,
   created_on TIMESTAMP
  );
`;
const createDatabaseTables = async () => {
  await pool.query(createTables).then(() => {
    console.log('Tables successfully created');
  });
};

createDatabaseTables();
