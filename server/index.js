/*import { sequelize } from "./src/config/db.config.js"
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

start();*/

import express from "express";
import { sequelize } from "./src/config/db.config.js";
import authRouter from "./src/routes/auth.router.js";

const app = express();
app.use(express.json());

app.use("/auth", authRouter);

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión exitosa con la BD");

    await sequelize.sync({ force: false }); 
    console.log("Tablas sincronizadas");

    app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));
  } catch (error) {
    console.error("Error al iniciar:", error);
  }
};

start();