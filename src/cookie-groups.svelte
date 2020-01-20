<table class="cookie-monster--table">
    <thead class="cookie-monster--table-head">
    <tr class="cookie-monster--table-row">
        {#each rows as row}
            <th scope="col" class="cookie-monster--table-cell">{row}</th>
        {/each}
        <th></th>
    </tr>
    </thead>
    <tbody class="cookie-monster--table-body">
    {#each groups as group}
        <tr class="cookie-monster--table-row">
            <th class="cookie-monster--table-cell" scope="col" colspan={rows.length - 1}>
                {group.title}
            </th>
            <td class="cookie-monster--table-cell">
                {#if !group.required }
                    <button class="cookie-monster--table-button" on:click={() => acceptAllCookiesGroup(group)}>
                        {$_('buttons.accept_all.label', { default: 'Accept All' })}
                    </button>
                {/if}
            </td>
            <td class="cookie-monster--table-cell">
                <button class="cookie-monster--table-button" on:click={() => toggleGroup(group)}>
                    { openedGroups.includes(group) ? $_('buttons.hide_group.label', { default: 'Hide Group' }) : $_('buttons.show_group.label', { default: 'Show Group' }) }
                </button>
            </td>
        </tr>
        {#each group.cookies as cookie}
            {#if openedGroups.includes(group)}
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
            {/if}
        {/each}
    {/each}
    </tbody>
</table>

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
            if (group.required) {
                return [...acc, ...getGroupCookiesIds(group)];
            }

            return acc;
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
