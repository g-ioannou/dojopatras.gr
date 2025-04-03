<script lang="ts">
	import AppBar from '$lib/components/AppBar.svelte';
	import type { LayoutProps } from './$types';

	import Masonry from '$lib/components/Masonry.svelte';

	import '../app.css';
	import Footer from '$lib/components/Footer.svelte';

	let { children, data }: LayoutProps = $props();
</script>

<div class="fixed z-[-1] mx-auto flex w-screen justify-center bg-background text-foreground">
	<Masonry gridGap={0.8}>
		{#if data.media?.docs}
			{#each data.media.docs as media (media.id)}
				<img
					src={media.url}
					alt={media.alt}
					class="w-full brightness-50 sepia-[.6] sm:rounded-[5px]"
					loading="lazy"
				/>
			{/each}
		{/if}
	</Masonry>
</div>

<div class="flex min-h-screen flex-col font-gaveliana gap-20 md:gap-40">
	<AppBar />
	<main class="grow z-10 mb-60">
		{@render children()}
	</main>
	<Footer />
</div>
