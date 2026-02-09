<script lang="ts">
  import { onMount, onDestroy, type Snippet } from "svelte";
  import { clickoutDetector } from "~/lib/directives";

  interface Props {
    title?: string;
    subtitle?: string;
    open?: boolean;
    class?: string;
    onclose?: (val: boolean) => void;
    children?: Snippet;
  }

  let {
    title = "",
    subtitle = "",
    open = $bindable(false),
    class: className = "",
    onclose,
    children,
  }: Props = $props();

  const close = () => {
    if (!open) return;
    open = false;
    onclose?.(false);
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

    close();
  };
</script>

<dialog class="modal modal-bottom sm:modal-middle" use:clickoutDetector {open}>
  <form
    class="modal-box relative {className}"
    use:clickoutDetector
    onclickout={close}
    method="dialog"
  >
    <button
      class="btn btn-sm btn-circle absolute right-2 top-2 focus:ring"
      onclick={handleClose}
      onkeydown={handleClose}
      aria-label="Close modal"
    >
      ✕
    </button>
    
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
    
    <div class="py-6">
      {@render children?.()}
    </div>
  </form>
</dialog>