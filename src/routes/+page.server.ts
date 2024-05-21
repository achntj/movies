import type { Review } from "$lib/types";

export async function load({ fetch }) {
  const response = await fetch("api/reviews");
  const reviews: Review[] = await response.json();
  return { reviews };
}
