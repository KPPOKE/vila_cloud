<script lang="ts">
  let { children } = $props();
</script>

<svelte:head>
  <style>
    body {
      background: #f0f2f5 !important;
      background-image: none !important;
    }
  </style>
</svelte:head>

{@render children()}
