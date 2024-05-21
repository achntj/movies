import { error } from "@sveltejs/kit";

export async function load({ params }) {
  try {
    const review = await import(`../../reviews/${params.slug}.md`);

    return {
      content: review.default,
      meta: review.metadata,
    };
  } catch (e) {
    error(404, `Could not find ${params.slug}`);
  }
}
