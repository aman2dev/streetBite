export interface StreetFoodCart {
  id: string;
  name: string;
  rating: number;
  distance: string;
  category: string;
  image: string;
  specialty?: string;
  isOpen?: boolean;
}

export const MOCK_CARTS: StreetFoodCart[] = [
  {
    id: '1',
    name: "Ramu's Litti Chokha",
    rating: 4.9,
    distance: "0.2 mi away",
    category: "Chaat",
    specialty: "Litti Chokha",
    isOpen: true,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAiw4e3fUfqteAO4ixcLNH3kbRrUl0HqXKoPJNwdfRlU-NT2eckprko2XXPQsKyNgNMev9UodzItakOZR81Zyh86ObNwmfOgBw6hUWo7NoXSWA8o0ByG_MpnxwUcQ_Uq0Eh_j5K36nmnnmvUAuVkZlQj1WliKN0C_HZnledsAMu5stJP8YmP4c18c9BLF51ON2phWKpwAY_-SlDzw18xg4notqHqRtqaNVGmAxjiknPX1S-d7xeFKGE",
  },
  {
    id: '2',
    name: "Maurya Lok Chaat",
    rating: 4.8,
    distance: "0.5 mi away",
    category: "Chaat",
    isOpen: true,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAU58eSFZWvue3-JC9VhTx6Jn0imphucVAoCrbozFjDWqdTko1rsSbW7vYtVloEgfTsZM8-DdeDNfnQk0bhiPl9s2VOUi_3CAWHd8Pe_Xz_4aAGXWcVlzTp1l7L2c-WAnuia20Z36Cg414CwURviB6USv1zhoX4Uqw-Y9vu-jG30OogCfcM08TxLNEVu3AYqFRObPjXu89_6_z4r0koF7kvZrtAAwN4nb4B9fE68cBnRxdY7FVv-ZjN",
  },
  {
    id: '3',
    name: "Boring Road Rolls",
    rating: 4.7,
    distance: "1.2 mi away",
    category: "Rolls",
    isOpen: true,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDR7vE_dWjIzsh-d6KXrPGue5qiDqB-J4PM9d-VipTyXxbGmH4w6KmKT8gwOPnjLnnoZQwghzgbFraS81zHQ4E-M-6OMe1hcrqr5RYc3zm03a1bYYU_Z8JTXUO7ySmUwhHmbrPnR5gAMiu3IVX5HpAcvwHWnQ1dlj1LrVVi3TNXyZ_D5cFMhLB_00sGAbftYAgEl1J-ib7J1BINZzkPtgULsCr7c6o8rYbCWURBvo2yUrRB5_G2aT0S",
  },
  {
    id: '4',
    name: "Sharma Ji Momos",
    rating: 4.6,
    distance: "1.5 mi away",
    category: "Momos",
    isOpen: false,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAiw4e3fUfqteAO4ixcLNH3kbRrUl0HqXKoPJNwdfRlU-NT2eckprko2XXPQsKyNgNMev9UodzItakOZR81Zyh86ObNwmfOgBw6hUWo7NoXSWA8o0ByG_MpnxwUcQ_Uq0Eh_j5K36nmnnmvUAuVkZlQj1WliKN0C_HZnledsAMu5stJP8YmP4c18c9BLF51ON2phWKpwAY_-SlDzw18xg4notqHqRtqaNVGmAxjiknPX1S-d7xeFKGE",
  },
  {
    id: '5',
    name: "Ganga Sweets Corner",
    rating: 4.9,
    distance: "2.0 mi away",
    category: "Sweets",
    isOpen: true,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAU58eSFZWvue3-JC9VhTx6Jn0imphucVAoCrbozFjDWqdTko1rsSbW7vYtVloEgfTsZM8-DdeDNfnQk0bhiPl9s2VOUi_3CAWHd8Pe_Xz_4aAGXWcVlzTp1l7L2c-WAnuia20Z36Cg414CwURviB6USv1zhoX4Uqw-Y9vu-jG30OogCfcM08TxLNEVu3AYqFRObPjXu89_6_z4r0koF7kvZrtAAwN4nb4B9fE68cBnRxdY7FVv-ZjN",
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
