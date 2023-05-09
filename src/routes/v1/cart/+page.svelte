<script lang="ts">
	import { log } from '$lib/logger';
	import { element } from 'svelte/internal';
	import { number } from 'zod';
	// 	import { browser } from "$app/environment";
	// import { Drawer, drawerStore, type DrawerSettings } from "@skeletonlabs/skeleton";

	// const drawerSettings: DrawerSettings = {
	// 	id: 'example-3',
	// 	// Provide your property overrides:
	// 	bgDrawer: 'bg-purple-900 text-white',
	// 	bgBackdrop: 'bg-gradient-to-tr from-indigo-500/50 via-purple-500/50 to-pink-500/50',
	// 	width: 'w-[280px] md:w-[480px]',
	// 	padding: 'p-4',
	// 	rounded: 'rounded-xl',
	//};

	$: cartItems = [
		{
			name: 'Product 1',
			price: 0.0,
			description: 'Its a blah blah product',
			pricePerQuantity: 10.0,
			image: 'https://via.placeholder.com/48x48',
			quantity: 1,
			taxpercentage: 10,
			tax: 0,
		},
		{
			name: 'Product 2',
			price: 0.0,
			description: 'Its another blah blah product',
			pricePerQuantity: 15.0,
			image: 'https://via.placeholder.com/48x48',
			quantity: 1,
			taxpercentage: 15,
			tax: 0,
		},
	];
	$: totalPrice = cartItems.reduce((sum, element) => {
		element.price = element.pricePerQuantity * element.quantity;
		element.tax = (element.price * element.taxpercentage) / 100;
		tax += element.tax;
		return sum + element.price + element.tax;
	}, 0);
	$: tax = cartItems.reduce((taxtsum, element) => element.tax + taxtsum, 0);
	export let addQuantity = (item: any) => {
		const index = cartItems.findIndex((arrayitem) => arrayitem === item);
		if (cartItems[index].quantity < 10) cartItems[index].quantity++;
	};
	export let removeQuantity = (item: any) => {
		const index = cartItems.findIndex((arrayitem) => arrayitem === item);
		if (cartItems[index].quantity > 0) {
			if (item.quantity == 1) return removeItem(item);
			cartItems[index].quantity--;
		}
	};
	export let removeItem = (item: any) => {
		cartItems = cartItems.filter((arrayitem) => arrayitem != item);
	};

	function checkout() {
		log.info(JSON.stringify(cartItems));

		// your checkout logic goes here
	}
</script>

<!-- {#if browser} -->

<!-- <button on:click={()=> drawerStore.open(drawerSettings)}>CART</button> -->

<!-- <Drawer> -->
<!-- {#if $drawerStore.id === 'example-1'} -->
<!-- (show 'example-1' contents) -->
<!-- {:else if $drawerStore.id === 'example-2'} -->
<!-- (show 'example-2' contents) -->
<!-- {:else} -->
<!-- (fallback contents) -->
<!-- {/if} -->
<!-- </Drawer> -->
<!-- {/if} -->

<div class="rounded-lg bg-white px-4 py-5 shadow-md sm:p-6">
	<h2 class="mb-4 text-2xl font-semibold">Your Cart</h2>
	<div class="divide-y divide-gray-200">
		{#each cartItems as item}
			<div class="flex items-center justify-between py-4">
				<div class="flex items-center">
					<img class="h-16 w-16 rounded object-cover" src={item.image} alt={item.name} />
					<div class="ml-4">
						<p class="font-medium text-gray-900">{item.name}</p>
						<p class="text-gray-500">{item.description}</p>
						
					</div>
				</div>
				<div class="item-end flex-col py-4">
					<div class="flex items-end">
						<button
							class="text-gray-500 hover:text-gray-700 focus:text-gray-700 focus:outline-none"
							on:click={() => removeQuantity(item)}>Remove</button
						>
						<span class="ml-2 font-medium text-gray-900">{item.quantity}</span>
						<button
							class="ml-2 text-gray-500 hover:text-gray-700 focus:text-gray-700 focus:outline-none"
							on:click={() => addQuantity(item)}>Add</button
						>
						<button
							class="ml-2 text-gray-500 hover:text-gray-700 focus:text-gray-700 focus:outline-none"
							on:click={() => removeItem(item)}
							><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"
								><path
									d="M261 936q-24.75 0-42.375-17.625T201 876V306h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438V306ZM367 790h60V391h-60v399Zm166 0h60V391h-60v399ZM261 306v570-570Z"
								/></svg
							></button
						>
					</div>
					<div class="flex items-center justify-between">
						<p class="text-gray-500">Price:</p>
						<p class="font-medium">£{item.price.toFixed(2)}</p>
					</div>
					<div class="flex items-center justify-between">
						<p class="text-gray-500">Tax:</p>
						<p class="font-medium">£{item.tax.toFixed(2)}</p>
					</div>
					<div class="flex items-center justify-between">
						<p class="text-gray-500">Total:</p>
						<p class="font-medium">£{(item.tax+item.price).toFixed(2)}</p>
					</div>
				</div>
			</div>
		{/each}
	</div>
	{#if cartItems.length === 0}
		<p class="mt-4 text-gray-500">Your cart is empty.</p>
	{:else}
		<div class="mt-4 flex items-center justify-between">
			<p class="text-gray-500">Tax:</p>
			<p class="font-medium">£{tax.toFixed(2)}</p>
		</div>
		<div class="mt-4 flex items-center justify-between">
			<p class="text-gray-500">Total:</p>
			<p class="font-medium">£{totalPrice.toFixed(2)}</p>
		</div>

		<div class="mt-6">
			<button
				class="w-full rounded-lg bg-blue-500 py-3 font-medium text-white hover:bg-blue-600"
				on:click={checkout}>Checkout</button
			>
		</div>
	{/if}
</div>
