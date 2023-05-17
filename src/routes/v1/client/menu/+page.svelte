<script lang="ts">
	import { log } from '$lib/logger';
	import type { CategoryData, MenuData } from '$lib/models/data/menu.data';
	import { menuInputSchema, type MenuInput } from '$lib/models/input/menu';
	import { menuNetwork } from '$lib/networks/menu.network';
	import { createMutation, createQuery } from '@tanstack/svelte-query';
	import {
		createSvelteTable,
		getCoreRowModel,
		type ColumnDef,
		type TableOptions,
		flexRender,
	} from '@tanstack/svelte-table';
	import { writable } from 'svelte/store';

	let tdata: MenuData[] = [];
	let ndata: MenuInput = {
		title: '',
		categories: [],
	};
	const menus = createQuery<MenuData[], Error>({
		queryKey: ['menus'],
		queryFn: menuNetwork.getMenus,
		onSuccess(data) {
			tdata = data;
		},
	});

	const categories = createQuery<CategoryData[], Error>({
		queryKey: ['categories'],
		queryFn: menuNetwork.getCategories,
	});

	const createMenu = createMutation({
		mutationKey: ['create', 'menu'],
		mutationFn: menuNetwork.createMenu,
		onSuccess() {
			$categories.refetch();
		},
	});

	const defaultColumns: ColumnDef<MenuData>[] = [
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

	const options = writable<TableOptions<MenuData>>({
		data: tdata,
		columns: defaultColumns,
		getCoreRowModel: getCoreRowModel(),
	});
	const table = createSvelteTable(options);

	const addMenu = async (e: SubmitEvent) => {
		const result = menuInputSchema.safeParse(ndata);
		log.warn(result);
		if (!result.success) return alert(result.error);
		const res = await $createMenu.mutateAsync({ ...result.data });
		if (res.status == 200) {
			(e.target as HTMLFormElement).reset();
		}
	};
</script>

<button on:click={() => $menus.refetch()}>refetch</button>

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

{#if $categories.isLoading}
	Loading menu items...
{:else if $categories.status === 'error'}
	<span>Error: {$categories.error.message}</span>
{:else}
	<form on:submit|preventDefault={addMenu}>
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
		<select multiple bind:value={ndata.categories} class="select">
			{#each $categories.data as elm}
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
