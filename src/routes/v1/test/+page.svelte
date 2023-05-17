<script lang="ts">
	const test = () => {
		fetch('/')
	}
</script>

<svelte:head>
	<title>test_page</title>
</svelte:head>

<div class="card">
	<button on:click={test}>test</button>
</div>

<style>
	.card {
		margin: 1rem;
		padding: 1rem;
		border: 2px solid black;
		border-radius: 1rem;
		background-color: inherit;
	}
</style>
