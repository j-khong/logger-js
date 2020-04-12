import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

const plugins = [
   commonjs(), // prise en charge de require
   resolve(), // prise en charge des modules depuis node_modules

   serve({
      contentBase: '.',
      open: false,
   }),
   livereload({ watch: '.' }),
];

export default {
   input: 'index.js',
   output: {
      file: 'bundle.js',
      format: 'iife',
      name: 'loggerJsExample',
   },
   sourceMap: 'inline',
   plugins,
};
