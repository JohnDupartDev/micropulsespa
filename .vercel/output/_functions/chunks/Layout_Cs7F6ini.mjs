import { c as createComponent } from './astro-component_BZ7YdUxK.mjs';
import 'piccolore';
import { p as createRenderInstruction, m as maybeRenderHead, r as renderTemplate, h as addAttribute, o as renderComponent, q as renderSlot, v as renderHead, u as unescapeHTML } from './entrypoint_Cbjfms40.mjs';
import 'clsx';

async function renderScript(result, id) {
  const inlined = result.inlinedScripts.get(id);
  let content = "";
  if (inlined != null) {
    if (inlined) {
      content = `<script type="module">${inlined}</script>`;
    }
  } else {
    const resolved = await result.resolve(id);
    content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"></script>`;
  }
  return createRenderInstruction({ type: "script", id, content });
}

const $$Header = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<header id="header-wrapper" class="fixed top-0 left-0 w-full z-[100] px-4 py-2 transition-all duration-300"> <div class="max-w-6xl mx-auto"> <nav id="nav-container" class="bg-white/90 backdrop-blur-md rounded-full px-4 sm:px-8 shadow-lg border border-gray-100 flex items-center justify-between transition-all duration-300 min-h-[70px] sm:min-h-0"> <a href="/" class="flex items-center gap-2  shrink-0 bd-pr"> <img id="header-logo" src="/logo_spa.svg" alt="MicropulseSpa Logo" class="h-14 md:h-16 lg:h-20 w-auto transition-all duration-300"> </a> <!-- Desktop Navigation --> <ul class="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-gray-600"> <li><a href="/" class="hover:text-brand-primary transition whitespace-nowrap">Home</a></li> <li><a href="/sobre-nosotros" class="hover:text-brand-primary transition whitespace-nowrap">Sobre Nosotros</a></li> <li><a href="#servicios" class="hover:text-brand-primary transition whitespace-nowrap">Servicios</a></li> <li><a href="#camilla" class="hover:text-brand-primary transition whitespace-nowrap">Camilla Ceragem</a></li> <li><a href="/contacto" class="hover:text-brand-primary transition whitespace-nowrap">Contacto</a></li> </ul> <!-- Desktop CTA --> <a href="https://wa.me/50688227210" target="_blank" class="hidden sm:flex bg-brand-dark text-white px-4 lg:px-6 py-2 rounded-full text-sm font-semibold hover:bg-brand-primary transition items-center gap-2 group whitespace-nowrap"> <span class="hidden lg:inline">Hablemos</span> <span class="lg:hidden">WhatsApp</span> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:translate-x-1 transition-transform shrink-0"><path d="m9 18 6-6-6-6"></path></svg> </a> <!-- Mobile Menu Button --> <button id="open-menu" class="md:hidden text-brand-dark p-2 -mr-2 active:bg-brand-light/20 rounded-full transition-colors" aria-label="Abrir menú"> <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg> </button> </nav> </div> <!-- Mobile Sidebar Mejorada --> <div id="mobile-sidebar" class="fixed inset-0 z-[200] hidden"> <div id="sidebar-overlay" class="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm opacity-0 transition-opacity duration-300"></div> <div id="sidebar-panel" class="absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-2xl flex flex-col translate-x-full transition-transform duration-300 ease-out will-change-transform"> <!-- Header del Sidebar --> <div class="flex justify-between items-center p-5 border-b border-gray-100"> <img src="/logo_spa.svg" alt="Logo" class="h-10 w-auto"> <button id="close-menu" class="p-2 bg-brand-light/10 text-brand-dark hover:bg-brand-light/30 rounded-full transition-colors" aria-label="Cerrar menú"> <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="6" y1="6" y2="18"></line><line x1="6" x2="18" y1="6" y2="18"></line></svg> </button> </div> <!-- Navegación Principal --> <nav class="flex-1 px-6 py-6 overflow-y-auto"> <ul class="flex flex-col gap-2"> <li> <a href="/" class="mobile-link text-lg font-semibold text-brand-dark hover:text-brand-primary flex items-center justify-between py-3 px-4 rounded-xl hover:bg-brand-light/10 transition-all"> <span>Inicio</span> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-brand-primary/40"><path d="m9 18 6-6-6-6"></path></svg> </a> </li> <li> <a href="#sobre-nosotros" class="mobile-link text-lg font-semibold text-brand-dark hover:text-brand-primary flex items-center justify-between py-3 px-4 rounded-xl hover:bg-brand-light/10 transition-all"> <span>Sobre Nosotros</span> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-brand-primary/40"><path d="m9 18 6-6-6-6"></path></svg> </a> </li> <li> <a href="#servicios" class="mobile-link text-lg font-semibold text-brand-dark hover:text-brand-primary flex items-center justify-between py-3 px-4 rounded-xl hover:bg-brand-light/10 transition-all"> <span>Servicios</span> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-brand-primary/40"><path d="m9 18 6-6-6-6"></path></svg> </a> </li> <li> <a href="#camilla" class="mobile-link text-lg font-semibold text-brand-dark hover:text-brand-primary flex items-center justify-between py-3 px-4 rounded-xl hover:bg-brand-light/10 transition-all"> <span>Camilla Ceragem</span> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-brand-primary/40"><path d="m9 18 6-6-6-6"></path></svg> </a> </li> <li> <a href="#contacto" class="mobile-link text-lg font-semibold text-brand-dark hover:text-brand-primary flex items-center justify-between py-3 px-4 rounded-xl hover:bg-brand-light/10 transition-all"> <span>Contacto</span> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-brand-primary/40"><path d="m9 18 6-6-6-6"></path></svg> </a> </li> </ul> </nav> <!-- Footer del Sidebar --> <div class="p-6 border-t border-gray-100 bg-gray-50/50 space-y-5"> <!-- Redes Sociales --> <div class="flex gap-3 justify-center"> <a href="#" class="w-11 h-11 bg-white rounded-full flex items-center justify-center text-brand-dark hover:text-brand-primary shadow-sm border border-gray-100 hover:shadow-md transition-all active:scale-95" aria-label="Facebook"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg> </a> <a href="#" class="w-11 h-11 bg-white rounded-full flex items-center justify-center text-brand-dark hover:text-brand-primary shadow-sm border border-gray-100 hover:shadow-md transition-all active:scale-95" aria-label="Instagram"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg> </a> <a href="#" class="w-11 h-11 bg-white rounded-full flex items-center justify-center text-brand-dark hover:text-brand-primary shadow-sm border border-gray-100 hover:shadow-md transition-all active:scale-95" aria-label="TikTok"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg> </a> </div> <!-- CTA Principal --> <a href="https://wa.me/50688227210" target="_blank" class="block w-full bg-brand-primary text-white text-center py-4 rounded-xl font-bold text-base shadow-lg shadow-brand-primary/30 hover:shadow-xl active:scale-[0.98] transition-all">
Agendar Cita por WhatsApp
</a> <!-- Contacto rápido --> <div class="text-center text-xs text-gray-500"> <p>Respuesta en menos de 5 minutos</p> </div> </div> </div> </div> </header> ${renderScript($$result, "/Users/samaduti/Documents/Web-micropulsspa/micropulsespa/src/components/Header.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/samaduti/Documents/Web-micropulsspa/micropulsespa/src/components/Header.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const navigationLinks = [
    { href: "/", label: "Inicio" },
    { href: "#servicios", label: "Servicios" },
    { href: "#proceso", label: "Metodología" },
    { href: "#precios", label: "Inversión" }
  ];
  const helpLinks = [
    { href: "#faq", label: "Preguntas Frecuentes" },
    { href: "#cuidados", label: "Cuidados Post-Cita" },
    { href: "#politicas", label: "Políticas" },
    { href: "https://wa.me/50688227210", label: "Agendar WhatsApp", isCTA: true }
  ];
  const socialLinks = [
    {
      href: "https://www.facebook.com/profile.php?id=61552307075682",
      label: "Facebook",
      icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
    },
    {
      href: "https://instagram.com/micropulsespa",
      label: "Instagram",
      icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
    }
  ];
  return renderTemplate`${maybeRenderHead()}<footer class="bg-brand-primary text-white pt-16 pb-8 px-6 overflow-hidden relative" aria-label="Pie de página"> <div class="absolute inset-0 overflow-hidden pointer-events-none opacity-20" aria-hidden="true"> <div class="absolute -top-24 -right-24 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse-slow"></div> <div class="absolute -bottom-24 -left-24 w-80 h-80 bg-brand-dark/40 rounded-full blur-3xl"></div> </div> <div class="max-w-7xl mx-auto relative z-10 px-5"> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 border-b border-white/10 pb-16"> <div class="lg:col-span-4 space-y-6"> <a href="/" class="inline-block transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50 rounded-lg" aria-label="MicropulseSpa - Ir al inicio"> <img src="/logo_spa.svg" alt="MicropulseSpa" class="h-20 w-auto brightness-0 invert" loading="lazy" width="200" height="80"> </a> <p class="text-white/70 text-sm leading-relaxed max-w-xs font-medium">
Transformamos vidas a través de la regeneración dérmica avanzada. Especialistas en micropuntura brasileña para resultados reales y permanentes.
</p> <div class="flex gap-4 pt-2" role="list" aria-label="Redes sociales"> ${socialLinks.map((social) => renderTemplate`<a${addAttribute(social.href, "href")} class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-brand-primary focus:bg-white focus:text-brand-primary transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50"${addAttribute(`Visítanos en ${social.label}`, "aria-label")} target="_blank" rel="noopener noreferrer" role="listitem"> <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"> <path${addAttribute(social.icon, "d")}></path> </svg> </a>`)} </div> </div> <nav class="lg:col-span-2" aria-label="Navegación principal del pie"> <h3 class="text-xs font-black uppercase tracking-[0.3em] mb-8 text-white/50" id="nav-footer">Explorar</h3> <ul class="space-y-4 font-bold text-sm" aria-labelledby="nav-footer"> ${navigationLinks.map((link) => renderTemplate`<li> <a${addAttribute(link.href, "href")} class="hover:translate-x-2 transition-transform inline-block focus:outline-none focus:ring-2 focus:ring-white/50 rounded-md px-2 -mx-2"> ${link.label} </a> </li>`)} </ul> </nav> <nav class="lg:col-span-2" aria-label="Enlaces de ayuda"> <h3 class="text-xs font-black uppercase tracking-[0.3em] mb-8 text-white/50" id="help-footer">Ayuda</h3> <ul class="space-y-4 font-bold text-sm" aria-labelledby="help-footer"> ${helpLinks.map((link) => renderTemplate`<li> ${link.isCTA ? renderTemplate`<a${addAttribute(link.href, "href")} class="inline-block wrap mt-2 bg-white/10 px-3  py-2 rounded-xl hover:bg-white/20 focus:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50" aria-label="Contactar por WhatsApp"> ${link.label} </a>` : renderTemplate`<a${addAttribute(link.href, "href")} class="hover:translate-x-2 transition-transform inline-block focus:outline-none focus:ring-2 focus:ring-white/50 rounded-md px-2 -mx-2"> ${link.label} </a>`} </li>`)} </ul> </nav> <div class="lg:col-span-4"> <div class="bg-white/5 p-8 rounded-[2rem] border border-white/10 shadow-inner h-full"> <h3 class="text-xs font-black uppercase tracking-[0.3em] mb-6 text-white/70" id="contact-footer">Visítanos</h3> <address class="space-y-5 text-sm not-italic" aria-labelledby="contact-footer"> <div class="flex items-start gap-3"> <svg class="w-5 h-5 shrink-0 opacity-70 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5" aria-hidden="true"> <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path> <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path> </svg> <p class="font-medium">
San José, Tibás.<br>
5 esquinas del puente elevado, 300 metros al este y 75 al norte, séptima casa entrando a mano izquierda, portón negro., San Juan, Costa Rica, 11301
</p> </div> <div class="flex items-center gap-3"> <svg class="w-5 h-5 shrink-0 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5" aria-hidden="true"> <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path> </svg> <a href="tel:+50688227210" class="font-bold hover:text-white/80 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded-md px-2 -mx-2">
+506 8822-7210
</a> </div> </address> </div> </div> </div> <div class="pt-8 flex flex-col md:flex-row justify-between items-center gap-6"> <p class="text-[10px] font-black tracking-widest uppercase opacity-40 text-center md:text-left">
&copy; ${currentYear} <span class="font-bold">MicropulseSpa</span> &bull; Costa Rica &bull; Todos los derechos reservados
</p> <div class="flex items-center gap-2 group relative" role="status" aria-label="Estado del servicio"> <span class="text-[10px] font-bold tracking-widest uppercase opacity-60">
Diseño y Desarrollo by Zipaquira Digital
</span> <!-- Link de Zipaquira Digital (ahora funciona correctamente) --> <a href="https://zipaquiradigital.com" target="_blank" rel="noopener noreferrer" class="absolute -top-8 right-0 bg-white text-brand-primary text-[8px] font-bold px-2 py-1 rounded hover:bg-brand-primary hover:text-white transition-all opacity-0 group-hover:opacity-100 whitespace-nowrap shadow-lg" aria-label="Diseño y Desarrollo por Zipaquira Digital">
Zipaquiradigital.com
</a> </div> </div> </div> </footer>`;
}, "/Users/samaduti/Documents/Web-micropulsspa/micropulsespa/src/components/Footer.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title = "MicropulseSpa | Micropuntura Brasileña y Bienestar en Tibás",
    description = "Especialistas en micropuntura brasileña en San José. Eliminamos hasta un 95% de estrías. Relájate en nuestra camilla Ceragem. ¡Reserva hoy al 8822-7210!",
    image = "/og-image.jpg"
  } = Astro2.props;
  const canonicalURL = new URL(Astro2.url.pathname, "https://micropulsespa.com");
  const socialImageURL = new URL(image, Astro2.url);
  const schema = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "name": "MicropulseSpa",
    "alternateName": "Micropulse Spa Costa Rica",
    "image": socialImageURL,
    "@id": "https://micropulsespa.com",
    "url": "https://micropulsespa.com",
    "telephone": "+50688227210",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "5 esquinas del puente elevado, 300 metros al este y 75 al norte, séptima casa entrando a mano izquierda, portón negro",
      "addressLocality": "Tibás",
      "addressRegion": "San José",
      "postalCode": "11301",
      "addressCountry": "CR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 9.9575,
      "longitude": -84.0811
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/profile.php?id=61552307075682",
      "https://www.instagram.com/micropulsespa/"
    ],
    "description": "Expertos en salud estética. Especialidad en micropuntura brasileña para estrías y terapia de relajación con tecnología Ceragem en Costa Rica."
  };
  return renderTemplate(_a || (_a = __template(['<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"', '><meta name="theme-color" content="#b66ab2"><title>', '</title><meta name="title"', '><meta name="description"', '><link rel="canonical"', '><meta name="robots" content="index, follow, max-image-preview:large"><meta property="og:type" content="website"><meta property="og:url"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><meta property="og:locale" content="es_CR"><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"', '><meta property="twitter:title"', '><meta property="twitter:description"', '><meta property="twitter:image"', '><script type="application/ld+json">', '<\/script><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"><link rel="manifest" href="/site.webmanifest">', '</head> <body class="bg-brand-white text-brand-dark selection:bg-brand-primary/30 selection:text-brand-dark"> ', " ", "  ", " </body></html>"])), addAttribute(Astro2.generator, "content"), title, addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(canonicalURL, "href"), addAttribute(Astro2.url, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(socialImageURL, "content"), addAttribute(Astro2.url, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(socialImageURL, "content"), unescapeHTML(JSON.stringify(schema)), renderHead(), renderComponent($$result, "Header", $$Header, {}), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Footer", $$Footer, {}));
}, "/Users/samaduti/Documents/Web-micropulsspa/micropulsespa/src/layouts/Layout.astro", void 0);

export { $$Layout as $, renderScript as r };
