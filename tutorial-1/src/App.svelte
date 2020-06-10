<script>
    export let name;

    let a = 1;
    let b = 2;
</script>

<main>
    <h1>Hello {name}!</h1>
    <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
    <hr/>
    <h1>Simple Calculator</h1>
    <label>
        <span>First number: </span>
        <input type="number" bind:value={a}>
    </label>
    <label>
        <span>Second number: </span>
        <input type="number" bind:value={b}>
    </label>
    <p class="result">{a} + {b} = {a + b}</p>
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }

    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }

    span {
        display: inline-block;
        text-align: right;
        min-width: 10em;
    }

    p.result {
        color: purple;
        font-size: 2em;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>