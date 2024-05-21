<script lang="ts">
  import Nav from "./nav.svelte";

  import "@fontsource/ibm-plex-serif/400.css";
  import "@fontsource/poppins/500.css";
  import "../app.css";
</script>

<div class="mx-auto max-w-5xl px-5 my-10">
  <Nav />
  <main class="p-5">
    <slot />
  </main>
</div>
