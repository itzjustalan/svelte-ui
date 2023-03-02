<script lang="ts">
    import { enhance, type SubmitFunction } from '$app/forms';
    import type { ActionData, PageData } from './$types';
    
    export let data: PageData;
    export let form: ActionData;
    let isLoading = false;
    // console.log(data, form);

    const signup: SubmitFunction = (input) => {
        isLoading = true;
        return async (opts) => {
            isLoading = false;
            await opts.update();
        }
    }
</script>

<pre>{JSON.stringify(data)}</pre>
<pre>{JSON.stringify(form)}</pre>

<h1>signup</h1>

{#if isLoading}
    loading...
{:else}
    <form method="post" use:enhance={signup}>
        user<input type="text" name="username" required>
        <input type="password" name="password" required>
        <button type="submit">summit</button>
    </form>
{/if}