
<!DOCTYPE html>

<html lang="en" style=""><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<style>
@layer base{
    html,body{margin:0;padding:0;}
    body{overscroll-behavior:none;}
    main>:first-child{margin-top:0!important;}
    main>:last-child{margin-bottom:0!important;}
}
::-webkit-scrollbar{display:none;}
.masonry-grid {
    columns: 1;
    column-gap: 24px;
}
@media (min-width: 768px) {
    .masonry-grid {
        columns: 2;
    }
}
@media (min-width: 1024px) {
    .masonry-grid {
        columns: 3;
    }
}
.masonry-item {
    break-inside: avoid;
    margin-bottom: 24px;
}
.ticker-content {
    animation: ticker 20s linear infinite;
}
@keyframes ticker {
    0% { transform: translateY(100%); }
    100% { transform: translateY(-100%); }
}
</style>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.cdnfonts.com/css/gilroy-bold" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com"></script>
<script id="tailwind-config">
  tailwind.config = {
    darkMode: "class",
    theme: {
      extend: {
        "colors": {
                "primary-container": "#ff6b00",
                "on-primary": "#ffffff",
                "outline": "#8e7164",
                "tertiary": "#5d5f5f",
                "surface": "#f9f9f9",
                "primary-fixed": "#ffdbcc",
                "on-secondary-fixed": "#1b1c1c",
                "primary-fixed-dim": "#ffb693",
                "on-error-container": "#93000a",
                "on-surface": "#1a1c1c",
                "surface-container-lowest": "#ffffff",
                "on-surface-variant": "#5a4136",
                "surface-variant": "#e2e2e2",
                "on-tertiary-fixed": "#1a1c1c",
                "inverse-primary": "#ffb693",
                "error-container": "#ffdad6",
                "surface-container-highest": "#e2e2e2",
                "surface-dim": "#dadada",
                "on-primary-container": "#572000",
                "error": "#ba1a1a",
                "tertiary-fixed-dim": "#c6c6c7",
                "secondary-fixed-dim": "#c8c6c6",
                "on-secondary-container": "#656464",
                "surface-bright": "#f9f9f9",
                "on-primary-fixed-variant": "#7a3000",
                "on-tertiary-fixed-variant": "#454747",
                "surface-container-low": "#f3f3f4",
                "primary": "#a04100",
                "background": "#f9f9f9",
                "tertiary-container": "#989999",
                "on-secondary": "#ffffff",
                "secondary-container": "#e4e2e1",
                "outline-variant": "#e2bfb0",
                "surface-tint": "#a04100",
                "on-tertiary-container": "#2f3132",
                "on-secondary-fixed-variant": "#474747",
                "secondary": "#5f5e5e",
                "surface-container-high": "#e8e8e8",
                "on-background": "#1a1c1c",
                "inverse-surface": "#2f3131",
                "tertiary-fixed": "#e2e2e2",
                "surface-container": "#eeeeee",
                "on-error": "#ffffff",
                "on-tertiary": "#ffffff",
                "on-primary-fixed": "#351000",
                "secondary-fixed": "#e4e2e1",
                "inverse-on-surface": "#f0f1f1"
        },
        "borderRadius": {
                "DEFAULT": "0.25rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "full": "9999px"
        },
        "spacing": {
                "lg": "24px",
                "gutter": "12px",
                "sm": "8px",
                "container-margin": "16px",
                "md": "16px",
                "xl": "32px",
                "base": "4px",
                "xs": "4px"
        },
        "fontFamily": {
                "label-md": [
                        "Inter"
                ],
                "headline-md": [
                        "Inter"
                ],
                "headline-lg": [
                        "Inter"
                ],
                "headline-xl": [
                        "Inter"
                ],
                "headline-lg-mobile": [
                        "Inter"
                ],
                "label-sm": [
                        "Inter"
                ],
                "body-lg": [
                        "Inter"
                ],
                "body-md": [
                        "Inter"
                ]
        },
        "fontSize": {
                "label-md": [
                        "12px",
                        {
                                "lineHeight": "16px",
                                "letterSpacing": "0.01em",
                                "fontWeight": "600"
                        }
                ],
                "headline-md": [
                        "18px",
                        {
                                "lineHeight": "24px",
                                "fontWeight": "600"
                        }
                ],
                "headline-lg": [
                        "24px",
                        {
                                "lineHeight": "32px",
                                "letterSpacing": "-0.01em",
                                "fontWeight": "700"
                        }
                ],
                "headline-xl": [
                        "32px",
                        {
                                "lineHeight": "40px",
                                "letterSpacing": "-0.02em",
                                "fontWeight": "700"
                        }
                ],
                "headline-lg-mobile": [
                        "20px",
                        {
                                "lineHeight": "28px",
                                "fontWeight": "700"
                        }
                ],
                "label-sm": [
                        "11px",
                        {
                                "lineHeight": "14px",
                                "fontWeight": "500"
                        }
                ],
                "body-lg": [
                        "16px",
                        {
                                "lineHeight": "24px",
                                "fontWeight": "400"
                        }
                ],
                "body-md": [
                        "14px",
                        {
                                "lineHeight": "20px",
                                "fontWeight": "400"
                        }
                ]
        }
},
    },
  }
