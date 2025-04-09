<script lang="ts">
	import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html';
	import { type Media } from '@repo/payload/types';
	import type { PageProps } from './$types';
	import Button from '$lib/components/ui/button/button.svelte';
	import { cn } from '$lib/utils';

	let { data }: PageProps = $props();

	const websiteInfo = data.websiteInfo;

	const announcements =
		data.recentAnnouncements?.docs.map((announcement) => ({
			id: announcement.id,
			title: announcement.title,
			contents: announcement.contents ? convertLexicalToHTML({ data: announcement.contents }) : '',
			thumbnail: announcement.thumbnail as Media | undefined,
			createdAt: new Date(announcement.createdAt).toLocaleString('el-GR', {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			})
		})) ?? [];
</script>

<div class="md:30 flex flex-col gap-20 lg:gap-40">
	{#if websiteInfo?.hero}
		<div class="flex flex-col gap-20 bg-background py-20 text-foreground shadow-2xl">
			<div class="container">
				{@html convertLexicalToHTML({ data: websiteInfo.hero })}
			</div>
		</div>
	{/if}

	<div class="dark flex flex-col gap-20 bg-background py-20 text-foreground shadow-2xl">
		<div class="container flex flex-col sm:flex-row  sm:justify-between items-start">
			<h1>Τελευταία νέα & ανακοινώσεις</h1>
			<Button variant='link' class='p-0'>
				<a href="/news-and-announcements" class='decoration-dotted underline'>Δες τα όλα</a>
			</Button>
		</div>
		{#each announcements as announcement (announcement.id)}
			{@const hasThumbnail = announcement.thumbnail !== null}
			<div class="container mx-auto grid grid-cols-2 gap-8">
				<h2 class="col-span-2 h-max">{announcement.title}</h2>
				<div class="gap col-span-2 grid grid-cols-2 grid-rows-2 gap-8">
					<div
						class={cn(
							' flex h-full flex-col justify-between  gap-y-8',
							!hasThumbnail ? 'col-span-2 row-span-2' : 'col-span-2 md:col-span-1 md:row-span-2'
						)}
					>
						<span class="text-muted-foreground">{announcement.createdAt}</span>
						<div class="md:grow">
							<div class="line-clamp-6">
								{@html announcement.contents}
							</div>
						</div>
						<Button class="self-center" variant="outline-inverted">Περισσότερα</Button>
					</div>
					{#if hasThumbnail}
						<div
							class="col-span-2 col-start-1 row-span-2 row-start-1 flex w-full justify-center md:col-span-1 md:col-start-2"
						>
							<img
								src={announcement.thumbnail?.url}
								alt={announcement.thumbnail?.alt}
								class="max-h-96 w-full max-w-full self-start bg-foreground object-cover px-4 py-6 sm:px-6 sm:py-9 md:px-8 md:py-10"
							/>
						</div>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>
