//For news frontend and news admin do npm install and run

Pre-requisite you must have mysql and node.js installed in local machine.

//For sequelize 

step1.) npm install sequelize pg pg-hstore

step2.)npm install -g sequelize-cli


Successfully creates migrations folder.
Successfully creates seeders folder.
step3.)sequelize init

step 4.) //create database newsapp in root and grant privileges to user
GRANT ALL PRIVILEGES ON `newsapp` . * TO '<your username>'@'localhost';

step 5.)In config.json wite username password and database name


step6.)npm install express mysql2 nodemon crypto-js

step 7.)sequelize db:create

step 8.)sequelize migration:create --name create_users_table
