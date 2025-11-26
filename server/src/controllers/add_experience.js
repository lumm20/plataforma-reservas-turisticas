document.getElementById("expForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        cupo_disponible: document.getElementById("cupo_disponible").value,
        duration: document.getElementById("duration").value,
        category: document.getElementById("category").value,
        provider_name: document.getElementById("provider_name").value
    };

    try {
        const res = await fetch("http://localhost:3000/api/experiences", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const json = await res.json();

        if (res.ok) {
            document.getElementById("msg").innerText = "Experiencia guardada correctamente";
        } else {
            document.getElementById("msg").innerText = json.message || "Error al guardar experiencia";
        }

    } catch (error) {
        document.getElementById("msg").innerText = "Error de conexión con el servidor";
    }
});
