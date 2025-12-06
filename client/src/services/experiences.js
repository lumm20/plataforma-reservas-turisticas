/**
 * valida los datos del formulario
 * @returns un array con los errores encontrados
 */
export function validateForm(formData){
    const errors = [];
    const {nombre,descripcion,longitud,latitud,precio} = formData;
    console.log('datos:',{nombre,descripcion,longitud,latitud,precio});
    if(nombre === '' || nombre.length < 3 || nombre.length >50){
        errors.push('El nombre es requerido y debe tener entre 3 y 50 caracteres');
    }
    if(descripcion === '' || descripcion.length > 300){
        errors.push('La descripción es requerida y debe tener máximo 300 caracteres');
    }
    if(longitud === '' || isNaN(longitud) || longitud < -180 || longitud > 180){
        errors.push('La longitud es requerida y debe ser un número válido entre -180 y 180');
    }
    if(latitud === '' || isNaN(latitud) || latitud < -90 || latitud > 90){
        errors.push('La latitud es requerida y debe ser un número válido entre -90 y 90');
    }
    if(precio === '' || isNaN(precio) || Number(precio) < 0){
        errors.push('El precio es requerido y debe ser un número positivo');
    }

    return errors;
    
}

/**
 * envia una peticion para registrar una nueva experiencia
 * @param {*} expData Los datos de la experiencia a registrar
 */
export async function fetchExperience(expData){
    const resp = await fetch('http://localhost:3000/api/experiences',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({exp:expData})
    });

    const json = await resp.json();

    if(resp.status >=400){
        if(json.errors){
            //muestra un mensaje con los errores
            return json.errors;
        }
    }else{
        return 'Experiencia creada exitosamente';
    }
}
