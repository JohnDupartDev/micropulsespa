/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				// Colores corporativos MicroPulse Spa
				brand: {
					primary: '#b66ab2',   // Lila principal
					light: '#ecdfed',     // Lila muy claro (fondo suave)
					dark: '#212121',      // Gris casi negro (texto/contraste)
					white: '#ffffff',     // Blanco puro
				},
			},
		},
	},
	plugins: [],
}