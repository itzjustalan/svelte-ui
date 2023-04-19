<script lang="ts">
  import { log } from "$lib/logger";
  import { menuNetwork } from "$lib/networks/menu.network";
  import { prettyPrintMenuItemType } from "$lib/utils";
  import { MenuItemType, type MenuItemModel, type MenuModel } from "$lib/models/db/menu.model";
  import {
    createMutation,
    createQuery,
    useQueryClient,
  } from "@tanstack/svelte-query";
    import { menuItemInputSchema, type MenuItemInput } from "$lib/zod/schemas/menuitem";
    import type { MenuData } from "$lib/models/data/menu.data";

  let selectedMenu: MenuData;
  let newItem: MenuItemInput = {
    title: "",
    description: "",
    price: 0,
    itemType: MenuItemType.veg,
  };
  const client = useQueryClient();
  const menu = createMutation({
    mutationKey: ["menu"],
    mutationFn: menuNetwork.createMenu,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["menus"],
      });
    },
  });
  const category = createMutation({
    mutationKey: ["category"],
    mutationFn: menuNetwork.createCategory,
    // onSuccess: () => {
    //   client.invalidateQueries({
    //     //todo: and selected menu?
    //     queryKey: ["menus"],
    //   });
    // },
  });
  const menuItem = createMutation({
    mutationKey: ["menuitem"],
    mutationFn: menuNetwork.createMenuItem,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["menuitems"],
      });
    },
  });
  const menuItems = createQuery<MenuItemModel[], Error>({
    queryKey: ["menuitems"],
    queryFn: menuNetwork.getMenuItems,
  });
  const menus = createQuery<MenuData[], Error>({
    queryKey: ["menus"],
    queryFn: menuNetwork.getMenus,
  });
  const addMenuItem = () => {
    log.info(JSON.stringify(newItem));
    const result = menuItemInputSchema.safeParse(newItem);
    if (!result.success) {
      log.info(result.error);
      return alert("error validating input chk console");
    } else {
      $menuItem.mutate(newItem);
    }
  };
  const createCategory = async (title: string) => await $category.mutateAsync({ title, items: [] })
  const createNewMenu = async () => {
    let cat = (await createCategory("default_category")).data;
    $menu.mutate({ title: "default_menu", categories: [cat.id] });
  }
</script>

<svelte:head>
  <title>test_page</title>
</svelte:head>

<div class="card">
  <!-- <pre>selected Menu: {selectedMenu?.title}</pre> -->
{#if $menus.isLoading}
  Loading menus...
{:else if $menus.status === "error"}
  <span>Error: {$menus.error.message}</span>
{:else}
  <b>Menus</b>
  {#each $menus.data as item}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div on:click|preventDefault={() => selectedMenu = item}>{item.title}</div>
  {/each}
{/if}
<button type="button" disabled={$menu.isLoading} on:click={createNewMenu}>create new menu</button>
</div>

{#if selectedMenu}
<div class="card">
  <b><u>Menu: {selectedMenu?.title}</u></b>
  {#each selectedMenu.categories as category}
    <!-- <u>{category}</u> -->
    <br><u>{category.title}</u>
  {/each}
</div>
{/if}
<div class="card">
{#if $menuItem.isLoading}
  loading...
{:else if $menuItem.isError}
  error...
  <pre>{JSON.stringify($menuItem.error)}</pre>
{/if}
<form>
  Title <input type="text" bind:value={newItem.title} />
  <br />Description <input type="text" bind:value={newItem.description} />
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
</div>

<div class="card">
{#if $menuItems.isLoading}
  Loading menu items...
{:else if $menuItems.status === "error"}
  <span>Error: {$menuItems.error.message}</span>
{:else}
  <b>Menu items</b>
  {#each $menuItems.data as item}
    <div>{item.title}</div>
  {/each}
{/if}
</div>



<style>
  .card {
    margin: 1rem;
    padding: 1rem;
    border: 2px solid black;
    border-radius: 1rem;
  }
</style>