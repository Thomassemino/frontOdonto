/* empty css                                      */
import { c as createComponent, r as renderTemplate, d as renderComponent, a as renderScript, m as maybeRenderHead } from '../../chunks/astro/server_BR06E_5U.mjs';
import 'kleur/colors';
import { $ as $$LayoutCommon } from '../../chunks/LayoutCommon_CkZjnoYI.mjs';
export { renderers } from '../../renderers.mjs';

const $$SignIn = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LayoutCommon", $$LayoutCommon, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="grid min-h-screen place-items-center"> <form class="w-full max-w-sm rounded-lg bg-white p-6 shadow-md dark:bg-gray-800"> <h1 class="mb-6 text-2xl font-bold text-gray-800 dark:text-white">Sign In</h1> <div class="mb-4"> <label for="email" class="mb-2 block font-bold text-gray-700 dark:text-gray-300">Email</label> <input type="email" id="email" name="email" required class="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"> </div> <div class="mb-6"> <label for="password" class="mb-2 block font-bold text-gray-700 dark:text-gray-300">Password</label> <input type="password" id="password" name="password" required class="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"> </div> <button type="submit" class="w-full rounded-md bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
Sign In
</button> </form> </main> ` })} ${renderScript($$result, "C:/Users/Windows/Documents/Odontograma/Consultorio-Odontologico-FRONTEND/src/pages/authentication/sign-in.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Windows/Documents/Odontograma/Consultorio-Odontologico-FRONTEND/src/pages/authentication/sign-in.astro", undefined);

const $$file = "C:/Users/Windows/Documents/Odontograma/Consultorio-Odontologico-FRONTEND/src/pages/authentication/sign-in.astro";
const $$url = "/authentication/sign-in";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$SignIn,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
