<script lang="ts">
	import { auth } from '$lib/stores/auth';
	import UacLink from '$lib/ui/UacLink.svelte';
</script>

<header>
	<div class="text-center text-2xl">Header</div>
</header>

<pre>{$auth?.user.role}</pre>
<div class="center flex gap-3">
	<UacLink href="/v1/about">about</UacLink>
	<UacLink href="/v1/test">test</UacLink>
	<UacLink href="/v1/protected">protected</UacLink>
	<UacLink href="/v1/menu">menu</UacLink>
	<UacLink href="/v1">home</UacLink>
	<UacLink href="/v1/cart">cart</UacLink>
	<UacLink href="/v1/client">client</UacLink>
	<UacLink href="/v1/test">test</UacLink>
	{#if $auth === undefined}
		<UacLink href="/v1/auth/signin">Sign in</UacLink>
	{:else}
		<button class="btn variant-filled" on:click={auth.signout}>Sign out</button>
	{/if}
</div>
