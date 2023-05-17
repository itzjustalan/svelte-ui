<script lang="ts">
	import { log } from '$lib/logger';

	import type { MenuItemTypeModel } from '$lib/models/db/menu.model';
	import { menuItemTypeInputSchema, type MenuItemTypeInput } from '$lib/models/input/menu';
	import { menuNetwork } from '$lib/networks/menu.network';
	import { createMutation, createQuery } from '@tanstack/svelte-query';
	import {
		createSvelteTable,
		getCoreRowModel,
		type ColumnDef,
		type TableOptions,
		flexRender,
	} from '@tanstack/svelte-table';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	let tdata: MenuItemTypeModel[] = [];
	let ndata: MenuItemTypeInput = {
		title: '',
		description: '',
	};
	const menuItemTypes = createQuery<MenuItemTypeModel[], Error>({
		queryKey: ['menuitemtypes'],
		queryFn: menuNetwork.getMenuItemTypes,
		onSuccess(data) {
			tdata = data;
		},
	});
	// menuitemtype data vende
	const defaultColumns: ColumnDef<MenuItemTypeModel>[] = [
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
	];
	const createMenuItemType = createMutation({
		mutationKey: ['create', 'menuitem'],
		mutationFn: menuNetwork.createMenuItemType,
	});
	const options = writable<TableOptions<MenuItemTypeModel>>({
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
		$menuItemTypes.refetch();
		log.warn('refetchin done !!');
	});

	const addProduct = async (e: SubmitEvent) => {
		// $auth?.user.id ??
		// dataFromFormData(new FormData(e.target as HTMLFormElement))
		const result = menuItemTypeInputSchema.safeParse(ndata);
		if (!result.success) return alert(result.error);
		await $createMenuItemType.mutateAsync({ ...result.data });
		await $menuItemTypes.refetch();
		rerender();
	};
</script>

<button on:click={() => $menuItemTypes.refetch()}>refetch</button>

<div class="p-2">
	<table class="table">
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
	<div>
		<label class="label" for="name"> Name </label>
		<input class="input px-4" type="text" bind:value={ndata.title} placeholder="Enter Menu Item" />
	</div>
	<div class="mt-4">
		<label class="label" for="description"> Description </label>
		<textarea
			class="textarea"
			rows="4"
			bind:value={ndata.description}
			placeholder="Enter Menu Item Type description"
		/>
	</div>

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
