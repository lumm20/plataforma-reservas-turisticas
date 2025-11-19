import { Sequelize } from 'sequelize';
import dotenv  from 'dotenv'; 

dotenv.config();

//let user = process.env.DB_USER;
//if(user!== 'postgres') user = 'postgres';

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
