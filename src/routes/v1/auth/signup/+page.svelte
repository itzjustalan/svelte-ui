<script lang="ts">
	import { authNetwork } from '$lib/networks/auth.network';
	import { createMutation } from '@tanstack/svelte-query';
	import axios from 'axios';

	let username: string;
	let password: string;
	// let password2: string;

	// const signup = createMutation<any, AxiosError>({
	const signup = createMutation({
		mutationKey: ['signup'],
		mutationFn: authNetwork.signup,
		onSuccess(data, variables, context) {
			console.log('signup succse', data, variables, context);
		}
	});
	const handleSignup = (e: Event) => {
		e.preventDefault();
		// if (password !== password2) alert(' passwords do not match!!');
		$signup.mutate({ username, password });
	};
</script>

<!-- <pre>{JSON.stringify(data)}</pre>
<pre>{JSON.stringify(form)}</pre> -->

<h1>signup</h1>

{#if $signup.isLoading}
	loading...
{:else if $signup.isError}
	error...
	<!-- {$signup.error.response?.data} -->
	<!-- {#if $signup.error instanceof AxiosError}
        {$signup.error.response?.data}
    {/if} -->
	{#if axios.isAxiosError($signup.error)}
		{$signup.error.response?.data}
	{/if}
	<pre>{JSON.stringify($signup.error)}</pre>
{/if}

user<input type="text" name="username" bind:value={username} required />
<input type="password" name="password" bind:value={password} required />
<button disabled={$signup.isLoading} on:click={handleSignup}>summit</button>
this is - signUP
<br />
no account? <a href="/v1/auth/signup">signUP</a>
