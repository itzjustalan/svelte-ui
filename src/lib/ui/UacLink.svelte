<script lang="ts">
	import { page } from '$app/stores';
	import { auth } from '$lib/stores/auth';
	import { uacController } from '$lib/user.access.controller';

	export let href: string = '/';
</script>

{#if uacController.authorize($auth?.user??undefined, href, 'get') === undefined}
	<a {href}><slot /></a>
{/if}
