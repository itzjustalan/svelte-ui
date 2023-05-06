<script lang="ts">
	import { auth } from '$lib/stores/auth';
	import UacLink from '$lib/ui/UacLink.svelte';
</script>

<header>
	<div class="text-center text-2xl">Header</div>
</header>

<!-- <pre>{JSON.stringify($auth?.user)}</pre> -->
<div class="flex gap-3 center">
	<UacLink href="/v1/about">about</UacLink>
	<UacLink href="/v1/test">test</UacLink>
	<UacLink href="/v1/protected">protected</UacLink>
	<UacLink href="/v1/menu">menu</UacLink>
	<UacLink href="/v1">home</UacLink>
	<UacLink href="/v1/cart">cart</UacLink>
	<UacLink href="/v1/auth/signin">signin</UacLink>
	
</div>
