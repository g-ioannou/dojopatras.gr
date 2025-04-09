<script lang="ts">
	import AppBar from '$lib/components/AppBar.svelte';
	import type { LayoutProps } from './$types';

	import Masonry from '$lib/components/Masonry.svelte';

	import '../app.css';
	import Footer from '$lib/components/Footer.svelte';
	import MasonryTemp from '$lib/components/MasonryTemp.svelte';
	import MasonryItem from '$lib/components/MasonryItem.svelte';

	let { children, data }: LayoutProps = $props();
</script>

<div class="fixed  z-[-1] flex w-screen h-screen">
	{#if data.media?.docs}
		<div
			class="fixed   bg-transparent  p-0 text-foreground sm:px-4"
		>
			<MasonryTemp>
				{#each data.media.docs as media (media.id)}
					<MasonryItem>
						<img
							src={media.url}
							alt={media.alt}
							class="w-full object-contain brightness-50 sepia-[.6] sm:rounded-[5px]"
							loading="lazy"
						/>
					</MasonryItem>
				{/each}
			</MasonryTemp>
		</div>
	{/if}
</div>

<div class="flex min-h-screen flex-col font-gaveliana gap-20 md:30 lg:gap-40">
	<AppBar />
	<main class="grow z-10">
		{@render children()}
	</main>
	<Footer />
</div>
