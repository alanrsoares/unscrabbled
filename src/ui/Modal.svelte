<script lang="ts">
  import { createEventDispatcher, onMount, onDestroy } from "svelte";

  import { clickoutDetector } from "~/lib/directives";

  export let title: string;
  export let subtitle = "";
  export let open = false;

  const dispatch = createEventDispatcher();

  const close = () => {
    if (!open) return;
    open = false;
    dispatch("close", false);
  };

  const onKeydown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      close();
    }
  };

  onMount(() => {
    if (typeof document === "undefined") return;

    document.addEventListener("keydown", onKeydown);
  });

  onDestroy(() => {
    if (typeof document === "undefined") return;

    document.removeEventListener("keydown", onKeydown);
  });

  const handleClose = (e: KeyboardEvent | MouseEvent) => {
    if (e instanceof KeyboardEvent && !["Enter", " "].includes(e.key)) {
      return;
    }

    dispatch("close", false);
  };
</script>

<dialog class="modal modal-bottom sm:modal-middle" use:clickoutDetector {open}>
  <form
    class="modal-box relative {$$props.class || ''}"
    use:clickoutDetector
    on:clickout={close}
    method="dialog"
  >
    <button
      class="btn btn-sm btn-circle absolute right-2 top-2 focus:ring"
      on:click={handleClose}
      on:keydown={handleClose}
      aria-label="Close modal"
    >
      ✕
    </button>
    <slot name="title">
      {#if title}
        <h3 class="text-2xl font-bold text-white">
          {title}
        </h3>
        {#if subtitle}
          <div class="text-sm text-gray-400 mt-1">
            {subtitle}
          </div>
        {/if}
      {/if}
    </slot>
    <slot name="body">
      <div class="py-6">
        <slot />
      </div>
    </slot>
  </form>
</dialog>
