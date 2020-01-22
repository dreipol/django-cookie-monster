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

            <div class="cookie-monster--btn-group">
                {#if groupsSettings}
                    <div class="cookie-monster--btn-wrapper">
                        <button on:click={toggleTable} class="cookie-monster--btn cookie-monster--btn__toggle">
                            {$_('buttons.table_toggle.label', { default: 'Toggle Groups' })}
                        </button>
                    </div>
                {/if}
                <div class="cookie-monster--btn-wrapper">
                    <button on:click={acceptCookies} class="cookie-monster--btn cookie-monster--btn__confirm">
                        {$_('buttons.accept.label', { default: 'Accept Cookies' })}
                    </button>
                </div>
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
    export let onAccepted;

    // reactive props
    let isActive = !hasAcceptedCookies(cookieId);
    // the required cookies the ones that will be by default checked
    let selectedCookies = groupsSettings && groupsSettings.groups ? groupsSettings.groups.reduce((acc, group) => {
        if (group.required) {
            return [...acc, ...group.cookies.map(cookie => cookie.id)];
        }
        return acc;
    }, []) : [];
    let isTableVisible = false;


    // public methods
    export function toggleTable() {
        isTableVisible = !isTableVisible;
    }

    export function acceptCookies() {
        createCookie(cookieId, selectedCookies, { age: cookieAge });
        isActive = !hasAcceptedCookies(cookieId);

        if (onAccepted) {
            onAccepted(selectedCookies);
        }
    }
</script>



