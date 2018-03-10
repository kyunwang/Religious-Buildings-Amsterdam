import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
	input: 'scripts/index.js',
	output: {
	  file: 'scripts/bundle.js',
	  format: 'iife'
	},
	plugins: [
		resolve(), //  Teaches Rollup how to find external modules
		babel({
			exclude: 'node_modules/**' // Transplile our sourcecode only
		})
	]
 };