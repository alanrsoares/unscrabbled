<script lang="ts">
	import { createEventDispatcher, onMount, onDestroy } from 'svelte/internal';

	import { clickoutDetector } from '~/ui/directives';

	export let id: string;
	export let title: string;
	export let open = false;

	const dispatch = createEventDispatcher();

	const close = () => {
		if (!open) return;
		open = false;
		dispatch('close', false);
	};

	const onKeydown = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			close();
		}
	};

	onMount(() => {
		if (typeof document === 'undefined') return;

		document.addEventListener('keydown', onKeydown);
	});

	onDestroy(() => {
		if (typeof document === 'undefined') return;

		document.removeEventListener('keydown', onKeydown);
	});
</script>

<input type="checkbox" {id} bind:checked={open} class="modal-toggle" />

<div role="dialog" class="modal modal-bottom sm:modal-middle" use:clickoutDetector>
	<div class="modal-box relative" use:clickoutDetector on:clickout={close}>
		<label
			for={id}
			class="btn btn-sm btn-circle absolute right-2 top-2"
			on:click={() => {
				dispatch('close', false);
			}}
		>
			&Cross;
		</label>
		<slot name="title">
			{#if title}
				<h3 class="text-lg font-bold">
					{title}
				</h3>
			{/if}
		</slot>
		<slot name="body">
			<p class="py-4">
				<slot />
			</p>
		</slot>
	</div>
</div>
