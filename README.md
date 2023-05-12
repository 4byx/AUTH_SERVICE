### Setting Up database

- command to create database `npx sequelize db:create` , it will create the db according to your `config/config.json` file
- command to create user model `npx sequelize model:generate --name User --attributes email:string,password:string`
- command to migrate it in sql `npx sequelize db:migrate`,
