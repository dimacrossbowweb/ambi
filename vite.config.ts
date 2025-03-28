import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default defineConfig({

	build: {

		lib: {

			entry: resolve(__dirname, 'src/index.ts'),
			name: 'Ambilighter',
			fileName: (format) => `ambilighter.${format}.js`

		},

		rollupOptions: {

			external: [],
			output: {

				globals: {}
				
			}

		},
	},

 	plugins: [
	
		vue(),
		cssInjectedByJsPlugin({ useStrictCSP: true, relativeCSSInjection: false }),

	],

});