import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-low py-xl mt-auto border-t-4 border-on-surface">
      <div className="max-w-7xl mx-auto px-xl flex flex-col md:flex-row justify-between items-center gap-lg">
        <div className="flex items-center gap-sm">
          <img 
            alt="StreetBite" 
            className="h-8 w-auto grayscale opacity-80" 
            src="https://lh3.googleusercontent.com/aida/AEtjO1UUmzIJCqTTgZZmT97IDRMlKzoiXYjra0D5PmQws4w30o60bsJOJuI3GC3yPgYbCqI48IIS-dgDHE5bHpHqXhlvge2kSLiQyDKyktBdsHZFwpz7Zu27Rc9yp2rs7JjkwxRTOu0Uve7jo1fZPKrvibPtRHoLSZwg_fV8-J3PNRcXeMMQXprWenjGpX5srry4iiojCFYa2q9M7GFwNmhCfMDFsHnfHxuA9bXL2xXFfPoBlMGy-yJIADDYIxo"
          />
          <span 
            className="font-headline-md text-on-surface font-bold text-xl" 
            style={{ fontFamily: "'Gilroy-Bold', sans-serif" }}
          >
            StreetBite
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
