import '@babel/polyfill';
import pool from '../config';
import Helper from '../helpers/helper';

const password = Helper.hashPassword('oladimeji1');
const password1 = Helper.hashPassword('adedoyin1');

const populate = `
INSERT INTO users (first_name, last_name, email, password, is_admin, is_verified) VALUES ('abiola','victor','ojoabiola@gmail.com','${password}',true, true);
INSERT INTO users (first_name, last_name, email, password, is_admin, is_verified) VALUES ('doyin','adedokun','doyin@gmail.com','${password1}',false, true);
INSERT INTO bus (number_plate, manufacturer, model, year, capacity) VALUES ('EKY380A','Honda','DL360', 2016, 20);
INSERT INTO bus (number_plate, manufacturer, model, year, capacity) VALUES ('EKY380B','Honda','DL360', 2016, 20);
INSERT INTO bus (number_plate, manufacturer, model, year, capacity) VALUES ('EKY380C','Honda','DL360', 2016, 20);
INSERT INTO bus (number_plate, manufacturer, model, year, capacity) VALUES ('EKY380D','Honda','DL360', 2016, 20);
INSERT INTO bus (number_plate, manufacturer, model, year, capacity) VALUES ('EKY380E','Honda','DL360', 2016, 20);
INSERT INTO bus (number_plate, manufacturer, model, year, capacity) VALUES ('EKY380A','Honda','DL360', 2016, 20);
INSERT INTO bus (number_plate, manufacturer, model, year, capacity) VALUES ('EKY380B','Honda','DL360', 2016, 20);
INSERT INTO bus (number_plate, manufacturer, model, year, capacity) VALUES ('EKY380C','Honda','DL360', 2016, 20);
INSERT INTO bus (number_plate, manufacturer, model, year, capacity) VALUES ('EKY380D','Honda','DL360', 2016, 20);
INSERT INTO bus (number_plate, manufacturer, model, year, capacity) VALUES ('EKY380E','Honda','DL360', 2016, 20);
INSERT INTO trips (bus_id, origin, destination, trip_date, fare, status) VALUES (1,'lagos','abuja', '07/12/2020', 5000, 'active');
INSERT INTO trips (bus_id, origin, destination, trip_date, fare, status) VALUES (2,'lagos','abuja', '07/12/2020', 5000, 'active');
INSERT INTO trips (bus_id, origin, destination, trip_date, fare, status) VALUES (3,'abuja','kaduna', '07/12/2020', 5000, 'active');
INSERT INTO trips (bus_id, origin, destination, trip_date, fare, status) VALUES (4,'abuja','lagos', '07/12/2020', 5000, 'active');
INSERT INTO trips (bus_id, origin, destination, trip_date, fare, status) VALUES (5,'kaduna','ibadan', '07/12/2020', 5000, 'active');
`;

const seedDatabase = async () => {
  await pool.query(populate).then(() => {
    console.log('tables Successfully populated');
  });
};

seedDatabase();
