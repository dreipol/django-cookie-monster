<div class="cookie-monster-banner {isActive ? 'cookie-monster-banner__active' : ''}">
    <h3 class="cookie-monster-banner--title">{$_('title', { default: 'Cookie Title' })}</h3>

    <p class="cookie-monster-banner--content">
        {@html $_('text', { default: 'Cookie Text' })}
    </p>

    <div class="cookie-monster-banner--content">
        <div class="cookie-monster-banner--btn-wrapper">
            <button on:click={acceptCookies} class="cookie-monster-banner--btn">
                {$_('buttons.accept.label', { default: 'Accept Cookies' })}
            </button>
        </div>
    </div>
</div>

<style>
    .cookie-monster-banner {
        display: none;
        width: auto;
        position: fixed;
        bottom: 0;
        opacity: 0;
    }

    .cookie-monster-banner.cookie-monster-banner__active {
        display: block;
        opacity: 1;
    }
</style>

<script>
    import { _ } from 'svelte-i18n';
    import { hasAcceptedCookies, createCookie } from './util';

    // Props
    export let cookieId;
    export let cookieAge;

    // reactive props
    let isActive = !hasAcceptedCookies(cookieId);
    let selectedCookies = [];

    function acceptCookies() {
        createCookie(cookieId, selectedCookies, { age: cookieAge });
        isActive = !hasAcceptedCookies(cookieId);
    }
</script>



