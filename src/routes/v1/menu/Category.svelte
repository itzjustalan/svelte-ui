<script lang="ts">
	import type { CategoryData } from '$lib/models/data/menu.data';

	export let category: CategoryData;
	('${data}');
</script>

{#each category.menuItems as menuItem}
	<div class=".card-hover card p-4">
		<div class=" pb-1 text-xl">
			{menuItem.title}
		</div>
		<hr class="!border-t-2" />
		<div class=" text-sm">
			{menuItem.description}
		</div>
	</div>
{/each}

<div
	class="w-full max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800"
>
	<div class="px-5 pb-5">
		<a href="#">
			<h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
				Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport
			</h5>
		</a>
		<div class="flex items-center justify-between">
			<span class="text-3xl font-bold text-gray-900 dark:text-white">$599</span>
			<a
				href="#"
				class="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				>Add to cart</a
			>
		</div>
	</div>
</div>
