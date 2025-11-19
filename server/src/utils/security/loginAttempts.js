// Control de intentos de login en memoria
const loginAttempts = new Map();
const BLOCK_DURATION = 15 * 60 * 1000; // 15 minutos en milisegundos
const MAX_ATTEMPTS = 5;

/**
 * Verifica si una cuenta está bloqueada por intentos fallidos
 * @param {String} email - Email del usuario
 * @returns {Boolean} true si está bloqueado
 */
export const checkLoginAttempts = async (email) => {
  const attempts = loginAttempts.get(email);
  
  if (!attempts) {
    return false;
  }

  // Si han pasado más de 15 minutos desde el último intento, resetear
  const timeSinceLastAttempt = Date.now() - attempts.lastAttempt;
  if (timeSinceLastAttempt > BLOCK_DURATION) {
    loginAttempts.delete(email);
    return false;
  }

  // Si alcanzó el máximo de intentos
  if (attempts.count >= MAX_ATTEMPTS) {
    return true;
  }

  return false;
};

/**
 * Registra un intento fallido de login
 * @param {String} email - Email del usuario
 */
export const recordFailedLogin = async (email) => {
  const attempts = loginAttempts.get(email) || { count: 0, lastAttempt: Date.now() };
  
  attempts.count += 1;
  attempts.lastAttempt = Date.now();
  
  loginAttempts.set(email, attempts);
  
  console.log(`Intento fallido para ${email}. Total: ${attempts.count}/${MAX_ATTEMPTS}`);
};

/**
 * Resetea los intentos fallidos después de un login exitoso
 * @param {String} email - Email del usuario
 */
export const resetLoginAttempts = async (email) => {
  loginAttempts.delete(email);
  console.log(`Intentos reseteados para ${email}`);
};