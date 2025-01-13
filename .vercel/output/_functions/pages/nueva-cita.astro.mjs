/* empty css                                   */
import { c as createComponent, r as renderTemplate, d as renderComponent, a as renderScript, m as maybeRenderHead } from '../chunks/astro/server_BR06E_5U.mjs';
import 'kleur/colors';
import { $ as $$LayoutCommon } from '../chunks/LayoutCommon_CkZjnoYI.mjs';
import { $ as $$LayoutProtected } from '../chunks/LayoutProtected_DqnW3Xnf.mjs';
export { renderers } from '../renderers.mjs';

const $$NuevaCita = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LayoutProtected", $$LayoutProtected, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "LayoutCommon", $$LayoutCommon, {}, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-gradient-to-r from-slate-100 to-slate-200 p-4 text-slate-800 dark:from-slate-900 dark:to-slate-800 dark:text-slate-100 lg:p-16"> <div class="mx-auto max-w-4xl"> <div class="mb-8"> <button id="volverBtn" class="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
← Volver a citas
</button> </div> <div class="rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800"> <h1 class="mb-6 text-2xl font-bold">Nueva Cita</h1> <form id="nuevaConsultaForm" class="space-y-6"> <div class="space-y-4"> <div class="grid grid-cols-1 gap-4 md:grid-cols-2"> <div> <label for="nombrePaciente" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
Nombre del Paciente
</label> <select id="nombrePaciente" name="nombrePaciente" required class="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 dark:border-gray-600 dark:bg-gray-700 focus:border-blue-500 focus:ring-blue-500"> <option value="">Seleccione un paciente</option> </select> </div> <div> <label for="nombreMedico" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
Médico
</label> <select id="nombreMedico" name="nombreMedico" required class="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 dark:border-gray-600 dark:bg-gray-700 focus:border-blue-500 focus:ring-blue-500"> <option value="">Seleccione un médico</option> </select> </div> <div> <label for="diaConsulta" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
Día de Cita
</label> <input type="date" id="diaConsulta" name="diaConsulta" required class="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 dark:border-gray-600 dark:bg-gray-700"> </div> <div> <label for="horaConsulta" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
Hora de Consulta
</label> <input type="time" id="horaConsulta" name="horaConsulta" required class="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 dark:border-gray-600 dark:bg-gray-700"> </div> </div> <div> <label for="problema" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
Problema
</label> <textarea id="problema" name="problema" rows="3" required class="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 dark:border-gray-600 dark:bg-gray-700"></textarea> </div> <div> <label for="tratamientos" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
Tratamientos
</label> <div id="tratamientosContainer" class="space-y-2"> <div class="flex items-center gap-2"> <select name="tratamientos[]" required class="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 dark:border-gray-600 dark:bg-gray-700 focus:border-blue-500 focus:ring-blue-500"> <option value="">Seleccione un tratamiento</option> </select> <button type="button" id="addTratamientoBtn" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
+
</button> </div> </div> </div> </div> <div class="flex justify-end space-x-4"> <button type="button" id="cancelarBtn" class="rounded-lg bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300">
Cancelar
</button> <button type="submit" class="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
Crear Consulta
</button> </div> </form> </div> </div> </div> ` })} ` })} ${renderScript($$result, "C:/Users/Windows/Documents/Odontograma/Consultorio-Odontologico-FRONTEND/src/pages/nueva-cita.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Windows/Documents/Odontograma/Consultorio-Odontologico-FRONTEND/src/pages/nueva-cita.astro", undefined);

const $$file = "C:/Users/Windows/Documents/Odontograma/Consultorio-Odontologico-FRONTEND/src/pages/nueva-cita.astro";
const $$url = "/nueva-cita";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$NuevaCita,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
