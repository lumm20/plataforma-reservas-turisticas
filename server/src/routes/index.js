import e from "express";
import experienceRouter from "./experience.router.js";
import authRouter from "./auth.router.js";
import loginRouter from "./login.router.js";
const router = e.Router();

router.use("/auth", authRouter);
router.use("/auth", loginRouter);
router.use('/experiences',experienceRouter);

router.get('/', (req, res) => {
  res.json({
    mensaje: 'API working OK',
    version: '1.0.0',
    endpoints: {
      auth: {
      experiences: '/api/experiences',
      login: 'POST /api/auth/login'
      },
      experiences: 'api/experiences',
    }
  });
});

export {router};