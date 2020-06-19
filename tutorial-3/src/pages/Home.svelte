<script>
    import {navigate} from "svelte-routing";
    import SearchModel, {Language, Scope, Sort, Order} from "../models/SearchModel";
    import Searchbox from "../components/Searchbox.svelte";

    let disabled = false;
    let criteria = new SearchModel(
            encodeURI("svelte"),
            Language.javascript,
            Scope.repositories,
            Sort.stars,
            Order.desc);

    const doSearch = () => {
        disabled = true;
        navigate('search', {
            state: criteria,
            replace: true
        });
    };
</script>
<p>Welcome to Github search app</p>
<Searchbox bind:criteria={criteria} on:search={ (evt)=> doSearch(evt.details) }/>