<script lang="ts">
	import { log } from '$lib/logger';
	import { menuNetwork } from '$lib/networks/menu.network';
	import { createMutation, createQuery, useQueryClient } from '@tanstack/svelte-query';
	import {
		menuItemInputSchema,
		type MenuItemInput,
		type MenuItemTypeInput,
		menuItemTypeInputSchema,
	} from '$lib/models/input/menu';
	import type { MenuData } from '$lib/models/data/menu.data';
	import type { MenuItemModel, MenuItemTypeModel } from '$lib/models/db/menu.model';
	import { prettyPrintV } from '$lib/utils';

	let selectedMenu: MenuData;
	let newItem: MenuItemInput = {
		title: '',
		description: '',
		price: 0,
		itemType: [],
	};
	let newItemType: MenuItemTypeInput = {
		title: '',
		description: '',
	};
	const client = useQueryClient();
	const menu = createMutation({
		mutationKey: ['menu'],
		mutationFn: menuNetwork.createMenu,
		onSuccess: () => {
			client.invalidateQueries({
				queryKey: ['menus'],
			});
		},
	});
	const category = createMutation({
		mutationKey: ['category'],
		mutationFn: menuNetwork.createCategory,
		onSuccess: () => {
			client.invalidateQueries({
				//todo: and selected menu?
				queryKey: ['menus'],
			});
		},
	});
	const menuItem = createMutation({
		mutationKey: ['create', 'menuitem'],
		mutationFn: menuNetwork.createMenuItem,
		onSuccess: () => {
			client.invalidateQueries({
				queryKey: ['menuitems'],
			});
		},
	});
	const menuItemType = createMutation({
		mutationKey: ['create', 'menuitemtype'],
		mutationFn: menuNetwork.createMenuItemType,
		onSuccess: () => {
			client.invalidateQueries({
				queryKey: ['menuitemtypes'],
			});
		},
	});
	const menuItemTypes = createQuery<MenuItemTypeModel[], Error>({
		queryKey: ['menuitemtypes'],
		queryFn: menuNetwork.getMenuItemTypes,
	});
	const menuItems = createQuery<MenuItemModel[], Error>({
		queryKey: ['menuitems'],
		queryFn: menuNetwork.getMenuItems,
	});
	const menus = createQuery<MenuData[], Error>({
		queryKey: ['menus'],
		queryFn: menuNetwork.getMenus,
	});
	const addMenuItem = () => {
		log.info(JSON.stringify(newItem));
		const result = menuItemInputSchema.safeParse(newItem);
		if (!result.success) {
			log.error(result.error);
			return alert('error validating input chk console');
		} else {
			$menuItem.mutate(newItem);
		}
	};
	const addMenuItemType = () => {
		const result = menuItemTypeInputSchema.safeParse(newItemType);
		if (!result.success) {
			log.error(result.error);
			return alert('errror while validation menu item type');
		} else {
			$menuItemType.mutate(newItemType);
		}
	};
	const createCategory = async (title: string) => await $category.mutateAsync({ title, items: [] });
	const createNewMenu = async () => {
		log.info('Okj');
		let cat = (await createCategory('default_category')).data;
		$menu.mutate({ title: 'default_menu', categories: [cat.id] });
	};
</script>

<svelte:head>
	<title>test_page</title>
</svelte:head>

<div class="card">
	<!-- <pre>selected Menu: {selectedMenu?.title}</pre> -->
	{#if $menus.isLoading}
		Loading menus...
	{:else if $menus.status === 'error'}
		<span>Error: {$menus.error.message}</span>
	{:else}
		<b>Menus</b>
		{#each $menus.data as item}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div on:click|preventDefault={() => (selectedMenu = item)}>{item.title}</div>
		{/each}
	{/if}
	<button type="button" disabled={$menu.isLoading} on:click={createNewMenu}>create new menu</button>
</div>

{#if selectedMenu}
	<div class="card">
		<b><u>Menu: {selectedMenu?.title}</u></b>
		{#each selectedMenu.categories as category}
			<!-- <u>{category}</u> -->
			<br /><u>{category.title}</u>
		{/each}
	</div>
{/if}

<div class="card">
	<pre>{JSON.stringify($menuItemType.status)}</pre>
	{#if $menuItemType.isLoading}
		loading...
	{:else if $menuItemType.isError}
		error...
		<pre>{JSON.stringify($menuItemType.error)}</pre>
	{/if}
	<form>
		Title <input type="text" bind:value={newItemType.title} />
		Description <input type="text" bind:value={newItemType.description} />
		<button type="button" on:click={addMenuItemType} disabled={$menuItemType.isLoading}>
			Add New Menu Item Type
		</button>
	</form>
</div>

<div class="card">
	{#if $menuItem.isLoading}
		loading...
	{:else if $menuItem.isError}
		error...
		<pre>{JSON.stringify($menuItem.error)}</pre>
	{/if}
	<form>
		Title <input type="text" bind:value={newItem.title} />
		<br />Description <input type="text" bind:value={newItem.description} />
		<br />price <input type="number" bind:value={newItem.price} />
		<br />itemType
		{#if $menuItemTypes.isLoading}
			Loading menu items...
		{:else if $menuItemTypes.status === 'error'}
			<span>Error: {$menuItemTypes.error.message}</span>
		{:else}
			<select bind:value={newItem.itemType}>
				{#each $menuItemTypes.data as elm}
					<option value={elm.id}>
						{prettyPrintV(elm.title)}
					</option>
				{/each}
			</select>
		{/if}

		<button type="button" on:click={addMenuItem} disabled={$menuItem.isLoading}>
			Add New Menu Item
		</button>
	</form>
</div>

<div class="card">
	{#if $menuItems.isLoading}
		Loading menu items...
	{:else if $menuItems.status === 'error'}
		<span>Error: {$menuItems.error.message}</span>
	{:else}
		<b>Menu items</b>
		{#each $menuItems.data as item}
			<div>{item.title}</div>
		{/each}
	{/if}
</div>

<style>
	.card {
		margin: 1rem;
		padding: 1rem;
		border: 2px solid black;
		border-radius: 1rem;
	}
</style>
