import Link from 'next/link';
// import Image from 'next/image'; //TODO: Uncomment when logo is ready
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, Search } from "lucide-react";

// This is a small, self-contained component for the search bar.
// It makes our main component cleaner.
function SearchBar() {
  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search products..."
        className="w-full rounded-lg bg-background pl-8"
      />
    </div>
  );
}

export function Header() {
  return (
    // The header is sticky, has a border, and a high z-index to stay on top
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        
        {/* === Logo Section (Left) === */}
        <Link href="/" className="flex items-center gap-2">
          {/* Use a placeholder for the logo for now. Replace with your actual logo in /public */}
          {/* <Image src="/logo.svg" alt="AM4Computers Logo" width={32} height={32} /> */}
          <span className="text-lg font-bold m-2 p-4">AM4Computers</span>
        </Link>

        {/* === Desktop Navigation (Center/Right - Hidden on Mobile) === */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/products" className="text-sm font-medium transition-colors hover:text-primary">
            Products
          </Link>
          <SearchBar />
        </nav>

        {/* === Mobile Navigation (Hamburger Menu + Sheet) === */}
        <div className="md:hidden">
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
                {/* Mobile navigation links are stacked vertically */}
                <Link href="/products" className="text-lg font-medium">
                  Products
                </Link>
                {/* We can reuse the SearchBar component here! */}
                <SearchBar />
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  );
}