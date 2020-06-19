<script>
    import {onMount} from "svelte";
    import {Router, Route, navigate} from "svelte-routing";

    import NavLink from "./components/NavLink.svelte";
    import Home from "./pages/Home.svelte";
    import Search from "./pages/Search.svelte";
    import NotExisted from "./pages/Error.svelte";

    // Used for SSR. A falsy value is ignored by the Router.
    export let url = "";

    // Detect current router and redirect to corresponding page
    onMount(()=>navigate(window.location.pathname.substring(1), { replace: true }));
</script>

<Router url="{url}">
    <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="search">Search</NavLink>
    </nav>
    <div class="main">
        <Route path="search" component="{Search}"/>
        <Route path="/" component="{Home}"/>
        <Route component="{NotExisted}"/>
    </div>
</Router>
