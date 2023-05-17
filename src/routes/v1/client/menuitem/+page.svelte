<script lang="ts">
	import { log } from '$lib/logger';
	import type { MenuItemData } from '$lib/models/data/menu.data';
	import type { MenuItemTypeModel } from '$lib/models/db/menu.model';
	import { menuItemInputSchema, type MenuItemInput } from '$lib/models/input/menu';
	import { menuNetwork } from '$lib/networks/menu.network';
	import { auth } from '$lib/stores/auth';
	import { dataFromFormData } from '$lib/utils';
	import { createMutation, createQuery } from '@tanstack/svelte-query';
	import { createSvelteTable, flexRender, getCoreRowModel } from '@tanstack/svelte-table';
	import type { ColumnDef, TableOptions } from '@tanstack/table-core/src/types';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	let tdata: MenuItemData[] = [];
	let ndata: MenuItemInput = {
		title: '',
		description: '',
		amount: 0,
		currency: 'GBP',
		menuItemTypes: [],
	};

	const menuItemTypes = createQuery<MenuItemTypeModel[], Error>({
		queryKey: ['menuitemtypes'],
		queryFn: menuNetwork.getMenuItemTypes,
	});
	const menuItems = createQuery<MenuItemData[], Error>({
		queryKey: ['menuitems'],
		queryFn: menuNetwork.getMenuItems,
		onSuccess(data) {
			tdata = data;
		},
	});
	const createMenuItem = createMutation({
		mutationKey: ['create', 'menuitem'],
		mutationFn: menuNetwork.createMenuItem,
	});

	const defaultColumns: ColumnDef<MenuItemData>[] = [
		{
			accessorKey: 'title',
		},
		{
			accessorKey: 'description',
			cell(props) {
				let desc = props.getValue();
				if (typeof desc === 'string') return desc.substring(0, 3);
				else return '';
			},
		},
		{
			accessorKey: 'amount',
		},
	];

	const options = writable<TableOptions<MenuItemData>>({
		data: tdata,
		columns: defaultColumns,
		getCoreRowModel: getCoreRowModel(),
	});

	const rerender = () => {
		options.update((options) => ({
			...options,
			data: tdata,
		}));
	};

	const table = createSvelteTable(options);

	onMount(() => {
		$menuItems.refetch();
		log.warn('refetchin done !!');
	});
	const addProduct = (e: SubmitEvent) => {
		// $auth?.user.id ??
		// dataFromFormData(new FormData(e.target as HTMLFormElement))
		const result = menuItemInputSchema.safeParse(ndata);
		if (!result.success) return alert(result.error);
		$createMenuItem.mutate({ ...result.data });
	};
</script>

<pre>{JSON.stringify($menuItems.status)}</pre>

<button on:click={() => $menuItems.refetch()}>refetch</button>

<div class="p-2">
	<table>
		<thead>
			{#each $table.getHeaderGroups() as headerGroup}
				<tr>
					{#each headerGroup.headers as header}
						<th>
							{#if !header.isPlaceholder}
								<svelte:component
									this={flexRender(header.column.columnDef.header, header.getContext())}
								/>
							{/if}
						</th>
					{/each}
				</tr>
			{/each}
		</thead>
		<tbody>
			{#each $table.getRowModel().rows as row}
				<tr>
					{#each row.getVisibleCells() as cell}
						<td>
							<svelte:component this={flexRender(cell.column.columnDef.cell, cell.getContext())} />
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
		<tfoot>
			{#each $table.getFooterGroups() as footerGroup}
				<tr>
					{#each footerGroup.headers as header}
						<th>
							{#if !header.isPlaceholder}
								<svelte:component
									this={flexRender(header.column.columnDef.footer, header.getContext())}
								/>
							{/if}
						</th>
					{/each}
				</tr>
			{/each}
		</tfoot>
	</table>
	<div class="h-4" />
	<button on:click={() => rerender()} class="border p-2"> Rerender </button>
</div>

<form on:submit|preventDefault={addProduct}>
	<!-- <input type="hidden" name="clientId" value={$auth?.user.id} />
	<input type="hidden" name="menuItemTypes" value={[]} />
	<input type="hidden" name="currency" value="GBP" /> -->
	<div>
		<label class="label" for="name"> Name </label>
		<input
			class="input px-4"
			type="text"
			bind:value={ndata.title}
			placeholder="Enter product name"
		/>
	</div>
	<div class="mt-4">
		<label class="label" for="description"> Description </label>
		<textarea
			class="textarea"
			rows="4"
			bind:value={ndata.description}
			placeholder="Enter product description"
		/>
	</div>
	<div class="mt-4">
		<label class="label" for="price"> Price </label>
		<input class="input px-4" type="number" step="0.01" min="0" bind:value={ndata.amount} />
	</div>
	{#if $menuItemTypes.isLoading}
		Loading menu items...
	{:else if $menuItemTypes.status === 'error'}
		<span>Error: {$menuItemTypes.error.message}</span>
	{:else}
		<select multiple bind:value={ndata.menuItemTypes} class="select">
			{#each $menuItemTypes.data as elm}
				<option value={elm.id}>
					{elm.title}
				</option>
			{/each}
		</select>
	{/if}

	<!-- <div class="mt-4">
	  <label class="label" for="image">
		Image
	  </label>
	  <input
		class="input px-4"
		id="image"
		type="file"
	  />
	</div> -->
	<div class="mt-8">
		<button class="btn variant-filled-primary" type="submit"> Add Product </button>
	</div>
</form>
