{#if isActive}
    <div class="cookie-monster" transition:fade="{{ delay: 150, duration: 300 }}">
        <h3 class="cookie-monster--title">{$_('title', { default: 'Cookie Title' })}</h3>

        <div class="cookie-monster--content">
            <p class="cookie-monster--text">
                {@html $_('text', { default: 'Cookie Text' })}
            </p>

            {#if groupsSettings && isTableVisible}
                <CookieGroups
                        groups={groupsSettings.groups}
                        rows={groupsSettings.rows}
                        bind:selectedCheckboxes={selectedCookies}/>
            {/if}

            <div class="cookie-monster--btn-wrapper">
                {#if groupsSettings}
                    <button on:click={toggleTable} class="cookie-monster--btn cookie-monster--btn__toggle">
                        {$_('buttons.table_toggle.label', { default: 'Toggle Groups' })}
                    </button>
                {/if}
                <button on:click={acceptCookies} class="cookie-monster--btn cookie-monster--btn__confirm">
                    {$_('buttons.accept.label', { default: 'Accept Cookies' })}
                </button>
            </div>
        </div>
    </div>
{/if}

<style>
    .cookie-monster {
        position: fixed;
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
    let isTableVisible = false;

    function toggleTable() {
        isTableVisible = !isTableVisible;
    }

    function acceptCookies() {
        createCookie(cookieId, selectedCookies, { age: cookieAge });
        isActive = !hasAcceptedCookies(cookieId);
    }
</script>



