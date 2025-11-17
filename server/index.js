import { sequelize } from "./src/config/db.config.js"
import { User } from "./src/models/index.js"
import { hashPassword } from "./src/utils/security/hashing.js";

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync({ force: true });
    console.log('Tables synchronized succesfully');

    const pass = await hashPassword('myPass111');
    console.log(pass);
    const newUser = await User.create({
      name: 'Luisa Fernanda Morales Espinoza',
      email: 'luisa@gmail.com',
      password_h: pass
    });
    console.log('New user', newUser.dataValues);

    const result = await User.findOne({
      where: { id: newUser.id },
    });

    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Oops!, Something went wrong:', error);
  }
}

start();