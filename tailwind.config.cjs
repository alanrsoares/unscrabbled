/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],
	theme: {
		extend: {
			fontFamily: {
				display: "'Saira Stencil One', cursive"
			},
			animation: {
				'appear-1': 'appear 1s ease'
			},
			keyframes: {
				appear: {
					'0%': {
						opacity: 0,
						transform: 'translateY(-50vh)'
					},
					'66%': {
						transform: 'translateY(0)'
					},
					'100%': {
						opacity: 1
					}
				}
			}
		}
	},
	plugins: [require('flowbite/plugin')]
};
