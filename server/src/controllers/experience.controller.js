import { checkResults } from "../middlewares/validators/experienceValidator.js";
import { Experience } from "../models/index.js";
import AppError from "../utils/AppError.js";

const addExperience = async (req, res)=>{
    checkResults(req);
    const { exp } = req.body;
    const newExp = await Experience.create(exp);
    res.status(201).json({ message: 'created succesfully!' });
};

const getExperience = async (req, res) =>{
    console.log(">>> ¡PETICIÓN RECIBIDA EN EL BACKEND! ID:", req.params.id);
    checkResults(req);
    const { id } = req.params;
    const exp = await Experience.findByPk(id);
    if(exp && exp.dataValues) return res.status(200).json({experience: exp.dataValues});
    throw new AppError('Experience not found',404);
};

const getAll = async (req,res) =>{
    const results = await Experience.findAll({});
    if(results.length > 0){ 
        const exps = results.map(r => r.dataValues);
        return res.status(200).json({experiences: exps});
    }
    throw new AppError('Experiences not found',404);
};

const deleteExperience = async (req, res) =>{
    checkResults(req);
    const { id } = req.params;
    const expFound = await Experience.findByPk(id);
    if(expFound && expFound.dataValues) {
        await Experience.destroy({where:{id:id}});
        return res.status(200).json({message:'Deleted succesfully!'});
    }
    throw new AppError('Experience not found',404);
};

const updateExperience = async (req, res) =>{
    checkResults(req);
    const { id } = req.params;
    const exp = req.body;
    const expFound = await Experience.findByPk(id);
    if(expFound && expFound.dataValues) {
        const updated = await Experience.update(exp,{where:{id:id}, returning:true});
        return res.status(200).json({message:'Updated succesfully!'});
    }
    throw new AppError('Experience not found',404);
};

const showExperienceDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const experience = await Experience.findByPk(id);
        if (!experience) {
            return res.status(404).render("404", {
                mensaje: "La experiencia que buscas no existe"
            });
        }
        res.render("detalle-experiencia", {
            experiencia: experience.dataValues
        });
    } catch (error) {
        res.status(500).render("500", {
            mensaje: "Error interno del servidor"
        });
    }
};

export { 
    addExperience, 
    getExperience, 
    getAll, 
    deleteExperience, 
    updateExperience, 
    showExperienceDetail 
};
