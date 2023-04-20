<script lang="ts">
	import { browser } from '$app/environment';
	import { log } from '$lib/logger';
	import { authNetwork } from '$lib/networks/auth.network';
	import { createMutation } from '@tanstack/svelte-query';

	let username: string;
	let password: string;

	const signin = createMutation({
		mutationKey: ['signin'],
		mutationFn: authNetwork.signin,
		onSuccess(data, variables, context) {
			console.log('yeyy', data, variables, context);
			log.info(browser && document.cookie);
		}
	});
	const handleSignin = (e: Event) => {
		e.preventDefault();
		$signin.mutate({ username, password });
	};
</script>

<!-- <pre>{JSON.stringify(data)}</pre>
<pre>{JSON.stringify(form)}</pre> -->

<h1>signin</h1>

{#if $signin.isLoading}
	loading...
{:else if $signin.isError}
	error...
	<pre>{JSON.stringify($signin.error)}</pre>
{/if}

user<input type="text" name="username" bind:value={username} required />
<input type="password" name="password" bind:value={password} required />
<button disabled={$signin.isLoading} on:click={handleSignin}>summit</button>
this is - signIN
<br />
no account? <a href="/v1/auth/signup">signUP</a>
