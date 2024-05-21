<script lang="ts">
  import * as config from "$lib/config";
  export let data;

  async function fetchImageUrl(movieId: string) {
    const response = await fetch(`/api/image?movieId=${movieId}`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error);
    }
    const data = await response.json();
    return data.imageUrl;
  }
</script>

<svelte:head>
  <title>{config.title}</title>
</svelte:head>

<!-- Reviews -->
<section class="">
  <p class="my-5">
    Alright, here's the deal: I’m not exactly a film person. However, in a fit
    of inspiration (or perhaps boredom), I decided to start watching more movies
    this summer. Naturally, instead of setting up a Letterboxd account, I went
    ahead and made an entire website to
    <s>learn the web framework 'Svelte'</s> document this grand cinematic
    journey.
    <br />
    I plan on adding reviews for some of my favorite movies without going into the
    story. That's what my idea of a "review" is upto some extent (?) - rather than
    sharing the story itself, I want this to be the "why / when / with whom to watch".
    <br />
    Lastly, there will be a lot of rom coms in this list.
  </p>
  <div
    class="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5"
  >
    {#each data.reviews as review}
      <a
        href={review.slug}
        class="after:content group relative after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
      >
        {#await fetchImageUrl(review.movieId)}
          <p>...waiting</p>
        {:then imageUrl}
          <img
            src={imageUrl}
            alt={review.title}
            class="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
          />
        {:catch error}
          <p>An error occurred: {error.message}</p>
        {/await}
      </a>
    {/each}
  </div>
</section>
