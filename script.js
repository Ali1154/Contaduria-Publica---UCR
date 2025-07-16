const STORAGE_KEY = 'mallaAprobadosAli';
let aprobados = new Set();

// ✅ Malla compacta con TODOS tus ciclos
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
  },
  {
    ciclo: "IV Semestre",
    cursos: [
      { id: "SR-I", nombre: "Seminario de Realidad Nacional I", req: ["EG-II"] },
      { id: "PC-0260", nombre: "Legislación Laboral", req: ["PC-0261"] },
      { id: "PC-0202", nombre: "Contabilidad Intermedia I", req: ["PC-0200"] },
      { id: "DN-0123", nombre: "Metodología de la Investigación", req: ["XS-0276"] },
      { id: "XS-0277", nombre: "Estadística General II", req: ["XS-0276", "MA-1022"] },
      { id: "DN-0340", nombre: "Administración Financiera I", req: ["PC-0240", "PC-0200"] }
    ]
  },
  {
    ciclo: "V Semestre",
    cursos: [
      { id: "SR-II", nombre: "Seminario De Realidad Nacional II", req: ["SR-I"] },
      { id: "PC-0304", nombre: "Contabilidad Intermedia II", req: ["PC-0202", "PC-0240"] },
      { id: "PC-0320", nombre: "Auditoría Financiera I", req: ["PC-0202", "XS-0276"] },
      { id: "PC-0241", nombre: "Negocios Y Entorno Económico", req: ["PC-0261"] },
      { id: "PC-0212", nombre: "Gerencia Y Liderazgo Para Contadores", req: ["DN-0101"] },
      { id: "DN-0341", nombre: "Administración Financiera II", req: ["DN-0340", "XS-0277"] }
    ]
  },
  {
    ciclo: "VI Semestre",
    cursos: [
      { id: "DN-0105", nombre: "Métodos Cuantitativos Para La Toma De Decisiones I", req: ["DN-0340", "XS-0277"] },
      { id: "DN-0320", nombre: "Principios De Mercadeo", req: ["PC-0200", "XS-0276"] },
      { id: "PC-0211", nombre: "Muestreo Aplicado A La Auditoría", req: ["PC-0320", "XS-0277"] },
      { id: "PC-0242", nombre: "Entorno, Gestión Y Control", req: ["PC-0241"] },
      { id: "PC-0305", nombre: "Contabilizaciones Especiales", req: ["PC-0304"] },
      { id: "PC-0321", nombre: "Auditoría Financiera II", req: ["PC-0320"] }
    ]
  },
  {
    ciclo: "VII Semestre",
    cursos: [
      { id: "PC-0204", nombre: "Laboratorio De Contabilidad", req: ["PC-0305"] },
      { id: "PC-0306", nombre: "Sistemas De Costeo Básico", req: ["PC-0304"] },
      { id: "PC-0344", nombre: "Formulación Y Evaluación De Proyectos I", req: ["DN-0341"] },
      { id: "PC-0407", nombre: "Contabilidad Avanzada I", req: ["PC-0305"] },
      { id: "PC-0421", nombre: "Auditoría Financiera III", req: ["PC-0321"] },
      { id: "PC-0462", nombre: "Legislación Tributaria Y Aduanera", req: ["PC-0260", "PC-0304"] }
    ]
  },
  {
    ciclo: "VIII Semestre",
    cursos: [
      { id: "DN-0110", nombre: "Métodos Cuantitativos Para La Toma De Decisiones II", req: ["DN-0105"] },
      { id: "DN-0525", nombre: "Mercadeo De Servicios", req: ["DN-0320"] },
      { id: "PC-0205", nombre: "Contabilidad Gubernamental", req: ["PC-0407"] },
      { id: "PC-0409", nombre: "Sistemas De Costeo Gerencial", req: ["PC-0306"] },
      { id: "PC-0410", nombre: "Contabilidad Avanzada II", req: ["PC-0407"] },
      { id: "PC-0531", nombre: "Auditoría Financiera IV", req: ["PC-0421"] }
    ]
  },
  {
    ciclo: "IX Semestre",
    cursos: [
      { id: "DN-0114", nombre: "Comunicación Intercultural De Los Negocios", req: ["PC-0409"] },
      { id: "OPT-270", nombre: "Bloque Optativo", req: [] },
      { id: "PC-0423", nombre: "Auditoría Informática I", req: ["PC-0531"] },
      { id: "PC-0424", nombre: "Laboratorio De Auditoría Informática I", req: ["PC-0531"] },
      { id: "PC-0425", nombre: "Control Interno Y Auditorías Especiales", req: ["PC-0531"] },
      { id: "PC-0528", nombre: "Auditoría De Gestión I", req: ["PC-0421"] }
    ]
  },
  {
    ciclo: "X Semestre",
    cursos: [
      { id: "DN-0115", nombre: "Taller De Investigación", req: ["DN-0114"] },
      { id: "OPT-1155", nombre: "Bloque para Siglas de TFG", req: [] },
      { id: "PC-0210", nombre: "Auditoría Interna", req: ["PC-0425"] },
      { id: "PC-0526", nombre: "Auditoría Informática II", req: ["PC-0423", "PC-0424"] },
      { id: "PC-0527", nombre: "Laboratorio De Auditoría Informática II", req: ["PC-0423", "PC-0424"] },
      { id: "PC-0529", nombre: "Auditoría De Gestión II", req: ["PC-0528"] }
    ]
  }
];

// ================================
// ✅ Funciones
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
