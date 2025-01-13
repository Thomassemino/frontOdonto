/* empty css                                   */
import { c as createComponent, r as renderTemplate, m as maybeRenderHead, a as renderScript, d as renderComponent } from '../chunks/astro/server_BR06E_5U.mjs';
import 'kleur/colors';
import { $ as $$LayoutSidebar } from '../chunks/LayoutSidebar_BL40GaZg.mjs';
import 'clsx';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$LandingReadme = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 text-slate-800 dark:text-slate-100 mb-20 p-4 lg:p-16 shadow-xl shadow-slate-200 dark:shadow-slate-900 min-h-screen flex items-center justify-center" data-astro-cid-fbyzqwz3> <header class="p-8 flex flex-col items-center w-full space-y-8" data-astro-cid-fbyzqwz3> <div class="flex flex-col md:flex-row justify-between items-center w-full mb-4 gap-4" data-astro-cid-fbyzqwz3> <h1 class="text-4xl lg:text-5xl dark:text-slate-200 text-slate-600 leading-tight text-center md:text-left" data-astro-cid-fbyzqwz3>
Citas
</h1> <div class="relative w-full md:w-auto" data-astro-cid-fbyzqwz3> <input type="text" id="calendar" class="px-4 py-2 w-full md:w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" placeholder="Selecciona una fecha" data-astro-cid-fbyzqwz3> </div> </div> <div id="cards-container" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full" data-astro-cid-fbyzqwz3> <!-- Las tarjetas serán añadidas aquí dinámicamente --> </div> </header> </div> ${renderScript($$result, "C:/Users/Windows/Documents/Odontograma/Consultorio-Odontologico-FRONTEND/src/modules/LandingReadme.astro?astro&type=script&index=0&lang.ts")} `;
}, "C:/Users/Windows/Documents/Odontograma/Consultorio-Odontologico-FRONTEND/src/modules/LandingReadme.astro", undefined);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LayoutSidebar", $$LayoutSidebar, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "LandingReadme", $$LandingReadme, {})} ` })}`;
}, "C:/Users/Windows/Documents/Odontograma/Consultorio-Odontologico-FRONTEND/src/pages/index.astro", undefined);

const $$file = "C:/Users/Windows/Documents/Odontograma/Consultorio-Odontologico-FRONTEND/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
