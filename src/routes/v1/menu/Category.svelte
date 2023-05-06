<script lang="ts">
	import { goto } from '$app/navigation';
	import type { CategoryData } from '$lib/models/data/menu.data';
	import { auth } from '$lib/stores/auth';
	import { ToTitleCase } from '$lib/utils';
	import { Modal, modalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';

	export let category: CategoryData;
	let count = 0;
	let expanded = false;

	const confirm: ModalSettings = {
		type: 'confirm',
		// Data
		title: 'Oops you are not logged in',
		body: 'Please sign in to add to cart',
		buttonTextConfirm: 'Login',
		// TRUE if confirm pressed, FALSE if cancel pressed
		response: (r: boolean) => r && goto('/v1/auth/signin'),
	};
	const updateCart = (action: 'add' | 'remove') => {
		if ($auth == undefined) return modalStore.trigger(confirm);
		switch (action) {
			case 'add':
				break;
			case 'remove':
				break;
			default:
				break;
		}
	};
</script>

<Modal />
<div class="grid w-full grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
	{#each category.menuItems as menuItem}
		<div class="card card-hover p-4">
			<div class="card bg-lime-500 p-3">(image)</div>
			<div class="mt-3 p-1 text-xl">
				{ToTitleCase(menuItem.title)}
			</div>
			<hr class="!border-t-2" />
			<div class="... overflow-hidden text-clip py-3 text-sm">
				{#if expanded}
					{menuItem.description}
					<a href="#" on:click|preventDefault={() => (expanded = false)}>show less</a>
				{:else}
					{menuItem.description.slice(0, 100)} ...
					<a href="#" on:click|preventDefault={() => (expanded = true)}> show more</a>
				{/if}
			</div>
			<hr class="!border-t-1" />
			{#each menuItem.menuItemTypes as menuItemType}
				icon: ({menuItemType.title})
			{/each}
			<br />
			<button
				type="button"
				class="btn-icon variant-filled-warning"
				on:click={() => {
					updateCart('remove');
				}}>-</button
			>
			{count}
			<button
				type="button"
				class="btn-icon variant-filled-success"
				on:click={() => updateCart('add')}>+</button
			>
		</div>
	{/each}
</div>

<!-- <script>
	let name = 'world';
	let text = "There we are. Didn't you know you had that much power? You can move mountains. You can do anything. There we are. Didn't you know you had that much power? You can move mountains. You can do anything. There we are. Didn't you know you had that much power? You can move mountains. You can do anything. There we are. Didn't you know you had that much power? You can move mountains. You can do anything. There we are. Didn't you know you had that much power? You can move mountains. You can do anything. There we are. Didn't you know you had that much power? You can move mountains. You can do anything"
	let expanded = text.length <100;
</script>

<div>
	{#if expanded}
		{text}
		<a href="#" on:click|preventDefault={() => expanded = false}>show less</a>
	{:else}
		{text.slice(0, 100)}
		<a href="#" on:click|preventDefault={() => expanded = true}>show more</a>
	{/if}
</div> -->