</script>
</head>
<body class="bg-surface font-body-md text-on-surface">
<header class="fixed top-4 left-0 right-0 max-w-7xl mx-auto w-[calc(100%-2rem)] z-50 bg-surface/90 backdrop-blur-xl shadow-[4px_4px_0px_0px_#1a1c1c] border-2 border-on-surface rounded-full">
<div class="h-20 w-full px-xl flex items-center justify-between">
<div class="flex items-center gap-lg">
<div class="flex items-center gap-sm">
<img alt="StreetBite" class="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1UUmzIJCqTTgZZmT97IDRMlKzoiXYjra0D5PmQws4w30o60bsJOJuI3GC3yPgYbCqI48IIS-dgDHE5bHpHqXhlvge2kSLiQyDKyktBdsHZFwpz7Zu27Rc9yp2rs7JjkwxRTOu0Uve7jo1fZPKrvibPtRHoLSZwg_fV8-J3PNRcXeMMQXprWenjGpX5srry4iiojCFYa2q9M7GFwNmhCfMDFsHnfHxuA9bXL2xXFfPoBlMGy-yJIADDYIxo"/>
<span class="font-headline-lg text-primary tracking-tight">StreetBite</span>
</div>
</div>
<nav class="flex items-center gap-lg" data-active-classes="text-primary font-bold">
<a aria-current="page" class="transition-colors uppercase tracking-wider text-primary font-bold" data-path="home" href="#">Home</a>
<a class="text-label-md text-on-surface-variant hover:text-primary transition-colors uppercase tracking-wider" data-path="explore-map" href="#">Explore Map</a>
<a class="text-label-md text-on-surface-variant hover:text-primary transition-colors uppercase tracking-wider" data-path="saved" href="#">Saved</a>
<div class="flex items-center gap-sm pl-md border-l border-on-surface">
<img alt="Profile" class="w-8 h-8 rounded-full object-cover cursor-pointer hover:ring-2 hover:ring-primary transition-all shadow-[2px_2px_0px_0px_#1a1c1c] border-2 border-on-surface" src="https://lh3.googleusercontent.com/aida/AEtjO1WlBZByRgnWqZejgSckxcxKnYBrVbVtApXfZcg8DfqvoczwEttAjLeHTreOUrCO-FzJXDZ8bP1JbQnYjwOQ9RdB4kd7eSlq7vxTwoUh2roidmIY2LmpSuhfIjoq7AtEjHOJWBOZ4LQs70y0gjd7w7OKXohCipcMc7QwyFpL8NPVuz1uIX3mWKWIOfG9mvcI_ccGRJBSu0NVnh8Ip_V9m_gejIDvLFsfb31dHi6sEAQemd2fVwzL_HDMXS8"/>
</div>
</nav>
</div>
</header>
<main class="w-full pt-32 min-h-screen bg-surface">
<div class="flex flex-col w-full px-4 md:px-8 max-w-[1600px] mx-auto">
<!-- Asymmetric Hero Section -->
<section class="relative w-full min-h-[70vh] flex flex-col md:flex-row items-center justify-between gap-8 mb-xl">
<!-- Floating Bold Box for Content -->
<div class="relative z-10 w-full md:w-1/2 flex flex-col items-start bg-surface-container-lowest p-8 md:p-12 rounded-3xl border-4 border-on-surface shadow-[12px_12px_0px_0px_#1a1c1c] transform md:-translate-y-8 md:translate-x-8">
<span class="inline-block py-sm px-md bg-primary-container text-on-primary-container rounded-full text-label-md uppercase tracking-wider mb-lg border-2 border-on-surface shadow-[4px_4px_0px_0px_#1a1c1c] font-bold">Patna Edition</span>
<h1 class="text-on-surface text-5xl md:text-7xl mb-md tracking-tight font-bold leading-tight" style="font-family: 'Gilroy-Bold', sans-serif;">
            Discover the Heart of <br/>
