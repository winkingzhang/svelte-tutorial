<script>
    import NavLink from "../components/NavLink.svelte";

    let error = window.history.state;
    error.code = error.code || '404';
    error.message = error.message || 'Unknown error occurred';
</script>
<style>
    .message {
        font-size: larger;
        color: orange;
    }
</style>
<h1>ERROR - {error.code}</h1>
{#if error.code === '404'}
    <p class="message">The page you navigated is not existed</p>
{:else}
    <p class="message">{error.message}</p>
{/if}
<p>
    To start use this app, go to
    <NavLink to="/">Home</NavLink>
    page
</p>