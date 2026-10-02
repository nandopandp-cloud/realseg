/**
 * Coordenação entre o loader de abertura e as animações de entrada do site.
 * O script no <head> define `html[data-boot]` ("full" no primeiro acesso, "quick" nos retornos).
 */
export const BOOT_EVENT = "rs:boot-done";
export const BOOT_STORAGE_KEY = "rs-boot-v1";

/** Script inline (antes da pintura): evita qualquer flash do site por trás do loader. */
export const BOOT_SCRIPT = `(function(){var d=document.documentElement;d.classList.add('js');try{if(location.pathname!=='/')return;var r=matchMedia('(prefers-reduced-motion: reduce)').matches;var s=localStorage.getItem('${BOOT_STORAGE_KEY}');d.setAttribute('data-boot',(s||r)?'quick':'full');}catch(e){}})();`;

/** Executa `cb` quando o loader liberar a tela (ou imediatamente, se não houver loader). */
export function onBootDone(cb: () => void) {
  const d = typeof document === "undefined" ? null : document.documentElement;
  if (!d || !d.hasAttribute("data-boot") || d.hasAttribute("data-boot-released")) {
    cb();
    return () => {};
  }
  const handler = () => cb();
  window.addEventListener(BOOT_EVENT, handler, { once: true });
  return () => window.removeEventListener(BOOT_EVENT, handler);
}

/** Libera o site por trás do loader (o overlay ainda está saindo). */
export function releaseBoot() {
  document.documentElement.setAttribute("data-boot-released", "");
  window.dispatchEvent(new Event(BOOT_EVENT));
}

/** Encerra o ciclo do loader. */
export function finalizeBoot() {
  document.documentElement.removeAttribute("data-boot");
  document.documentElement.removeAttribute("data-boot-released");
}
