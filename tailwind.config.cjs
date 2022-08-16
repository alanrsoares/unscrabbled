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
				'appear-1': 'fade-in-down 1s ease',
				'appear-2': 'fade-in 0.3s ease'
			},
			keyframes: {
				'fade-in': {
					'0%': {
						opacity: 0
					},
					'100%': {
						opacity: 1
					}
				},
				'fade-in-down': {
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
