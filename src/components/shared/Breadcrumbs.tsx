'use client'; // This component MUST be a Client Component to use the usePathname hook.

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react'; // A nice icon for the separator

export function Breadcrumbs() {
  const pathname = usePathname();

  // Don't show breadcrumbs on the homepage.
  if (pathname === '/') {
    return null;
  }

  // Split the pathname into segments and remove any empty strings from leading slashes.
  const segments = pathname?.split('/').filter(Boolean);

  // Helper function to make segment text more readable (e.g., 'some-product-name' -> 'Some Product Name')
  const formatSegment = (segment: string) => {
    return segment
      .replace(/-/g, ' ') // Replace hyphens with spaces
      .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize the first letter of each word
  };

  return (
    // Use a <nav> element for accessibility
    <nav aria-label="breadcrumb" className="container p-4 ">
      <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
        {/* Always include the "Home" link at the beginning */}
        <li>
          <Link href="/" className="transition-colors hover:text-primary">
            Home
          </Link>
        </li>

        {/* Map over the path segments to create the rest of the breadcrumbs */}
        {segments?.map((segment, index) => {
          // Build the cumulative path for each link
          const href = '/' + segments.slice(0, index + 1).join('/');
          
          // The last segment is the current page, so it shouldn't be a link.
          const isLast = index === segments.length - 1;

          return (
            // Use React.Fragment to group the separator and the link/text
            <li key={href} className="flex items-center space-x-2">
              <ChevronRight className="h-4 w-4" />
              {isLast ? (
                <span className="font-semibold text-foreground">
                  {formatSegment(segment)}
                </span>
              ) : (
                <Link href={href} className="transition-colors hover:text-primary">
                  {formatSegment(segment)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}