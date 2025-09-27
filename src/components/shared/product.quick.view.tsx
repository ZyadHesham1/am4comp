import { type Product } from '@/lib/types';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Link from 'next/link';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

interface ProductQuickViewProps {
  product: Product;
  children: React.ReactNode; // The trigger button will be passed as a child
}

export function ProductQuickView({ product, children }: ProductQuickViewProps) {
  const { title, description, price } = product;
  const imageUrl = product.image?.[0]?.url 
    ? `${STRAPI_URL}${product.image[0].url}` 
    : '/placeholder.png';
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
            <Image src={imageUrl} alt={title} fill className="object-contain p-2" />
          </div>
          <div className="flex flex-col">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
            </DialogHeader>
            <p className="text-2xl font-bold my-4">
              {price ? `${price} EGP` : 'Contact for Price'}
            </p>
            <p className="text-muted-foreground text-sm line-clamp-4">
              {description}
            </p>
            <div className="mt-auto pt-6 space-y-2">
              <Button asChild variant="default" className="w-full">
                <Link href={`/products/${product.slug}`}>Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}