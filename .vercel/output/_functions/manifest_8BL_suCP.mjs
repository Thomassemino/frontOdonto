import 'cookie';
import 'kleur/colors';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_CLEuU33h.mjs';
import 'es-module-lexer';
import { d as decodeKey } from './chunks/astro/server_CZURuIc0.mjs';
import 'clsx';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || undefined,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : undefined,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/Windows/Documents/Odontograma/Consultorio-Odontologico-FRONTEND/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.CEhjJz6a.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","C:/Users/Windows/Documents/Odontograma/Consultorio-Odontologico-FRONTEND/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_CAssevN0.mjs","\u0000@astrojs-manifest":"manifest_8BL_suCP.mjs","C:/Users/Windows/Documents/Odontograma/Consultorio-Odontologico-FRONTEND/src/app/LayoutProtected.astro?astro&type=script&index=0&lang.ts":"_astro/LayoutProtected.astro_astro_type_script_index_0_lang.p6tNYfA1.js","C:/Users/Windows/Documents/Odontograma/Consultorio-Odontologico-FRONTEND/src/app/NavBarSidebar.astro?astro&type=script&index=0&lang.ts":"_astro/NavBarSidebar.astro_astro_type_script_index_0_lang.2bXkqWKw.js","C:/Users/Windows/Documents/Odontograma/Consultorio-Odontologico-FRONTEND/src/app/SideBar.astro?astro&type=script&index=0&lang.ts":"_astro/SideBar.astro_astro_type_script_index_0_lang.CYtLWc9U.js","C:/Users/Windows/Documents/Odontograma/Consultorio-Odontologico-FRONTEND/src/components/ColorModeSwitcher.astro?astro&type=script&index=0&lang.ts":"_astro/ColorModeSwitcher.astro_astro_type_script_index_0_lang.CCx6ynAI.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/Users/Windows/Documents/Odontograma/Consultorio-Odontologico-FRONTEND/src/app/LayoutProtected.astro?astro&type=script&index=0&lang.ts","function n(){const e=localStorage.getItem(\"userId\"),t=localStorage.getItem(\"userRole\");return console.log(\"Current user ID:\",e),console.log(\"Current user role:\",t),e!=null&&e!==\"\"&&t!==null&&t!==void 0&&t!==\"\"}function r(){const e=window.location.pathname;return[\"/login\",\"/logup\"].includes(e)||n()?!0:(window.location.href=\"/login\",!1)}if(!r())throw new Error(\"Not authenticated\");"],["C:/Users/Windows/Documents/Odontograma/Consultorio-Odontologico-FRONTEND/src/app/NavBarSidebar.astro?astro&type=script&index=0&lang.ts","const c=\"http://localhost:5000/api\";async function d(){try{const o=localStorage.getItem(\"userId\"),e=localStorage.getItem(\"userRole\");if(console.log(\"ID de usuario:\",o),console.log(\"Rol de usuario:\",e),!o){console.log(\"No hay usuario logueado\");return}let t=\"\";if(e===\"odontologo\")t=`${c}/medico/findById/${o}`;else if(e===\"secretaria\")t=`${c}/secretaria/buscarId/${o}`;else{console.log(\"Rol no reconocido:\",e);return}console.log(\"Consultando endpoint:\",t);const n=await fetch(t);if(console.log(\"Estado de la respuesta:\",n.status),!n.ok){const u=await n.text();throw console.error(\"Error response:\",u),new Error(`Error al cargar datos del usuario (${n.status})`)}const s=await n.json();console.log(\"Datos recibidos:\",s);let r;if(e===\"odontologo\"?r=s.medico:r=s.secretaria,console.log(\"Datos procesados del usuario:\",r),!r)throw new Error(\"No se encontraron datos del usuario\");const a=document.querySelector(\"#user-name\"),l=document.querySelector(\"#user-email\");a&&(a.textContent=r.nombre||\"Nombre no disponible\"),l&&(l.textContent=r.email||\"Email no disponible\")}catch(o){console.error(\"Error completo:\",o);const e=document.querySelector(\"#user-name\"),t=document.querySelector(\"#user-email\");e&&(e.textContent=\"Error al cargar\"),t&&(t.textContent=\"Error al cargar\")}}const i=document.getElementById(\"logoutButton\");i&&i.addEventListener(\"click\",o=>{o.preventDefault(),localStorage.removeItem(\"userId\"),localStorage.removeItem(\"userRole\"),window.location.href=\"/login\"});document.addEventListener(\"DOMContentLoaded\",d);"],["C:/Users/Windows/Documents/Odontograma/Consultorio-Odontologico-FRONTEND/src/app/SideBar.astro?astro&type=script&index=0&lang.ts","const t=document.getElementById(\"sidebar\");if(t){const d=(g,n,a,c)=>{g.classList.toggle(\"hidden\"),n.classList.toggle(\"hidden\"),a.classList.toggle(\"hidden\"),c.classList.toggle(\"hidden\")},i=document.getElementById(\"toggleSidebarMobile\"),e=document.getElementById(\"sidebarBackdrop\"),o=document.getElementById(\"toggleSidebarMobileHamburger\"),l=document.getElementById(\"toggleSidebarMobileClose\");document.getElementById(\"toggleSidebarMobileSearch\")?.addEventListener(\"click\",()=>{d(t,e,o,l)}),i?.addEventListener(\"click\",()=>{d(t,e,o,l)}),e?.addEventListener(\"click\",()=>{d(t,e,o,l)})}"],["C:/Users/Windows/Documents/Odontograma/Consultorio-Odontologico-FRONTEND/src/components/ColorModeSwitcher.astro?astro&type=script&index=0&lang.ts","const e=document.getElementById(\"theme-toggle-dark-icon\"),t=document.getElementById(\"theme-toggle-light-icon\");localStorage.getItem(\"color-theme\")===\"dark\"||!(\"color-theme\"in localStorage)&&window.matchMedia(\"(prefers-color-scheme: dark)\").matches?t.classList.remove(\"hidden\"):e.classList.remove(\"hidden\");const o=document.getElementById(\"theme-toggle\");let l=new Event(\"dark-mode\");o.addEventListener(\"click\",function(){e.classList.toggle(\"hidden\"),t.classList.toggle(\"hidden\"),localStorage.getItem(\"color-theme\")?localStorage.getItem(\"color-theme\")===\"light\"?(document.documentElement.classList.add(\"dark\"),localStorage.setItem(\"color-theme\",\"dark\")):(document.documentElement.classList.remove(\"dark\"),localStorage.setItem(\"color-theme\",\"light\")):document.documentElement.classList.contains(\"dark\")?(document.documentElement.classList.remove(\"dark\"),localStorage.setItem(\"color-theme\",\"light\")):(document.documentElement.classList.add(\"dark\"),localStorage.setItem(\"color-theme\",\"dark\")),document.dispatchEvent(l)});"]],"assets":["/_astro/index.CEhjJz6a.css","/favicon.svg"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"MKhKaFe+foLNnzwUyaAo0lMNwsfEVyUZdehwxVJpwBM="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
