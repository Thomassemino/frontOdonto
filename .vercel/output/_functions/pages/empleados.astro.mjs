/* empty css                                   */
import { c as createComponent, r as renderTemplate, d as renderComponent, a as renderScript, m as maybeRenderHead } from '../chunks/astro/server_BR06E_5U.mjs';
import 'kleur/colors';
import { $ as $$LayoutCommon } from '../chunks/LayoutCommon_DPRyaA77.mjs';
import { $ as $$LayoutProtected } from '../chunks/LayoutProtected_DqnW3Xnf.mjs';
export { renderers } from '../renderers.mjs';

const $$Empleados = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LayoutProtected", $$LayoutProtected, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "LayoutCommon", $$LayoutCommon, {}, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-gradient-to-r from-slate-100 to-slate-200 p-4 text-slate-800 dark:from-slate-900 dark:to-slate-800 dark:text-slate-100 lg:p-16"> <div class="mx-auto max-w-6xl"> <div class="flex items-center gap-4 mb-6"> <button id="volverBtn" class="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
← Volver al inicio
</button> <h2 class="text-2xl font-bold">Empleados</h2> </div> <!-- Filtros y Búsqueda --> <div class="mb-6 max-w-lg"> <!-- Contenedor con ancho máximo --> <div class="grid grid-cols-2 gap-4"> <div class="space-y-2"> <label for="searchInput" class="block text-sm font-medium">Buscar</label> <input type="text" id="searchInput" placeholder="Buscar por nombre o email..." class="w-full rounded-lg border border-gray-300 p-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"> </div> <div class="space-y-2"> <label for="rolFilter" class="block text-sm font-medium">Filtrar por Rol</label> <select id="rolFilter" class="w-full rounded-lg border border-gray-300 p-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"> <option value="">Todos</option> <option value="Odontólogo">Odontólogos</option> <option value="Secretaria">Secretarias</option> </select> </div> </div> </div> <div class="overflow-x-auto rounded-lg bg-white shadow-xl dark:bg-gray-800"> <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"> <thead class="bg-gray-100 dark:bg-gray-700"> <tr> <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Nombre</th> <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Email</th> <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Celular</th> <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Rol</th> <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Especialidad</th> </tr> </thead> <tbody class="divide-y divide-gray-200 dark:divide-gray-700"></tbody> </table> </div> </div> </div> ` })} ` })} ${renderScript($$result, "C:/Users/Windows/Documents/Odontograma/Consultorio-Odontologico-FRONTEND/src/pages/empleados.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Windows/Documents/Odontograma/Consultorio-Odontologico-FRONTEND/src/pages/empleados.astro", undefined);

const $$file = "C:/Users/Windows/Documents/Odontograma/Consultorio-Odontologico-FRONTEND/src/pages/empleados.astro";
const $$url = "/empleados";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Empleados,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
