<script lang="ts">
	import type { CartData } from '$lib/models/data/cart.data';
	import { cartNetwork } from '$lib/networks/cart.network';
	import { fmtAmount } from '$lib/utils/currency';
	import { createMutation, createQuery } from '@tanstack/svelte-query';

	const userCart = createQuery<CartData, Error>({
		queryKey: ['usercart'],
		queryFn: cartNetwork.getCart,
	});
	const updateCart = createMutation({
		mutationKey: ['update', 'cart'],
		mutationFn: cartNetwork.updateCart,
		onSuccess: (data, variables, context) => $userCart.refetch(),
		// layoutData.queryClient.invalidateQueries({ queryKey: ['usercart'] }),
	});

	const _updateCart = (action: 'add' | 'remove' | 'delete', id: string) => {
		// if ($auth == undefined) return modalStore.trigger(confirm);
		$updateCart.mutate({ [action]: id });
	};
	$: totalPrice =
		$userCart.data?.items.reduce((sum, e) => sum + e.menuItem.amount * e.quantity, 0) ?? 0;
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

	// $: cartItems = [
	// 	{
	// 		name: 'Product 1',
	// 		price: 0.0,
	// 		description: 'Its a blah blah product',
	// 		pricePerQuantity: 10.0,
	// 		image: 'https://via.placeholder.com/48x48',
	// 		quantity: 1,
	// 		taxpercentage: 10,
	// 		tax: 0,
	// 	},
	// 	{
	// 		name: 'Product 2',
	// 		price: 0.0,
	// 		description: 'Its another blah blah product',
	// 		pricePerQuantity: 15.0,
	// 		image: 'https://via.placeholder.com/48x48',
	// 		quantity: 1,
	// 		taxpercentage: 15,
	// 		tax: 0,
	// 	},
	// ];
	// $: totalPrice = cartItems.reduce((sum, element) => {
	// 	element.price = element.pricePerQuantity * element.quantity;
	// 	element.tax = (element.price * element.taxpercentage) / 100;
	// 	tax += element.tax;
	// 	return sum + element.price + element.tax;
	// }, 0);
	// $: tax = cartItems.reduce((taxtsum, element) => element.tax + taxtsum, 0);
	// export let addQuantity = (item: any) => {
	// 	const index = cartItems.findIndex((arrayitem) => arrayitem === item);
	// 	if (cartItems[index].quantity < 10) cartItems[index].quantity++;
	// };
	// export let removeQuantity = (item: any) => {
	// 	const index = cartItems.findIndex((arrayitem) => arrayitem === item);
	// 	if (cartItems[index].quantity > 0) {
	// 		if (item.quantity == 1) return removeItem(item);
	// 		cartItems[index].quantity--;
	// 	}
	// };
	// export let removeItem = (item: any) => {
	// 	cartItems = cartItems.filter((arrayitem) => arrayitem != item);
	// };

	// function checkout() {
	// 	log.info(JSON.stringify(cartItems));

	// 	// your checkout logic goes here
	// }
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
	{#if $userCart.isLoading}
		Loading menu items...
	{:else if $userCart.isError}
		<span>Error: {$userCart.error.message}</span>
	{:else}
		<div class="divide-y divide-gray-200">
			{#if !$userCart.data.items.length}
				Your cart is empty
			{:else}
				{#each $userCart.data.items as { menuItem, quantity }}
					<div class="flex items-center justify-between py-4">
						<div class="flex items-center">
							<img class="h-16 w-16 rounded object-cover" src={''} alt={menuItem.title} />
							<div class="ml-4">
								<p class="font-medium text-gray-900">{menuItem.title}</p>
								<p class="text-gray-500">menuItem.description</p>
							</div>
						</div>
						<div class="item-end flex-col py-4">
							<div class="flex items-end">
								<button
									class="text-gray-500 hover:text-gray-700 focus:text-gray-700 focus:outline-none"
									on:click={() => _updateCart('remove', menuItem.id)}>Remove</button
								>
								<span class="ml-2 font-medium text-gray-900">{quantity}</span>
								<button
									class="ml-2 text-gray-500 hover:text-gray-700 focus:text-gray-700 focus:outline-none"
									on:click={() => _updateCart('add', menuItem.id)}>Add</button
								>
								<button
									class="ml-2 text-gray-500 hover:text-gray-700 focus:text-gray-700 focus:outline-none"
									on:click={() => _updateCart('delete', menuItem.id)}
									><svg
										xmlns="http://www.w3.org/2000/svg"
										class="icon icon-tabler icon-tabler-trash"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="black"
										fill="none"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<path stroke="none" d="M0 0h24v24H0z" fill="none" />
										<path d="M4 7l16 0" />
										<path d="M10 11l0 6" />
										<path d="M14 11l0 6" />
										<path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
										<path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
									</svg>
								</button>
							</div>
							<div class="flex items-center justify-between">
								<p class="text-gray-500">Price:</p>
								<p class="font-medium">{fmtAmount(menuItem)}</p>
							</div>
							<!-- <div class="flex items-center justify-between">
						<p class="text-gray-500">Price:</p>
						<p class="font-medium">£{item.price.toFixed(2)}</p>
					</div>
					<div class="flex items-center justify-between">
						<p class="text-gray-500">Tax:</p>
						<p class="font-medium">£{item.tax.toFixed(2)}</p>
					</div>
					<div class="flex items-center justify-between">
						<p class="text-gray-500">Total:</p>
						<p class="font-medium">£{(item.tax + item.price).toFixed(2)}</p>
					</div> -->
						</div>
					</div>
				{/each}
				<div class="mt-4 flex items-center justify-between">
					<p class="text-gray-500">Total:</p>
					<p class="font-medium">
						{fmtAmount({
							amount: totalPrice,
							currency: 'GBP',
						})}
					</p>
				</div>
				<div class="mt-6">
					<button
						class="w-full rounded-lg bg-blue-500 py-3 font-medium text-white hover:bg-blue-600"
						on:click={() => {}}>Checkout</button
					>
				</div>
			{/if}
		</div>
	{/if}
	<!-- <div class="mt-4 flex items-center justify-between">
			<p class="text-gray-500">Tax:</p>
			<p class="font-medium">£{tax.toFixed(2)}</p>
		</div>
	 -->
</div>
