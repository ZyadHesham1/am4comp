// src/app/products/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchAPI } from '@/lib/strapi';
import { type Product, type StrapiResponse } from '@/lib/types';
import FilterSidebar from './components/filter.sidebar';
import ProductGrid from './components/product.grid';
import SortDropdown from './components/sort.dropdown';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getProducts() {
      setIsLoading(true);

      // 1. Read ALL state from the URL
      const categories = searchParams?.get('category')?.split(',');
      const brands = searchParams?.get('brand')?.split(','); // <-- ADD THIS LINE
      const sort = searchParams?.get('sort') || 'publishedAt:desc';

      // 2. Build the dynamic query object for Strapi
      const query = {
        populate: '*', // Populate everything to be safe
        sort: [sort],
        filters: {
          // Add filters only if they exist
          ...(categories && {
            category: {
              slug: {
                $in: categories,
              },
            },
          }),
          ...(brands && { // <-- ADD THIS ENTIRE BLOCK
            brand: {
              slug: {
                $in: brands,
              },
            },
          }),
        },
      };

      // 3. Fetch data with the new query
      const res: StrapiResponse<Product> = await fetchAPI('/products', query);
      setProducts(res.data ? (Array.isArray(res.data) ? res.data : [res.data]) : []);
      setIsLoading(false);
    }

    getProducts();
  }, [searchParams]);

  return (
    <div className="container flex flex-col lg:flex-row gap-8 py-12">
      <FilterSidebar />
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold">All Products</h1>
          <SortDropdown />
        </div>
        
        {isLoading ? (
          <div className="text-center py-12 ">Loading products...</div>
        ) : (
          <ProductGrid products={products} />
        )}
      </div>
    </div>
  );
}