document.addEventListener("DOMContentLoaded", async () => {
    const id = window.location.pathname.split("/").pop();

    try {
        const res = await fetch(`http://localhost:3000/api/experiences/${id}`);
        const json = await res.json();

        if (res.status === 404) {
            document.getElementById("expContainer").innerHTML = `
                <h2>La experiencia que buscas no existe</h2>
            `;
            return;
        }

        const exp = json.experience;

        document.getElementById("expName").innerText = exp.name;
        document.getElementById("expDescription").innerText = exp.description;
        document.getElementById("expPrice").innerText = `$${exp.price}`;
        document.getElementById("expCupo").innerText = exp.cupo_disponible;
        document.getElementById("expDuration").innerText = exp.duration;
        document.getElementById("expCategory").innerText = exp.category;
        document.getElementById("expProvider").innerText = exp.provider_name;

        const btn = document.getElementById("btnReserva");

        if (exp.cupo_disponible == 0) {
            btn.disabled = true;
            btn.innerText = "Sin cupos disponibles";
        }

    } catch (e) {
        document.getElementById("expContainer").innerHTML = `
            <h2>Error cargando la experiencia</h2>
        `;
    }
});
