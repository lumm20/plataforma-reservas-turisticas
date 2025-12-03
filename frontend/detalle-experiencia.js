document.addEventListener('DOMContentLoaded', async () => {
    // 1. Obtener el ID de la experiencia desde la URL
    const params = new URLSearchParams(window.location.search);
    const experienceId = params.get('id');

    // Referencias a los elementos del HTML
    const elements = {
        name: document.getElementById('expName'),
        desc: document.getElementById('expDescription'),
        price: document.getElementById('expPrice'),
        cupo: document.getElementById('expCupo'),
        duration: document.getElementById('expDuration'),
        category: document.getElementById('expCategory'),
        provider: document.getElementById('expProvider'),
        btn: document.getElementById('btnReserva')
    };

    // Si no hay ID en la URL, redirigir al inicio
    if (!experienceId) {
        window.location.href = 'index.html';
        return;
    }

    try {
        // 2. Petición al Backend
        const response = await fetch(`http://localhost:3000/api/experiences/${experienceId}`);

        if (!response.ok) {
            throw new Error(`Error al obtener datos: ${response.status}`);
        }

        const data = await response.json();
        const experience = data.experience;

        // 3. Mostrar la información en pantalla
        elements.name.textContent = experience.name;
        elements.desc.textContent = experience.description;
        elements.price.textContent = experience.price;

        // Manejo de datos opcionales (por si la BD aún no los tiene todos)
        const cupoReal = experience.quota !== undefined ? experience.quota : 20;
        
        elements.cupo.textContent = cupoReal;
        elements.duration.textContent = experience.duration || "Consultar";
        elements.category.textContent = experience.category || "General";
        elements.provider.textContent = `ID Prov: ${experience.owner_id || "N/A"}`;

        // 4. Lógica del Botón de Reserva
        if (cupoReal <= 0) {
            elements.btn.textContent = "Sin cupos disponibles";
            elements.btn.disabled = true;
            elements.btn.style.backgroundColor = "gray";
            elements.btn.style.cursor = "not-allowed";
        } else {
            elements.btn.addEventListener('click', () => {
                // Aquí iría la lógica para reservar o redirigir al checkout
                alert(`Iniciando reserva para: ${experience.name}`);
            });
        }

    } catch (error) {
        console.error("Error cargando la experiencia:", error);
        
        // Mostrar mensaje amigable al usuario en caso de error
        elements.name.textContent = "No se pudo cargar la experiencia";
        elements.desc.innerHTML = `<a href="index.html" class="back-btn">Volver al listado</a>`;
        elements.btn.style.display = 'none';
    }
});