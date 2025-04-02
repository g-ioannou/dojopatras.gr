<script>
	import { page } from '$app/state';
	import Button from './ui/button/button.svelte';

	const pathname = $derived.by(() => {
		const state = $state(page.url.pathname);
		return state;
	});

	// $effect(() => {
	// 	pathname = page.url.pathname;
	// });

	const links = [
		{ href: '/', text: 'Αρχική' },
		{ href: '/academy', text: 'Η Σχολή' },
		{ href: '/contact', text: 'Επικοινωνία' }
	];
</script>

<div class="bg-background shadow-xl">
	<div class="container flex justify-between py-4 md:py-8">
		<div>
			<img src="/logo_with_name.png" class="h-12 min-w-max md:h-14" alt="Dojo Patras logo" />
		</div>
		<div class="flex items-center gap-4 text-lg">
			{#each links as link (link.href)}
				<Button variant="ghost">
					<a href={link.href} class="text-base decoration-2 decoration-accent" class:underline={pathname === link.href}>
						{link.text}
					</a>
				</Button>
			{/each}
		</div>
	</div>
</div>
