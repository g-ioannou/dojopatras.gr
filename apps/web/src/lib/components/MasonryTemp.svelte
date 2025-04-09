<script lang="ts">
	import type { Snippet } from 'svelte';

	interface MasonryProps {
		children: Snippet;
	}

	let { children }: MasonryProps = $props();
</script>

<div class="flex flex-col">
	<div
		class="box-border columns-1 space-y-4 md:columns-2 xl:columns-4 "
	>
		{@render children()}
	</div>
</div>
