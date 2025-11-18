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
    //es asi porque se registra el hash de la contraseña, no el texto plano
    password_h:{
        type: DataTypes.STRING(64),
        allowNull: false,
        validate:{
            is: /^\$2[aby]\$[0-9]{2}\$/i,
        }
    },
    // password_h:{
    //     type: DataTypes.STRING(200),
    //     allowNull: false,
    // },
    role: {
        type: DataTypes.ENUM("cliente", "proveedor"),
        allowNull: false,
    },
    verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, { tableName: 'Users' });

export default User;
