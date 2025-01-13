/* empty css                                   */
import { c as createComponent, r as renderTemplate, a as renderScript, d as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_BR06E_5U.mjs';
import 'kleur/colors';
import { $ as $$LayoutCommon } from '../chunks/LayoutCommon_CkZjnoYI.mjs';
import { $ as $$LayoutProtected } from '../chunks/LayoutProtected_DqnW3Xnf.mjs';
/* empty css                                       */
export { renderers } from '../renderers.mjs';

const $$Tratamiento = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderScript($$result, "C:/Users/Windows/Documents/Odontograma/Consultorio-Odontologico-FRONTEND/src/pages/tratamiento.astro?astro&type=script&index=0&lang.ts")} ${renderComponent($$result, "LayoutProtected", $$LayoutProtected, { "data-astro-cid-4fltklv6": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "LayoutCommon", $$LayoutCommon, { "data-astro-cid-4fltklv6": true }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-gradient-to-r from-slate-100 to-slate-200 p-4 dark:from-slate-900 dark:to-slate-800 lg:p-16" data-astro-cid-4fltklv6> <div class="mx-auto max-w-6xl" data-astro-cid-4fltklv6> <div class="flex justify-between items-center mb-6" data-astro-cid-4fltklv6> <div class="flex items-center gap-4" data-astro-cid-4fltklv6> <button id="volverBtn" class="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300" data-astro-cid-4fltklv6>
← Volver al inicio
</button> <h2 class="text-2xl font-bold text-slate-800 dark:text-slate-100" data-astro-cid-4fltklv6>Tratamientos</h2> </div> <button id="createTreatmentButton" class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 
											 focus:ring-2 focus:ring-green-300 transition-colors duration-200" data-astro-cid-4fltklv6>
Nuevo Tratamiento
</button> </div> <div class="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3" data-astro-cid-4fltklv6> <div class="space-y-2" data-astro-cid-4fltklv6> <input type="text" id="searchInput" placeholder="Buscar por nombre o descripción..." class="w-full rounded-lg border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100" data-astro-cid-4fltklv6> </div> </div> <div class="overflow-x-auto rounded-lg bg-white shadow-xl dark:bg-gray-800" data-astro-cid-4fltklv6> <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700" data-astro-cid-4fltklv6> <thead class="bg-gray-100 dark:bg-gray-700" data-astro-cid-4fltklv6> <tr data-astro-cid-4fltklv6> <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300" data-astro-cid-4fltklv6>
Nombre
</th> <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300" data-astro-cid-4fltklv6>
Descripción
</th> <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300" data-astro-cid-4fltklv6>
Acciones
</th> </tr> </thead> <tbody class="divide-y divide-gray-200 dark:divide-gray-700" data-astro-cid-4fltklv6> <!-- Filled dynamically --> </tbody> </table> </div> </div> </div>  <div id="editModal" class="fixed inset-0 flex items-center justify-center z-50 hidden" data-astro-cid-4fltklv6> <div class="absolute inset-0 bg-black opacity-50" data-astro-cid-4fltklv6></div> <div class="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-1/3" data-astro-cid-4fltklv6> <h2 class="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4" data-astro-cid-4fltklv6>Editar Tratamiento</h2> <form id="editForm" class="space-y-4" data-astro-cid-4fltklv6> <div class="mb-4" data-astro-cid-4fltklv6> <label class="block text-sm font-medium text-gray-700 dark:text-gray-300" data-astro-cid-4fltklv6>Nombre</label> <input type="text" name="nombre" required class="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 
                        focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" data-astro-cid-4fltklv6> </div> <div class="mb-4" data-astro-cid-4fltklv6> <label class="block text-sm font-medium text-gray-700 dark:text-gray-300" data-astro-cid-4fltklv6>Descripción</label> <textarea name="descripcion" required rows="3" class="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 
                           focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" data-astro-cid-4fltklv6></textarea> </div> <div class="flex justify-end space-x-4" data-astro-cid-4fltklv6> <button type="button" class="close-modal px-4 py-2 text-sm font-medium text-white bg-gray-600 
                                     rounded-lg hover:bg-gray-700 focus:ring-2 focus:ring-gray-300" data-astro-cid-4fltklv6>
Cancelar
</button> <button type="submit" class="px-4 py-2 text-sm font-medium text-white bg-blue-600 
                                     rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-300" data-astro-cid-4fltklv6>
Guardar
</button> </div> </form> </div> </div>  <div id="createModal" class="fixed inset-0 flex items-center justify-center z-50 hidden" data-astro-cid-4fltklv6> <div class="absolute inset-0 bg-black opacity-50" data-astro-cid-4fltklv6></div> <div class="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-1/3" data-astro-cid-4fltklv6> <h2 class="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4" data-astro-cid-4fltklv6>Nuevo Tratamiento</h2> <form id="createForm" class="space-y-4" data-astro-cid-4fltklv6> <div class="mb-4" data-astro-cid-4fltklv6> <label class="block text-sm font-medium text-gray-700 dark:text-gray-300" data-astro-cid-4fltklv6>Nombre</label> <input type="text" name="nombre" required placeholder="Nombre del tratamiento" class="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 
                        focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" data-astro-cid-4fltklv6> </div> <div class="mb-4" data-astro-cid-4fltklv6> <label class="block text-sm font-medium text-gray-700 dark:text-gray-300" data-astro-cid-4fltklv6>Descripción</label> <textarea name="descripcion" required rows="3" placeholder="Descripción detallada del tratamiento" class="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 
                         focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" data-astro-cid-4fltklv6></textarea> </div> <div class="flex justify-end space-x-4" data-astro-cid-4fltklv6> <button type="button" class="close-modal px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-lg 
                         hover:bg-gray-700 focus:ring-2 focus:ring-gray-300" data-astro-cid-4fltklv6>
Cancelar
</button> <button type="submit" class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg 
                         hover:bg-green-700 focus:ring-2 focus:ring-green-300" data-astro-cid-4fltklv6>
Crear
</button> </div> </form> </div> </div> ` })} ` })} `;
}, "C:/Users/Windows/Documents/Odontograma/Consultorio-Odontologico-FRONTEND/src/pages/tratamiento.astro", undefined);

const $$file = "C:/Users/Windows/Documents/Odontograma/Consultorio-Odontologico-FRONTEND/src/pages/tratamiento.astro";
const $$url = "/tratamiento";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Tratamiento,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
