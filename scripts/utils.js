// Funciones de utilidad para el DOM
export function crearElementoTarea(tarea) {
  const div = document.createElement("div");
  div.className = `item-tarea ${tarea.completada ? "completada" : ""}`;
  div.setAttribute("role", "listitem");

  const prioridadClase = `prioridad-${tarea.prioridad}`;
  const iconoPrioridad = {
    alta: "🔴",
    media: "🟡",
    baja: "🟢",
  };

  div.innerHTML = `
    <div class="contenido-tarea">
      <input type="checkbox" class="checkbox-tarea" ${
        tarea.completada ? "checked" : ""
      }>
      <div class="detalles-tarea">
        <h4 class="titulo-tarea">${tarea.titulo}</h4>
        ${
          tarea.descripcion
            ? `<p class="descripcion-tarea">${tarea.descripcion}</p>`
            : ""
        }
        <div class="meta-tarea">
          <span class="prioridad ${prioridadClase}">${
    iconoPrioridad[tarea.prioridad]
  } ${tarea.prioridad}</span>
          ${
            tarea.fechaLimite
              ? `<span class="fecha-limite">📅 ${formatearFecha(
                  tarea.fechaLimite
                )}</span>`
              : ""
          }
        </div>
      </div>
    </div>
    <button class="btn-eliminar" aria-label="Eliminar tarea">🗑️</button>
  `;

  // Event listeners
  const checkbox = div.querySelector(".checkbox-tarea");
  const btnEliminar = div.querySelector(".btn-eliminar");

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      dashboard.completarTarea(tarea.id);
    }
  });

  btnEliminar.addEventListener("click", () => {
    if (confirm("¿Estás seguro de que quieres eliminar esta tarea?")) {
      dashboard.eliminarTarea(tarea.id);
    }
  });

  return div;
}

export function formatearFecha(fechaString) {
  const fecha = new Date(fechaString);
  return fecha.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
  });
}

export function mostrarNotificacion(mensaje) {
  // Crear notificación temporal
  const notificacion = document.createElement("div");
  notificacion.className = "notificacion";
  notificacion.textContent = mensaje;

  document.body.appendChild(notificacion);

  // Animar entrada
  setTimeout(() => notificacion.classList.add("visible"), 100);

  // Remover después de 3 segundos
  setTimeout(() => {
    notificacion.classList.remove("visible");
    setTimeout(() => notificacion.remove(), 300);
  }, 3000);
}
