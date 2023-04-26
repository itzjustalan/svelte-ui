<script lang="ts">
	import { browser, dev } from '$app/environment';
	let text = '';
	const updateText = (w: number) => {
		if (w < 640) text = `sm: ${w}px`;
		else if (w < 768) text = `md: ${w}px`;
		else if (w < 1024) text = `lg: ${w}px`;
		else if (w < 1280) text = `xl: ${w}px`;
		else if (w < 1536) text = `2xl: ${w}px`;
		else text = `00: ${w}px`;
		console.log({ w, text });
	};
	if (browser) {
		updateText(window?.outerWidth ?? 0);
		// window.addEventListener('resize', (e) => updateText(e?.target?.outerWidth ?? 0), true);
		// window.addEventListener('resize', (e) => updateText(e?.target?.innerWidth ?? 0), true);
		window.addEventListener(
			'resize',
			(e: UIEvent) => {
				const w = e.target as Window;
				updateText(w?.innerWidth ?? 0);
			},
			true
		);
		// window.addEventListener(
		// 	'resize',
		// 	(e: UIEvent) => {
		// 		const w = e.target as Window;
		// 		updateText(w?.outerWidth ?? 0);
		// 	},
		// 	true
		// );
	}
</script>

{#if dev}
	<div class="absolute left-0 top-0 z-[999] bg-black p-1 text-xs text-violet-400">{text}</div>
{/if}

<!-- 
Breakpoint prefix	Minimum width	CSS
sm	640px	@media (min-width: 640px) { ... }
md	768px	@media (min-width: 768px) { ... }
lg	1024px	@media (min-width: 1024px) { ... }
xl	1280px	@media (min-width: 1280px) { ... }
2xl	1536px	@media (min-width: 1536px) { ... } -->
