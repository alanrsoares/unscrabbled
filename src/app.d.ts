/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
  // interface Locals {}
  // interface Platform {}
  // interface Session {}
  // interface Stuff {}
}

declare namespace svelteHTML {
  interface HTMLAttributes<T> {
    /**
     * must be used in conjunction with `clickoutDetector`
     *
     * @example
     * ```svelte
     * <div use:clickoutDetector on:clickout={() => { ... })}>
     *   content...
     * </div>
     * ```
     *
     */
    "on:clickout"?: (event: CustomEvent) => void;
  }
}
