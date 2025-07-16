const STORAGE_KEY = 'mallaAprobadosAli';
let aprobados = new Set();

const malla = [
  {
    ciclo: "I Semestre",
    cursos: [
      { id: "EG-I", nombre: "Curso Integrado de Humanidades I", req: [] },
      { id: "EG-", nombre: "Curso de Arte", req: [] },
      { id: "RP-", nombre: "Repertorio", req: [] },
      { id: "DN-0101", nombre: "Introducción a la Administración de Negocios", req: [] },
      { id: "MA-0001", nombre: "Precálculo", req: [] },
      { id: "DN-0102", nombre: "Aplicaciones Ofimáticas para la Toma de Decisiones", req: [] }
    ]
  },
  {
    ciclo: "II Semestre",
    cursos: [
      { id: "EG-II", nombre: "Curso Integrado de Humanidades II", req: ["EG-I"] },
      { id: "EF-", nombre: "Actividad Deportiva", req: [] },
      { id: "DN-0104", nombre: "Elementos Fundamentales de Legislación Empresarial", req: ["DN-0101"] },
      { id: "DN-0103", nombre: "Administración de Proyectos y Herramientas para el Análisis de Datos", req: ["DN-0102"] },
      { id: "MA-1021", nombre: "Cálculo para Ciencias Económicas I", req: ["MA-0001"] }
    ]
  },
  {
    ciclo: "III Semestre",
    cursos: [
      { id: "PC-0200", nombre: "Contabilidad Básica", req: ["DN-0101"] },
      { id: "PC-0240", nombre: "Matemática Financiera", req: ["MA-1021"] },
      { id: "PC-0261", nombre: "Legislación Comercial, Bancaria y Financiera", req: ["DN-0104"] },
      { id: "XS-0276", nombre: "Estadística General I", req: ["MA-1021"] },
      { id: "MA-1022", nombre: "Cálculo para Ciencias Económicas II", req: ["MA-1021"] },
      { id: "OPT1231", nombre: "Opcional", req: [] }
    ]
  }
];

function generarMalla() {
  const contenedor = document.getElementById("contenedor-ciclos");
  contenedor.innerHTML = "";
  const frag = document.createDocumentFragment();

  malla.forEach(bloque => {
    const divCiclo = document.createElement("div");
    divCiclo.className = "ciclo";
    divCiclo.innerHTML = `<h2>${bloque.ciclo}</h2>`;
    const contCursos = document.createElement("div");
    contCursos.className = "cursos";

    bloque.cursos.forEach(curso => {
      const divCurso = document.createElement("div");
      divCurso.className = "curso";
      divCurso.id = curso.id;
      divCurso.innerHTML = `
        <h3>${curso.nombre}</h3>
        <p><strong>Requisitos:</strong> ${curso.req.length ? curso.req.join(", ") : "Ninguno"}</p>
        <label class="aprobado">
          <input type="checkbox" id="check-${curso.id}"> Aprobado
        </label>`;
      contCursos.appendChild(divCurso);
    });

    divCiclo.appendChild(contCursos);
    frag.appendChild(divCiclo);
  });

  contenedor.appendChild(frag);
  restaurarChecks();
  actualizarEstado();
}

function marcarAprobado(sigla) {
  const cb = document.getElementById(`check-${sigla}`);
  cb.checked ? aprobados.add(sigla) : aprobados.delete(sigla);
  actualizarEstado();
}

function actualizarEstado() {
  malla.forEach(bloque =>
    bloque.cursos.forEach(curso => {
      const div = document.getElementById(curso.id);
      const enabled = curso.req.every(r => aprobados.has(r));
      if (enabled || aprobados.has(curso.id) || curso.req.length === 0) {
        div.classList.remove("bloqueado");
      } else {
        div.classList.add("bloqueado");
      }
    })
  );
}

function guardarEstado() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...aprobados]));
  alert("✅ Estado guardado!");
}

function limpiarEstado() {
  localStorage.removeItem(STORAGE_KEY);
  aprobados.clear();
  document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
  actualizarEstado();
}

function restaurarChecks() {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  saved.forEach(id => {
    aprobados.add(id);
    const cb = document.getElementById(`check-${id}`);
    if (cb) cb.checked = true;
  });
  actualizarEstado();
}

document.addEventListener("DOMContentLoaded", () => {
  generarMalla();
  document.getElementById("contenedor-ciclos").addEventListener("change", e => {
    if (e.target.matches('input[type="checkbox"]')) {
      marcarAprobado(e.target.id.replace('check-', ''));
    }
  });
  document.getElementById("guardar").addEventListener("click", guardarEstado);
  document.getElementById("limpiar").addEventListener("click", limpiarEstado);
});
