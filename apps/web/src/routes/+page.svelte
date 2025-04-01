<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
import { Button } from 'flowbite-svelte';
	export let data;
</script>

<NavBar />
<h1>Web</h1>
<pre>{JSON.stringify(data, null, 4)}</pre>
<Button>hi</Button>
{#if data.media?.docs}
	{#each data.media.docs as media (media.id)}
		<img src={media.url} alt={media.alt} />
	{/each}
{/if}
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
