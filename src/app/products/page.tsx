'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchAPI } from '@/lib/strapi';
import { type Product, type StrapiResponse } from '@/lib/types';

// Import our new components
import  FilterSidebar  from './components/filter.sidebar';
import  ProductGrid  from './components/product.grid';
import  SortDropdown  from './components/sort.dropdown';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // This effect will now re-run whenever the URL search params change
  useEffect(() => {
    async function getProducts() {
      setIsLoading(true);

      // 1. Read the state from the URL
      const categories = searchParams?.get('category')?.split(',');
      const sort = searchParams?.get('sort') || 'publishedAt:desc';

      // 2. Build the dynamic query object for Strapi
      const query = {
        populate: 'image',
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
        },
      };

      // 3. Fetch data with the new query
const res: StrapiResponse<Product> = await fetchAPI('/products', query);
setProducts(res.data ? (Array.isArray(res.data) ? res.data : [res.data]) : []);
      setIsLoading(false);
    }

    getProducts();
  }, [searchParams]); // 👈 This dependency is the key to making it all work

  return (
    <div className="container flex flex-col lg:flex-row gap-8 py-12">
      {/* TODO: Add a mobile filter button that uses a <Sheet> to show the sidebar */}
      <FilterSidebar />
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold">All Products</h1>
          <SortDropdown />
        </div>
        
        {isLoading ? (
          <div className="text-center py-12">Loading products...</div>
        ) : (
          <ProductGrid products={products} />
        )}

        {/* TODO: Add Pagination component here */}
      </div>
    </div>
  );
}