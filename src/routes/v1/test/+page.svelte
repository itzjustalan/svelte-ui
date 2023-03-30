<script lang="ts">
  import { log } from "$lib/logger";
  import { prettyPrintMenuItemType } from "$lib/utils";
  import {
    MenuItemSchema,
    MenuItemType,
    MenuSchema,
    type Menu,
    type MenuItem,
  } from "$lib/zod/models/menu.model";

  let newItem: MenuItem = {
    id: "",
    title: "",
    description: "",
    category: "",
    price: 0,
    itemType: MenuItemType.veg,
  };
  const addMenuItem = () => {
    log.info(JSON.stringify(newItem));
    // if (!MenuItemSchema.safeParse(newItem).success) {
    //   log.info(MenuItemSchema.safeParse(newItem));
    //   return alert(MenuItemSchema.safeParse(newItem).success);
    // }
  };
</script>

<svelte:head>
    <title>sdfsf</title>
</svelte:head>

<h1>Add Menu Item</h1>
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
  <button type="button" on:click={addMenuItem}> Add New Menu Item </button>
</form>
