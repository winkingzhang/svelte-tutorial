<script>
    import {createEventDispatcher} from 'svelte';
    import SearchModel from "../models/SearchModel";
    import {Language, Scope} from "../models/SearchModel";

    export let criteria = new SearchModel();
    export let readonly = false;
    let disabled = false;

    const dispatch = createEventDispatcher();
</script>

<div class="form">
    <div>
        <label for="search">
            Type words to search<br/>
            {#if !readonly && !disabled}
                <input type="text" id="search" bind:value={criteria.query}>
            {:else}
                <input type="text" id="search" bind:value={criteria.query} readonly="readonly">
            {/if}
        </label>
    </div>
    <div>
        <label for="language">
            Select programming languages in search<br/>
            {#if !readonly && !disabled}
                <select id="language" bind:value={criteria.language}>
                    {#each Object.keys(Language) as lang}
                        <option value={Language[lang]}> {lang} </option>
                    {/each}
                </select>
            {:else}
                <input type="text" id="language" bind:value={criteria.language} readonly="readonly">
            {/if}
        </label>
    </div>
    <div>
        <label for="scope">
            Select your scope in search<br/>
            {#if !readonly && !disabled}
                <select id="scope" bind:value={criteria.scope}>
                    {#each Object.keys(Scope) as scope}
                        <option value={Scope[scope]}> {scope} </option>
                    {/each}
                </select>
            {:else}
                <input type="text" id="scope" bind:value={criteria.scope} readonly="readonly">
            {/if}
        </label>
    </div>
</div>
{#if !readonly}
    <div>
        <button type="submit"
                disabled={!criteria.query || disabled}
                on:click={ () => dispatch('search', criteria) }>
            Search
        </button>
    </div>
{/if}