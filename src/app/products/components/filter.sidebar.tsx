'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { fetchAPI } from '@/lib/strapi';

// Define types for what we fetch from Strapi
interface FilterOption {
  id: number;
  name: string;
  slug: string;
}

export default function FilterSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [categories, setCategories] = useState<FilterOption[]>([]);
  const [brands, setBrands] = useState<FilterOption[]>([]);

  // Fetch all available categories and brands once on component mount
  useEffect(() => {
    async function getFilterOptions() {
      const catRes = await fetchAPI('/categories');
      const brandRes = await fetchAPI('/brands');
      setCategories(catRes.data);
      setBrands(brandRes.data);
    }
    getFilterOptions();
  }, []);

  const handleCheckboxChange = (type: 'category' | 'brand', value: string) => {
    const params = new URLSearchParams(searchParams?.toString());
    
    // Get the current values for this filter type, split into an array
    const currentValues = params.get(type)?.split(',') || [];
    
    if (currentValues.includes(value)) {
      // If it's already checked, uncheck it by filtering it out
      const newValues = currentValues.filter(item => item !== value);
      if (newValues.length === 0) {
        params.delete(type); // Remove the param if no values are left
      } else {
        params.set(type, newValues.join(','));
      }
    } else {
      // If it's not checked, check it by adding it to the list
      params.set(type, [...currentValues, value].join(','));
    }
    
    router.push(`${pathname}?${params.toString()}`);
  };

  const selectedCategories = searchParams?.get('category')?.split(',') || [];
  const selectedBrands = searchParams?.get('brand')?.split(',') || [];

  return (
    <aside className="w-64 hidden lg:block"> {/* Hide on mobile/tablet */}
      <h3 className="text-xl font-bold mb-4">Filters</h3>
      <Accordion type="multiple" defaultValue={['category', 'brand']} className="w-full">
        <AccordionItem value="category">
          <AccordionTrigger>Category</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map(category => (
                <div key={category.name} className="flex items-center space-x-2">
                  <Checkbox
                    id={`cat-${category.slug}`}
                    checked={selectedCategories.includes(category.slug)}
                    onCheckedChange={() => handleCheckboxChange('category', category.slug)}
                  />
                  <label htmlFor={`cat-${category.slug}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="brand">
          <AccordionTrigger>Brand</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {brands.map(brand => (
                <div key={brand.name} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand.slug}`}
                    checked={selectedBrands.includes(brand.slug)}
                    onCheckedChange={() => handleCheckboxChange('brand', brand.slug)}
                  />
                  <label htmlFor={`brand-${brand.slug}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {brand.name}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
}