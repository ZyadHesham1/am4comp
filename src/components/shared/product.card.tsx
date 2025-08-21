import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { type Product } from '@/lib/types';
import { ProductQuickView } from './product.quick.view'; // Import the new dialog

interface ProductCardProps {
  product: Product;
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

export default function ProductCard({ product }: ProductCardProps) {
  if (!product) return null;

  const { title, price, image } = product;
  const imageUrl = image ? STRAPI_URL + image.url : '/placeholder.png';

  return (
    // The main card is now a positioning context for the hover overlay
    <div className="group relative">
      <Link href={`/products/${product.slug}`}>
        <Card className="overflow-hidden h-full flex flex-col transition-shadow duration-300 group-hover:shadow-xl">
          <CardHeader className="p-0">
            <div className="relative w-full aspect-square bg-gray-100">
              <Image
                src={imageUrl}
                alt={title || 'Product image'}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </CardHeader>
          <CardContent className="p-4 flex-grow">
            <CardTitle className="text-lg font-semibold leading-snug">{title}</CardTitle>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <p className="font-bold text-lg text-gray-800">
              {price ? `${price} EGP` : 'Contact for Price'}
            </p>
          </CardFooter>
        </Card>
      </Link>

      {/* --- Hover Overlay with Quick View Button --- */}
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <ProductQuickView product={product}>
          <Button variant="secondary">
            <Eye className="mr-2 h-4 w-4" />
            Quick View
          </Button>
        </ProductQuickView>
      </div>
    </div>
  );
}