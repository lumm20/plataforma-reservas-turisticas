import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.config.js';

const ProviderProfile = sequelize.define("ProviderProfile", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  service_type: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, { tableName: "ProviderProfiles" });

export default ProviderProfile;