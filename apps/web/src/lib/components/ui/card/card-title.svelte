<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import type { HeadingLevel } from "./index.js";
	import { cn } from "$lib/utils.js";

	type $$Props = HTMLAttributes<HTMLHeadingElement> & {
		tag?: HeadingLevel;
	};

	let className: $$Props["class"] = undefined;
	export let tag: $$Props["tag"] = "h2";
	export { className as class };
</script>

<svelte:element
	this={tag}
	class={cn("text-lg font-semibold leading-none tracking-widest", className)}
	{...$$restProps}
>
	<slot />
</svelte:element>
