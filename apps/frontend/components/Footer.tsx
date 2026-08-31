import React from 'react';
import Link from 'next/link';
import { UtensilsCrossed } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-low py-xl mt-auto border-t-4 border-on-surface">
      <div className="max-w-7xl mx-auto px-xl flex flex-col md:flex-row justify-between items-center gap-lg">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-primary text-on-primary rounded-lg border-2 border-on-surface shadow-[2px_2px_0px_0px_#1a1c1c] flex items-center justify-center font-black text-sm">
            <UtensilsCrossed size={16} className="stroke-[2.5]" />
          </div>
          <span 
            className="font-headline-md text-on-surface font-black text-xl tracking-tight" 
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Street<span className="text-primary">Bite</span>
          </span>
        </div>
        
        <nav className="flex flex-wrap justify-center gap-lg">
          <Link href="/about" className="text-label-md text-on-surface hover:text-primary transition-colors font-bold uppercase tracking-wider">
            About Us
          </Link>
          <Link href="/partner" className="text-label-md text-on-surface hover:text-primary transition-colors font-bold uppercase tracking-wider">
            Partner with Us
          </Link>
          <Link href="/contact" className="text-label-md text-on-surface hover:text-primary transition-colors font-bold uppercase tracking-wider">
            Contact
          </Link>
        </nav>
        
        <div className="text-label-sm text-on-surface-variant font-bold text-center">
          © {new Date().getFullYear()} StreetBite. Made for foodies.
        </div>
      </div>
    </footer>
  );
}
