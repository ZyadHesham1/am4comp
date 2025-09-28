'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchAPI } from '@/lib/strapi';
import { type Product, type StrapiResponse } from '@/lib/types';
import FilterSidebar from './filter.sidebar';
import ProductGrid from './product.grid';
import SortDropdown from './sort.dropdown';

// Renamed from ProductsPage to ProductView
export default function ProductView() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const searchQuery = searchParams?.get('q');

  useEffect(() => {
    async function getProducts() {
      setIsLoading(true);
      const categories = searchParams?.get('category')?.split(',');
      const brands = searchParams?.get('brand')?.split(',');
      const sort = searchParams?.get('sort') || 'publishedAt:desc';
      const queryParam = searchParams?.get('q');

      const query = {
        populate: '*',
        sort: [sort],
        filters: {
          ...(categories && { category: { slug: { $in: categories } } }),
          ...(brands && { brand: { slug: { $in: brands } } }),
          ...(queryParam && {
            $or: [
              { title: { $containsi: queryParam } },
              { description: { $containsi: queryParam } },
            ],
          }),
        },
      };

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
          <h1 className="text-3xl font-bold">
            {searchQuery 
              ? <>Search results for &quot;{searchQuery}&quot;</> 
              : 'All Products'
            }
          </h1>
          <SortDropdown />
        </div>
        
        {isLoading ? (
          <div className="text-center py-12">Loading products...</div>
        ) : (
          <ProductGrid products={products} />
        )}
      </div>
    </div>
  );
}