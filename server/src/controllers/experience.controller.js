import { checkResults } from "../middlewares/validators/experienceValidator.js";
import { Experience } from "../models/index.js";
import AppError from "../utils/AppError.js";

const addExperience = async (req, res)=>{
    checkResults(req);
    const { exp } = req.body;
    const newExp = await Experience.create(exp);
    console.log(newExp);
    res.status(201).json({ message: 'created succesfully!' });
}

const getExperience = async (req, res) =>{
    checkResults(req);
    const { id } = req.params;
    const exp = await Experience.findByPk(id);
    console.log('exp found:',exp);
    if(exp.dataValues) return res.status(200).json({experience: exp.dataValues});
    
    throw new AppError('Experience not found',404);
}

const getAll = async (req,res) =>{
    const results = await Experience.findAll({});
    console.log('Experiences found:',results);
    if(results.length > 0){ 
        const exps = results.map(result =>{result.dataValues});
        return res.status(200).json({experiences: exps})
    }
    throw new AppError('Experiences not found',404);
}

const deleteExperience = async (req, res) =>{
    checkResults(req);
    const { id } = req.params;
    const expFound = await Experience.findByPk(id);
    if(expFound.dataValues) {
        const deleted = await Experience.destroy(expFound,{where:{id:id}});
        console.log(deleted);
        return res.status(200).json({message:'Deleted succesfully!'});
    }
    throw new AppError('Experience not found,404');
}

const updateExperience = async (req, res) =>{
    checkResults(req);
    const { id } = req.params;
    const exp = req.body;
    const expFound = await Experience.findByPk(id);
    if(expFound.dataValues) {
        const updated = await Experience.update(
            exp,//todo: especificar campos a actualizar
            {where:{id:id}, returning:true});
            console.log(updated[1].at(0));
            return res.status(200).json({message:'Updated succesfully!'});
        }
    throw new AppError('Experience not found,404');
}


export { addExperience, getExperience, getAll, deleteExperience, updateExperience, showExperienceDetail};

const showExperienceDetail = async (req, res) => {
    try {
        const { id } = req.params;

        const experience = await Experience.findByPk(id);

        // Si no existe -> 404
        if (!experience) {
            return res.status(404).render("404", {
                mensaje: "La experiencia que buscas no existe"
            });
        }

        // Renderizar la vista detalle-experiencia.ejs
        res.render("detalle-experiencia", {
            experiencia: experience.dataValues
        });

    } catch (error) {
        console.error("Error en detalle experiencia:", error);
        res.status(500).render("500", {
            mensaje: "Error interno del servidor"
        });
    }
};