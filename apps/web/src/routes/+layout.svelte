<script lang="ts">
	import AppBar from '$lib/components/AppBar.svelte';
	import type { LayoutProps } from './$types';

	import '../app.css';
	import Footer from '$lib/components/Footer.svelte';
	import MasonryTemp from '$lib/components/MasonryTemp.svelte';
	import MasonryItem from '$lib/components/MasonryItem.svelte';

	let { children, data }: LayoutProps = $props();

	const contactDetails = {
		address: data.websiteInfo?.address ?? '',
		contactNumbers:
			data.websiteInfo?.['contact-numbers']?.map((n) => n['phone-number'] ?? '') ?? [],
		email: data.websiteInfo?.email ?? '',
		facebookLink: data.websiteInfo?.facebook ?? '',
		instagramLink: data.websiteInfo?.instagram ?? '',
		location: data.websiteInfo?.['map-location'] ?? [0, 0]
	};
</script>

<div class="fixed z-[-1] flex h-screen w-screen">
	{#if data.media?.docs}
		<div class="fixed bg-transparent p-0 text-foreground sm:px-4">
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

<div class="md:30 flex min-h-screen flex-col gap-20 font-gaveliana lg:gap-40">
	<AppBar {contactDetails}/>
	<main class="z-10 grow">
		{@render children()}
	</main>
	<Footer {contactDetails} />
</div>
