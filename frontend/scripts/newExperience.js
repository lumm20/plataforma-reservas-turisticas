let map;
let marker;
let geocoder;
let autocomplete;

// Inicializar el mapa
async function initMap() {
    (await google.maps.importLibrary('places'));
    // Coordenadas iniciales (Ciudad Obregón, Sonora)
    const initialPosition = { lat: 27.4827, lng: -109.9309 };
    
    // Crear el mapa
    map = new google.maps.Map(document.getElementById('map'), {
        center: initialPosition,
        zoom: 13,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false
    });
    
    // Inicializar geocoder
    geocoder = new google.maps.Geocoder();
    
    // Configurar el autocompletado para el campo de búsqueda
    const searchBox = document.getElementById('searchBox');
    autocomplete = new google.maps.places.PlaceAutocompleteElement(searchBox, {
        fields: ['geometry', 'name', 'formatted_address']
    });
    
    // Cuando se selecciona un lugar del autocompletado
    autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        
        if (!place.geometry || !place.geometry.location) {
            showResponse('No se encontró la ubicación seleccionada', 'error');
            return;
        }
        
        // Centrar el mapa y colocar marcador
        const location = place.geometry.location;
        map.setCenter(location);
        map.setZoom(15);
        placeMarker(location);
    });
    
    // Evento de clic en el mapa
    map.addListener('click', (event) => {
        placeMarker(event.latLng);
    });
}

// Función para colocar el marcador
function placeMarker(location) {
    // Si ya existe un marcador, removerlo
    if (marker) {
        marker.setMap(null);
    }
    
    // Crear nuevo marcador
    marker = new google.maps.Marker({
        position: location,
        map: map,
        animation: google.maps.Animation.DROP,
        draggable: true
    });
    
    // Actualizar coordenadas
    updateCoordinates(location.lat(), location.lng());
    
    // Evento cuando se arrastra el marcador
    marker.addListener('dragend', (event) => {
        updateCoordinates(event.latLng.lat(), event.latLng.lng());
    });
}

// Actualizar las coordenadas en los campos ocultos y en la visualización
function updateCoordinates(lat, lng) {
    document.getElementById('latitud').value = lat.toFixed(6);
    document.getElementById('longitud').value = lng.toFixed(6);
    document.getElementById('coordDisplay').textContent = `Lat: ${lat.toFixed(6)}, Lng: ${lng.toFixed(6)}`;
}

// Mostrar mensajes de respuesta
function showResponse(message, type) {
    const responseElement = document.getElementById('response');
    responseElement.textContent = message;
    responseElement.className = type;
    responseElement.style.display = 'block';
    
    setTimeout(() => {
        responseElement.style.display = 'none';
    }, 5000);
}

// Manejar el envío del formulario
document.getElementById('experienceForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const latitud = document.getElementById('latitud').value;
    const longitud = document.getElementById('longitud').value;
    
    // Validar que se haya seleccionado una ubicación
    if (!latitud || !longitud) {
        showResponse('Por favor, selecciona una ubicación en el mapa', 'error');
        return;
    }
    
    const experienceData = {
        nombre: document.getElementById('nombre').value,
        descripcion: document.getElementById('descripcion').value,
        latitud: parseFloat(latitud),
        longitud: parseFloat(longitud),
        precio: parseFloat(document.getElementById('precio').value)
    };
    
    console.log('Datos de la experiencia:', experienceData);
    
    try {
        // Aquí irá tu lógica para enviar los datos al backend
        // Ejemplo:
        // const response = await fetch('/api/experiences', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(experienceData)
        // });
        
        // Por ahora, simular éxito
        showResponse('¡Experiencia creada exitosamente!', 'success');
        
        // Limpiar el formulario después de 2 segundos
        setTimeout(() => {
            document.getElementById('experienceForm').reset();
            if (marker) {
                marker.setMap(null);
                marker = null;
            }
            document.getElementById('coordDisplay').textContent = 'Haz clic en el mapa para seleccionar';
        }, 2000);
        
    } catch (error) {
        console.error('Error:', error);
        showResponse('Error al crear la experiencia. Intenta nuevamente.', 'error');
    }
});