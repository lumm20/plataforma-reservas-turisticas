import { Sequelize } from 'sequelize';
import dotenv  from 'dotenv'; 

dotenv.config();

//let user = process.env.DB_USER;
//if(user!== 'postgres') user = 'postgres';

console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD, typeof process.env.DB_PASSWORD);
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PORT:", process.env.DB_PORT);

export const sequelize = new Sequelize(
    process.env.DB_NAME,
    //user,
    process.env.db_USER || 'root',
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
        dialect: 'mysql',
        logging: false,
    }
);
