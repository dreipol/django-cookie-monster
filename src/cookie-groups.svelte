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
            <th class="cookie-monster--table-cell" scope="col" colspan={rows.length}>
                {group.title}
            </th>
            <td class="cookie-monster--table-cell">
                <button class="cookie-monster--table-button" on:click={() => toggleGroup(group)}>
                    { openedGroups.includes(group) ?
                    $_('buttons.hide_group.label', { default: 'Hide Group' }) :
                    $_('buttons.show_group.label', { default: 'Show Group' })
                    }
                </button>
            </td>
        </tr>
        {#each group.cookies as cookie}
            {#if openedGroups.includes(group)}
                <tr class="cookie-monster--table-row">
                    {#each cookie.rows as cookieRow}
                        <td class="cookie-monster--table-cell">
                            {cookieRow}
                        </td>
                    {/each}
                    <td class="cookie-monster--table-cell">
                        {#if group.required}
                            <input class="cookie-monster--table-checkbox" type="checkbox"
                                    checked
                                    disabled
                                    name={cookie.id}/>
                        {:else}
                            <input class="cookie-monster--table-checkbox" type="checkbox" name={cookie.id}/>
                        {/if}
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

    export let rows;
    export let groups;

    let openedGroups = [];

    function toggleGroup(group) {
        if (openedGroups.includes(group)) {
            openedGroups = openedGroups.filter(g => g !== group);
        } else {
            openedGroups = [...openedGroups, group];
        }
    }
</script>
