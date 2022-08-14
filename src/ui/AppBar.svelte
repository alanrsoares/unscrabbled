<script lang="ts">
	import { Button, Navbar, NavBrand, NavUl, NavLi } from 'flowbite-svelte';
	import { Cog } from 'svelte-heros';

	const menu = [
		{
			label: 'search',
			path: ''
		},
		{
			label: 'definitions',
			path: ''
		}
	];
</script>

<Navbar class="p-4 border-b border-white/30 !bg-black/95 gradient-border">
	<div class="clamp  flex items-center justify-between gap-4">
		<NavBrand href="/">
			<span class="brand"> Unscrabbled </span>
		</NavBrand>
		<nav class="flex-1">
			<NavUl class="flex gap-2 items-center justify-end">
				{#each menu as item}
					<NavLi activeClass="text-pink-600" nonActiveClass="opacity-80">
						{item.label}
					</NavLi>
				{/each}
			</NavUl>
		</nav>
		<Button gradient color="purpleToPink" class="h-10 w-10 !p-0 !rounded-full"><Cog /></Button>
	</div>
</Navbar>

<style lang="postcss">
	.brand {
		@apply self-center whitespace-nowrap text-xl font-display leading-snug font-semibold;
		@apply dark:text-white uppercase;
	}
</style>
