<script lang="ts">
	import { page } from '$app/stores';
	import { uacController } from '$lib/user.access.controller';

	export let href: string = '/';
</script>

{#if uacController.authorize($page.data.user, href, 'get') === undefined}
	<a href={href}><slot /></a>
{/if}
