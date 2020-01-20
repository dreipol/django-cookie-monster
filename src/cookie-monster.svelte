{#if isActive}
    <div class="cookie-monster" transition:fade="{{delay: 150, duration: 300}}">
        <h3 class="cookie-monster--title">{$_('title', { default: 'Cookie Title' })}</h3>

        <div class="cookie-monster--content">
            <p class="cookie-monster--text">
                {@html $_('text', { default: 'Cookie Text' })}
            </p>

            {#if groupsSettings}
                <CookieGroups groups={groupsSettings.groups} rows={groupsSettings.rows}/>
            {/if}

            <div class="cookie-monster--btn-wrapper">
                <button on:click={acceptCookies} class="cookie-monster--btn">
                    {$_('buttons.accept.label', { default: 'Accept Cookies' })}
                </button>
            </div>
        </div>
    </div>
{/if}

<style>
    .cookie-monster {
        width: auto;
        position: fixed;
        bottom: 0;
    }
</style>

<script>
    import { _ } from 'svelte-i18n';
    import { fade } from 'svelte/transition';
    import CookieGroups from './cookie-groups.svelte';
    import { hasAcceptedCookies, createCookie } from './util';

    // Props
    export let cookieId;
    export let cookieAge;
    export let groupsSettings;

    // reactive props
    let isActive = !hasAcceptedCookies(cookieId);
    let selectedCookies = [];

    function acceptCookies() {
        createCookie(cookieId, selectedCookies, { age: cookieAge });
        isActive = !hasAcceptedCookies(cookieId);
    }
</script>



