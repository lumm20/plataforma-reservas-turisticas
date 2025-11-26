import { body, param, validationResult } from 'express-validator';
import AppError from '../../utils/AppError.js';

const validateExperience = () => {
    return [
        body('exp.name')
            .trim()
            .notEmpty().withMessage('El nombre es requerido')
            .bail()
            .isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener entre 3 y 50 caracteres')
            .escape(),
        body('exp.description')
            .trim()
            .notEmpty().withMessage('La descripción es requerida')
            .bail()
            .isLength({max: 300 }).withMessage('La descripción debe máximo 300 caracteres')
            .escape(),
        body('exp.location')
            .trim()
            .notEmpty().withMessage('La ubicación es requerida')
            .bail()
            .isLatLong().withMessage('La ubicación debe tener un formato de lat,long'),
        body('exp.price')
            .trim()
            .notEmpty().withMessage('El precio es requerido')
            .bail()
            .isCurrency({allow_negatives:false}).withMessage('El precio debe ser un número entero/decimal positivo'),
        body('exp.owner_id')
            .trim()
            .notEmpty().withMessage('La experiencia debe tener el id de proveedor')
            .bail()
            .isInt({gt:0}).withMessage('El id de proveedor debe ser un número entero positivo'),

    ]
};

const validateExperienceId = ()=>{
    return [
        param('id')
        .isNumeric().withMessage('El ID es inválido')
    ]
}

const checkResults = (req) => {
    const results = validationResult(req);
    if (!results.isEmpty()) {
        const resFormatted = results.formatWith(err => err.msg);
        console.log('Formatted errors:', resFormatted);
        throw new AppError('Los datos ingresados son inválidos.', 400, resFormatted.array())
    }
}

export { validateExperience,validateExperienceId, checkResults }