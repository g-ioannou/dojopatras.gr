<script lang="ts">
	import AppBar from '$lib/components/AppBar.svelte';
	import '../app.css';

	let { children, data } = $props();
</script>

<div class="container mx-auto p-4">
	<AppBar deviceType={data.deviceType} />
</div>
{@render children()}
