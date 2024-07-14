'use server';
import api from '@/utils/axiosInstance';

const BASE_URL = 'https://rastro-backend-4a9us.ondigitalocean.app/api';

export async function getProduct(id: string) {
  const res = await fetch(`${BASE_URL}/product/${id}`);
  const products = await res.json();

  return products;
}

export async function getSuggestions(
  id: string,
  page: string | number,
  page_size: string | number
) {
  const res = await fetch(
    `${BASE_URL}/product/${id}/nearest?page=${page}&page_size=${page_size}`,
    { next: { revalidate: 30 } }
  );
  const products = await res.json();

  return products;
}

export async function getProducts(
  page: string | number,
  page_size: string | number,
  searchQuery: string = '',
  country: string = ''
) {
  console.log({ searchQuery });

  const queryParams = buildQueryParams({
    page,
    page_size,
    query: searchQuery,
    location_country: country,
  });

  const res = await fetch(`${BASE_URL}/products?${queryParams}`, {
    next: { revalidate: 30 },
  });

  const products = await res.json();
  console.log({ products });
  return products;
}

export async function getLikedProducts() {
  const res = await api.get(`/user/liked-products`);
  const products = res.data;
  console.log({ products });
  return products;
}

const buildQueryParams = (params: any) => {
  const query = new URLSearchParams();

  Object.keys(params).forEach((key) => {
    if (params[key]) {
      query.append(key, params[key]);
    }
  });

  return query.toString();
};
