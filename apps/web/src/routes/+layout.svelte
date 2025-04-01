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
					class="w-full rounded-[5px] brightness-50 sepia-[.6]"
					loading="lazy"
				/>
			{/each}
		{/if}
	</Masonry>
</div>

<div class="flex min-h-screen flex-col">
	<AppBar deviceType={data.deviceType} />
	<main class="grow">
		{@render children()}
	</main>
    <Footer />
</div>
