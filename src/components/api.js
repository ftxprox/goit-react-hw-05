import axios from 'axios';

const API_KEY = 'dkRRKiNftIwItsPl_5c-AVgL0qbwxpzuG8GA5XUEKqM';
const BASE_URL = 'https://api.unsplash.com/search/photos';

export const fetchImages = async (query, page = 0) => {
  const response = await axios.get(BASE_URL, {
    params: {
      query,
      per_page: 12,
      page,
    },
    headers: {
      Authorization: `Client-ID ${API_KEY}`,
    },
  });
  return {
    images: response.data.results,
    totalPages: response.data.total_pages,
  };
};