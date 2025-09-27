import { fetchAPI } from '@/lib/strapi';
import { type Product, type StrapiResponse } from '@/lib/types';
import  ProductCard  from '@/components/shared/product.card';
import HeroSection  from '@/components/shared/homepage/hero.section';
import  ValuesSection  from '@/components/shared/homepage/values.section';


export default async function Homepage() {
  const strapiResponse: StrapiResponse<Product> = await fetchAPI('/products', {
    populate: 'image', // Specifically ask for the image relation to be populated
  });

  const products = Array.isArray(strapiResponse.data) ? strapiResponse.data : [strapiResponse.data];

  return (
    <>
    <HeroSection 
      lng="en" 
      backgroundImageUrl="/images/hero-bg.jpg" 
      ctaLink="/products" 
    />

    <ValuesSection />
    <div className="container py-12 bg-gray-500 min-w-full">
      <h1 className="text-3xl font-bold mb-8 p-4">Featured Products</h1>
      
      {!products || products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
    </>
  );
}