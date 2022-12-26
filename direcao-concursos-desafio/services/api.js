import axios from "axios";

export const youtubeApi = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

export function linkApi(options) {
  const response = axios.request(options);
  return response;
}
