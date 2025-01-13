/* empty css                                   */
import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead, a as renderScript } from '../chunks/astro/server_BR06E_5U.mjs';
import 'kleur/colors';
import { $ as $$LayoutCommon } from '../chunks/LayoutCommon_CkZjnoYI.mjs';
export { renderers } from '../renderers.mjs';

const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LayoutCommon", $$LayoutCommon, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col items-center justify-center min-h-screen px-6 mx-auto dark:bg-gray-900"> <div class="w-full max-w-md p-8 space-y-3 rounded-xl bg-white dark:bg-gray-800"> <h1 class="text-2xl font-bold text-center text-gray-700 dark:text-white">
Iniciar sesión
</h1> <form id="loginForm" class="space-y-6" novalidate> <div> <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Correo electrónico</label> <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="nombre@company.com" required> <p class="mt-2 text-sm text-red-600 dark:text-red-500 hidden" id="emailError">Por favor, introduce un correo electrónico válido.</p> </div> <div> <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Contraseña</label> <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required> <p class="mt-2 text-sm text-red-600 dark:text-red-500 hidden" id="passwordError">Por favor, introduce la contraseña.</p> </div> <div class="flex items-start"> <p class="text-lg text-red-500 dark:text-red-500 hidden" id="errorMessage" role="alert"></p> </div> <button type="submit" id="submitBtn" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
Iniciar sesión
<div role="status" id="loadingSpinner" class="hidden mt-2"> <svg aria-hidden="true" class="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path> <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path> </svg> <span class="sr-only">Cargando...</span> </div> </button> <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
¿Aún no tienes una cuenta? <a href="/logup" class="text-blue-700 hover:underline dark:text-blue-500">Regístrate</a> </div> </form> </div> </div> ${renderScript($$result2, "C:/Users/Windows/Documents/Odontograma/Consultorio-Odontologico-FRONTEND/src/pages/login.astro?astro&type=script&index=0&lang.ts")}` })}`;
}, "C:/Users/Windows/Documents/Odontograma/Consultorio-Odontologico-FRONTEND/src/pages/login.astro", undefined);

const $$file = "C:/Users/Windows/Documents/Odontograma/Consultorio-Odontologico-FRONTEND/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
