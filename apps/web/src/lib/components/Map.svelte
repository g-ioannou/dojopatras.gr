<script lang="ts">
	import { onMount } from 'svelte';
	import 'leaflet/dist/leaflet.css';

	interface MapProps {
		lat: number;
		lon: number;
	}
	let { lat, lon }: MapProps = $props();

	let mapEl: HTMLDivElement;

	onMount(async () => {
		const leaflet = await import('leaflet');
		const map = leaflet.map(mapEl).setView([lon,lat], 14);
		leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
		const markerZagreb = leaflet.marker([lon, lat]).addTo(map);
		markerZagreb.bindPopup('Zagreb');
	});
</script>

<div bind:this={mapEl} class="h-full w-full" />

