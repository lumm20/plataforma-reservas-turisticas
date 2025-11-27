const nombreInput = document.getElementById('nombre');
const descripcionInput = document.getElementById('descripcion');
const longitudInput = document.getElementById('longitud');
const latitudInput = document.getElementById('latitud');
const precioInput = document.getElementById('precio');
const form = document.getElementById('experienceForm');

//variables para guardar los datos del form
let nombre='', descripcion='',longitud='', latitud='', precio='';

//obtiene el valor que se ingreso al input
function getValue(evt){
    return evt.target.value?.trim();
}

/**
 * valida los datos del formulario
 * @returns un array con los errores encontrados
 */
function validateForm(){
    const errors = [];
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
async function fetchExperience(expData){
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
            showMessage(json.errors.join('.\n'),'error');
        }
    }else{
        showMessage('Experiencia creada exitosamente','success');
    }
}
/**
 * muestra un mensaje en la interfaz, ya sea de error
 * o de confirmación de exito en la operación
 * @param {*} message El texto a mostrar
 * @param {*} type El tipo de mensaje: 'error' o 'success'. Default es error
 */
function showMessage(message='default message', type='error'){
    const resp = document.getElementById('response');
    resp.classList.add(type);
    resp.textContent = message;
    //se borra el mensaje despues de 3 segundos
    setTimeout(()=>{
        resp.textContent='';
        resp.classList.remove(type);
    },3000);
}

//envia los datos del formulario
async function submitForm(evt){
    evt.preventDefault();

    const errors = validateForm();

    //si se encontraron errores de validacion
    if(errors.length>0){
        showMessage(errors.join('.\n'),'error');
        return;
    }

    //se crea el objeto a enviar en la peticion
    const expData = {
        name: nombre,
        description: descripcion,
        location: `${latitud},${longitud}`,
        price: parseFloat(precio),
        owner_id:1//TODO:cambiar por el id del user loggeado
    }
    console.log('exp data:', expData);

    await fetchExperience(expData);
}

form.addEventListener('submit',submitForm);
nombreInput.addEventListener('input',(e)=>{nombre=getValue(e)});
descripcionInput.addEventListener('input',(e)=>{descripcion=getValue(e)});
longitudInput.addEventListener('input',(e)=>{longitud=getValue(e)});
latitudInput.addEventListener('input',(e)=>{latitud=getValue(e)});
precioInput.addEventListener('input',(e)=>{precio=getValue(e)});