<span class="text-primary tracking-widest inline-block transform -rotate-2 bg-primary-fixed px-4 mt-2" style="-webkit-text-stroke: 2px #1a1c1c; text-stroke: 2px #1a1c1c;">Street Food</span>
</h1>
<p class="font-body-lg text-on-surface-variant text-xl mb-xl font-bold">Find the best-rated carts and hidden gems near you.</p>
<!-- Hero Search -->
<div class="w-full relative shadow-[6px_6px_0px_0px_#1a1c1c] border-2 border-on-surface rounded-full bg-surface-container-lowest p-2 flex items-center mb-8">
<span class="material-symbols-outlined text-primary ml-md text-[28px]">search</span>
<input class="w-full bg-transparent border-none focus:ring-0 text-headline-md text-on-surface px-md py-sm placeholder-on-surface-variant/70 font-bold" placeholder="Craving Litti Chokha, momos, or chaat?" type="text"/>
<button class="bg-primary hover:bg-surface-tint text-on-primary rounded-full px-xl py-md font-label-md uppercase tracking-wider transition-all duration-300 border-2 border-on-surface shadow-[4px_4px_0px_0px_#1a1c1c] font-bold whitespace-nowrap">Find Food</button>
</div>
<!-- Quick Stats -->
<div class="flex flex-wrap items-center gap-6 mt-4">
<div class="flex flex-col items-start border-l-4 border-primary pl-4">
<span class="font-headline-xl text-on-surface font-bold">124+</span>
<span class="font-label-sm text-on-surface-variant uppercase tracking-widest font-bold">Active Carts</span>
</div>
<div class="flex flex-col items-start border-l-4 border-primary pl-4">
<span class="font-headline-xl text-on-surface font-bold">4.8</span>
<span class="font-label-sm text-on-surface-variant uppercase tracking-widest font-bold">Avg Rating</span>
</div>
<div class="flex flex-col items-start border-l-4 border-primary pl-4">
<span class="font-headline-xl text-on-surface font-bold">&lt;10 min</span>
<span class="font-label-sm text-on-surface-variant uppercase tracking-widest font-bold">Wait Time</span>
</div>
</div>
</div>
<!-- Offset Background Illustration -->
<div class="relative w-full md:w-3/5 h-[500px] md:h-[700px] md:absolute md:right-0 md:top-0 rounded-3xl overflow-hidden border-4 border-on-surface shadow-[-12px_12px_0px_0px_#1a1c1c] z-0">
<img alt="Vibrant, high-energy pop art illustration of a bustling street food market." class="w-full h-full object-cover mix-blend-multiply opacity-90" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_A5QX6jHknjRuZ5AN4b8mfMAbvDoya6E9qip_IK2oK17Wq4VR7wG4x11G41-I0PaRx6eF-Vz0NxFDcip4qBAF6_6flChUhxdJZsCHsStI4133YAvc4ljxd7jHANRcQ9lMa42R5NhHRlYpHZxYS1fIsraHCcBGu2Z7nET5l7kCIkDki0fTwSwvklAf9Kc79VgzJu9NyhevDtnOuFvOc3ig3jxm9M98CKz3dNlWgLMly4aMKwWjCAvd"/>
<div class="absolute inset-0 bg-primary/20 mix-blend-overlay"></div>
</div>
</section>
<!-- Main Grid Layout -->
<div class="w-full flex flex-col gap-xl pb-xl"><section class="w-full"><h2 class="font-headline-xl text-on-surface font-bold mb-6 text-3xl" style="font-family: 'Gilroy-Bold', sans-serif;">What are you craving?</h2><div class="flex overflow-x-auto gap-6 pb-4 scrollbar-hide"><div class="flex-shrink-0 w-32 flex flex-col items-center gap-2 group cursor-pointer"><div class="w-24 h-24 rounded-full border-4 border-on-surface shadow-[4px_4px_0px_0px_#1a1c1c] overflow-hidden group-hover:-translate-y-1 transition-transform"><img alt="Chaat" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAU58eSFZWvue3-JC9VhTx6Jn0imphucVAoCrbozFjDWqdTko1rsSbW7vYtVloEgfTsZM8-DdeDNfnQk0bhiPl9s2VOUi_3CAWHd8Pe_Xz_4aAGXWcVlzTp1l7L2c-WAnuia20Z36Cg414CwURviB6USv1zhoX4Uqw-Y9vu-jG30OogCfcM08TxLNEVu3AYqFRObPjXu89_6_z4r0koF7kvZrtAAwN4nb4B9fE68cBnRxdY7FVv-ZjN"/></div><span class="font-bold text-on-surface">Chaat</span></div><div class="flex-shrink-0 w-32 flex flex-col items-center gap-2 group cursor-pointer"><div class="w-24 h-24 rounded-full border-4 border-on-surface shadow-[4px_4px_0px_0px_#1a1c1c] overflow-hidden group-hover:-translate-y-1 transition-transform"><img alt="Rolls" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDR7vE_dWjIzsh-d6KXrPGue5qiDqB-J4PM9d-VipTyXxbGmH4w6KmKT8gwOPnjLnnoZQwghzgbFraS81zHQ4E-M-6OMe1hcrqr5RYc3zm03a1bYYU_Z8JTXUO7ySmUwhHmbrPnR5gAMiu3IVX5HpAcvwHWnQ1dlj1LrVVi3TNXyZ_D5cFMhLB_00sGAbftYAgEl1J-ib7J1BINZzkPtgULsCr7c6o8rYbCWURBvo2yUrRB5_G2aT0S"/></div><span class="font-bold text-on-surface">Rolls</span></div><div class="flex-shrink-0 w-32 flex flex-col items-center gap-2 group cursor-pointer"><div class="w-24 h-24 rounded-full border-4 border-on-surface shadow-[4px_4px_0px_0px_#1a1c1c] overflow-hidden group-hover:-translate-y-1 transition-transform"><img alt="Momos" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiw4e3fUfqteAO4ixcLNH3kbRrUl0HqXKoPJNwdfRlU-NT2eckprko2XXPQsKyNgNMev9UodzItakOZR81Zyh86ObNwmfOgBw6hUWo7NoXSWA8o0ByG_MpnxwUcQ_Uq0Eh_j5K36nmnnmvUAuVkZlQj1WliKN0C_HZnledsAMu5stJP8YmP4c18c9BLF51ON2phWKpwAY_-SlDzw18xg4notqHqRtqaNVGmAxjiknPX1S-d7xeFKGE"/></div><span class="font-bold text-on-surface">Momos</span></div><div class="flex-shrink-0 w-32 flex flex-col items-center gap-2 group cursor-pointer"><div class="w-24 h-24 rounded-full border-4 border-on-surface shadow-[4px_4px_0px_0px_#1a1c1c] overflow-hidden group-hover:-translate-y-1 transition-transform"><div class="w-full h-full bg-primary-fixed flex items-center justify-center"><span class="material-symbols-outlined text-primary text-4xl">icecream</span></div></div><span class="font-bold text-on-surface">Sweets</span></div><div class="flex-shrink-0 w-32 flex flex-col items-center gap-2 group cursor-pointer"><div class="w-24 h-24 rounded-full border-4 border-on-surface shadow-[4px_4px_0px_0px_#1a1c1c] overflow-hidden group-hover:-translate-y-1 transition-transform"><div class="w-full h-full bg-primary-fixed flex items-center justify-center"><span class="material-symbols-outlined text-primary text-4xl">restaurant</span></div></div><span class="font-bold text-on-surface">South Indian</span></div></div></section><section class="w-full"><div class="flex items-end justify-between mb-8 border-b-4 border-on-surface pb-4"><h2 class="font-headline-xl text-on-surface font-bold text-4xl" style="font-family: 'Gilroy-Bold', sans-serif;">Top Rated Near You</h2><button class="text-on-surface bg-primary-fixed border-2 border-on-surface px-6 py-2 rounded-full shadow-[4px_4px_0px_0px_#1a1c1c] font-label-md uppercase tracking-wider hover:-translate-y-1 transition-transform font-bold">View All</button></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"><div class="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-[8px_8px_0px_0px_#1a1c1c] border-4 border-on-surface hover:-translate-y-2 transition-transform duration-300 flex flex-col group"><div class="relative h-48 w-full border-b-4 border-on-surface overflow-hidden"><img alt="Ramu's Litti Chokha" class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiw4e3fUfqteAO4ixcLNH3kbRrUl0HqXKoPJNwdfRlU-NT2eckprko2XXPQsKyNgNMev9UodzItakOZR81Zyh86ObNwmfOgBw6hUWo7NoXSWA8o0ByG_MpnxwUcQ_Uq0Eh_j5K36nmnnmvUAuVkZlQj1WliKN0C_HZnledsAMu5stJP8YmP4c18c9BLF51ON2phWKpwAY_-SlDzw18xg4notqHqRtqaNVGmAxjiknPX1S-d7xeFKGE"/><div class="absolute top-4 right-4 bg-primary text-on-primary px-3 py-1 rounded-full flex items-center gap-1 shadow-[2px_2px_0px_0px_#1a1c1c] border-2 border-on-surface font-bold"><span class="material-symbols-outlined text-[16px]" style='font-variation-settings: "FILL" 1;'>star</span><span class="font-label-md">4.9</span></div></div><div class="p-6 flex flex-col flex-1"><div class="flex justify-between items-start mb-2"><h3 class="font-headline-lg text-on-surface font-bold leading-tight" style="font-family: 'Gilroy-Bold', sans-serif;">Ramu's Litti Chokha</h3><span class="text-label-sm text-on-primary bg-on-surface border-2 border-on-surface px-3 py-1 rounded-full font-bold uppercase">Open</span></div><p class="font-body-md text-on-surface-variant font-bold mb-4">0.2 mi away</p></div></div><div class="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-[8px_8px_0px_0px_#1a1c1c] border-4 border-on-surface hover:-translate-y-2 transition-transform duration-300 flex flex-col group"><div class="relative h-48 w-full border-b-4 border-on-surface overflow-hidden"><img alt="Maurya Lok Chaat" class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAU58eSFZWvue3-JC9VhTx6Jn0imphucVAoCrbozFjDWqdTko1rsSbW7vYtVloEgfTsZM8-DdeDNfnQk0bhiPl9s2VOUi_3CAWHd8Pe_Xz_4aAGXWcVlzTp1l7L2c-WAnuia20Z36Cg414CwURviB6USv1zhoX4Uqw-Y9vu-jG30OogCfcM08TxLNEVu3AYqFRObPjXu89_6_z4r0koF7kvZrtAAwN4nb4B9fE68cBnRxdY7FVv-ZjN"/><div class="absolute top-4 right-4 bg-primary text-on-primary px-3 py-1 rounded-full flex items-center gap-1 shadow-[2px_2px_0px_0px_#1a1c1c] border-2 border-on-surface font-bold"><span class="material-symbols-outlined text-[16px]" style='font-variation-settings: "FILL" 1;'>star</span><span class="font-label-md">4.8</span></div></div><div class="p-6 flex flex-col flex-1"><div class="flex justify-between items-start mb-2"><h3 class="font-headline-lg text-on-surface font-bold leading-tight" style="font-family: 'Gilroy-Bold', sans-serif;">Maurya Lok Chaat</h3><span class="text-label-sm text-on-primary bg-on-surface border-2 border-on-surface px-3 py-1 rounded-full font-bold uppercase">Open</span></div><p class="font-body-md text-on-surface-variant font-bold mb-4">0.5 mi away</p></div></div><div class="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-[8px_8px_0px_0px_#1a1c1c] border-4 border-on-surface hover:-translate-y-2 transition-transform duration-300 flex flex-col group"><div class="relative h-48 w-full border-b-4 border-on-surface overflow-hidden"><img alt="Boring Road Rolls" class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDR7vE_dWjIzsh-d6KXrPGue5qiDqB-J4PM9d-VipTyXxbGmH4w6KmKT8gwOPnjLnnoZQwghzgbFraS81zHQ4E-M-6OMe1hcrqr5RYc3zm03a1bYYU_Z8JTXUO7ySmUwhHmbrPnR5gAMiu3IVX5HpAcvwHWnQ1dlj1LrVVi3TNXyZ_D5cFMhLB_00sGAbftYAgEl1J-ib7J1BINZzkPtgULsCr7c6o8rYbCWURBvo2yUrRB5_G2aT0S"/><div class="absolute top-4 right-4 bg-primary text-on-primary px-3 py-1 rounded-full flex items-center gap-1 shadow-[2px_2px_0px_0px_#1a1c1c] border-2 border-on-surface font-bold"><span class="material-symbols-outlined text-[16px]" style='font-variation-settings: "FILL" 1;'>star</span><span class="font-label-md">4.7</span></div></div><div class="p-6 flex flex-col flex-1"><div class="flex justify-between items-start mb-2"><h3 class="font-headline-lg text-on-surface font-bold leading-tight" style="font-family: 'Gilroy-Bold', sans-serif;">Boring Road Rolls</h3><span class="text-label-sm text-on-primary bg-on-surface border-2 border-on-surface px-3 py-1 rounded-full font-bold uppercase">Open</span></div><p class="font-body-md text-on-surface-variant font-bold mb-4">1.2 mi away</p></div></div></div></section></div>
</div>
</main>
<footer class="w-full bg-surface-container-low py-xl mt-auto border-t-4 border-on-surface">
<div class="max-w-7xl mx-auto px-xl flex flex-col md:flex-row justify-between items-center gap-lg">
<div class="flex items-center gap-sm">
<img alt="StreetBite" class="h-8 w-auto grayscale opacity-80" src="https://lh3.googleusercontent.com/aida/AEtjO1UUmzIJCqTTgZZmT97IDRMlKzoiXYjra0D5PmQws4w30o60bsJOJuI3GC3yPgYbCqI48IIS-dgDHE5bHpHqXhlvge2kSLiQyDKyktBdsHZFwpz7Zu27Rc9yp2rs7JjkwxRTOu0Uve7jo1fZPKrvibPtRHoLSZwg_fV8-J3PNRcXeMMQXprWenjGpX5srry4iiojCFYa2q9M7GFwNmhCfMDFsHnfHxuA9bXL2xXFfPoBlMGy-yJIADDYIxo"/>
<span class="font-headline-md text-on-surface font-bold text-xl" style="font-family: 'Gilroy-Bold', sans-serif;">StreetBite</span>
</div>
<nav class="flex gap-lg">
<a class="text-label-md text-on-surface hover:text-primary transition-colors font-bold uppercase tracking-wider" data-path="about-us" href="#">About Us</a>
<a class="text-label-md text-on-surface hover:text-primary transition-colors font-bold uppercase tracking-wider" data-path="partner-with-us" href="#">Partner with Us</a>
<a class="text-label-md text-on-surface hover:text-primary transition-colors font-bold uppercase tracking-wider" data-path="contact" href="#">Contact</a>
</nav>
<div class="text-label-sm text-on-surface-variant font-bold">© 2024 StreetBite. Made for foodies.</div>
</div>
</footer>
</body></html>