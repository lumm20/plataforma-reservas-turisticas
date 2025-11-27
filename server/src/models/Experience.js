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
            // Permite letras y espacios
            is: /^[a-zA-Z\s]*$/ 
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    // --- NUEVOS CAMPOS AGREGADOS ---
    quota: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 10 // Valor por defecto si no se envía
    },
    duration: {
        type: DataTypes.STRING, // Ej: "3 horas", "1 día"
        allowNull: true
    },
    category: {
        type: DataTypes.STRING, // Ej: "Aventura", "Gastronomía"
        allowNull: true
    },
    imageUrl: {
        type: DataTypes.STRING, // URL de la imagen principal
        allowNull: true
    },
    owner_id: { // Veo que ya lo tienes en pgAdmin, lo dejamos explícito
        type: DataTypes.INTEGER,
        allowNull: true 
    }

}, { tableName: 'Experiences' });

export default Experience;