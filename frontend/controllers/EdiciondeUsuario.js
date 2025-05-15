function toggleFormulario() {
    const formulario = document.getElementById("editForm");
    
    if (formulario.classList.contains("oculto")) {
        formulario.classList.remove("oculto");
        formulario.classList.add("visible");
    } else {
        formulario.classList.remove("visible");
        formulario.classList.add("oculto");
    }
}
