import CookieMonsterComponent from './cookie-monster.svelte';
import { init, addMessages } from 'svelte-i18n';

const isDevelopment = typeof process !== 'undefined' && process.env.NODE_ENV === 'development'; // eslint-disable-line

export default function cookieMonsterFactory(el, props = {}) {
    const { languages } = props;


    // add locales
    if (languages) {
        Object.keys(languages).forEach(lang => addMessages(lang, languages[lang]));
    }

    // init locale
    init({
        fallbackLocale: 'en',
        initialLocale: {
            navigator: true,
        },
        warnOnMissingMessages: isDevelopment,
    });

    return new CookieMonsterComponent({
        target: el,
        props,
    });
}
