<script lang="ts">
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
	import { createQuery, useQueryClient } from '@tanstack/svelte-query';
	import { getPosts, type Post } from '$lib/networks/test.network';

	const client = useQueryClient();
	let limit = 10;
	// This data is cached by prefetchQuery in +page.ts
	// so no fetch actually happens here
	$: posts = createQuery<Post[], Error>({
		queryKey: ['posts', limit],
		queryFn: () => getPosts(limit),
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<a href="/v1/menu">menu</a>
	<input type="range" bind:value={limit} min="0" max="100" />
	{#if $posts.status === 'loading'}
		<span>Loading...</span>
	{:else if $posts.status === 'error'}
		<span>Error: {$posts.error.message}</span>
	{:else}
		<ul>
			{#each $posts.data as post, index}
				<article>
					{++index}.
					<a
						href={`/v1/posts/${post.id}`}
						style={// We can use the queryCache here to show bold links for
						// ones that are cached
						client.getQueryData(['post', post.id])
							? 'font-weight: bold; color: indigo'
							: 'cursor: pointer'}
					>
						{post.title}
					</a>
				</article>
			{/each}
		</ul>
		{#if $posts.isFetching}
			<div style="color:darkgreen; font-weight:700">Background Updating...</div>
		{/if}
	{/if}

	<h1>
		<span class="welcome">
			<picture>
				<source srcset={welcome} type="image/webp" />
				<img src={welcome_fallback} alt="Welcome" />
			</picture>
		</span>

		to your new<br />SvelteKit app
	</h1>

	<h2>
		try editing <strong>src/routes/+page.svelte</strong>
	</h2>

	<Counter />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
