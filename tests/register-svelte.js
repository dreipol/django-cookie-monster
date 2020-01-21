// this file is simply needed to load svelte components in svelte
// i could have used the `svelte/register` but it appears to be quite buggy
const fs = require('fs');
const path = require('path');
const { compile } = require('svelte/compiler');
const { addHook } = require('pirates');

function capitalise(name) {
    return name[0].toUpperCase() + name.slice(1);
}

addHook(function(source, filename) {
    const name = path.parse(filename).name
        .replace(/^\d/, '_$&')
        .replace(/[^a-zA-Z0-9_$]/g, '');

    const options = {
        filename,
        name: capitalise(name),
        accessors: true,
        format: 'esm',
    };

    console.log(options);

    const { js } = compile(fs.readFileSync(filename, 'utf-8'), options);

    return js.code;
}, {
    exts: ['.svelte'],
});
