let aprobados = new Set();
const STORAGE_KEY = 'mallaAprobadosAli';

// ================================
// ✅ Tu malla completa aquí:
const malla = [
  {
    ciclo: "I Semestre",
    cursos: [
      { id: "EG-I", nombre: "Curso Integrado de Humanidades I", requisitos: [] },
      { id: "EG-", nombre: "Curso de Arte", requisitos: [] },
      { id: "RP-", nombre: "Repertorio", requisitos: [] },
      { id: "DN-0101", nombre: "Introducción a la Administración de Negocios", requisitos: [] },
      { id: "MA-0001", nombre: "Precálculo", requisitos: [] },
      { id: "DN-0102", nombre: "Aplicaciones Ofimáticas para la Toma de Decisiones", requisitos: [] }
    ]
  },
  {
    ciclo: "II Semestre",
    cursos: [
      { id: "EG-II", nombre: "Curso Integrado de Humanidades II", requisitos: ["EG-I"] },
      { id: "EF-", nombre: "Actividad Deportiva", requisitos: [] },
      { id: "DN-0104", nombre: "Elementos Fundamentales de Legislación Empresarial", requisitos: ["DN-0101"] },
      { id: "DN-0103", nombre: "Administración de Proyectos y Herramientas para el Análisis de Datos", requisitos: ["DN-0102"] },
      { id: "MA-1021", nombre: "Cálculo para Ciencias Económicas I", requisitos: ["MA-0001"] }
    ]
  },
  {
    ciclo: "III Semestre",
    cursos: [
      { id: "PC-0200", nombre: "Contabilidad Básica", requisitos: ["DN-0101"] },
      { id: "PC-0240", nombre: "Matemática Financiera", requisitos: ["MA-1021"] },
      { id: "PC-0261", nombre: "Legislación Comercial, Bancaria y Financiera", requisitos: ["DN-0104"] },
      { id: "XS-0276", nombre: "Estadística General I", requisitos: ["MA-1021"] },
      { id: "MA-1022", nombre: "Cálculo para Ciencias Económicas II", requisitos: ["MA-1021"] },
      { id: "OPT1231", nombre: "Opcional", requisitos: [] }
    ]
  },
  {
    ciclo: "IV Semestre",
    cursos: [
      { id: "SR-I", nombre: "Seminario de Realidad Nacional I", requisitos: ["EG-II"] },
      { id: "PC-0260", nombre: "Legislación Laboral", requisitos: ["PC-0261"] },
      { id: "PC-0202", nombre: "Contabilidad Intermedia I", requisitos: ["PC-0200"] },
      { id: "DN-0123", nombre: "Metodología de la Investigación", requisitos: ["XS-0276"] },
      { id: "XS-0277", nombre: "Estadística General II", requisitos: ["XS-0276", "MA-1022"] },
      { id: "DN-0340", nombre: "Administración Financiera I", requisitos: ["PC-0240", "PC-0200"] }
    ]
  },
  {
    ciclo: "V Semestre",
    cursos: [
      { id: "SR-II", nombre: "Seminario De Realidad Nacional II", requisitos: ["SR-I"] },
      { id: "PC-0304", nombre: "Contabilidad Intermedia II", requisitos: ["PC-0202", "PC-0240"] },
      { id: "PC-0320", nombre: "Auditoría Financiera I", requisitos: ["PC-0202", "XS-0276"] },
      { id: "PC-0241", nombre: "Negocios Y Entorno Económico", requisitos: ["PC-0261"] },
      { id: "PC-0212", nombre: "Gerencia Y Liderazgo Para Contadores", requisitos: ["DN-0101"] },
      { id: "DN-0341", nombre: "Administración Financiera II", requisitos: ["DN-0340", "XS-0277"] }
    ]
  },
  {
    ciclo: "VI Semestre",
    cursos: [
      { id: "DN-0105", nombre: "Métodos Cuantitativos Para La Toma De Decisiones I", requisitos: ["DN-0340", "XS-0277"] },
      { id: "DN-0320", nombre: "Principios De Mercadeo", requisitos: ["PC-0200", "XS-0276"] },
      { id: "PC-0211", nombre: "Muestreo Aplicado A La Auditoría", requisitos: ["PC-0320", "XS-0277"] },
      { id: "PC-0242", nombre: "Entorno, Gestión Y Control", requisitos: ["PC-0241"] },
      { id: "PC-0305", nombre: "Contabilizaciones Especiales", requisitos: ["PC-0304"] },
      { id: "PC-0321", nombre: "Auditoría Financiera II", requisitos: ["PC-0320"] }
    ]
  },
  {
    ciclo: "VII Semestre",
    cursos: [
      { id: "PC-0204", nombre: "Laboratorio De Contabilidad", requisitos: ["PC-0305"] },
      { id: "PC-0306", nombre: "Sistemas De Costeo Básico", requisitos: ["PC-0304"] },
      { id: "PC-0344", nombre: "Formulación Y Evaluación De Proyectos I", requisitos: ["DN-0341"] },
      { id: "PC-0407", nombre: "Contabilidad Avanzada I", requisitos: ["PC-0305"] },
      { id: "PC-0421", nombre: "Auditoría Financiera III", requisitos: ["PC-0321"] },
      { id: "PC-0462", nombre: "Legislación Tributaria Y Aduanera", requisitos: ["PC-0260", "PC-0304"] }
    ]
  },
  {
    ciclo: "VIII Semestre",
    cursos: [
      { id: "DN-0110", nombre: "Métodos Cuantitativos Para La Toma De Decisiones II", requisitos: ["DN-0105"] },
      { id: "DN-0525", nombre: "Mercadeo De Servicios", requisitos: ["DN-0320"] },
      { id: "PC-0205", nombre: "Contabilidad Gubernamental", requisitos: ["PC-0407"] },
      { id: "PC-0409", nombre: "Sistemas De Costeo Gerencial", requisitos: ["PC-0306"] },
      { id: "PC-0410", nombre: "Contabilidad Avanzada II", requisitos: ["PC-0407"] },
      { id: "PC-0531", nombre: "Auditoría Financiera IV", requisitos: ["PC-0421"] }
    ]
  },
  {
    ciclo: "IX Semestre",
    cursos: [
      { id: "DN-0114", nombre: "Comunicación Intercultural De Los Negocios", requisitos: ["PC-0409"] },
      { id: "OPT-270", nombre: "Bloque Optativo", requisitos: [] },
      { id: "PC-0423", nombre: "Auditoría Informática I", requisitos: ["PC-0531"] },
      { id: "PC-0424", nombre: "Laboratorio De Auditoría Informática I", requisitos: ["PC-0531"] },
      { id: "PC-0425", nombre: "Control Interno Y Auditorías Especiales", requisitos: ["PC-0531"] },
      { id: "PC-0528", nombre: "Auditoría De Gestión I", requisitos: ["PC-0421"] }
    ]
  },
  {
    ciclo: "X Semestre",
    cursos: [
      { id: "DN-0115", nombre: "Taller De Investigación", requisitos: ["DN-0114"] },
      { id: "OPT-1155", nombre: "Bloque para Siglas de TFG", requisitos: [] },
      { id: "PC-0210", nombre: "Auditoría Interna", requisitos: ["PC-0425"] },
      { id: "PC-0526", nombre: "Auditoría Informática II", requisitos: ["PC-0423", "PC-0424"] },
      { id: "PC-0527", nombre: "Laboratorio De Auditoría Informática II", requisitos: ["PC-0423", "PC-0424"] },
      { id: "PC-0529", nombre: "Auditoría De Gestión II", requisitos: ["PC-0528"] }
    ]
  }
];

