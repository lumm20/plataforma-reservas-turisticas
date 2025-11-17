import { Experience } from "../models";

const addExperience = async (req, res)=>{
    try {
        const { exp } = req.body;
        const newExp = await Experience.create(exp);
        console.log(newExp);
        res.status(201).json({ message: 'created succesfully!' });
    } catch (error) {
        console.error('Error while adding the experience',error);
        res.status(500).json({ error: error.message });
    }
}

const getExperience = async (req, res) =>{
    try {
        const { id } = req.params;
        const exp = await Experience.findByPk(id);
        console.log('exp found:',exp);
        if(exp.dataValues) return res.status(200).json({experience: exp.dataValues});
        res.status(404).json({message: 'Experience not found'});
    } catch (error) {
        console.error('Error while searching the experience',error);
        res.status(500).json({error:'Something went wrong :['});
    }
}

const getAll = async (req,res) =>{
    try {
        const results = await Experience.findAll({});
        console.log('Experiences found:',results);
        if(results.length > 0){ 
            const exps = results.map(result =>{result.dataValues});
            return res.status(200).json({experiences: exps})
        }
        res.status(404).json({message:'No experiences registered yet'});
    } catch (error) {
        console.error('Error while searching all experiences',error);
        res.status(500).json({error:'Something went wrong :['});
    }
}

const deleteExperience = async (req, res) =>{
    try {
        const { id } = req.params;
        const expFound = await Experience.findByPk(id);
        if(expFound.dataValues) {
            const deleted = await Experience.destroy(expFound,{where:{id:id}});
            console.log(deleted);
            return res.status(200).json({message:'Deleted succesfully!'});
        }
    } catch (error) {
        console.error('Error while removing the experience:',error);
        res.status(500).json({error:'Something went wrong :['})
    }
}

const updateExperience = async (req, res) =>{
    try {
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
    } catch (error) {
        console.error('Error while updating the experience:',error);
        res.status(500).json({error:'Something went wrong :['})
    }
}


export { addExperience, getExperience, getAll, deleteExperience, updateExperience};