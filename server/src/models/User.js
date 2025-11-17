import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.config.js';

const User = sequelize.define('User', {
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
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true,
        }
    },
    password_h:{
        type: DataTypes.STRING(64),
        allowNull: false,
        validate:{
            is: /^\$2[aby]\$[0-9]{2}\$/i,
        }
    }
}, { tableName: 'Users' });

export default User;
