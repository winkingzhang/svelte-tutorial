<script>
    import NumberPad from './NumberPad.svelte';

    export let name;

    let supportedOperators = [
        {name: "add", display: "+", value: 0, action: (v1, v2) => v1 + v2},
        {name: "subtract", display: "-", value: 1, action: (v1, v2) => v1 - v2},
        {name: "multiple", display: "*", value: 2, action: (v1, v2) => v1 * v2},
        {name: "divide", display: "/", value: 3, action: (v1, v2) => v1 / v2}
    ]

    let first = Math.ceil(Math.random() * 100);
    let second = Math.ceil(Math.random() * 100);
    let operator = 0;

    $: result = (op => op.action(first, second))(
        supportedOperators.filter(({value}) => value === operator).shift() || supportedOperators[0]);
</script>

<main>
    <h1>Hello {name}!</h1>
    <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
    <hr/>
    <h1>Flex Calculator</h1>
    <div class="container">
        <div class="row">
            <div class="col">
                <label for="first">
                    <span>First number: </span>
                </label>
                <NumberPad bind:value={first}/>
            </div>
            <div class="col">
                <label for="operator">
                    <span>Operator: </span>
                </label>
                <div>
                    {#each supportedOperators as { name, display, value}, i}
                        <label>
                            <input type=radio bind:group={operator} value={value}>
                            {name} ({display})
                        </label>
                    {/each}
                </div>
            </div>
            <div class="col">
                <label for="second">
                    <span>Second number: </span>
                </label>
                <NumberPad bind:value={second}/>
            </div>
        </div>
        <div class="row">
            <p class="result">{first} {supportedOperators[operator].display} {second} = {result}</p>
        </div>
    </div>
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

    .container {
        display: flex;
        flex-wrap: wrap;
    }

    .row {
        display: flex;
        flex: 1 1;
        flex-basis: 100%;
        margin: 10px 0;
        justify-content: center;
    }

    .col {
        margin: 0 2em;
        text-align: left;
        min-width: 10em;
    }

    .col label {
        margin-bottom: 0.5em;
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