<script lang="ts">
	import { page } from '$app/stores';

	const msg = $page.url.searchParams.get('msg') ?? '';
	const cde = $page.url.searchParams.get('cde') ?? '';
</script>

error page - {msg} : {cde}

<!-- <pre>{JSON.stringify($page)}</pre> -->
