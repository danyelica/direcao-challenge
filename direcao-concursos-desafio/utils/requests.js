import { createClient } from "pexels";

const client = createClient(process.env.NEXT_PUBLIC_API_KEY);

export default async function requestVideos(query, number) {
  try {
    const response = await client.videos.search({ query, per_page: number });
    return response;
  } catch (error) {
    console.log(error);
  }
}
