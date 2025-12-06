import { checkResults } from "../middlewares/validators/experienceValidator.js";
import { Experience } from "../models/index.js";
import AppError from "../utils/AppError.js";

const addExperience = async (req, res)=>{
    console.log('adding experience');
    checkResults(req);
    try {
        const { exp } = req.body;
        const newExp = await Experience.create(exp);
        console.log(newExp);
        res.status(201).json({ message: 'created succesfully!' });
    } catch (error) {
        console.error(error);
        throw new AppError();
    }
}

const getExperience = async (req, res) =>{
    checkResults(req);
    try {
        const { id } = req.params;
        const exp = await Experience.findByPk(id);
        console.log('exp found:',exp);
        if(exp.dataValues) return res.status(200).json(exp.dataValues);
    } catch (error) {
        console.error(error);
    }
    throw new AppError('Experience not found',404);
}

const getAll = async (req,res) =>{
    try {
        const results = await Experience.findAll({});
        console.log('Experiences found:',results);
        if(results.length > 0){ 
            const exps = results.map(result =>result.dataValues);
            return res.status(200).json({experiences: exps})
        }
    } catch (error) {
        console.error(error);
        throw new AppError();
    }
    throw new AppError('Experiences not found',404);
}

const deleteExperience = async (req, res) =>{
    checkResults(req);
    try {
        const { id } = req.params;
        const expFound = await Experience.findByPk(id);
        if(expFound.dataValues) {
            const deleted = await Experience.destroy(expFound,{where:{id:id}});
            console.log(deleted);
            return res.status(200).json({message:'Deleted succesfully!'});
        }
    } catch (error) {
        console.error(error);
        throw new AppError();
    }
    throw new AppError('Experience not found',404);
}

const updateExperience = async (req, res) =>{
    checkResults(req);
    try {
        const { id } = req.params;
        const exp = req.body;
        const expFound = await Experience.findByPk(id);
        if (expFound.dataValues) {
            await expFound.update(exp);
            return res.status(200).json({ message: 'Updated succesfully!' });
        }
    } catch (error) {
        console.error(error);
        throw new AppError();
    }
    throw new AppError('Experience not found,404');
}


export { addExperience, getExperience, getAll, deleteExperience, updateExperience};