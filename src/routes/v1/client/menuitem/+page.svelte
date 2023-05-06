<script lang="ts">
	import { log } from '$lib/logger';
	import type { MenuItemData } from '$lib/models/data/menu.data';
	import { menuNetwork } from '$lib/networks/menu.network';
	import { createQuery } from '@tanstack/svelte-query';
	import { createSvelteTable, flexRender, getCoreRowModel } from '@tanstack/svelte-table';
	import type { ColumnDef, TableOptions } from '@tanstack/table-core/src/types';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	let tdata: MenuItemData[] = [];

	const menuItems = createQuery<MenuItemData[], Error>({
		queryKey: ['menuitems'],
		queryFn: menuNetwork.getMenuItems,
		onSuccess(data) {
			tdata = data;
		},
	});

	const defaultColumns: ColumnDef<MenuItemData>[] = [
		// {
		// 	accessorFn: (row) => row.id,
		// 	id: 'id',
		// 	cell: (info) => info.getValue(),
		// 	header: () => '#',
		// },
		{
			accessorKey: 'clientId',
		},
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
		{
			accessorKey: 'currency',
		},
		{
			accessorKey: 'createdAt',
		},
		{
			accessorKey: 'updatedAt',
		},
	];

	const options = writable<TableOptions<MenuItemData>>({
		data: tdata,
		columns: defaultColumns,
		getCoreRowModel: getCoreRowModel(),
	});

	// ?? [
	// 		{
	// 			id: '',
	// 			clientId: '',
	// 			title: '',
	// 			description: '',
	// 			amount: 0,
	// 			currency: 'GBP',
	// 			menuItemTypes: [],
	// 			createdAt: new Date(),
	// 			updatedAt: new Date(),
	// 		},
	// 	],

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

	// type Person = {
	// 	firstName: string;
	// 	lastName: string;
	// 	age: number;
	// 	visits: number;
	// 	status: string;
	// 	progress: number;
	// };

	// const defaultData: Person[] = [
	// 	{
	// 		firstName: 'tanner',
	// 		lastName: 'linsley',
	// 		age: 24,
	// 		visits: 100,
	// 		status: 'In Relationship',
	// 		progress: 50,
	// 	},
	// 	{
	// 		firstName: 'tandy',
	// 		lastName: 'miller',
	// 		age: 40,
	// 		visits: 40,
	// 		status: 'Single',
	// 		progress: 80,
	// 	},
	// 	{
	// 		firstName: 'joe',
	// 		lastName: 'dirte',
	// 		age: 45,
	// 		visits: 20,
	// 		status: 'Complicated',
	// 		progress: 10,
	// 	},
	// ];

	// const defaultColumns: ColumnDef<Person>[] = [
	// 	{
	// 		accessorKey: 'firstName',
	// 		cell: (info) => info.getValue(),
	// 		footer: (info) => info.column.id,
	// 	},
	// 	{
	// 		accessorFn: (row) => row.lastName,
	// 		id: 'lastName',
	// 		cell: (info) => info.getValue(),
	// 		header: () => 'Last Name',
	// 		footer: (info) => info.column.id,
	// 	},
	// 	{
	// 		accessorKey: 'age',
	// 		header: () => 'Age',
	// 		footer: (info) => info.column.id,
	// 	},
	// 	{
	// 		accessorKey: 'visits',
	// 		header: () => 'Visits',
	// 		footer: (info) => info.column.id,
	// 	},
	// 	{
	// 		accessorKey: 'status',
	// 		header: 'Status',
	// 		footer: (info) => info.column.id,
	// 	},
	// 	{
	// 		accessorKey: 'progress',
	// 		header: 'Profile Progress',
	// 		footer: (info) => info.column.id,
	// 	},
	// ];

	// const options = writable<TableOptions<Person>>({
	// 	data: defaultData,
	// 	columns: defaultColumns,
	// 	getCoreRowModel: getCoreRowModel(),
	// });

	// const rerender = () => {
	// 	options.update((options) => ({
	// 		...options,
	// 		data: defaultData,
	// 	}));
	// };

	// const table = createSvelteTable(options);
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
		<!-- <tfoot>
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
		</tfoot> -->
	</table>
	<div class="h-4" />
	<button on:click={() => rerender()} class="border p-2"> Rerender </button>
</div>
