import { join } from 'path';
import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import babel from 'rollup-plugin-babel';
import postcss from 'postcss';

const postcssConfig = require('./postcss.config');
const outputRoot = join('cookie_monster', 'static', 'cookie_monster', 'js');
const cssCompiler = postcss(postcssConfig.plugins);

export default {
    input: 'src/index.js',
    output: [{
        file: join(outputRoot, 'cookie-monster.umd.js'),
        name: 'cookieMonster',
        sourcemap: true,
        format: 'umd',
    }, {
        file: join(outputRoot, 'cookie-monster.esm.js'),
        name: 'cookieMonster',
        sourcemap: true,
        format: 'esm',
    }],
    plugins: [
        resolve(),
        commonjs(),
        svelte({
            emitCss: false,
            compilerOptions: {
                accessors: true,
            },
            // Optionally, preprocess components with svelte.preprocess:
            // https://svelte.dev/docs#svelte_preprocess
            preprocess: {
                style: async ({ content, filename }) => {
                    const { css, map } = await cssCompiler
                        .process(content, {
                            from: filename,
                            map: {
                                inline: false,
                            },
                        });

                    return { code: css, map: map.toJSON() };
                },
            },
        }),
        babel({
            include: ['src/**', 'node_modules/**'],
            extensions: ['.js', '.mjs', '.html', '.svelte'],
        }),
        terser(),
    ],
    onwarn(warning, warn) {
        if (warning.code === 'THIS_IS_UNDEFINED') {
            return;
        }
        warn(warning); // this requires Rollup 0.46
    },
};
