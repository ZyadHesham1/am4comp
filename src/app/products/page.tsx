import { Suspense } from 'react';
import ProductView from './components/product.view';

// A simple skeleton component to show while the client component loads
function ProductsLoadingSkeleton() {
  return (
    <div className="container flex flex-col lg:flex-row gap-8 py-12">
      {/* Sidebar Placeholder */}
      <aside className="w-64 hidden lg:block">
        <div className="h-8 w-24 bg-gray-200 rounded animate-pulse mb-4"></div>
        <div className="space-y-4">
          <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
        </div>
      </aside>
      {/* Main Content Placeholder */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-40 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="text-center py-12">Loading products...</div>
      </div>
    </div>
  );
}


export default function ProductsPage() {
  return (
    // This Suspense boundary is the key.
    // It tells Next.js to render the fallback UI first,
    // and then swap in the ProductView component once it's ready on the client.
    <Suspense fallback={<ProductsLoadingSkeleton />}>
      <ProductView />
    </Suspense>
  );
}