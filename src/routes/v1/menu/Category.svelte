<script lang="ts">
	import type { CategoryData } from '$lib/models/data/menu.data';
	import { ToTitleCase } from '$lib/utils';

	export let category: CategoryData;
	let count = 0;
</script>

{#each category.menuItems as menuItem}
	<div class="card card-hover p-4">
		<div class="card bg-lime-500 p-3">(image)</div>
		<div class="mt-3 p-1 text-xl">
			{ToTitleCase(menuItem.title)}
		</div>
		<hr class="!border-t-2" />
		<div class="py-3 text-sm">
			{menuItem.description}
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
				if (count > 0) {
					count--;
				}
			}}>-</button
		>
		{count}
		<button type="button" class="btn-icon variant-filled-success" on:click={() => count++}>+</button
		>
	</div>
{/each}
