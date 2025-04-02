<script lang="ts">
	import { page } from '$app/state';
	import Button from './ui/button/button.svelte';
	import { MenuIcon, XIcon } from '@lucide/svelte';
	import {
		Root as SheetRoot,
		SheetContent,
		SheetHeader,
		SheetTitle,
		SheetFooter,
		SheetClose,
		SheetTrigger,
		SheetDescription
	} from './ui/sheet/index';
	import { SelectItem } from './ui/select';

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
		{ href: '/academy', text: 'Η Σχολή' },
		{ href: '/contact', text: 'Επικοινωνία' }
	];
</script>

{#snippet buttonLinks(links: AppLink[])}
	{#each links as link (link.href)}
		<Button
			variant="ghost"
			on:click={() => {
				menuOpen = false;
			}}
		>
			<a
				href={link.href}
				class="text-base decoration-accent decoration-2"
				class:underline={pathname === link.href}
			>
				{link.text}
			</a>
		</Button>
	{/each}
{/snippet}

<SheetRoot open={menuOpen}>
	<div class="bg-background shadow-xl">
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
					{@render buttonLinks(links)}
				</div>
			</div>
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
		<div class="flex grow flex-col items-center justify-center gap-6">
			{@render buttonLinks(links)}
		</div>
		<SheetFooter>
			<img src="/logo_graphics_only.png" alt="Dojo Patras logo" class="h-12 w-12 sm:h-16 sm:w-16" />
		</SheetFooter>
	</SheetContent>
</SheetRoot>
