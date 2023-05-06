<script lang="ts">
	import { goto } from "$app/navigation";
	import { log } from "$lib/logger";
	import type { MenuItemData } from "$lib/models/data/menu.data";
	import { cartNetwork } from "$lib/networks/cart.network";
	import { auth } from "$lib/stores/auth";
	import { ToTitleCase } from "$lib/utils";
	import { modalStore, type ModalSettings } from "@skeletonlabs/skeleton";
	import { createMutation } from "@tanstack/svelte-query";
    export let menuItem:MenuItemData;
    let count:number|undefined = undefined;
	let expanded = false;
    const updateCart = createMutation({
		mutationKey: ['update', 'cart'],
		mutationFn: cartNetwork.updateCart,
   
        onSuccess(data, variables, context) {
            log.info('Hlo im halid',count);
            count=data.items.find((element) => element.menuItem == menuItem.id)?.quantity;
        },
        
	});
	const confirm: ModalSettings = {
		type: 'confirm',
		// Data
		title: 'Oops you are not logged in',
		body: 'Please sign in to add to cart',
		buttonTextConfirm: 'Login',
		// TRUE if confirm pressed, FALSE if cancel pressed
		response: (r: boolean) => r && goto('/v1/auth/signin'),
	};
    const _updateCart = (action: 'add' | 'remove', id: string) => {
		if ($auth == undefined) return modalStore.trigger(confirm);
		$updateCart.mutate({ [action]: id });
	};
	const _getItemCount = (id: string): undefined | number => {
        log.warn('ith vijayam',$updateCart.isSuccess)
		if (!$updateCart.isSuccess) return;
		return $updateCart.data.items.find((element) => element.menuItem == id)?.quantity;
	};
    </script>
<div class="card card-hover p-4">
    <div class="card bg-lime-500 p-3">(image)</div>
    <div class="mt-3 p-1 text-xl">
        {ToTitleCase(menuItem.title)}
    </div>
    <hr class="!border-t-2" />
    <div class="... overflow-hidden text-clip py-3 text-sm">
        {#if expanded}
            {menuItem.description}
            <a  on:click|preventDefault={() => (expanded = false)}>show less</a>
        {:else}
            {menuItem.description.slice(0, 100)} ...
            <a  on:click|preventDefault={() => (expanded = true)}> show more</a>
        {/if}
    </div>
    <hr class="!border-t-1" />
    {#each menuItem.menuItemTypes as menuItemType}
        icon: ({menuItemType.title})
    {/each}
    <br />
    {#if count != undefined}
        <button
            type="button"
            class="btn-icon variant-filled-warning"
            on:click={() => {
                _updateCart('remove', menuItem.id);
            }}>-</button
        >
        {count}
        <button
            type="button"
            class="btn-icon variant-filled-success"
            on:click={() => _updateCart('add', menuItem.id)}>+</button
        >
    {:else}
        <button
            type="button"
            class="btn-icon variant-filled-success"
            on:click={() => _updateCart('add', menuItem.id)}>Add to cart</button
        >
    {/if}
</div>