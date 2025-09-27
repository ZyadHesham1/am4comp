import { type Product } from '@/lib/types';
import ProductCard from '@/components/shared/product.card';

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  // If there are no products, show a clear message.
  if (!products || products.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 ">
        <p className="text-muted-foreground">No products found for the selected filters.</p>
      </div>
    );
  }

  // Otherwise, render the grid of product cards.
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
      </div>
  );
}