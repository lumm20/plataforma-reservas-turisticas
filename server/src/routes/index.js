import e from "express";
import experienceRouter from "./experience.js";
const router = e.Router();

router.use('/experiences',experienceRouter);

router.get('/', (req, res) => {
  res.json({
    mensaje: 'API working OK',
    version: '1.0.0',
    endpoints: {
      experiences: '/api/experiences',
    }
  });
});

export {router};