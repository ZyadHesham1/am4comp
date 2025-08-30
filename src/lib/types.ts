// This represents the shape of the 'image' object directly.
interface StrapiImage {
  id: number;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: { // Making thumbnail optional
      name: string;
      hash: string;
      ext: string;
      mime: string;
      path: string | null;
      width: number;
      height: number;
      size: number;
      url: string;
    };
    // You can add other formats like small, medium, large if you have them
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  createdAt: string;
  updatedAt: string;
}

// This represents the shape of a populated relation (Category or Brand).
interface StrapiRelation {
  id: number;
  name: string;
  slug: string;
}

// This is the correct, "flat" shape for a single product from your API.
export interface Product {
  id: number;
  title: string;
  description: string | null;
  price: number | null;
  image: StrapiImage | null;
  // Strapi calls the category relation 'product' in your JSON, let's match that.
  category: StrapiRelation | null;
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