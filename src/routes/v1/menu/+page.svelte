<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	// import type { PageData } from './$types';
	import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

	import type { MenuData } from '$lib/models/data/menu.data';
	import { menuNetwork } from '$lib/networks/menu.network';
	import LoadingSpinner from '$lib/ui/LoadingSpinner.svelte';
	// export let data: PageData;
	let seltectedMenu: MenuData;
	const allmenus = createQuery<MenuData[], Error>({
		queryKey: ['menus'],
		queryFn: menuNetwork.getMenus,
		onSuccess(data) {
			seltectedMenu ??= data[0];
		},
	});
</script>

<!-- 
<pre>
    {JSON.stringify($allmenus.data)}
    {$allmenus.status}
</pre> -->
<!-- <LoadingSpinner /> -->
{#if $allmenus.isLoading}
	<LoadingSpinner />
{:else if $allmenus.isError}
	<p>Error found</p>
{:else}
	<ListBox class="">
		{#each $allmenus.data as menu}
			<ListBoxItem bind:group={seltectedMenu} name="medium" value={menu}>{menu.title}</ListBoxItem>
		{/each}
	</ListBox>
{/if}


{#if seltectedMenu !== undefined}
	<Accordion>
	{#each seltectedMenu.categories as category}
	<AccordionItem>
		<svelte:fragment slot="summary">{category.title}</svelte:fragment>
		<svelte:fragment slot="content">(cat widget)</svelte:fragment>
	</AccordionItem>
	{/each}
	</Accordion>
{/if}

<!-- <Accordion>
	<AccordionItem open>
		<svelte:fragment slot="lead">(icon)</svelte:fragment>
		<svelte:fragment slot="summary">(summary)</svelte:fragment>
		<svelte:fragment slot="content">(content)</svelte:fragment>
	</AccordionItem>
	<AccordionItem>
		<svelte:fragment slot="lead">(icon)</svelte:fragment>
		<svelte:fragment slot="summary">(summary)</svelte:fragment>
		<svelte:fragment slot="content">(content)</svelte:fragment>
	</AccordionItem>
</Accordion> -->
