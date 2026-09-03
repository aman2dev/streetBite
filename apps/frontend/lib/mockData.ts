export interface Review {
  id: string;
  user: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  parentReviewId?: string | null;
  replies?: Review[];
  cleanliness?: number;
  ownerBehavior?: number;
  foodQuality?: number;
  foodQuantity?: number;
  valueForMoney?: number;
}

export interface StreetFoodCart {
  id: string;
  name: string;
  rating: number;
  distance: string;
  category: string;
  image: string;
  images?: string[];
  specialty?: string;
  isOpen?: boolean;
  timings?: string;
  operatingDays?: string;
  activeWeeks?: number;
  address?: string;
  googleMapUrl?: string;
  phone?: string;
  description?: string;
  reviewsCount?: number;
  menu?: { name: string; price: string; isVeg?: boolean }[];
  reviews?: Review[];
  latitude?: number;
  longitude?: number;
}

export const MOCK_CARTS: StreetFoodCart[] = [
  {
    id: '1',
    name: "Ramu's Litti Chokha",
    rating: 4.9,
    reviewsCount: 142,
    distance: "0.2 mi away",
    category: "Chaat",
    specialty: "Pure Desi Ghee Litti Chokha",
    isOpen: true,
    timings: "4:00 PM - 10:30 PM",
    operatingDays: "Mon - Sat (6 days/week)",
    activeWeeks: 104, // 2 years
    address: "Stall #12, Near Maurya Lok Complex, Dak Bungalow Road, Patna",
    googleMapUrl: "https://maps.google.com/?q=Maurya+Lok+Complex+Patna",
    phone: "+91 98765 43210",
    description: "Famous authentic Bihari Litti Chokha roasted on coal embers and dipped in hot organic A2 Desi Ghee. Serving happy street food lovers in Patna for over 2 years!",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAiw4e3fUfqteAO4ixcLNH3kbRrUl0HqXKoPJNwdfRlU-NT2eckprko2XXPQsKyNgNMev9UodzItakOZR81Zyh86ObNwmfOgBw6hUWo7NoXSWA8o0ByG_MpnxwUcQ_Uq0Eh_j5K36nmnnmvUAuVkZlQj1WliKN0C_HZnledsAMu5stJP8YmP4c18c9BLF51ON2phWKpwAY_-SlDzw18xg4notqHqRtqaNVGmAxjiknPX1S-d7xeFKGE",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAiw4e3fUfqteAO4ixcLNH3kbRrUl0HqXKoPJNwdfRlU-NT2eckprko2XXPQsKyNgNMev9UodzItakOZR81Zyh86ObNwmfOgBw6hUWo7NoXSWA8o0ByG_MpnxwUcQ_Uq0Eh_j5K36nmnnmvUAuVkZlQj1WliKN0C_HZnledsAMu5stJP8YmP4c18c9BLF51ON2phWKpwAY_-SlDzw18xg4notqHqRtqaNVGmAxjiknPX1S-d7xeFKGE",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAU58eSFZWvue3-JC9VhTx6Jn0imphucVAoCrbozFjDWqdTko1rsSbW7vYtVloEgfTsZM8-DdeDNfnQk0bhiPl9s2VOUi_3CAWHd8Pe_Xz_4aAGXWcVlzTp1l7L2c-WAnuia20Z36Cg414CwURviB6USv1zhoX4Uqw-Y9vu-jG30OogCfcM08TxLNEVu3AYqFRObPjXu89_6_z4r0koF7kvZrtAAwN4nb4B9fE68cBnRxdY7FVv-ZjN"
    ],
    menu: [
      { name: "Special Ghee Litti Chokha (2 Pcs)", price: "₹60", isVeg: true },
      { name: "Sattu Paratha with Baigan Bharta", price: "₹80", isVeg: true },
      { name: "Desi Chana Ghugni", price: "₹40", isVeg: true },
      { name: "Sweet Lassi (Clay Kulhad)", price: "₹35", isVeg: true },
    ],
    reviews: [
      {
        id: 'r1',
        user: "Aman Kumar",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150",
        rating: 5,
        date: "2 days ago",
        comment: "Best Litti Chokha in Patna! The ghee dip and spicy brinjal chokha are out of this world."
      },
      {
        id: 'r2',
        user: "Priya Sharma",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
        rating: 5,
        date: "1 week ago",
        comment: "Very hygienic cart and warm hospitality. Must visit when you are near Maurya Lok!"
      },
      {
        id: 'r3',
        user: "Rahul Verma",
        avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=150",
        rating: 4,
        date: "2 weeks ago",
        comment: "Great taste! Waiting time can be 10 mins during evening peak hours."
      }
    ]
  },
  {
    id: '2',
    name: "Maurya Lok Chaat",
    rating: 4.8,
    reviewsCount: 98,
    distance: "0.5 mi away",
    category: "Chaat",
    specialty: "Crispy Dahi Bhalla & Aloo Tikki",
    isOpen: true,
    timings: "3:30 PM - 10:00 PM",
    operatingDays: "All 7 Days Open",
    activeWeeks: 78,
    address: "Shop #4, Maurya Lok Shopping Complex, Fraser Road, Patna",
    phone: "+91 98765 12345",
    description: "Crispy Golden Aloo Tikki Chaat topped with creamy curd, sweet tamarind chutney, and spicy green coriander salsa.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAU58eSFZWvue3-JC9VhTx6Jn0imphucVAoCrbozFjDWqdTko1rsSbW7vYtVloEgfTsZM8-DdeDNfnQk0bhiPl9s2VOUi_3CAWHd8Pe_Xz_4aAGXWcVlzTp1l7L2c-WAnuia20Z36Cg414CwURviB6USv1zhoX4Uqw-Y9vu-jG30OogCfcM08TxLNEVu3AYqFRObPjXu89_6_z4r0koF7kvZrtAAwN4nb4B9fE68cBnRxdY7FVv-ZjN",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAU58eSFZWvue3-JC9VhTx6Jn0imphucVAoCrbozFjDWqdTko1rsSbW7vYtVloEgfTsZM8-DdeDNfnQk0bhiPl9s2VOUi_3CAWHd8Pe_Xz_4aAGXWcVlzTp1l7L2c-WAnuia20Z36Cg414CwURviB6USv1zhoX4Uqw-Y9vu-jG30OogCfcM08TxLNEVu3AYqFRObPjXu89_6_z4r0koF7kvZrtAAwN4nb4B9fE68cBnRxdY7FVv-ZjN"
    ],
    menu: [
      { name: "Special Dahi Aloo Tikki", price: "₹50", isVeg: true },
      { name: "Papdi Chaat", price: "₹45", isVeg: true },
      { name: "Pani Puri (6 Pcs)", price: "₹30", isVeg: true },
    ],
    reviews: [
      {
        id: 'r4',
        user: "Neha Singh",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
        rating: 5,
        date: "3 days ago",
        comment: "The Dahi Bhalla is super soft and fresh. My favorite evening snack spot!"
      }
    ]
  },
  {
    id: '3',
    name: "Boring Road Rolls",
    rating: 4.7,
    reviewsCount: 86,
    distance: "1.2 mi away",
    category: "Rolls",
    specialty: "Kolkata Style Paneer & Egg Roll",
    isOpen: true,
    timings: "5:00 PM - 11:00 PM",
    operatingDays: "Tue - Sun (6 days/week)",
    activeWeeks: 48,
    address: "Opposite Boring Road Chauraha, Patna",
    description: "Hot flaky laccha paratha rolls filled with spicy paneer tikka, crunchy onions, and signature sauces.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDR7vE_dWjIzsh-d6KXrPGue5qiDqB-J4PM9d-VipTyXxbGmH4w6KmKT8gwOPnjLnnoZQwghzgbFraS81zHQ4E-M-6OMe1hcrqr5RYc3zm03a1bYYU_Z8JTXUO7ySmUwhHmbrPnR5gAMiu3IVX5HpAcvwHWnQ1dlj1LrVVi3TNXyZ_D5cFMhLB_00sGAbftYAgEl1J-ib7J1BINZzkPtgULsCr7c6o8rYbCWURBvo2yUrRB5_G2aT0S",
    menu: [
      { name: "Double Egg Roll", price: "₹60" },
      { name: "Paneer Tikka Roll", price: "₹80", isVeg: true },
      { name: "Chicken Frankie Roll", price: "₹95" },
    ],
    reviews: [
      {
        id: 'r5',
        user: "Vikram Raj",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
        rating: 5,
        date: "5 days ago",
        comment: "Best Kolkata rolls in Boring Road!"
      }
    ]
  },
  {
    id: '4',
    name: "Sharma Ji Momos",
    rating: 4.6,
    reviewsCount: 64,
    distance: "1.5 mi away",
    category: "Momos",
    specialty: "Steamed & Kurkure Momos",
    isOpen: false,
    timings: "4:30 PM - 10:00 PM",
    operatingDays: "Mon - Sat (6 days/week)",
    activeWeeks: 32,
    address: "Near Kankarbagh Tempo Stand, Patna",
    description: "Soft juicy momos served with fiery red garlic chili chutney and mayonnaise.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAiw4e3fUfqteAO4ixcLNH3kbRrUl0HqXKoPJNwdfRlU-NT2eckprko2XXPQsKyNgNMev9UodzItakOZR81Zyh86ObNwmfOgBw6hUWo7NoXSWA8o0ByG_MpnxwUcQ_Uq0Eh_j5K36nmnnmvUAuVkZlQj1WliKN0C_HZnledsAMu5stJP8YmP4c18c9BLF51ON2phWKpwAY_-SlDzw18xg4notqHqRtqaNVGmAxjiknPX1S-d7xeFKGE",
    menu: [
      { name: "Veg Steamed Momos (8 Pcs)", price: "₹50", isVeg: true },
      { name: "Paneer Kurkure Momos (6 Pcs)", price: "₹80", isVeg: true },
    ],
    reviews: []
  },
  {
    id: '5',
    name: "Ganga Sweets Corner",
    rating: 4.9,
    reviewsCount: 112,
    distance: "2.0 mi away",
    category: "Sweets",
    specialty: "Hot Gulab Jamun & Jalebi",
    isOpen: true,
    timings: "7:00 AM - 10:00 PM",
    operatingDays: "All 7 Days Open",
    activeWeeks: 156, // 3 years
    address: "Ganga Ghat Road, Near NIT Patna",
    description: "Pure milk sweets, piping hot desi ghee Jalebi, and mouth-watering Gulab Jamun.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAU58eSFZWvue3-JC9VhTx6Jn0imphucVAoCrbozFjDWqdTko1rsSbW7vYtVloEgfTsZM8-DdeDNfnQk0bhiPl9s2VOUi_3CAWHd8Pe_Xz_4aAGXWcVlzTp1l7L2c-WAnuia20Z36Cg414CwURviB6USv1zhoX4Uqw-Y9vu-jG30OogCfcM08TxLNEVu3AYqFRObPjXu89_6_z4r0koF7kvZrtAAwN4nb4B9fE68cBnRxdY7FVv-ZjN",
    menu: [
      { name: "Desi Ghee Jalebi (250g)", price: "₹70", isVeg: true },
      { name: "Gulab Jamun (2 Pcs)", price: "₹30", isVeg: true },
    ],
    reviews: []
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'All', image: null, icon: null },
  { id: 'chaat', label: 'Chaat', image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAU58eSFZWvue3-JC9VhTx6Jn0imphucVAoCrbozFjDWqdTko1rsSbW7vYtVloEgfTsZM8-DdeDNfnQk0bhiPl9s2VOUi_3CAWHd8Pe_Xz_4aAGXWcVlzTp1l7L2c-WAnuia20Z36Cg414CwURviB6USv1zhoX4Uqw-Y9vu-jG30OogCfcM08TxLNEVu3AYqFRObPjXu89_6_z4r0koF7kvZrtAAwN4nb4B9fE68cBnRxdY7FVv-ZjN", icon: null },
  { id: 'rolls', label: 'Rolls', image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDR7vE_dWjIzsh-d6KXrPGue5qiDqB-J4PM9d-VipTyXxbGmH4w6KmKT8gwOPnjLnnoZQwghzgbFraS81zHQ4E-M-6OMe1hcrqr5RYc3zm03a1bYYU_Z8JTXUO7ySmUwhHmbrPnR5gAMiu3IVX5HpAcvwHWnQ1dlj1LrVVi3TNXyZ_D5cFMhLB_00sGAbftYAgEl1J-ib7J1BINZzkPtgULsCr7c6o8rYbCWURBvo2yUrRB5_G2aT0S", icon: null },
  { id: 'momos', label: 'Momos', image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAiw4e3fUfqteAO4ixcLNH3kbRrUl0HqXKoPJNwdfRlU-NT2eckprko2XXPQsKyNgNMev9UodzItakOZR81Zyh86ObNwmfOgBw6hUWo7NoXSWA8o0ByG_MpnxwUcQ_Uq0Eh_j5K36nmnnmvUAuVkZlQj1WliKN0C_HZnledsAMu5stJP8YmP4c18c9BLF51ON2phWKpwAY_-SlDzw18xg4notqHqRtqaNVGmAxjiknPX1S-d7xeFKGE", icon: null },
  { id: 'sweets', label: 'Sweets', image: null, icon: 'icecream' },
  { id: 'south-indian', label: 'South Indian', image: null, icon: 'restaurant' },
];
