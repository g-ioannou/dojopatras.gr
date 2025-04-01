<script lang="ts">
	import Masonry from '$lib/components/Masonry.svelte';

	export let data;
</script>

<h1>Web</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<Masonry gridGap={0.8}>
	{#if data.media?.docs}
		{#each data.media.docs as media (media.id)}
			<img
				src={media.url}
				alt={media.alt}
				class="w-full rounded-[5px] brightness-50 sepia-[.6]"
			/>
		{/each}
	{/if}
</Masonry>
