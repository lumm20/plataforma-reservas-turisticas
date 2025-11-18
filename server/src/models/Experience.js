import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.config.js';

const Experience = sequelize.define('Experience', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /([A-Za-z]+( [A-Za-z]+)+)/i
        }
    },
    description:{
        type: DataTypes.TEXT(),
        allowNull: false,
    },
    location:{
        type: DataTypes.STRING,
        //type: DataTypes.GEOMETRY('point'),
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },

}, { tableName: 'Experiences' });

export default Experience;
