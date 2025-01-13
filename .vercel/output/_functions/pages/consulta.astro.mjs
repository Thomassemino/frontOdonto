/* empty css                                   */
import { c as createComponent, r as renderTemplate, d as renderComponent, a as renderScript, m as maybeRenderHead, e as addAttribute } from '../chunks/astro/server_BR06E_5U.mjs';
import 'kleur/colors';
import { $ as $$LayoutCommon } from '../chunks/LayoutCommon_CkZjnoYI.mjs';
import { $ as $$LayoutProtected } from '../chunks/LayoutProtected_DqnW3Xnf.mjs';
export { renderers } from '../renderers.mjs';

const $$Consulta = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LayoutProtected", $$LayoutProtected, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "LayoutCommon", $$LayoutCommon, {}, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-gradient-to-r from-slate-100 to-slate-200 p-4 text-slate-800 dark:from-slate-900 dark:to-slate-800 dark:text-slate-100 lg:p-16"> <div class="mx-auto max-w-4xl"> <div class="mb-8"> <button id="volverBtn" class="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
← Volver a consultas
</button> </div> <div class="rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800"> <!-- Navegación entre pasos --> <div class="mb-8 flex justify-between"> <button id="paso1Btn" class="paso-btn border-b-2 border-blue-600 px-4 py-2 font-semibold text-blue-600 dark:border-blue-400 dark:text-blue-400">
Datos Personales Médicos
</button> <button id="paso2Btn" class="paso-btn px-4 py-2 font-semibold text-gray-400">
Antecedentes Médicos
</button> <button id="paso3Btn" class="paso-btn px-4 py-2 font-semibold text-gray-400">
Estado Actual
</button> </div> <!-- Formulario Paso 1 --> <form id="paso1" class="space-y-6"> <div class="space-y-4"> <div> <label for="enfermedades" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
¿Enfermedades que padece el paciente? ¿Cuáles?
</label> <textarea id="enfermedades" name="enfermedades" rows="2" class="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 dark:border-gray-600 dark:bg-gray-700 focus:border-blue-500 focus:ring-blue-500"></textarea> </div> <div> <label for="tratamientoMedico" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
¿Está actualmente en tratamiento médico? ¿Cuál?
</label> <textarea id="tratamientoMedico" name="tratamientoMedico" rows="2" class="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 dark:border-gray-600 dark:bg-gray-700 focus:border-blue-500 focus:ring-blue-500"></textarea> </div> <div> <label for="medicamentos" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
¿Consume algún medicamento con regularidad? ¿Cuál?
</label> <textarea id="medicamentos" name="medicamentos" rows="2" class="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 dark:border-gray-600 dark:bg-gray-700 focus:border-blue-500 focus:ring-blue-500"></textarea> </div> <div> <label for="enfermedadInfectoInfecciosa" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
¿Padece alguna enfermedad infecto-infecciosa? ¿Cuál?
</label> <textarea id="enfermedadInfectoInfecciosa" name="enfermedadInfectoInfecciosa" rows="2" class="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 dark:border-gray-600 dark:bg-gray-700 focus:border-blue-500 focus:ring-blue-500"></textarea> </div> <div class="flex items-center space-x-2"> <input type="checkbox" id="fuma" name="fuma" class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600"> <label for="fuma" class="text-sm text-gray-700 dark:text-gray-300">
¿Fuma?
</label> </div> <div> <label for="cantidadCigarrillos" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
¿Cuánto fuma?
</label> <input type="text" id="cantidadCigarrillos" name="cantidadCigarrillos" class="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 dark:border-gray-600 dark:bg-gray-700 focus:border-blue-500 focus:ring-blue-500"> </div> <div class="flex items-center space-x-2"> <input type="checkbox" id="embarazada" name="embarazada" class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600"> <label for="embarazada" class="text-sm text-gray-700 dark:text-gray-300">
¿Está embarazada?
</label> </div> <div> <label for="mesesEmbarazo" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
¿Cuántos meses de embarazo?
</label> <input type="text" id="mesesEmbarazo" name="mesesEmbarazo" class="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 dark:border-gray-600 dark:bg-gray-700 focus:border-blue-500 focus:ring-blue-500"> </div> <div> <label for="otrasEnfermedades" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
¿Desea dejar constancia de alguna otra enfermedad?
</label> <textarea id="otrasEnfermedades" name="otrasEnfermedades" rows="2" class="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 dark:border-gray-600 dark:bg-gray-700 focus:border-blue-500 focus:ring-blue-500"></textarea> </div> <div> <label for="alergias" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
¿Alergias?
</label> <textarea id="alergias" name="alergias" rows="2" class="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 dark:border-gray-600 dark:bg-gray-700 focus:border-blue-500 focus:ring-blue-500"></textarea> </div> <div class="flex items-center space-x-2"> <input type="checkbox" id="diabetes" name="diabetes" class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600"> <label for="diabetes" class="text-sm text-gray-700 dark:text-gray-300">
¿Diabetes?
</label> </div> <div> <label for="enfermedadTransmisionSexual" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
¿Enfermedad de transmisión sexual? ¿Cuál?
</label> <textarea id="enfermedadTransmisionSexual" name="enfermedadTransmisionSexual" rows="2" class="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 dark:border-gray-600 dark:bg-gray-700 focus:border-blue-500 focus:ring-blue-500"></textarea> </div> <div> <label for="motivoConsulta" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
Motivo de la consulta (completado por la secretaria):
</label> <textarea id="motivoConsulta" name="motivoConsulta" rows="2" class="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 dark:border-gray-600 dark:bg-gray-700 focus:border-blue-500 focus:ring-blue-500"></textarea> </div> </div> <div class="flex justify-end space-x-4"> <button type="button" id="cancelarBtn" class="rounded-lg bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
Cancelar
</button> <button type="button" id="siguiente1" class="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
Siguiente
</button> </div> </form> <!-- Formulario Paso 2 --> <form id="paso2" class="hidden space-y-6"> <div class="space-y-4"> <fieldset class="space-y-2"> <legend class="block text-sm font-medium text-gray-700 dark:text-gray-300">
¿Ha consultado con algún odontólogo previamente?
</legend> <div class="mt-2 space-x-4"> <label class="inline-flex items-center"> <input type="radio" name="consultaPrevia" value="si" class="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"> <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Sí</span> </label> <label class="inline-flex items-center"> <input type="radio" name="consultaPrevia" value="no" class="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"> <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">No</span> </label> </div> </fieldset> <div> <label for="tratamientoOdontologico" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
¿Está llevando algún tratamiento odontológico? ¿Cuál? ¿Desde cuándo?
</label> <textarea id="tratamientoOdontologico" name="tratamientoOdontologico" rows="2" class="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 dark:border-gray-600 dark:bg-gray-700 focus:border-blue-500 focus:ring-blue-500"></textarea> </div> <div id="seccionDolor" class="space-y-4"> <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
¿Presenta dolor?
</label> <div class="ml-4 space-y-4"> <div> <p class="text-sm text-gray-600 dark:text-gray-400">Rango:</p> <select name="rangoDolor" class="mt-1 block w-full rounded-md border border-gray-300 bg-white p-2 dark:border-gray-600 dark:bg-gray-700 focus:border-blue-500 focus:ring-blue-500"> <option value="">Seleccione...</option> <option value="suave">Suave</option> <option value="moderado">Moderado</option> <option value="intenso">Intenso</option> </select> </div> <div> <p class="text-sm text-gray-600 dark:text-gray-400">Tipo:</p> <select name="tipoDolor" class="mt-1 block w-full rounded-md border border-gray-300 bg-white p-2 dark:border-gray-600 dark:bg-gray-700 focus:border-blue-500 focus:ring-blue-500"> <option value="">Seleccione...</option> <option value="temporario">Temporario</option> <option value="intermitente">Intermitente</option> <option value="continuo">Continuo</option> </select> </div> <div> <p class="text-sm text-gray-600 dark:text-gray-400">Características:</p> <div class="mt-2 space-x-4"> <label class="inline-flex items-center"> <input type="checkbox" name="caracteristicasDolor[]" value="espontaneo" class="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"> <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Espontáneo</span> </label> <label class="inline-flex items-center"> <input type="checkbox" name="caracteristicasDolor[]" value="provocado" class="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"> <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Provocado</span> </label> </div> </div> <div> <p class="text-sm text-gray-600 dark:text-gray-400">Sensibilidad:</p> <div class="mt-2 space-x-4"> <label class="inline-flex items-center"> <input type="checkbox" name="sensibilidad[]" value="frio" class="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"> <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Al frío</span> </label> <label class="inline-flex items-center"> <input type="checkbox" name="sensibilidad[]" value="calor" class="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"> <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Al calor</span> </label> </div> </div> <div> <label for="localizacionDolor" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
Localización del dolor:
</label> <select id="localizacionDolor" name="localizacionDolor" multiple class="mt-1 block w-full rounded-md border border-gray-300 bg-white p-2 dark:border-gray-600 dark:bg-gray-700 focus:border-blue-500 focus:ring-blue-500"> <option value="maxilaSuperior">Maxila superior</option> <option value="maxilaInferior">Maxila inferior</option> <option value="cuadranteSuperiorDerecho">Cuadrante superior derecho</option> <option value="cuadranteSuperiorIzquierdo">Cuadrante superior izquierdo</option> <option value="cuadranteInferiorDerecho">Cuadrante inferior derecho</option> <option value="cuadranteInferiorIzquierdo">Cuadrante inferior izquierdo</option> </select> </div> </div> </div> <div> <label for="fracturas" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
¿Se le ha fracturado algún diente? ¿Cuál?
</label> <textarea id="fracturas" name="fracturas" rows="2" class="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 dark:border-gray-600 dark:bg-gray-700 focus:border-blue-500 focus:ring-blue-500"></textarea> </div> <div class="flex items-center space-x-2"> <input type="checkbox" id="dificultadMasticar" name="dificultadMasticar" class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600"> <label for="dificultadMasticar" class="text-sm text-gray-700 dark:text-gray-300">
¿Tiene dificultad para masticar?
</label> </div> <div class="flex items-center space-x-2"> <input type="checkbox" id="dificultadAbrirBoca" name="dificultadAbrirBoca" class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600"> <label for="dificultadAbrirBoca" class="text-sm text-gray-700 dark:text-gray-300">
¿Siente dificultad para abrir la boca?
</label> </div> </div> <div class="flex justify-end space-x-4"> <button type="button" id="anterior2" class="rounded-lg bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
Anterior
</button> <button type="button" id="siguiente2" class="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
Siguiente
</button> </div> </form> <!-- Formulario Paso 3 --> <form id="paso3" class="hidden space-y-6"> <div class="space-y-4"> <div> <label for="anormalidadBucal" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
¿Observa alguna anormalidad en su boca (labios, lengua, paladar, etc.)? ¿Cuál?
</label> <textarea id="anormalidadBucal" name="anormalidadBucal" rows="2" class="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 dark:border-gray-600 dark:bg-gray-700 focus:border-blue-500 focus:ring-blue-500"></textarea> </div> <div class="flex items-center space-x-2"> <input type="checkbox" id="sangradoEncias" name="sangradoEncias" class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600"> <label for="sangradoEncias" class="text-sm text-gray-700 dark:text-gray-300">
¿Le sangran las encías?
</label> </div> <div class="flex items-center space-x-2"> <input type="checkbox" id="hinchazanCara" name="hinchazanCara" class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600"> <label for="hinchazanCara" class="text-sm text-gray-700 dark:text-gray-300">
¿Tiene hinchazón en la cara?
</label> </div> <fieldset class="space-y-2"> <legend class="block text-sm font-medium text-gray-700 dark:text-gray-300">
¿Cómo califica su higiene bucal?
</legend> <div class="mt-2 flex flex-wrap gap-4"> ${["Muy buena", "Buena", "Mala", "Muy mala"].map((option) => renderTemplate`<label class="inline-flex items-center"> <input type="radio" name="higieneBucal"${addAttribute(option.toLowerCase().replace(" ", ""), "value")} class="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"> <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">${option}</span> </label>`)} </div> </fieldset> <div> <label for="anotacionesMedico" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
Anotaciones del Médico
</label> <textarea id="anotacionesMedico" name="anotacionesMedico" rows="4" class="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 dark:border-gray-600 dark:bg-gray-700 focus:border-blue-500 focus:ring-blue-500"></textarea> </div> </div> <div class="flex justify-end space-x-4"> <button type="button" id="anterior3" class="rounded-lg bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
Anterior
</button> <button type="button" id="guardar" class="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
Guardar Consulta
</button> </div> </form> </div> </div> </div> ` })} ` })} ${renderScript($$result, "C:/Users/Windows/Documents/Odontograma/Consultorio-Odontologico-FRONTEND/src/pages/consulta.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Windows/Documents/Odontograma/Consultorio-Odontologico-FRONTEND/src/pages/consulta.astro", undefined);

const $$file = "C:/Users/Windows/Documents/Odontograma/Consultorio-Odontologico-FRONTEND/src/pages/consulta.astro";
const $$url = "/consulta";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Consulta,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
