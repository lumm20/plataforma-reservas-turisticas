import e from "express";
import { register } from "../controllers/auth.controller.js";
import { check } from "express-validator";  // 

const authRouter = e.Router();

authRouter.post(
  "/register",
  [
    check("name").not().isEmpty().withMessage("El nombre es obligatorio"),
    check("email").isEmail().withMessage("Correo no válido"),
    check("password").isLength({ min: 6 }).withMessage("La contraseña debe tener mínimo 6 caracteres"),
    check("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Las contraseñas no coinciden");
      }
      return true;
    }),
    check("role").not().isEmpty().withMessage("El rol es obligatorio"),
    check("service_type")
      .optional()
      .custom((value, { req }) => {
        if (req.body.role === "proveedor" && !value) {
          throw new Error("El tipo de servicio es obligatorio para proveedores");
        }
        return true;
      }),
  ],
  register
);

export default authRouter;
