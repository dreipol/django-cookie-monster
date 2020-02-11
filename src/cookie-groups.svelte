<div class="cookie-monster--groups">
    <dl class="cookie-monster--groups-list">
        {#each groups as group}
            <dt class="cookie-monster--group-title" on:click={() => toggleGroup(group)}
                    tabindex="0"
                    aria-expanded={ openedGroups.includes(group) ? 'true' : 'false'}>

                <div class="cookie-monster--group-title-text">
                    {$_('accordion_title', getDefaultTitleText(group))}
                </div>

                {#if !group.required}
                    <button class="cookie-monster--btn cookie-monster--btn__accept-all-group-cookies"
                            on:click|stopPropagation={() => acceptAllCookiesGroup(group)}>
                        {$_('buttons.accept_all_group_cookies.label', getDefaultAcceptAllGroupCookiesTitle(group))}
                    </button>
                {/if}
            </dt>
            {#if openedGroups.includes(group)}
                <dd class="cookie-monster--group-description">
                    <table class="cookie-monster--table">
                        <thead class="cookie-monster--table-head">
                        <tr class="cookie-monster--table-row">
                            {#each rows as row}
                                <th scope="col" class="cookie-monster--table-cell">{row}</th>
                            {/each}
                        </tr>
                        </thead>
                        <tbody class="cookie-monster--group-body">
                        {#each group.cookies as cookie}
                            <tr class="cookie-monster--table-row cookie-monster--table-row__{ group.required ? 'disabled' : 'enabled' }">
                                {#each cookie.rows as cookieRow}
                                    <td class="cookie-monster--table-cell">
                                        <label class="cookie-monster--table-label" for={cookie.id}>
                                            {cookieRow}
                                        </label>
                                    </td>
                                {/each}
                                <td class="cookie-monster--table-cell">
                                    <label class="cookie-monster--table-label">
                                        <input class="cookie-monster--table-checkbox"
                                                type="checkbox"
                                                name={cookie.id}
                                                checked={selectedCheckboxes.includes(cookie.id)}
                                                disabled={group.required}
                                                on:change={ () => onCheckboxClicked(cookie.id) }
                                                id={cookie.id}
                                        />
                                    </label>
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
    import { arrayUniq } from './util';

    // external properties
    export let rows;
    export let groups;
    // this property is bound to the outside component
    export let selectedCheckboxes;

    // internal state
    let openedGroups = [];

    const getGroupCookiesIds = group => group.cookies.map(({ id }) => id);

    function getDefaultTitleText(group) {
        return {
            values: {
                groupTitle: group.title,
                amount: group.cookies.length,
            },
        };
    }

    function getDefaultAcceptAllGroupCookiesTitle(group) {
        return {
            values: {
                groupTitle: group.title,
            },
        };
    };

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
</script>
