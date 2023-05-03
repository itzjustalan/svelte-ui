<script lang="ts">
	import { ConicGradient, type ConicStop } from '@skeletonlabs/skeleton';

	const conicStops: ConicStop[] = [
		{ color: 'transparent', start: 0, end: 25 },
		{ color: '#FFDF00', start: 75, end: 100 },
	];
</script>

<ConicGradient stops={conicStops} spin>Loading</ConicGradient>
