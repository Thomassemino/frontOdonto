import { c as createComponent, r as renderTemplate, a as renderScript, b as renderSlot, e as addAttribute, g as renderHead, h as createAstro } from './astro/server_BR06E_5U.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                             */

const name = "";
const type = "module";
const version = "0.0.1";
const scripts = {"dev":"astro dev","build":"astro build","preview":"astro preview","astro":"astro"};
const dependencies = {"astro":"^5.1.6","flatpickr":"^4.6.13","simple-datatables":"^9.2.1","tailwindcss":"^3.4.17"};
const devDependencies = {"@astrojs/tailwind":"^5.1.4","@astrojs/vercel":"^8.0.2","flowbite":"^2.5.2","flowbite-typography":"^1.0.5"};
const pkg = {
  name,
  type,
  version,
  scripts,
  dependencies,
  devDependencies,
};

const SITE_TITLE = "Odontología Integral";

function url(path = "") {
  return `${ undefined}${"/"}${path}`;
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$LayoutCommon = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$LayoutCommon;
  const { class: clazz } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>', " \u2014 v", '</title><meta name="generator"', '><meta name="description"', '><meta name=""', '><link rel="icon" type="image/svg+xml"', '><link rel="sitemap" type="application/xml"', `><meta name="author" content="Julian Cataldo, Zolt\xE1n Sz\u0151gy\xE9nyi, Robert Tanislav"><meta name="copyright" content="MIT"><script>
			if (
				localStorage.getItem('color-theme') === 'dark' ||
				(!('color-theme' in localStorage) &&
					window.matchMedia('(prefers-color-scheme: dark)').matches)
			) {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
		<\/script>`, "</head> <body", "> ", " ", " </body></html>"])), SITE_TITLE, pkg.version, addAttribute(Astro2.generator, "content"), addAttribute(pkg.description, "content"), addAttribute(pkg.description, "content"), addAttribute(url("favicon.svg"), "href"), addAttribute(url("sitemap-index.xml"), "href"), renderHead(), addAttribute([
    //
    clazz,
    "bg-gray-50 dark:bg-gray-800",
    "scrollbar scrollbar-w-3 scrollbar-thumb-rounded-[0.25rem]",
    "scrollbar-track-slate-200  scrollbar-thumb-gray-400",
    "dark:scrollbar-track-gray-900 dark:scrollbar-thumb-gray-700"
  ], "class:list"), renderSlot($$result, $$slots["default"]), renderScript($$result, "C:/Users/Windows/Documents/Odontograma/Consultorio-Odontologico-FRONTEND/src/app/LayoutCommon.astro?astro&type=script&index=0&lang.ts"));
}, "C:/Users/Windows/Documents/Odontograma/Consultorio-Odontologico-FRONTEND/src/app/LayoutCommon.astro", undefined);

export { $$LayoutCommon as $, url as u };
