import { User, ProviderProfile } from "../models/index.js";
import { authenticate } from "../utils/security/hashing.js";
import { generateToken } from "../utils/security/jwt.js";
import { checkLoginAttempts, recordFailedLogin, resetLoginAttempts } from "../utils/security/loginAttempts.js";

export const login = async (req, res) => {
  try {
    const { email, password, remember } = req.body;

    // Validación de campos obligatorios
    if (!email) {
      return res.status(400).json({ error: "El email es obligatorio" });
    }

    if (!password) {
      return res.status(400).json({ error: "La contraseña es obligatoria" });
    }

    // Verificar si la cuenta está bloqueada
    const isBlocked = await checkLoginAttempts(email);
    if (isBlocked) {
      return res.status(429).json({ 
        error: "Cuenta bloqueada temporalmente. Intente en 15 minutos" 
      });
    }

    // Buscar usuario por email
    const user = await User.findOne({ 
      where: { email },
      include: [{
        model: ProviderProfile,
        required: false
      }]
    });

    if (!user) {
      await recordFailedLogin(email);
      return res.status(401).json({ 
        error: "Email o contraseña incorrectos" 
      });
    }

    // Verificar contraseña
    const isPasswordValid = await authenticate(password, user.password_h);
    
    if (!isPasswordValid) {
      await recordFailedLogin(email);
      return res.status(401).json({ 
        error: "Email o contraseña incorrectos" 
      });
    }

    // Resetear intentos fallidos después de login exitoso
    await resetLoginAttempts(email);

    // Determinar duración del token
    const tokenExpiration = remember ? '30d' : '24h';

    // Generar token JWT
    const token = generateToken(
      { 
        id: user.id, 
        email: user.email, 
        role: user.role 
      },
      tokenExpiration
    );

    // Preparar datos del usuario para la respuesta
    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      verified: user.verified
    };

    // Si es proveedor, incluir perfil
    if (user.role === "proveedor" && user.ProviderProfile) {
      userData.profile = {
        description: user.ProviderProfile.description,
        location: user.ProviderProfile.location,
        service_type: user.ProviderProfile.service_type
      };
    }

    return res.json({
      message: `Bienvenido de nuevo, ${user.name}`,
      token,
      user: userData
    });

  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ error: "Error en el servidor" });
  }
};