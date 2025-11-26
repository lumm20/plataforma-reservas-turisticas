document.addEventListener("DOMContentLoaded", async () => {
    const id = getExperienceId();

    if (!id) {
        alert("No se encontró el ID de la experiencia en la URL");
        return;
    }

    try {
        const res = await fetch(`http://localhost:3000/api/experiences/${id}`);
        const json = await res.json();

        if (res.status === 404) {
            document.querySelector(".card").innerHTML = `
                <h2>La experiencia que buscas no existe</h2>
            `;
            return;
        }

        const exp = json.experience;

        document.getElementById("expName").innerText = exp.name;
        document.getElementById("expDescription").innerText = exp.description;
        document.getElementById("expPrice").innerText = exp.price;
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
        document.querySelector(".card").innerHTML = `
            <h2>Error cargando la experiencia</h2>
        `;
    }
});

function getExperienceId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
}
