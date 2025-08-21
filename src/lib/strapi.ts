import qs from 'qs'; // You'll need to install this: npm install qs
import { type Product, type StrapiResponse } from '@/lib/types';
import { notFound } from 'next/navigation'; // Import Next.js's notFound utility


const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

/**
 * A helper function to make API requests to Strapi.
 * @param path The path of the API endpoint to fetch (e.g., '/products')
 * @param urlParamsObject Query parameters to add to the URL
 * @param options Additional options for the fetch request
 * @returns The JSON response from the API
 */
export async function fetchAPI(
  path: string,
  urlParamsObject: Record<string, unknown> = {},
  options: RequestInit = {}
) {
  try {
    const mergedOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    };

    const queryString = qs.stringify(urlParamsObject);
    const requestUrl = `${STRAPI_URL}/api${path}${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(requestUrl, mergedOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching from Strapi:", error);
    throw new Error(`Failed to fetch API: ${path}`);
  }
}


export async function getProductById(id: string | number): Promise<Product> {
  // The response for a single item is an object, not an array.
  const strapiResponse: StrapiResponse<Product> = await fetchAPI(`/products/${id}`, {
    populate: '*',
  });

  if (!strapiResponse.data) {
    notFound();
  }

  // The data is already in the correct flat format we need. No transformation is necessary.
  return strapiResponse.data as Product;
}

export async function getProductBySlug(slug: string): Promise<Product> {
  // Strapi's filtering syntax to find an exact match on the slug field.
  const findBySlugQuery = {
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: '*', // Populate all relations
  };

  const strapiResponse: StrapiResponse<Product> = await fetchAPI('/products', findBySlugQuery);

  // When filtering, Strapi always returns an array. If it's empty, the product was not found.
  if (!strapiResponse.data || (strapiResponse.data as Product[]).length === 0) {
    notFound();
  }
  
  // Return the first item from the array result.
  return (strapiResponse.data as Product[])[0];
}