<script lang="ts">
	import Link from '$lib/ui/Link.svelte';
</script>

<header>
	<div class="text-center text-2xl">Header</div>
</header>

<Link path="/v1">home</Link>
<Link path="/v1/about">about</Link>
<Link path="/v1/test">test</Link>
<Link path="/v1/protected">protected</Link>
<Link path="/v1/menu">menu</Link>
<Link path="/v1/auth/signin">signin</Link>
