<script>
    import Modal from "./Model.svelte";
    import Keypad from "./Keypad.svelte";

    import {createEventDispatcher} from 'svelte';

    export let value = 0;
    let showModal = false;

    const dispatch = createEventDispatcher();

    const select = num => () => value = parseInt(`${value}${num}`, 10);
    const clear = () => value = '';
    const submit = () => dispatch('submit');
    const setModal = (val) => showModal = !!val;
</script>

<input id="first" type="text" bind:value={value} on:click={()=>setModal(true)}>
{#if showModal}
    <Modal on:close="{() => setModal(false)}">
        <Keypad bind:value={value} on:submit={ ()=>setModal(false) }/>
    </Modal>
{/if}