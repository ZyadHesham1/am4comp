// This represents the shape of the 'image' object directly.
interface StrapiImage {
  id: number;
  url: string;
  name: string;
}

// This represents the shape of a populated relation (Category or Brand).
interface StrapiRelation {
  id: number;
  name: string;
  slug: string;
}

// This is the correct, "flat" shape for a single product from your API.
export interface Product {
  id: number | null;
  title: string;
  description: string | null;
  price: number | null;
  image: StrapiImage | null;
  // Strapi calls the category relation 'product' in your JSON, let's match that.
  product: StrapiRelation | null;
  brand: StrapiRelation | null;
  slug: string;
}

// This is the standard shape of a full API response from Strapi.
export interface StrapiResponse<T> {
  data: T | T[]; // The data can be a single object or an array of objects
  meta: {
    pagination?: { // Pagination is optional (not present for single item fetches)
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    }
  }
}