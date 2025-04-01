<script lang="ts">
	import AppBar from '$lib/components/AppBar.svelte';
	import type { LayoutProps } from './$types';

	import Masonry from '$lib/components/Masonry.svelte';

	import '../app.css';

	let { children, data }: LayoutProps = $props();
</script>

<div class="flex min-h-screen flex-col">
	<div class="fixed z-[-1] mx-auto self-center">
		<Masonry gridGap={0.8}>
			{#if data.media?.docs}
				{#each data.media.docs as media (media.id)}
					<img
						src={media.url}
						alt={media.alt}
						class="w-full rounded-[5px] brightness-50 sepia-[.6]"
						loading="lazy"
					/>
				{/each}
			{/if}
		</Masonry>
	</div>
	<AppBar deviceType={data.deviceType} />
	<main class="grow bg-blue-300">
		{@render children()}
        main
	</main>
	<footer class="bg-yellow-300">footer</footer>
</div>
