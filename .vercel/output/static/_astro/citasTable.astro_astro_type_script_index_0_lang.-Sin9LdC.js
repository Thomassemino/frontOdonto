const p="https://consultorio-odontologico-backend-production-b1c8.up.railway.app/api";let u=[],b=[];function i(t,o="success"){const e=document.createElement("div");e.className=`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 text-white ${o==="success"?"bg-green-500":"bg-red-500"}`,e.textContent=t,document.body.appendChild(e),setTimeout(()=>e.remove(),3e3)}function k(t){return{pendiente:"bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",en_proceso:"bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",completada:"bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"}[t]||""}async function C(){try{const t=await fetch(`${p}/citas/todas`);if(!t.ok)throw new Error("Error al obtener citas");const o=await t.json();console.log("Citas cargadas:",o),u=o,b=[...u],E()}catch(t){console.error("Error:",t),i("Error al cargar las consultas","error")}}function E(){const t=document.getElementById("consultasTableBody");if(!t)return;const o=document.querySelector("thead tr");if(o&&!o.querySelector("th:last-child")){const e=document.createElement("th");e.className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300",e.textContent="Ver más",o.appendChild(e)}t.innerHTML=b.map(e=>`
    <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
      <td class="whitespace-nowrap px-6 py-4">${new Date(e.fecha).toLocaleDateString()||""}</td>
      <td class="whitespace-nowrap px-6 py-4">${new Date(e.fecha).toLocaleTimeString()||""}</td>
      <td class="whitespace-nowrap px-6 py-4">${e.pacienteId?.nombre||""}</td>
      <td class="whitespace-nowrap px-6 py-4">${e.medicoId?.nombre||""}</td>
      <td class="whitespace-nowrap px-6 py-4">${e.motivo||""}</td>
      <td class="whitespace-nowrap px-6 py-4">
        <span class="rounded-full px-2 py-1 text-xs font-semibold ${k(e.estado)}">
          ${e.estado||""}
        </span>
				</td>
      <td class="px-6 py-4">
        <div class="flex space-x-2">
          <button onclick="openEditModal(${JSON.stringify(e).replace(/"/g,"&quot;")})"
                class="edit-button p-2 text-blue-600 hover:text-blue-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
          <button onclick="eliminarCita('${e._id}')"
                class="delete-button p-2 text-red-600 hover:text-red-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M3 6h18"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
          </button>
        </div>
      </td>
    </tr>
  `).join("")}function x(){const t=document.getElementById("searchInput")?.value.toLowerCase(),o=document.getElementById("estadoFilter")?.value;b=u.filter(e=>{const r=!t||e.pacienteId?.nombre.toLowerCase().includes(t)||e.medicoId?.nombre.toLowerCase().includes(t),a=!o||e.estado===o;return r&&a}),E()}async function I(t){if(confirm("¿Está seguro que desea eliminar esta cita?"))try{if(!(await fetch(`${p}/citas/${t}`,{method:"DELETE",headers:{"Content-Type":"application/json",Origin:"http://localhost:4321"}})).ok)throw new Error("Error al eliminar la cita");u=u.filter(e=>e._id!==t),b=b.filter(e=>e._id!==t),E(),i("Cita eliminada exitosamente")}catch(o){console.error("Error:",o),i("Error al eliminar la cita","error")}}async function y(t){try{const o=await fetch(`${p}/tratamientos`);if(!o.ok)throw new Error("Error al cargar tratamientos");const e=await o.json();console.log("Tratamientos cargados:",e),t.innerHTML='<option value="">Seleccione un tratamiento</option>',e.forEach(r=>{const a=document.createElement("option");a.value=r._id,a.textContent=r.nombre||r.nombreTratamiento,a.className="text-gray-900 dark:text-gray-100",t.appendChild(a)})}catch(o){console.error("Error al cargar tratamientos:",o),i("Error al cargar tratamientos","error")}}async function L(){try{const t=await fetch(`${p}/medico`);if(!t.ok)throw new Error("Error al cargar médicos");const e=(await t.json()).medicos,r=document.querySelector('select[name="nombreMedico"]');r&&(r.innerHTML='<option value="">Seleccione un médico</option>',e.forEach(a=>{const c=document.createElement("option");c.value=a._id,c.textContent=`${a.nombre} - ${a.especialidad}`,r.appendChild(c)}))}catch(t){console.error("Error:",t),i("Error al cargar médicos","error")}}async function B(){try{const t=await fetch(`${p}/paciente`);if(!t.ok)throw new Error("Error al cargar pacientes");const o=await t.json(),e=document.querySelector('select[name="nombrePaciente"]');e&&(e.innerHTML='<option value="">Seleccione un paciente</option>',o.pacientes.forEach(r=>{const a=document.createElement("option");a.value=r.id,a.textContent=`${r.nombre} - DNI: ${r.dni}`,e.appendChild(a)}))}catch(t){console.error("Error:",t),i("Error al cargar pacientes","error")}}function v(){document.getElementById("addTratamientoEditBtn")?.addEventListener("click",()=>{const t=document.getElementById("tratamientosEditContainer"),o=document.createElement("div");o.classList.add("flex","items-center","gap-2","mt-2");const e=document.createElement("select");e.name="tratamientos[]",e.required=!0,e.classList.add("w-full","rounded-md","border","border-gray-300","bg-white","p-2","text-gray-900","dark:text-gray-100","dark:border-gray-600","dark:bg-gray-700","focus:border-blue-500","focus:ring-blue-500");const r=document.createElement("button");r.type="button",r.classList.add("px-4","py-2","bg-red-600","text-white","rounded-md","hover:bg-red-700"),r.textContent="-",r.addEventListener("click",()=>{o.remove()}),o.appendChild(e),o.appendChild(r),t?.appendChild(o),y(e)})}async function T(t){console.log("Cita a editar:",t);const o=document.getElementById("editModal"),e=document.getElementById("editForm");if(await Promise.all([L(),B()]),e)try{const r=new Date(t.fecha),a=r.toISOString().split("T")[0],c=r.toTimeString().slice(0,5);e.elements.namedItem("id").value=t._id,e.elements.namedItem("diaConsulta").value=a,e.elements.namedItem("horaConsulta").value=c,e.elements.namedItem("nombrePaciente").value=t.pacienteId.id,e.elements.namedItem("nombreMedico").value=t.medicoId._id,e.elements.namedItem("problema").value=t.motivo;const l=document.getElementById("tratamientosEditContainer");l&&(l.innerHTML="");const d=document.createElement("div");d.classList.add("flex","items-center","gap-2"),d.innerHTML=`
           <select
    name="tratamientos[]"
    required
    class="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:border-blue-500 focus:ring-blue-500"
  >
            <option value="">Seleccione un tratamiento</option>
          </select>
          <button
            type="button"
            id="addTratamientoEditBtn"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            +
          </button>
        `,l?.appendChild(d);const s=d.querySelector("select");if(s&&await y(s),Array.isArray(t.tratamientos)&&t.tratamientos.length>0){console.log("Tratamientos a cargar:",t.tratamientos);for(const n of t.tratamientos){const w=typeof n=="string"?n:n._id;if(w)if(s&&!s.value)s.value=w;else{const g=document.createElement("div");g.classList.add("flex","items-center","gap-2","mt-2");const m=document.createElement("select");m.name="tratamientos[]",m.required=!0,m.classList.add("w-full","rounded-md","border","border-gray-300","bg-white","p-2","text-gray-900","dark:text-gray-100","dark:border-gray-600","dark:bg-gray-700","focus:border-blue-500","focus:ring-blue-500"),await y(m),m.value=w;const h=document.createElement("button");h.type="button",h.classList.add("px-4","py-2","bg-red-600","text-white","rounded-md","hover:bg-red-700"),h.textContent="-",h.addEventListener("click",()=>{g.remove()}),g.appendChild(m),g.appendChild(h),l?.appendChild(g)}}}v(),o?.classList.remove("hidden")}catch(r){console.error("Error al cargar el formulario:",r),i("Error al cargar los datos de la cita","error")}}async function M(t){t.preventDefault();try{const o=t.target,e=new FormData(o),r=e.get("id"),a=u.find(n=>n._id===r),c=o.querySelectorAll('select[name="tratamientos[]"]'),l=Array.from(c).map(n=>n.value).filter(n=>n!=="").map(n=>({_id:n})),d={_id:r,fecha:new Date(`${e.get("diaConsulta")}T${e.get("horaConsulta")}`).toISOString(),pacienteId:e.get("nombrePaciente"),medicoId:e.get("nombreMedico"),motivo:e.get("problema"),tratamientos:l,estado:a?.estado||"pendiente"};if(!d.pacienteId||!d.medicoId||!d.motivo||!d.fecha)throw new Error("Todos los campos son requeridos");const s=await fetch(`${p}/citas/${d._id}`,{method:"PUT",headers:{"Content-Type":"application/json",Origin:"http://localhost:4321"},body:JSON.stringify(d)});if(!s.ok){const n=await s.json();throw new Error(n.message||"Error al actualizar la cita")}await C(),f(),i("Cita actualizada exitosamente"),setTimeout(()=>{window.location.reload()},1e3)}catch(o){console.error("Error completo:",o),i(o.message||"Error al actualizar la cita","error")}}function f(){const t=document.getElementById("editModal"),o=document.getElementById("editForm");t?.classList.add("hidden"),o?.reset();const e=document.getElementById("tratamientosEditContainer");if(e){const r=document.createElement("div");r.classList.add("flex","items-center","gap-2"),r.innerHTML=`
      <select
        name="tratamientos[]"
        required
        // CAMBIAR ESTA CLASE:
        class="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="" class="text-gray-900 dark:text-gray-100">Seleccione un tratamiento</option>
      </select>
      <button
        type="button"
        id="addTratamientoEditBtn"
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        +
      </button>
    `,e.appendChild(r),y(r.querySelector("select")),v()}}function S(){document.getElementById("searchInput")?.addEventListener("input",x),document.getElementById("estadoFilter")?.addEventListener("change",x),document.getElementById("nuevaConsultaBtn")?.addEventListener("click",()=>{window.location.href="/nueva-cita"}),document.getElementById("volverBtn")?.addEventListener("click",()=>{window.location.href="/"}),document.getElementById("editForm")?.addEventListener("submit",M),document.addEventListener("keydown",t=>{t.key==="Escape"&&f()}),document.addEventListener("click",t=>{const o=document.getElementById("editModal");t.target===o&&f()})}window.eliminarCita=I;window.openEditModal=T;window.closeEditModal=f;document.addEventListener("DOMContentLoaded",()=>{C(),S(),v()});
