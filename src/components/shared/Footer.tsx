// src/components/shared/Footer.tsx

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <span className="text-2xl font-bold">AM4Computers</span>
            <p className="text-muted-foreground">
Your source for printing supplies, storage media, hardware and accessories and full B2B services in Cairo, EGYPT            </p>
          </div>
          <div>
            <h3 className="font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li><Link href="/" className="hover:text-primary">Home</Link></li>
              <li><Link href="/products" className="hover:text-primary">All Products</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Contact</h3>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li>Email: info@am4computers.com</li>
              <li>Phone: +202 24159711</li>
              <li>Phone: +202 24142229</li>
              <li>Fax: +202 24159711</li>

            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} AM4Computers. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}