<script lang="ts">
  import { onMount } from "svelte";

  export let strings: string[] = [];
  export let autoStart = true;
  export let loop = true;
  export let persist = false;
  export let pauseFor = 1000;
  export let speed = 100;

  let currentStringIndex = 0;
  let currentCharIndex = 0;
  let displayedText = "";
  let isTyping = false;
  let played = false;

  const typeNextChar = () => {
    if (currentStringIndex >= strings.length) {
      if (loop) {
        currentStringIndex = 0;
      } else {
        if (persist) {
          played = true;
        }
        return;
      }
    }

    const currentString = strings[currentStringIndex];

    if (currentCharIndex < currentString.length) {
      displayedText = currentString.substring(0, currentCharIndex + 1);
      currentCharIndex++;
      setTimeout(typeNextChar, speed);
    } else {
      // Finished typing current string
      setTimeout(() => {
        if (persist && currentStringIndex === strings.length - 1) {
          played = true;
          return;
        }

        // Move to next string
        currentStringIndex++;
        currentCharIndex = 0;
        displayedText = "";

        if (currentStringIndex < strings.length) {
          setTimeout(typeNextChar, pauseFor);
        } else if (loop) {
          currentStringIndex = 0;
          setTimeout(typeNextChar, pauseFor);
        }
      }, pauseFor);
    }
  };

  onMount(() => {
    if (autoStart && strings.length > 0) {
      isTyping = true;
      typeNextChar();
    }
  });
</script>

{#if played}
  <div class="fade-in">{strings.at(-1)}</div>
{:else}
  <div class="typewriter">
    {displayedText}<span class="cursor">|</span>
  </div>
{/if}

<style>
  .typewriter {
    display: inline-block;
  }

  .cursor {
    animation: blink 1s infinite;
  }

  @keyframes blink {
    0%,
    50% {
      opacity: 1;
    }
    51%,
    100% {
      opacity: 0;
    }
  }

  .fade-in {
    animation: fadeIn 0.5s ease-in;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
