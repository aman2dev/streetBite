'use client';

import React from 'react';
import clsx from 'clsx';

interface MenuItem {
  name: string;
  price: string;
  isVeg?: boolean;
}

interface CartMenuProps {
  menu?: MenuItem[];
}

export default function CartMenu({ menu }: CartMenuProps) {
  if (!menu || menu.length === 0) return null;

  return (
    <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border-4 border-on-surface shadow-[8px_8px_0px_0px_#1a1c1c] flex flex-col gap-6">
      <h2 
        className="text-2xl sm:text-3xl text-on-surface font-extrabold flex items-center gap-2"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        <span>📜 Popular Menu Items</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {menu.map((item, index) => (
          <div 
            key={index}
            className="p-4 bg-surface rounded-2xl border-2 border-on-surface shadow-[4px_4px_0px_0px_#1a1c1c] flex justify-between items-center"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className={clsx(
                  "w-3 h-3 rounded-full border border-on-surface",
                  item.isVeg ? "bg-emerald-500" : "bg-red-500"
                )}></span>
                <h4 className="font-bold text-on-surface text-base">{item.name}</h4>
              </div>
            </div>
            <span className="font-black text-primary text-lg bg-primary-container px-3 py-1 rounded-xl border border-on-surface">
              {item.price}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
