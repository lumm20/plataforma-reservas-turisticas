import { auth } from "../auth/authService";
import { fetchExperience, validateForm } from "../services/experiences";
import { render } from "../utils/render";

export function NewExperienceView(){
    render(`
        <div class="container">
            <h1>¡Una nueva experiencia!</h1>
            <form id="experienceForm">
                <div class="form-group">
                    <label>Nombre de la experiencia</label>
                    <input type="text" id="nombre" placeholder="Ej: Tour por el Centro Histórico" required>
                </div>

                <div class="form-group">
                    <label>Descripción</label>
                    <textarea id="descripcion" rows="5" placeholder="Describe tu experiencia turística..." required></textarea>
                </div>

                <div class="form-group">
                    <label>Ubicación</label>
                    <div class="location-group">
                        <div class="coordinate-input">
                            <label class="coordinate-label">Latitud</label>
                            <input type="number" id="latitud" step="any" placeholder="Ej: 27.4827" required>
                        </div>
                        <div class="coordinate-input">
                            <label class="coordinate-label">Longitud</label>
                            <input type="number" id="longitud" step="any" placeholder="Ej: -109.9309" required>
                        </div>
                    </div>
                    <small class="helper-text">Ingresa las coordenadas geográficas de la experiencia</small>
                </div>

                <div class="form-group">
                    <label>Precio (MXN)</label>
                    <div class="price-input">
                        <span class="currency-symbol">$</span>
                        <input type="number" id="precio" min="0" step="0.01" placeholder="0.00" required>
                    </div>
                </div>
                
                <button type="submit">Crear Experiencia</button>
            </form>

            <p id="response"></p>

            <div class="link-group">
                <p><a href="#">Volver al panel</a></p>
            </div>
        </div>
    `);

    const nombreInput = document.getElementById('nombre');
    const descripcionInput = document.getElementById('descripcion');
    const longitudInput = document.getElementById('longitud');
    const latitudInput = document.getElementById('latitud');
    const precioInput = document.getElementById('precio');
    const form = document.getElementById('experienceForm');

    //variables para guardar los datos del form
    let nombre='', descripcion='',longitud='', latitud='', precio='';

    form.addEventListener('submit',(e)=>submitForm(e,{nombre,descripcion,longitud,latitud,precio}));
    nombreInput.addEventListener('input',(e)=>{nombre=getValue(e)});
    descripcionInput.addEventListener('input',(e)=>{descripcion=getValue(e)});
    longitudInput.addEventListener('input',(e)=>{longitud=getValue(e)});
    latitudInput.addEventListener('input',(e)=>{latitud=getValue(e)});
    precioInput.addEventListener('input',(e)=>{precio=getValue(e)});
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

//obtiene el valor que se ingreso al input
function getValue(evt){
    return evt.target.value?.trim();
}

async function submitForm(evt,formData){
    evt.preventDefault();

    const errors = validateForm(formData);

    //si se encontraron errores de validacion
    if(errors.length>0){
        showMessage(errors.join('.\n'),'error');
        return;
    }

    const id= auth.getUser()?.id;

    console.log('id:',id);
    //se crea el objeto a enviar en la peticion
    const expData = {
        name: formData.nombre,
        description: formData.descripcion,
        location: `${formData.latitud},${formData.longitud}`,
        price: parseFloat(formData.precio),
        owner_id:id
    }
    console.log('exp data:', expData);

    const res = await fetchExperience(expData);
    if(typeof res === Array){
        showMessage(res.join('.\n'), 'error');
    }else{
        showMessage('Experiencia creada existosamente', 'success');
        setTimeout(()=>{
            history.pushState(null, null, "/");
            location.reload();
        },2000);
    }
}
