<script lang="ts">
	import type { DevicePayload } from 'sveltekit-device-detector';
	import MobileMenu from './MobileMenu.svelte';
	import WebMenu from './WebMenu.svelte';

	let { deviceType }: { deviceType?: DevicePayload | undefined } = $props();
</script>

{#if deviceType !== undefined && deviceType.isMobile}
	<MobileMenu />
{:else}
	<WebMenu />
{/if}
