<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { log } from '$lib/logger';

	//todo: maybe dont override (as in mv to a new page for client errors?
	log.warn('navigating to: /v1/error', $page.error?.message);
	goto(`/v1/error?msg=${$page.error?.message}&cde=404`);
</script>

+error.svelte

<h1>{$page.error?.message}</h1>

<pre>{JSON.stringify($page)}</pre>
