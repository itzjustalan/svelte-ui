<script lang="ts">
	import { browser } from '$app/environment';
	import defaultApi from '$lib/networks/apis';

	let fileData: string | undefined;
	const allowedExts = ['.jpg', '.jpeg', '.png', '.webp'];

	if (browser) {
		const fileInput = document.getElementById('file');
		if (fileInput) {
			fileInput.addEventListener('change', (event: Event) => {
				const file = (event.target as HTMLInputElement).files?.[0];
				const reader = new FileReader();
				reader.addEventListener('load', (event) => {
					const preview = document.getElementById('preview') as HTMLImageElement;
					if (preview) preview.src = event.target?.result?.toString() ?? '';
				});
				reader.readAsDataURL(file as Blob);
			});
		}
	}

	const readFile = (file: File): Promise<string> => {
		return new Promise((resolve) => {
			const reader = new FileReader();
			reader.onload = () => resolve(reader.result as string);
			reader.readAsDataURL(file);
		});
	};

	const handleFileUpload = async (event: SubmitEvent) => {
		const formData = new FormData(event.target as HTMLFormElement);
		const file = formData.get('file') as File;
		fileData = await readFile(file);
		await defaultApi.post('/v1/test', { fileData, fileName: file.name });
		(event.target as HTMLFormElement).reset();
		fileData = undefined;
	};
</script>

<svelte:head>
	<title>test_page</title>
</svelte:head>

<form on:submit|preventDefault={handleFileUpload} class="card">
	<label for="file" class="label m-2">select file</label>
	<input
		id="file"
		type="file"
		name="file"
		required
		class="input m-2"
		accept={allowedExts.join(',')}
	/>
	<button type="submit" class="btn btn-sm variant-filled-primary m-2">submit</button>
</form>

<img id="preview" alt="preview" />

<style>
	.card {
		margin: 1rem;
		padding: 1rem;
		border: 2px solid black;
		border-radius: 1rem;
		background-color: inherit;
	}
</style>
