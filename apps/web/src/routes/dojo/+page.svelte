<script lang="ts">
	import { type Media } from '@repo/payload/types';
	import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html';

	let { data } = $props();
	const instructors = data.instructors?.docs;
</script>

<div class="flex flex-col gap-20 bg-background py-20 text-foreground shadow-2xl">
	<div class="container flex flex-col gap-20">
		<!-- {@html convertLexicalToHTML({ data: websiteInfo.hero })} -->
		<h1>Εκπαιδευτές</h1>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-20">
			{#if instructors}
				{#each instructors as instructor (instructor.id)}
					<div class="flex  flex-col items-center gap-8">
						<img
							src={(instructor.picture as Media).url}
							alt={(instructor.picture as Media).alt}
							class="bg-foreground object-contain px-6 py-9"
						/>
                        <span><h4>{instructor.name} {instructor.surname}</h4></span>
                        <div class="px-4">
						{@html convertLexicalToHTML({ data: instructor.bio })}
        </div>
					</div>
				{/each}
			{/if}
		</div>
	</div>
</div>
