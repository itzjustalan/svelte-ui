<script lang="ts">
	import { uacController } from '$lib/controllers/uac.controller';
	import { auth } from '$lib/stores/auth';

	export let href: string = '/';
</script>

{#if uacController.authorize($auth?.user ?? undefined, href, 'get') === undefined}
	<a {href}><slot /></a>
{/if}
