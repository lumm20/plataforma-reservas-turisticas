import { body, validationResult } from "express-validator";
import AppError from "../../utils/AppError.js";

export const validateUser = () => {
  return [
    body("name")
      .trim()
      .notEmpty().withMessage("El nombre es obligatorio")
      .matches(/^[A-Za-zÁÉÍÓÚáéíóúñÑ]+( [A-Za-zÁÉÍÓÚáéíóúñÑ]+)+$/)
      .withMessage("Ingresa nombre y al menos un apellido"),

    body("email")
      .notEmpty().withMessage("El email es obligatorio")
      .isEmail().withMessage("Ingrese un email válido"),

    body("password")
      .notEmpty().withMessage("La contraseña es obligatoria")
      .isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres"),

    body("confirmPassword")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Las contraseñas no coinciden");
        }
        return true;
      }),

    body("role")
      .notEmpty().withMessage("El rol es obligatorio")
      .isIn(["cliente", "proveedor"]).withMessage("Rol inválido"),

    body("description")
      .if(body("role").equals("proveedor"))
      .notEmpty().withMessage("La descripción es obligatoria para proveedores"),

    body("location")
      .if(body("role").equals("proveedor"))
      .notEmpty().withMessage("La ubicación es obligatoria para proveedores"),

    body("service_type")
      .if(body("role").equals("proveedor"))
      .notEmpty().withMessage("El tipo de servicio es obligatorio para proveedores"),
  ];
};

export const checkResults = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};
