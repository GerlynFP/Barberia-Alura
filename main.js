// Sombra en la cabecera al hacer scroll
const cabecera = document.querySelector(".cabecera");
const actualizarCabecera = () => {
  cabecera.classList.toggle("con-sombra", window.scrollY > 8);
};
actualizarCabecera();
window.addEventListener("scroll", actualizarCabecera, { passive: true });

// Revelar elementos al entrar en pantalla
const elementos = document.querySelectorAll(".revelar, .revelar-imagen");
if ("IntersectionObserver" in window) {
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("visible");
        observador.unobserve(entrada.target);
      }
    });
  }, { rootMargin: "0px 0px -60px 0px", threshold: 0.12 });
  elementos.forEach((el) => observador.observe(el));
} else {
  elementos.forEach((el) => el.classList.add("visible"));
}

// Formulario de contacto (sin servidor: solo valida y confirma)
const formulario = document.querySelector(".formulario");
if (formulario) {
  const boton = formulario.querySelector(".enviar");
  const texto = boton.querySelector(".enviar-texto");
  const estado = formulario.querySelector(".estado-envio");
  const requeridos = formulario.querySelectorAll("[required]");

  const validar = (campo) => {
    const valido = campo.checkValidity() && campo.value.trim() !== "";
    campo.closest(".campo").classList.toggle("invalido", !valido);
    campo.setAttribute("aria-invalid", String(!valido));
    return valido;
  };

  requeridos.forEach((campo) => {
    campo.addEventListener("blur", () => validar(campo));
    campo.addEventListener("input", () => {
      if (campo.closest(".campo").classList.contains("invalido")) validar(campo);
    });
  });

  const cambiarTexto = (nuevo) => {
    boton.classList.add("cambiando");
    setTimeout(() => {
      texto.textContent = nuevo;
      boton.classList.remove("cambiando");
    }, 200);
  };

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const invalidos = [...requeridos].filter((campo) => !validar(campo));
    if (invalidos.length) {
      invalidos[0].focus();
      estado.textContent = "Revisa los campos marcados.";
      return;
    }

    boton.classList.add("enviado");
    cambiarTexto("¡Mensaje enviado!");
    estado.textContent = "Gracias, te contactaremos pronto.";
    formulario.reset();

    setTimeout(() => {
      boton.classList.remove("enviado");
      cambiarTexto("Enviar formulario");
      estado.textContent = "";
    }, 3500);
  });
}

// Video: carga YouTube solo al hacer clic
document.querySelectorAll(".video-portada").forEach((boton) => {
  boton.addEventListener("click", () => {
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube-nocookie.com/embed/${boton.dataset.video}?autoplay=1&rel=0`;
    iframe.title = "Video de la Barbería Alura";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
    boton.replaceWith(iframe);
    iframe.focus();
  });
});
