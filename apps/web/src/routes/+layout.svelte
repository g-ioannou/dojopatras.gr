<script lang="ts">
	import AppBar from '$lib/components/AppBar.svelte';
	import type { LayoutProps } from './$types';

	import '../app.css';

	let { children, data }: LayoutProps = $props();
</script>

<div class="container mx-auto p-4">
	<AppBar deviceType={data.deviceType} />
</div>
{@render children()}

