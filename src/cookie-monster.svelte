{#if isActive}
    <div class="cookie-monster" transition:fade="{{ delay: 150, duration: 300 }}">
        <div class="cookie-monster--container">
            <h1 class="cookie-monster--title">{t('title')}</h1>

            <div class="cookie-monster--content">
                <p class="cookie-monster--text">
                    {@html t('text')}
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
                                {t('buttons.table_toggle.label')}
                            </button>
                        </div>
                    {/if}
                    <div class="cookie-monster--btn-wrapper">
                        <button on:click={acceptCookies} class="cookie-monster--btn cookie-monster--btn__confirm">
                            {t('buttons.accept.label')}
                        </button>
                    </div>
                    {#if groupsSettings}
                        <div class="cookie-monster--btn-wrapper">
                            <button on:click={acceptAllCookies} class="cookie-monster--btn cookie-monster--btn__accept-all">
                                {t('buttons.accept_all_cookies.label')}
                            </button>
                        </div>
                    {/if}
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
    import {translate} from './util';
    import { fade } from 'svelte/transition';
    import CookieGroups from './cookie-groups.svelte';
    import { hasAcceptedCookies, createCookie } from './util';

    // Props
    export let cookieId;
    export let cookieAge;
    export let groupsSettings;
    export let onAccepted;

    // private variables
    const cookieGroups = groupsSettings && groupsSettings.groups ? groupsSettings.groups : [];

    // reactive props
    let isActive = !hasAcceptedCookies(cookieId);
    // the required cookies the ones that will be by default checked
    let selectedCookies = cookieGroups.reduce((acc, group) => {
        if (group.required) {
            return [...acc, ...group.cookies.map(cookie => cookie.id)];
        }
        return acc;
    }, []);
    let isTableVisible = false;

    // add the translate function
    const t = translate;

    // public methods
    export function toggleTable() {
        isTableVisible = !isTableVisible;
    }

    export function acceptAllCookies() {
        selectedCookies = cookieGroups.reduce((acc, group) => [...acc, ...group.cookies.map(cookie => cookie.id)], []);
        acceptCookies();
    }

    export function acceptCookies() {
        createCookie(cookieId, selectedCookies, { age: cookieAge });
        isActive = !hasAcceptedCookies(cookieId);

        if (onAccepted) {
            onAccepted(selectedCookies);
        }
    }
</script>



