import { User, ProviderProfile } from "../models/index.js";
import { hashPassword } from "../utils/security/hashing.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, role, service_type } = req.body;

    if (!name || !email || !password || !confirmPassword || !role) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Las contraseñas no coinciden" });
    }

    if (!["cliente", "proveedor"].includes(role)) {
      return res.status(400).json({ error: "Rol inválido" });
    }

    if (role === "proveedor") {
      if (!service_type) {
        return res.status(400).json({ error: "Todos los campos de proveedor son obligatorios" });
      }
    }

    const userExists = await User.findOne({ where: { email } });
    if (userExists) return res.status(400).json({ error: "Este email ya está registrado" });


    const hashed = await hashPassword(password);

    //Crear usuario
    const user = await User.create({
      name,
      email,
      password_h: hashed,
      role,
    });


    if (role === "proveedor") {
      await ProviderProfile.create({
        user_id: user.id,
        service_type
      });
    }

    return res.json({ message: "Registro exitoso. Revisa tu email para verificar tu cuenta" });

  } catch (err) {
    console.error(err);

    if (err.name === "SequelizeValidationError") {
      return res.status(400).json({
        error: err.errors[0].message || "Error de validación"
      });
    }

    res.status(500).json({ error: "Error en el servidor" });
  }
};
