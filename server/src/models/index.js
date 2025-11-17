import Experience from './experience.js';
import User from './user.js';

User.hasMany(Experience,{foreignKey:'owner_id',allowNull: false});
Experience.belongsTo(User,{
    foreignKey: 'owner_id',
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate:'CASCADE',
});

export { User, Experience };