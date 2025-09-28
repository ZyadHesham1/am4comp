// src/components/shared/Header.tsx

'use client'; // This component must be a client component for the search functionality

import Link from 'next/link';
import Image from 'next/image';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, Search } from "lucide-react";
import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// Functional SearchBar component
function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // const pathname = usePathname();

  // Get the initial search query from the URL on page load
  const initialQuery = searchParams?.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  
  // Use a ref to store the timer ID
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // This effect synchronizes the input field if the URL changes (e.g., back button)
  useEffect(() => {
    setSearchTerm(searchParams?.get('q') || '');
  }, [searchParams]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);

    // 1. Clear the previous timer if it exists
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // 2. Set a new timer
    debounceTimer.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams?.toString());

      if (newSearchTerm) {
        // If there's a search term, set it
        params.set('q', newSearchTerm);
      } else {
        // If the search term is empty, remove it
        params.delete('q');
      }

      // Update the URL. We only navigate to the /products page.
      // If the user is on another page, searching will take them to the products page.
      router.push(`/products?${params.toString()}`);

    }, 500); // 500ms delay
  };

  return (
    // We remove the <form> wrapper as we are no longer relying on submission
    <div className="relative w-full max-w-xs">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search..."
        className="w-full rounded-lg bg-secondary pl-8"
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  );
}
// Redesigned Header component
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">

        {/* === Left Section (Mobile Menu & Spacer) === */}
        <div className="flex-1 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <Link href="/products" className="text-lg font-medium">
                  Products
                </Link>
                <SearchBar />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* === Center Section (Logo) === */}
        {/* The logo is positioned absolutely to ensure it's always in the exact center */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link href="/" className="flex items-center gap-2">
             <Image src="/Logo.jpg" alt="AM4Computers Logo" width={100} height={30} />
          </Link>
        </div>

        {/* === Right Section (Desktop Nav) === */}
        <nav className="hidden flex-1 items-center justify-end gap-6 md:flex">
          <Link href="/products" className="text-sm font-medium transition-colors hover:text-primary">
            Products
          </Link>
          <SearchBar />
        </nav>

      </div>
    </header>
  );
}