<script lang="ts">
  import { formatDate } from "$lib/utils";
  import { StarIcon } from "lucide-svelte";

  async function fetchImageUrl(movieId: string) {
    const response = await fetch(`/api/image?movieId=${movieId}`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error);
    }
    const data = await response.json();
    return data.imageUrl;
  }

  export let data;
</script>

<!-- SEO -->
<svelte:head>
  <title>{data.meta.title}</title>
  <meta property="og:type" content="article" />
  <meta property="og:title" content={data.meta.title} />
</svelte:head>

<article>
  {#await fetchImageUrl(data.meta.movieId)}
    <div class="w-48 h-72 rounded-lg" />
  {:then imageUrl}
    <img src={imageUrl} alt={data.meta.title} class="w-48 rounded-lg" />
  {/await}

  <div class="article">
    <h1>{data.meta.title}</h1>
    <svelte:component this={data.content} />
  </div>

  <div class="flex items-center space-x-2 my-4">
    <StarIcon />
    <p>
      {data.meta.stars} / 10
    </p>
  </div>
  <p class="text-sm">{formatDate(data.meta.date)}</p>
</article>
