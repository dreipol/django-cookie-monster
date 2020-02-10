// we need to support ie11 :(
// the following polyfills are needed
import "core-js/modules/es.promise";
import "core-js/modules/es.object.assign";
import "core-js/modules/es.array.fill";
import "core-js/modules/es.array.includes";

import CookieMonsterComponent from './cookie-monster.svelte';
import { init, addMessages } from 'svelte-i18n';
import * as util from './util';

const isDevelopment = typeof process !== 'undefined' && process.env.NODE_ENV === 'development'; // eslint-disable-line

// expose the util as static function attribute
cookieMonsterFactory.__ = util;

export default function cookieMonsterFactory(el, props = {}) {
    // add locales
    addMessages('custom', props);

    // init locale
    init({
        fallbackLocale: 'custom',
        initialLocale: {
            navigator: false,
        },
        warnOnMissingMessages: isDevelopment,
    });

    return new CookieMonsterComponent({
        target: el,
        props,
    });
}
