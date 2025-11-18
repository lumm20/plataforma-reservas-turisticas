import { body, param, validationResult } from 'express-validator';
import AppError from '../../utils/AppError.js';

const validateExperience = () => {
    return [
        body('name')
            .trim()
            .notEmpty().withMessage('El nombre es requerido')
            .isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener entre 3 y 50 caracteres')
            .escape(),
        body('description')
            .trim()
            .notEmpty().withMessage('La descripción es requerida')
            .isLength({ min: 1, max: 300 }).withMessage('La descripción debe tener entre 1 y 300 caracteres')
            .escape(),
        body('location')
            .trim()
            .notEmpty().withMessage('La ubicación es requerida')
            .isLatLong(),
        body('price')
            .trim()
            .notEmpty().withMessage('El precio es requerido')
            .isCurrency({allow_negatives:false}).withMessage('El precio debe ser un número entero/decimal positivo')
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