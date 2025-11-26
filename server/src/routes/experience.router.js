import e from 'express';
import { addExperience, deleteExperience, getAll, getExperience, updateExperience, showExperienceDetail } from '../controllers/experience.controller.js';
import { validateExperience, validateExperienceId } from '../middlewares/validators/experienceValidator.js';
const experienceRouter = e.Router();

experienceRouter.get("/",getAll);
experienceRouter.get("/:id",validateExperienceId, getExperience);
experienceRouter.get("/detalle/:id", showExperienceDetail);
experienceRouter.post("/", validateExperience,addExperience);
experienceRouter.put("/:id",validateExperienceId,validateExperience,updateExperience);
experienceRouter.delete("/:id",validateExperienceId,deleteExperience);

export default experienceRouter;