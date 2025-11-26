import { verifyToken } from "../utils/security/jwt.js";
import AppError from "../utils/AppError.js";

/**
 * Middleware para proteger rutas que requieren autenticación
 */
export const authenticate = (req, res, next) => {
  try {
    // Obtener token del header Authorization
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('Token no proporcionado', 401);
    }

    const token = authHeader.split(' ')[1];
    
    // Verificar y decodificar token
    const decoded = verifyToken(token);
    
    // Agregar información del usuario al request
    req.user = decoded;
    
    next();
  } catch (error) {
    if (error.message === 'Token inválido o expirado') {
      return res.status(401).json({ error: 'Token inválido o expirado' });
    }
    next(error);
  }
};

/**
 * Middleware para verificar roles específicos
 * @param  {...string} allowedRoles - Roles permitidos
 */
export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new AppError('Usuario no autenticado', 401);
    }

    if (!allowedRoles.includes(req.user.role)) {
      throw new AppError('No tienes permisos para realizar esta acción', 403);
    }

    next();
  };
};