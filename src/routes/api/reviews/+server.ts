import { json } from "@sveltejs/kit";
import type { Review } from "$lib/types";

async function getReviews() {
  let reviews: Review[] = [];

  const paths = import.meta.glob("/src/reviews/*.md", { eager: true });

  for (const path in paths) {
    const file = paths[path];
    const slug = path.split("/").at(-1)?.replace(".md", "");

    if (file && typeof file === "object" && "metadata" in file && slug) {
      const metadata = file.metadata as Omit<Review, "slug">;
      const review = { ...metadata, slug } satisfies Review;
      review.published && reviews.push(review);
    }
  }

  reviews = reviews.sort(
    (first, second) =>
      new Date(second.date).getTime() - new Date(first.date).getTime()
  );

  return reviews;
}

export async function GET() {
  const reviews = await getReviews();
  return json(reviews);
}
