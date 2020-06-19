<script>
    import {onMount} from "svelte";
    import {navigate} from "svelte-routing";

    import SearchModel from "../models/SearchModel";
    import Searchbox from "../components/Searchbox.svelte";

    onMount(() => {
        searchModel = SearchModel.fromState(window.history.state);
        console.log(JSON.stringify(searchModel));
        error = !searchModel || !searchModel.query;
        if (!error) {
            doSearch();
        }
    });

    let error = false;
    let loading = false;
    let searchModel = {};
    let total = searchModel.limit || 10;
    let items = [];

    const doSearchAsync = async () => {
        await fetch(searchModel.toString())
                .then(r => r.json())
                .then(data => {
                    if (data.errors) {
                        throw data.errors[0].message;
                    }
                    items = data.items || [];
                    total = data.total_count || items.length;
                    if (total === 0) {
                        throw 'no items found';
                    }
                    window.scrollTo(0, 0);
                });
    };

    const doSearch = () => {
        loading = true;
        error = false;
        doSearchAsync()
                .then(() => {
                    loading = false;
                    console.log('---->');
                })
                .catch(e => {
                    loading = false;
                    navigate('error', {
                        state: {
                            code: '500',
                            message: `[network] ${e}`
                        }
                    });
                });
    };

    const reload = () => {
        items = [];
        doSearch();
    };
</script>
{#if items.length > 0}
    <div>
        <!--        <button type="button" on:click={ ()=> navigate("/", {state: {}, replace: true} ) }>Home</button>-->
        <button type="button" on:click={ reload }>Reload</button>
    </div>
    <h1>Here are your search result</h1>

    <Searchbox bind:criteria={searchModel} readonly={true}/>
    <hr/>
    <section class="cards">
        {#each items as item}
            <article class="card">
                <div class="card-content">
                    <h3><span>repository:</span> {item.full_name}</h3>
                    <h5><span>owner:</span> {(item.owner ||{login:''}).login}</h5>
                    <h5><span>language:</span> {item.language}</h5>
                    <h5><span>license:</span> {(item.license ||{name:''}).name}</h5>
                    <a href="{item.html_url}" target="_blank">{item.html_url}</a>
                    <p>
                        {item.description}
                    </p>
                    <div>
                        <label>stars <strong>{item.stargazers_count}</strong></label>
                        <label>watchers <strong>{item.watchers}</strong></label>
                        <label>issues <strong>{item.open_issues}</strong></label>
                        <label>forks <strong>{item.forks}</strong></label>
                    </div>
                </div>
            </article>
        {/each}
    </section>
{:else}
    <div class="loading">
        {#if error}
            <h1>ERROR</h1>
            <p>Unable to detect search criteria</p>
            <button type="button" on:click={ ()=> navigate("/", {state: {}, replace: true} ) }>Home</button>
        {:else}
            <h1>Loading...</h1>
        {/if}
    </div>
{/if}

<style>
    .cards {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .card {
        flex: 0 1 32%;
        background: white;
        margin-bottom: 2em;
        text-align: left;
    }

    .card a {
        color: black;
        font-size: 75%;
        text-decoration: none;
    }

    .card a:hover {
        box-shadow: 3px 3px 8px hsl(0, 0%, 80%);
    }

    .card-content {
        padding: 1.4em;
        min-width: 25em;
    }

    .card-content h3 {
        margin-top: 0;
        margin-bottom: .5em;
        font-weight: bold;
        color: #4d53b3;
    }

    .card-content h3 span {
        font-weight: normal;
        color: black;
        font-size: 75%;
    }

    .card-content h5 {
        margin-top: 0;
        margin-bottom: 0.3em;
    }

    .card-content h5 span {
        font-weight: normal;
        color: black;
    }

    .card-content p {
        color: black;
        font-size: 85%;
    }

    .card-content label {
        background-color: coral;
        padding: 0 .5em;
        font-size: 75%;
    }

    .loading {
        opacity: 0;
        animation: 0.4s 0.8s forwards fade-in;
    }

    @keyframes fade-in {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
</style>