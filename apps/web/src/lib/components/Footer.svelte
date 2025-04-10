<script lang="ts">
	import { AtSignIcon, FacebookIcon, InstagramIcon, MapPinIcon, PhoneIcon } from '@lucide/svelte';
	import { Button } from './ui/button';

	interface FooterProps {
		contactNumbers: string[];
		address: string;
		email: string;
		location: [number, number];
		facebookLink: string;
		instagramLink: string;
	}

	let { contactDetails }: { contactDetails: FooterProps } = $props();
</script>

{#snippet footerSectionTitle(text: string)}
	<div class="flex w-full flex-col">
		<h4>{text}</h4>
		<div class="flex">
			<span class="h-[1px] w-1/3 bg-red-500 opacity-50"></span>
			<span class="h-[1px] w-full bg-red-100 opacity-20"></span>
		</div>
	</div>
{/snippet}

<footer class="dark flex flex-col lg:flex-row min-h-56 gap-8 bg-background text-foreground shadow-2xl sm:p-10 md:p-20">
	<div class="flex w-full lg:w-1/6 flex-col items-center justify-center font-incise">
		<div>
			<img src="/logo_graphics_only.png" alt="Footer Dojo Patras logo" class="h-28" />
		</div>
		DOJO PATRAS
	</div>
	<div class="flex flex-col lg:flex-row grow gap-16">
		<div class="flex flex-col gap-4 p-4 lg:p-0">
			{@render footerSectionTitle('Σελίδες')}
			<a href="/" class="w-max">Αρχική</a>
			<a href="/news-and-announcements" class="w-max">Νέα & Ανακοινώσεις</a>
			<a href="/dojo" class="w-max">Η σχολή</a>
			<a href="/contact" class="w-max">Επικοινωνία</a>
		</div>
		<div class="flex flex-col gap-4 p-4 lg:p-0">
			{@render footerSectionTitle('Βρείτε μας')}
			<div class="inline-flex items-center gap-2">
				<PhoneIcon size={16} />
				{contactDetails.contactNumbers.join(' - ')}
			</div>
			<div class="inline-flex items-center gap-2">
				<AtSignIcon size={16} />
				{contactDetails.email}
			</div>
			<div class="inline-flex items-center gap-2">
				<MapPinIcon size={16} />
				{contactDetails.address}
			</div>
		</div>
		<div class="flex flex-col gap-4 p-4 lg:p-0">
			{@render footerSectionTitle('Social')}
			<div class="flex gap-4">
				<Button size="icon" variant="secondary"><FacebookIcon size={20} /></Button>
				<Button size="icon" variant="secondary"><InstagramIcon size={20} /></Button>
			</div>
		</div>
	</div>
	<div>map here</div>
</footer>
