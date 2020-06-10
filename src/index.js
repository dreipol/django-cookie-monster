// we need to support ie11 :(
// the following polyfills are needed
import "core-js/modules/es.promise";
import "core-js/modules/es.object.assign";
import "core-js/modules/es.array.fill";
import "core-js/modules/es.array.includes";
import CookieMonsterComponent from './cookie-monster.svelte';

import * as util from './util';

// expose the util as static function attribute
cookieMonsterFactory.__ = util;

export default function cookieMonsterFactory(el, props = {}) {
    util.initVocabulary(props);

    return new CookieMonsterComponent({
        target: el,
        props,
    });
}
