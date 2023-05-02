<script lang="ts">
	// Your selected Skeleton theme:
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';

	// This contains the bulk of Skeletons required styles:
	import '@skeletonlabs/skeleton/styles/all.css';

	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import './app.postcss';

	import Header from './Header.svelte';
	//import './styles.css';

	import { QueryClientProvider } from '@tanstack/svelte-query';
	import type { LayoutData } from './$types';
	import TwDebug from '$lib/ui/TwDebug.svelte';
	import { LightSwitch } from '@skeletonlabs/skeleton';

	export let data: LayoutData;
	// import { page } from '$app/stores';
	// console.log('$page', $page.data.user ?? '----!!');
</script>

<pre>{JSON.stringify(data.user)}</pre>

<TwDebug />
<LightSwitch class="absolute right-0 top-0 " />
<QueryClientProvider client={data.queryClient}>
	<div class="app">
		<Header />
		<main><slot /></main>
		<footer>CPDBytes.com!!</footer>
	</div>
</QueryClientProvider>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
