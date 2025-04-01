<script>
	import { page } from '$app/state';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
	let activeUrl = page.url.pathname;
</script>

<Navbar>
	<NavBrand href="/">
		<img src="/logo_with_name.png" class="me-3 h-10 sm:h-14" alt="Dojo Patras logo" />
	</NavBrand>
	<NavHamburger />
	<NavUl {activeUrl}>
		<NavLi href="/">Αρχική</NavLi>
		<NavLi href="/classes">Τμήματα</NavLi>
		<NavLi href="/academy">Η σχολή</NavLi>
		<NavLi href="/contact">Επικοινωνία</NavLi>
	</NavUl>
</Navbar>
