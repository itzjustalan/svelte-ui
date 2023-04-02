<script lang="ts">
  import { log } from "$lib/logger";
  import { menuNetwork } from "$lib/networks/menu.network";
  import { prettyPrintMenuItemType } from "$lib/utils";
  import { MenuItemType, type MenuItem } from "$lib/zod/models/menu.model";
  import {
    menuItemDataSchema,
    type MenuItemData,
  } from "$lib/zod/schemas/menuitem";
  import {
    createMutation,
    createQuery,
    useQueryClient,
  } from "@tanstack/svelte-query";

  let newItem: MenuItemData = {
    title: "",
    description: "",
    category: "",
    price: 0,
    itemType: MenuItemType.veg,
  };
  const client = useQueryClient();
  const menuItem = createMutation({
    mutationKey: ["menuitem"],
    mutationFn: menuNetwork.createNewMenuItem,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["menuitems"],
      });
    },
  });
  const menuItems = createQuery<MenuItem[], Error>({
    queryKey: ["menuitems"],
    queryFn: menuNetwork.getMenuItems,
  });
  const addMenuItem = () => {
    log.info(JSON.stringify(newItem));
    const result = menuItemDataSchema.safeParse(newItem);
    if (!result.success) {
      log.info(result.error);
      return alert("error validating input chk console");
    } else {
      $menuItem.mutate(newItem);
    }
  };
</script>

<svelte:head>
  <title>sdfsf</title>
</svelte:head>

<h1>Add Menu Item</h1>
{#if $menuItem.isLoading}
  loading...
{:else if $menuItem.isError}
  error...
  <pre>{JSON.stringify($menuItem.error)}</pre>
{/if}
<form>
  Title <input type="text" bind:value={newItem.title} />
  <br />Description <input type="text" bind:value={newItem.description} />
  <br />Category <input type="text" bind:value={newItem.category} />
  <br />price <input type="number" bind:value={newItem.price} />
  <br />itemType
  <select bind:value={newItem.itemType}>
    {#each Object.values(MenuItemType) as menuItem}
      <option value={menuItem}>
        {prettyPrintMenuItemType(menuItem)}
      </option>
    {/each}
  </select>
  <button type="button" on:click={addMenuItem} disabled={$menuItem.isLoading}>
    Add New Menu Item
  </button>
</form>

<b>Menu items</b>
{#if $menuItems.isLoading}
  Loading menu items...
{:else if $menuItems.status === "error"}
  <span>Error: {$menuItems.error.message}</span>
{:else}
  {#each $menuItems.data as menu, index}
    <div>{menu.title}</div>
  {/each}
{/if}
