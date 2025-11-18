import Experience from './experience.js';
import User from './User.js';
import ProviderProfile from './ProviderProfile.js';

User.hasMany(Experience,{foreignKey:'owner_id',allowNull: false});
Experience.belongsTo(User,{
    foreignKey: 'owner_id',
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate:'CASCADE',
});

User.hasMany(Experience,{
    foreignKey: 'owner_id',
    allowNull: false
});

Experience.belongsTo(User, {
    foreignKey: 'owner_id',
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

User.hasOne(ProviderProfile, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
});

ProviderProfile.belongsTo(User, {
    foreignKey: "user_id"
});

export { User, Experience, ProviderProfile };