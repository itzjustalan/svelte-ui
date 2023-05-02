<script lang="ts">
	import { page } from '$app/stores';
	import { uacController } from '$lib/user.access.controller';

	export let path: string = '/';
</script>

{#if uacController.authorize($page.data.user, path, 'get') === undefined}
	<a href={path}><slot /></a>
{/if}
