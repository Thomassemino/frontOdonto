/* empty css                                   */
import { c as createComponent, r as renderTemplate, d as renderComponent, a as renderScript, m as maybeRenderHead } from '../chunks/astro/server_BR06E_5U.mjs';
import 'kleur/colors';
import { $ as $$LayoutCommon } from '../chunks/LayoutCommon_CkZjnoYI.mjs';
import { $ as $$LayoutProtected } from '../chunks/LayoutProtected_DqnW3Xnf.mjs';
export { renderers } from '../renderers.mjs';

const $$CitasTable = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LayoutProtected", $$LayoutProtected, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "LayoutCommon", $$LayoutCommon, {}, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-gradient-to-r from-slate-100 to-slate-200 p-4 text-slate-800 dark:from-slate-900 dark:to-slate-800 dark:text-slate-100 lg:p-16"> <div class="mx-auto max-w-6xl"> <!-- Header --> <div class="mb-6 flex items-center justify-between"> <div class="flex items-center gap-4"> <button id="volverBtn" class="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
← Volver al inicio
</button> <h1 class="text-2xl font-bold">Citas Odontológicas</h1> </div> <button id="nuevaConsultaBtn" class="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
Nueva Cita
</button> </div> <!-- Filtros y Búsqueda --> <div class="mb-6 grid gap-4 md:grid-cols-3"> <div class="space-y-2"> <label for="searchInput" class="block text-sm font-medium">Buscar</label> <input type="text" id="searchInput" placeholder="Buscar por nombre o ID..." class="w-full rounded-lg border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700"> </div> <div class="space-y-2"> <label for="estadoFilter" class="block text-sm font-medium">Estado</label> <select id="estadoFilter" class="w-full rounded-lg border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700"> <option value="">Todos</option> <option value="pendiente">Pendiente</option> <option value="en_proceso">En Proceso</option> <option value="completada">Completada</option> </select> </div> </div> <!-- Tabla de Consultas --> <div class="overflow-x-auto rounded-lg bg-white shadow-xl dark:bg-gray-800"> <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"> <thead class="bg-gray-50 dark:bg-gray-700"> <tr> <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">Fecha</th> <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">Hora</th> <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">Paciente</th> <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">Médico</th> <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">Problema</th> <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">Estado</th> <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">Acciones</th> </tr> </thead> <tbody id="consultasTableBody" class="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800"> <!-- Se llena dinámicamente --> </tbody> </table> </div> </div> </div>  <div id="editModal" class="fixed inset-0 flex items-center justify-center z-50 hidden"> <div class="absolute inset-0 bg-black opacity-50"></div> <div class="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-1/2"> <h2 class="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">Editar Cita</h2> <form id="editForm" class="space-y-6"> <input type="hidden" name="id"> <div class="space-y-4"> <div class="grid grid-cols-1 gap-4 md:grid-cols-2"> <div> <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
Nombre del Paciente
</label> <select name="nombrePaciente" required class="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:border-blue-500 focus:ring-blue-500"> <option value="">Seleccione un paciente</option> </select> </div> <div> <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
Médico
</label> <select name="nombreMedico" required class="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:border-blue-500 focus:ring-blue-500"> <option value="">Seleccione un médico</option> </select> </div> <div> <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
Día de Cita
</label> <input type="date" name="diaConsulta" required class="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"> </div> <div> <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
Hora de Consulta
</label> <input type="time" name="horaConsulta" required class="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"> </div> </div> <div> <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
Problema
</label> <textarea name="problema" rows="3" required class="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"></textarea> </div> <div> <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
Tratamientos
</label> <div id="tratamientosEditContainer" class="space-y-2"> <div class="flex items-center gap-2"> <select name="tratamientos[]" required class="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:border-blue-500 focus:ring-blue-500"> <option value="" class="text-gray-900 dark:text-gray-100">Seleccione un tratamiento</option> </select> <button type="button" id="addTratamientoEditBtn" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
+
</button> </div> </div> </div> </div> <div class="flex justify-end space-x-4"> <button type="button" onclick="closeEditModal()" class="rounded-lg bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500">
Cancelar
</button> <button type="submit" class="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
Guardar Cambios
</button> </div> </form> </div> </div> ` })} ` })} ${renderScript($$result, "C:/Users/Windows/Documents/Odontograma/Consultorio-Odontologico-FRONTEND/src/pages/citasTable.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Windows/Documents/Odontograma/Consultorio-Odontologico-FRONTEND/src/pages/citasTable.astro", undefined);

const $$file = "C:/Users/Windows/Documents/Odontograma/Consultorio-Odontologico-FRONTEND/src/pages/citasTable.astro";
const $$url = "/citasTable";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$CitasTable,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
