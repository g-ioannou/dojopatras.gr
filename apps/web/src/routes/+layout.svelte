<script lang="ts">
	import AppBar from '$lib/components/AppBar.svelte';
	import type { LayoutProps } from './$types';

	import '../app.css';
	import Masonry from '$lib/components/Masonry.svelte';

	let { children, data }: LayoutProps = $props();
</script>

<div class="container mx-auto p-4">
	<AppBar deviceType={data.deviceType} />
</div>
{@render children()}
<Masonry>
	<div class="h-40 w-10 bg-red-500">hi</div>
	<div class="h-20 w-32 bg-green-500">hi</div>
	<div class="h-30 w-full bg-yellow-500">hi</div>
	<div class="h-30 w-60 bg-yellow-500">hi</div>
	<div class="h-30 w-60 bg-yellow-500">hi</div>
	<div class="h-30 w-60 bg-yellow-500">hi</div>
	<div class="h-30 w-60 bg-yellow-500">hi</div>
	<div class="h-5 w-20 bg-slate-500">hi</div>
</Masonry>
