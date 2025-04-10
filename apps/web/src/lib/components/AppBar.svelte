<script lang="ts">
	import { page } from '$app/state';
	import Button from './ui/button/button.svelte';
	import { MapPinIcon, MenuIcon, PhoneIcon, XIcon } from '@lucide/svelte';
	import {
		Root as SheetRoot,
		SheetContent,
		SheetFooter,
		SheetClose,
		SheetTrigger
	} from './ui/sheet/index';
	import { goto } from '$app/navigation';

	const pathname = $derived.by(() => {
		const state = $state(page.url.pathname);
		return state;
	});

	let menuOpen = $state(false);

	interface AppLink {
		href: string;
		text: string;
	}
	const links: AppLink[] = [
		{ href: '/', text: 'Αρχική' },
		{ href: '/news-and-announcements', text: 'Νέα & Ανακοινώσεις' },
		{ href: '/academy', text: 'Η Σχολή' }
	];

	interface AppBarProps {
		contactNumbers: string[];
		address: string;
		email: string;
		location: [number, number];
		facebookLink: string;
		instagramLink: string;
	}

	let { contactDetails }: { contactDetails: AppBarProps } = $props();
</script>

{#snippet buttonLink(links: AppLink[])}
	{#each links as link (link.href)}
		<Button
			class="p-0"
			variant="ghost"
			on:click={() => {
				menuOpen = false;
				goto(link.href);
			}}
		>
			<a
				href={link.href}
				class="p-4 text-base decoration-accent decoration-2"
				class:underline={pathname === link.href}
			>
				{link.text}
			</a>
		</Button>
	{/each}
{/snippet}

{#snippet contactDetailsSection()}
	<div class="dark bg-background py-1 text-foreground">
		<div class="container flex flex-col sm:flex-row sm:gap-8 sm:justify-end">
			<div class="flex gap-2 items-center"><PhoneIcon size={16}/>{contactDetails.contactNumbers.join(" - ")}</div>
			<div class="flex gap-2 items-center"><MapPinIcon size={16}/>{contactDetails.address}</div>
		</div>
	</div>
{/snippet}

<SheetRoot open={menuOpen}>
	<div>
		<div class="bg-background shadow-2xl">
			<div class="container flex justify-between py-4 md:py-8">
				<div>
					<img src="/logo_with_name.png" class="h-12 min-w-max md:h-14" alt="Dojo Patras logo" />
				</div>
				<div class="flex items-center gap-4 text-lg">
					<div class="flex items-center md:hidden">
						<SheetTrigger
							on:click={() => {
								menuOpen = true;
							}}
						>
							<MenuIcon />
						</SheetTrigger>
					</div>
					<div class="hidden md:block">
						{@render buttonLink(links)}
					</div>
				</div>
			</div>
		</div>
		<div>
			{@render contactDetailsSection()}
		</div>
	</div>

	<SheetContent class="flex flex-col">
		<SheetClose
			class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
			on:click={() => {
				menuOpen = false;
			}}
		>
			<XIcon class="h-4 w-4" />
			<span class="sr-only">Close</span>
		</SheetClose>
		<div class="flex grow flex-col items-end justify-center gap-6">
			{@render buttonLink(links)}
		</div>
		<SheetFooter>
			<div class="flex flex-col items-center justify-center font-incise w-full">
				<div>
					<img src="/logo_graphics_only.png" alt="Footer Dojo Patras logo" class="h-20" />
				</div>
				DOJO PATRAS
			</div>
		</SheetFooter>
	</SheetContent>
</SheetRoot>
