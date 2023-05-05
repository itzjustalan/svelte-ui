<script lang="ts">
	import { browser } from "$app/environment";
import { Drawer, drawerStore, type DrawerSettings } from "@skeletonlabs/skeleton";

    
const drawerSettings: DrawerSettings = {
	id: 'example-3',
	// Provide your property overrides:
	bgDrawer: 'bg-purple-900 text-white',
	bgBackdrop: 'bg-gradient-to-tr from-indigo-500/50 via-purple-500/50 to-pink-500/50',
	width: 'w-[280px] md:w-[480px]',
	padding: 'p-4',
	rounded: 'rounded-xl',
};



</script>
{#if browser}

<button on:click={()=> drawerStore.open(drawerSettings)}>CART</button>

<Drawer>
	{#if $drawerStore.id === 'example-1'}
		<!-- (show 'example-1' contents) -->
	{:else if $drawerStore.id === 'example-2'}
		<!-- (show 'example-2' contents) -->
	{:else}
		<!-- (fallback contents) -->
	{/if}
</Drawer>
{/if}