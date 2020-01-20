import { join } from 'path';
import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from "rollup-plugin-terser";
import babel from 'rollup-plugin-babel';

const outputRoot = join('cookie_monster', 'static', 'cookie_monster');

export default {
    input: 'src/index.js',
    output: {
        file: join(outputRoot, 'js', 'cookie-monster.js'),
        name: 'CookieMonster',
        sourcemap: true,
        format: 'umd',
    },
    plugins: [
        resolve(),
        svelte({
            // Optionally, preprocess components with svelte.preprocess:
            // https://svelte.dev/docs#svelte_preprocess
            preprocess: {
                style: ({ content }) => {
                    return transformStyles(content);
                },
            },

            // Emit CSS as "files" for other plugins to process
            emitCss: true,

            // Extract CSS into a separate file (recommended).
            // See note below
            css: function(css) {
                // creates `main.css` and `main.css.map` — pass `false`
                // as the second argument if you don't want the sourcemap
                css.write(join(outputRoot, 'css/cookie-monster.css'));
            },
        }),
        babel({
            include: ['src/**', 'node_modules/svelte/**'],
            extensions: ['.js', '.mjs', '.html', '.svelte'],
        }),
        terser(),
    ],
};
