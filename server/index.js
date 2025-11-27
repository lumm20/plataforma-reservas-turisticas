import { sequelize } from "./src/config/db.config.js"
// import { User } from "./src/models/index.js"
// import { hashPassword } from "./src/utils/security/hashing.js";
// import authRouter from "./src/routes/auth.router.js";
import app from "./src/app.js";

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync({ alter: true });
    console.log('Tables synchronized succesfully');
  } catch (error) {
    console.error('Oops!, Something went wrong:', error);
  }
}

start();
app.listen(port, () => console.log(`Servidor corriendo en http://localhost:${port}`));
