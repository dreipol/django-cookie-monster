<div class="cookie-monster-banner {isActive ? 'cookie-monster-banner__active' : ''}">
    <h3 class="cookie-monster-banner--title">{$_('title', { default: 'Cookie Title' })}</h3>

    <p class="cookie-monster-banner--content">
        {$_('text', { default: 'Cookie Text' })}

        {#if helpText}
            {#if policyURL}
                <a href="{policyURL}">{helpText}</a>
            {:else}
                {helpText}
            {/if}
        {/if}
    </p>

    <div class="cookie-monster-banner--content">
        <div class="cookie-monster-banner--btn-wrapper">
            <button on:click={acceptCookies} class="cookie-monster-banner--btn">
                {$_('buttons.accept.label', { default: 'Accept Cookies' })}
            </button>
        </div>
    </div>

    <p class="cookie-monster-banner--warning">{$_('messages.warning', { default: 'Warning message' })}</p>
</div>

<style>
    .cookie-monster-banner {
        display: none;
        width: auto;
        min-height: 20px;
        padding: 30px;
        background: #ffffff;;
        position: fixed;
        bottom: 0;
        border: 20px;
        box-shadow: 0 0 16px #333;
        opacity: 0;
    }

    .cookie-monster-banner.cookie-monster-banner__active {
        display: block;
        opacity: 1;
    }

    .cookie-monster-banner--title {
        font-size: 25px;
    }

    .cookie-monster-banner--content p, fieldset, a {
        font-size: 16px;
    }

    .cookie-monster-banner--content a {
        text-decoration: underline;
    }

    .cookie-monster-banner--btn-wrapper .cookie-monster-banner--btn {
        display: inline-block;
        color: #000000;
        font-size: 16px;
        margin-top: 10px;
        background: #4caf50;
        padding: 8px 15px;
        text-align: center;
        text-decoration: none;
        cursor: pointer;
    }

    .cookie-monster-banner--warning {
        color: #b94a48;
        background-color: #f2dede;
        border-color: #eed3d7;
    }
</style>

<script>
    import { _ } from 'svelte-i18n';
    import { hasAcceptedCookies, createCookie } from './util';

    // Props
    export let policyURL;
    export let cookieId;
    export let cookieAge;

    // reactive props
    let helpText = $_('help', { default: '' });
    let isActive = !hasAcceptedCookies(cookieId);
    let selectedCookies = [];

    function acceptCookies() {
        createCookie(cookieId, selectedCookies, { age: cookieAge });
        isActive = !hasAcceptedCookies(cookieId);
    }
</script>



