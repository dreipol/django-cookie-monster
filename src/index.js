import CookieMonsterComponent from './cookie-monster.svelte';
import { init, addMessages } from 'svelte-i18n';

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
    });

    return new CookieMonsterComponent({
        target: el,
        props,
    });
}
