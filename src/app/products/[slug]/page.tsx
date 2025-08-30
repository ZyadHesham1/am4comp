import { getProductBySlug } from '@/lib/strapi';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

export default async function SingleProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);

  // Destructure directly from the flat product object.
  const { title, description, price, image, category, brand } = product;
  const imageUrl = image?.url ? STRAPI_URL + image.url : '/placeholder.png';

  return (
    <div className="container py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <div className="relative aspect-square rounded-lg border bg-gray-50 overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-contain p-4"
          />
        </div>
        <div className="flex flex-col">
          <div className="space-y-1 mb-4">
            {/* Note the change from product.attributes.name to just product.name */}
            {category && (
              <Badge variant="outline">{category.name}</Badge>
            )}
            <h1 className="text-3xl lg:text-4xl font-bold">{title}</h1>
            {brand && (
              <p className="text-muted-foreground">by {brand.name}</p>
            )}
          </div>
          <p className="text-3xl font-bold my-4">
            {price ? `${price} EGP` : 'Contact for Price'}
          </p>
          <div className="prose text-muted-foreground mt-4">
            {description}
          </div>
          <div className="mt-auto pt-8">
            <Button size="lg" className="w-full">
              Add to Cart (Coming Soon)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}