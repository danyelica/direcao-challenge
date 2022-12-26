import { youtubeApi, linkApi } from "../services/api";
const axios = require("axios");

export async function requestVideos(query, number) {
  const search = {
    part: "snippet",
    type: "video",
    maxResults: number,
    q: query,
  };

  try {
    const { data } = await youtubeApi.get(
      `/search?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
      {
        params: search,
      }
    );

    return data;
  } catch (error) {
    return error;
  }
}

export async function currentVideo(query, number) {
  const options = {
    method: "GET",
    url: "https://ytstream-download-youtube-videos.p.rapidapi.com/dl",
    params: { id: query },
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_LINK_API_KEY,
      "X-RapidAPI-Host": "ytstream-download-youtube-videos.p.rapidapi.com",
    },
  };

  try {
    const { data } = await linkApi(options);

    return data;
  } catch (error) {
    return error;
  }
}
