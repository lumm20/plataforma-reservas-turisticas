import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'clavePrueba';

/**
 * Genera un token JWT
 * @param {Object} payload - Datos a incluir en el token (id, email, role)
 * @param {String} expiresIn - Tiempo de expiración ('24h', '30d', etc.)
 * @returns {String} Token JWT
 */
export const generateToken = (payload, expiresIn = '24h') => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

/**
 * Verifica y decodifica un token JWT
 * @param {String} token - Token a verificar
 * @returns {Object} Payload decodificado
 * @throws {Error} Si el token es inválido o expirado
 */
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    throw new Error('Token inválido o expirado');
  }
};