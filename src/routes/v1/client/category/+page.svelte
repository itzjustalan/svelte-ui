<script lang="ts">
	import { log } from '$lib/logger';
	import type { CategoryData, MenuItemData } from '$lib/models/data/menu.data';
	import { menuNetwork } from '$lib/networks/menu.network';
	import { createMutation, createQuery } from '@tanstack/svelte-query';
	import { writable } from 'svelte/store';
	import {
		createSvelteTable,
		getCoreRowModel,
		type ColumnDef,
		type TableOptions,
		flexRender,
	} from '@tanstack/svelte-table';
	import { categoryInputSchema, type CategoryInput } from '$lib/models/input/menu';
	const menuItems = createQuery<MenuItemData[], Error>({
		queryKey: ['menuitems'],
		queryFn: menuNetwork.getMenuItems,
	});
    
	let tdata: CategoryData[] = [];
	let ndata: CategoryInput = {
		title: '',
		menuItems: [],
	};
	const defaultColumns: ColumnDef<CategoryData>[] = [
		{
			accessorKey: 'title',
		},
		{
			accessorKey: 'menuItems',
			cell(props) {
				let items = props.getValue();
				log.warn(items);
				if (Array.isArray(items)) {
					return items.map((element) => element.title).toString();
				} else return '';
			},
		},
	];
	const rerender = () => {
		options.update((options) => ({
			...options,
			data: tdata,
		}));
	};
	const options = writable<TableOptions<CategoryData>>({
		data: tdata,
		columns: defaultColumns,
		getCoreRowModel: getCoreRowModel(),
	});
	const table = createSvelteTable(options);

	const categories = createQuery<CategoryData[], Error>({
		queryKey: ['categories'],
		queryFn: menuNetwork.getCategories,
		onSuccess(data) {
			tdata = data;
		},
	});
    const createCategory = createMutation({
		mutationKey: ['create','category'],
		mutationFn: menuNetwork.createCategory,
		onSuccess() {
			$categories.refetch();
		},
	});
    const addCategory = async(e: SubmitEvent) => {
        const result = categoryInputSchema.safeParse(ndata);
        log.warn(result)
		if (!result.success) return alert(result.error);
		const res= await $createCategory.mutateAsync({ ...result.data });
        if (res.status==200) {
            (e.target as HTMLFormElement).reset();
        }
	};
</script>

<button on:click={() => $categories.refetch()}>refetch</button>

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

{#if $menuItems.isLoading}
	Loading menu items...
{:else if $menuItems.status === 'error'}
	<span>Error: {$menuItems.error.message}</span>
{:else}
	<form on:submit|preventDefault={addCategory}>
		<div>
			<label class="label my-2" for="name"> Name </label>
			<input
				class="input px-4"
				type="text"
				bind:value={ndata.title}
				placeholder="Enter product name"
			/>
		</div>
		<label class="label my-2" for="name"> menuItems </label>
		<select multiple bind:value={ndata.menuItems} class="select">
			{#each $menuItems.data as elm}
				<option value={elm.id}>
					{elm.title}
				</option>
			{/each}
		</select>
		<div class="mt-4">
			<button class="btn variant-filled-primary" type="submit"> Add Product </button>
		</div>
	</form>
{/if}
