// "use server";


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
  searchQuery: string = ""
) {
  const res = await fetch(
    `${BASE_URL}/products?page=${page}&page_size=${page_size}&query=${searchQuery}`,
    { next: { revalidate: 30 } }
  );
  const products = await res.json();

  return products;
}