// ================================
// ✅ Funciones
function generarMalla() {
  const contenedor = document.getElementById("contenedor-ciclos");
  contenedor.innerHTML = "";
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
        <p><strong>Requisitos:</strong> ${curso.requisitos.length ? curso.requisitos.join(", ") : "Ninguno"}</p>
        <label class="aprobado">
          <input type="checkbox" onchange="marcarAprobado('${curso.id}')" id="check-${curso.id}"> Aprobado
        </label>`;
      contCursos.appendChild(divCurso);
    });

    divCiclo.appendChild(contCursos);
    contenedor.appendChild(divCiclo);
  });
  actualizarEstado();
  restaurarChecks();
}

function marcarAprobado(sigla) {
  const checkbox = document.getElementById(`check-${sigla}`);
  if (checkbox.checked) {
    aprobados.add(sigla);
  } else {
    aprobados.delete(sigla);
  }
  actualizarEstado();
}

function actualizarEstado() {
  malla.forEach(bloque => {
    bloque.cursos.forEach(curso => {
      const div = document.getElementById(curso.id);
      const requisitos = curso.requisitos;
      const habilitado = requisitos.every(r => aprobados.has(r));
      if (habilitado || requisitos.length === 0 || aprobados.has(curso.id)) {
        div.classList.remove("bloqueado");
      } else {
        div.classList.add("bloqueado");
      }
    });
  });
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
  const guardados = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  guardados.forEach(id => {
    aprobados.add(id);
    const cb = document.getElementById(`check-${id}`);
    if (cb) cb.checked = true;
  });
  actualizarEstado();
}

document.addEventListener("DOMContentLoaded", () => {
  generarMalla();
  document.getElementById("guardar").addEventListener("click", guardarEstado);
  document.getElementById("limpiar").addEventListener("click", limpiarEstado);
});
