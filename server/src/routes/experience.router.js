import e from 'express';
import { addExperience, deleteExperience, getAll, getExperience, updateExperience } from '../controllers/experience.controller.js';
import { validateExperience, validateExperienceId } from '../middlewares/validators/experienceValidator.js';
import { authenticate, authorize } from '../middlewares/authMiddleware.js'
const experienceRouter = e.Router();

experienceRouter.get("/",getAll);
experienceRouter.get("/:id",validateExperienceId(), getExperience);
experienceRouter.post("/", authenticate, authorize(['proveedor']), validateExperience(),addExperience);
experienceRouter.put("/:id",authenticate, authorize(['proveedor']),validateExperienceId(),validateExperience(),updateExperience);
experienceRouter.delete("/:id",authenticate, authorize(['proveedor']),validateExperienceId(),deleteExperience);

export default experienceRouter;