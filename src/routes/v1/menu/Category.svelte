<script lang="ts">
	import { goto } from '$app/navigation';
	import type { CategoryData } from '$lib/models/data/menu.data';
	import { cartNetwork } from '$lib/networks/cart.network';
	import { auth } from '$lib/stores/auth';
	import { Modal, modalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';
	import { createMutation } from '@tanstack/svelte-query';
	import MenuItem from './MenuItem.svelte';

	export let category: CategoryData;
</script>

<Modal />
<div class="grid w-full grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
	{#each category.menuItems as menuItem}
		<MenuItem {menuItem} />
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
