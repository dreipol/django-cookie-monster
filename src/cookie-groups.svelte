<div class="cookie-monster--groups">
    <dl class="cookie-monster--groups-list">
        {#each groups as group}
            <dt class="cookie-monster--group-title" on:click={() => toggleGroup(group)}
                    tabindex="0"
                    aria-expanded={ openedGroups.includes(group) ? 'true' : 'false'}>
                <div class="cookie-monster--group-title-text">
                    {$_('groups.title', {
                    default: `${group.title} (${group.cookies.length})`,
                        values: {
                            groupTitle: group.title,
                            amount: group.cookies.length
                        }
                    })}
                </div>
                <button class="cookie-monster--btn cookie-monster--btn__accept-all-group-cookies"
                        on:click|stopPropagation={() => acceptAllCookiesGroup(group)}>
                    {$_('buttons.accept_all_cookies.label', {
                        default: `Accept All ${group.title} Cookies`,
                        values: {
                            groupTitle: group.title
                        }
                    })}
                </button>
            </dt>
            {#if openedGroups.includes(group)}
                <dd class="cookie-monster--group-description">
                    <table class="cookie-monster--table">
                        <thead class="cookie-monster--table-head">
                        <tr class="cookie-monster--table-row">
                            {#each rows as row}
                                <th scope="col" class="cookie-monster--table-cell">{row}</th>
                            {/each}
                            <th>
                            </th>
                        </tr>
                        </thead>
                        <tbody class="cookie-monster--group-body">
                        {#each group.cookies as cookie}
                            <tr class="cookie-monster--table-row">
                                {#each cookie.rows as cookieRow}
                                    <td class="cookie-monster--table-cell">
                                        <label class="cookie-monster--table-label" for={cookie.id}>
                                            {cookieRow}
                                        </label>
                                    </td>
                                {/each}
                                <td class="cookie-monster--table-cell">
                                    <input class="cookie-monster--table-checkbox"
                                            type="checkbox"
                                            name={cookie.id}
                                            checked={group.required ? true : selectedCheckboxes.includes(cookie.id)}
                                            disabled={group.required}
                                            on:change={ () => onCheckboxClicked(cookie.id) }
                                            id={cookie.id}
                                    />
                                </td>
                            </tr>
                        {/each}
                        </tbody>
                    </table>
                </dd>
            {/if}
        {/each}
    </dl>
</div>

<style>
    .cookie-monster--table-cell {
        text-align: left;
        font-weight: normal;
    }
</style>

<script>
    import { _ } from 'svelte-i18n';
    import { onMount } from 'svelte';
    import { arrayUniq } from './util';

    // external properties
    export let rows;
    export let groups;
    // this property is bound to the outside component
    export let selectedCheckboxes = [];

    // internal state
    let openedGroups = [];

    const getGroupCookiesIds = group => group.cookies.map(({ id }) => id);

    function getRequiredCookies() {
        return groups.reduce((acc, group) => {
            return [...acc, ...getGroupCookiesIds(group)];
        }, []);
    }

    function onCheckboxClicked(cookieId) {
        if (selectedCheckboxes.includes(cookieId)) {
            selectedCheckboxes = selectedCheckboxes.filter(id => id !== cookieId);
        } else {
            selectedCheckboxes = [...selectedCheckboxes, cookieId];
        }
    }

    function acceptAllCookiesGroup(group) {
        selectedCheckboxes = arrayUniq([...selectedCheckboxes, ...getGroupCookiesIds(group)]);
    }

    function toggleGroup(group) {
        if (openedGroups.includes(group)) {
            openedGroups = openedGroups.filter(g => g !== group);
        } else {
            openedGroups = [...openedGroups, group];
        }
    }

    onMount(() => {
        selectedCheckboxes = arrayUniq([...selectedCheckboxes, ...getRequiredCookies()]);
    });
</script>
