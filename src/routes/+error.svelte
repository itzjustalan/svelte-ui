<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	goto(`/v1/error?msg=${$page.error?.message}&cde=404`);
</script>

+error.svelte

<h1>{$page.error?.message}</h1>

<pre>{JSON.stringify($page)}</pre>
