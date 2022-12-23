import api from "../services/api";

export default async function requestVideos(query, number) {
  const search = {
    part: "snippet",
    type: "video",
    maxResults: number,
    q: query,
  };

  const { data } = await api.get(
    `/search?key=${process.env.NEXT_PUBLIC_API_KEY}`,
    {
      params: search,
    }
  );

  return data;
}
