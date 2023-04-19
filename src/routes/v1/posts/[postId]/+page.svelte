<script lang="ts">
	import { getPostById, type Post } from '$lib/networks/test.network';
	import { createQuery } from '@tanstack/svelte-query';
	import type { PageData } from './$types';

	export let data: PageData;

	const post = createQuery<Post, Error>({
		queryKey: ['post', data.postId],
		queryFn: () => getPostById(data.postId)
	});
</script>

<div>
	<a class="button" href="/v1"> Back </a>
</div>
{#if !data.postId || $post.isLoading}
	<span>Loading...</span>
{/if}
{#if $post.error}
	<span>Error: {$post.error.message}</span>
{/if}
{#if $post.isSuccess}
	<h1>{$post.data.title}</h1>
	<div>
		<p>{$post.data.body}</p>
	</div>
	<div>{$post.isFetching ? 'Background Updating...' : ' '}</div>
{/if}
