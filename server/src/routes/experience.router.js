import e from 'express';
import { addExperience, deleteExperience, getAll, getExperience, updateExperience } from '../controllers/experience.controller';
const router = e.Router();

router.get("/",getAll);
router.get("/:id",getExperience);
router.post("/", addExperience);
router.put("/:id",updateExperience);
router.delete("/:id",deleteExperience);

export default router;