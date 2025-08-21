'use client'; // This is now a Client Component

import { useState, useEffect } from 'react';
import { fetchAPI } from '@/lib/strapi';
import { type Product, type StrapiResponse } from '@/lib/types';
import ProductCard  from '@/components/shared/product.card'; // Use your existing card

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch initial data when the component mounts
    async function getProducts() {
      setIsLoading(true);
      const res: StrapiResponse<Product> = await fetchAPI('/products', {
        populate: 'image',
      });
      setProducts(res.data);
      setIsLoading(false);
    }
    getProducts();
  }, []); // The empty array means this runs only once on mount

  if (isLoading) {
    return <div className="container py-12">Loading products...</div>;
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>
      
      {!products || products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-2/3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}