const roleSelect = document.getElementById("role");
const providerFields = document.getElementById("providerFields");

roleSelect.addEventListener("change", () => {
    providerFields.style.display = 
        roleSelect.value === "proveedor" ? "block" : "none";
});

document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        confirmPassword: document.getElementById("confirmPassword").value,
        role: document.getElementById("role").value,
    };

    if (data.role === "proveedor") {
        data.description = document.getElementById("description").value;
        data.location = document.getElementById("location").value;
        data.service_type = document.getElementById("service_type").value;
    }

    const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    const json = await res.json();
    document.getElementById("response").innerText = JSON.stringify(json);
});
