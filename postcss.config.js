const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const postCssNested = require('postcss-nested');
var cssvariables = require('postcss-css-variables');

module.exports = {
    plugins: [
        cssnano(),
        autoprefixer({
            cascade: true,
        }),
        postCssNested(),
        cssvariables()],
};
