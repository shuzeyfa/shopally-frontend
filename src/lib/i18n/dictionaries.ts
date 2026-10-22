import type { Locale } from "@/lib/preferences";

/**
 * English is the source of truth. `Dictionary` is derived from it, and every
 * other locale is annotated with that type — so omitting or misspelling a key
 * in a translation is a compile error rather than a missing string at runtime.
 *
 * The dictionary is consumed as a plain nested object (`dict.nav.search`)
 * rather than through a `t("nav.search")` lookup. That gives real autocomplete
 * and type checking, and needs no runtime path resolver.
 *
 * Scope is deliberately limited to what the app shell renders. Landing and
 * search copy arrives with those features.
 */
const en = {
  app: {
    name: "ShopAlly",
    tagline: "Your smart AI assistant for AliExpress shopping",
  },
  nav: {
    primary: "Main navigation",
    search: "Search",
    compare: "Compare",
    saved: "Saved",
    alerts: "Alerts",
    profile: "Profile",
  },
  auth: {
    signIn: "Sign in",
    signOut: "Sign out",
    welcomeTitle: "Sign in to ShopAlly",
    welcomeSubtitle: "Connect your account to access AI product search, price alerts, and saved items.",
    signInWithGoogle: "Continue with Google",
    orDemo: "Or continue with demo account",
    emailPlaceholder: "Email address",
    namePlaceholder: "Your name",
    demoSignInButton: "Sign in with Demo Account",
    backToHome: "Back to home",
  },
  search: {
    placeholder: "Search products in English or Amharic (e.g. smartphone, headphones)...",
    button: "Search",
    results: "results found",
    emptyTitle: "No products found",
    emptySubtitle: "Try searching with different keywords or broader terms.",
    initialTitle: "Find your next purchase on AliExpress",
    initialSubtitle: "Type a query above to see AI-ranked products, seller credibility, and live ETB prices.",
    errorTitle: "Search failed",
    errorMessage: "Could not load products. Please check your backend connection and try again.",
    retry: "Try again",
    sellerScore: "Seller score",
    delivery: "Delivery",
    match: "match",
    viewOnAliExpress: "View on AliExpress",
    liveFx: "Live FX",
    popularQueries: "Popular searches:",
  },
  compare: {
    title: "Product Comparison",
    subtitle: "Compare up to 4 items side-by-side to find the best deal and highest seller credibility.",
    noProductsTitle: "No products selected for comparison",
    noProductsSubtitle: "Select between 2 and 4 products from search results to compare their specs and prices.",
    goToSearch: "Go to Search",
    barSelected: "selected to compare (max 4)",
    compareNow: "Compare Now",
    clear: "Clear",
    remove: "Remove",
    addToCompare: "Compare",
    compared: "Selected",
    maxReached: "Maximum 4 items can be compared",
    bestValue: "Best Value",
    highestRating: "Highest Rating",
  },
  savedItems: {
    subtitle: "Keep products you are considering in one place, across your devices.",
    emptyTitle: "No saved products yet",
    emptySubtitle: "Save products from search results and they will appear here.",
    save: "Save product",
    remove: "Remove saved product",
    errorTitle: "Saved items could not be loaded",
    errorMessage: "Check your connection and try again.",
  },
  priceAlerts: {
    subtitle: "Get notified when a product reaches your target price.",
    set: "Set price alert",
    target: "Notify me below",
    create: "Create alert",
    cancel: "Cancel",
    created: "Price alert created",
    emptyTitle: "No price alerts yet",
    emptySubtitle: "Set an alert from any product card to track its price.",
    active: "Watching",
    triggered: "Target reached",
    delete: "Remove alert",
    errorTitle: "Price alerts could not be loaded",
    errorMessage: "Check your connection and try again.",
  },
  profilePage: {
    subtitle: "Manage your account and shopping preferences.",
    account: "Account information",
    signedInAs: "Signed in as",
    savedCount: "Saved products",
    alertCount: "Price alerts",
    preferences: "Preferences",
    appearance: "Appearance",
    language: "Language",
    light: "Light mode",
    dark: "Dark mode",
    english: "English",
    amharic: "አማርኛ",
    loading: "Loading your profile…",
    unavailable: "Could not load your account totals.",
  },
  actions: {
    toggleTheme: "Switch theme",
    toggleLanguage: "Switch language",
    goHome: "Back to home",
    openMenu: "Open menu",
  },
  theme: {
    light: "Light",
    dark: "Dark",
  },
  language: {
    label: "Language",
  },
  api: {
    label: "API",
    checking: "Checking",
    ok: "Connected",
    degraded: "Degraded",
    unreachable: "Unreachable",
  },
  notFound: {
    title: "Page not found",
    description: "The page you are looking for does not exist or has moved.",
  },
  placeholder: {
    comingSoon: "Coming soon",
    description: "This screen is not built yet.",
  },
  landing: {
    nav: {
      features: "Features",
      howItWorks: "How It Works",
      demo: "Demo",
      testimonials: "Testimonials",
    },
    hero: {
      headline: "Shop Smarter in Ethiopia with ShopAlly",
      headlinePrefix: "Shop Smarter in Ethiopia with",
      headlineHighlight: "ShopAlly",
      subhead: "Your AI-powered shopping assistant that finds the best products, compares prices in ETB, and saves you time.",
      imageSearchBadge: "Supports Image Search – find products by uploading a photo!",
      startSearching: "Get Started",
      exploreDeals: "Explore deals",
      watchDemo: "Watch Demo",
      badge: "AI-Powered Shopping Assistant",
      mockCard: {
        matchScore: "94% AI Match",
        title: "Wireless ANC Noise Cancelling Headphones",
        sellerScore: "98.5% Positive Seller",
        delivery: "Free delivery to Ethiopia",
        etbPrice: "ETB 4,250",
        usdPrice: "$34.90",
      },
    },
    features: {
      title: "Why Choose ShopAlly?",
      subtitle: "Discover the features that make ShopAlly the smartest shopping companion for Ethiopian consumers.",
      aiSearch: {
        title: "Natural Language AI Search",
        desc: "Describe what you want in plain English or Amharic. Our AI understands your intent and finds top-rated AliExpress products.",
      },
      compare: {
        title: "Compare & Save",
        desc: "Side-by-side product analysis to help you save on prices and shipping.",
      },
      fx: {
        title: "ETB-Aware Pricing",
        desc: "Live foreign exchange updates ensure accurate pricing in Ethiopian Birr.",
      },
      alerts: {
        title: "Price Alerts",
        desc: "Receive instant notifications when product prices change or drop.",
      },
      saved: {
        title: "Curated Saved Items",
        desc: "Bookmark products across devices and organize potential buys before placing orders.",
      },
      i18n: {
        title: "Bilingual Support",
        desc: "Seamless shopping with complete Amharic (አማርኛ) and English language support.",
      },
      officialApi: {
        title: "Official API Integration",
        desc: "Direct integration with global e-commerce platforms for live data accuracy.",
      },
      imageSearch: {
        title: "Image Search",
        desc: "Find products simply by uploading or searching with a photo.",
      },
    },
    demo: {
      title: "ShopAlly in Action",
      subtitle: "Affordable shopping made simple",
    },
    testimonials: {
      title: "What Our Users Say",
      subtitle: "Loved by thousands of shoppers across Ethiopia",
      users: [
        {
          name: "Abebe T.",
          location: "Addis Ababa",
          quote: "ShopAlly helped me compare prices quickly and saved me money on electronics!",
          rating: 5,
        },
        {
          name: "Hana M.",
          location: "Bahir Dar",
          quote: "I love that it supports Amharic. Makes online shopping much easier for my family.",
          rating: 5,
        },
        {
          name: "Samuel K.",
          location: "Hawassa",
          quote: "Currency conversion to ETB is a game changer. Finally, I know the real prices before buying.",
          rating: 5,
        },
        {
          name: "Mulugeta Y.",
          location: "Addis Ababa",
          quote: "I used to waste time checking prices everywhere — now ShopAlly gives me results instantly!",
          rating: 5,
        },
        {
          name: "Sara M.",
          location: "Mekelle",
          quote: "The price alerts helped me buy my laptop when it dropped 15%! Love it!",
          rating: 5,
        },
      ],
    },
    howItWorks: {
      title: "How ShopAlly Works",
      subtitle: "Get personalized product recommendations in three simple steps",
      step1: {
        number: "01",
        title: "Ask a Question",
        desc: "Type your request in English or Amharic about what you want to buy or search by image.",
      },
      step2: {
        number: "02",
        title: "Get Smart Recommendations",
        desc: "Our AI analyzes your request and finds the best products with linked pricing.",
      },
      step3: {
        number: "03",
        title: "Compare & Buy",
        desc: "Compare products and choose the best option directly on the marketplace.",
      },
    },
    cta: {
      title: "Start shopping smarter today with ShopAlly",
      subtitle: "Join thousands of Ethiopian shoppers who save time and money every day.",
      button: "Try ShopAlly Now",
    },
  },
  footer: {
    rights: "All rights reserved.",
  },
};

/**
 * The shape every locale must provide.
 *
 * `en` is deliberately not `as const`: that would make each value a literal
 * type, and `Dictionary` would then demand the exact English strings rather
 * than just the same set of keys.
 */
export type Dictionary = typeof en;

/**
 * Amharic. Machine-assisted and not reviewed by a native speaker — worth a
 * pass from someone fluent before this ships to users.
 */
const am: Dictionary = {
  app: {
    name: "ሾፓሊ",
    tagline: "ለአሊኤክስፕረስ ግዢዎ ብልጥ የ AI አጋዥ",
  },
  nav: {
    primary: "ዋና ዳሰሳ",
    search: "ፍለጋ",
    compare: "ማወዳደሪያ",
    saved: "የተቀመጡ",
    alerts: "ማሳወቂያዎች",
    profile: "መገለጫ",
  },
  auth: {
    signIn: "ይግቡ",
    signOut: "ይውጡ",
    welcomeTitle: "ወደ ሾፓሊ ይግቡ",
    welcomeSubtitle: "የ AI ምርት ፍለጋን፣ የዋጋ ማሳወቂያዎችን እና የተቀመጡ ዕቃዎችን ለማግኘት መለያዎን ያገናኙ።",
    signInWithGoogle: "በ Google ይቀጥሉ",
    orDemo: "ወይም በሙከራ መለያ ይቀጥሉ",
    emailPlaceholder: "የኢሜይል አድራሻ",
    namePlaceholder: "ስምዎ",
    demoSignInButton: "በሙከራ መለያ ይግቡ",
    backToHome: "ወደ መነሻ ገጽ ተመለስ",
  },
  search: {
    placeholder: "ምርቶችን በእንግሊዝኛ ወይም በአማርኛ ይፈልጉ (ለምሳሌ smartphone, headphones)...",
    button: "ፈልግ",
    results: "ውጤቶች ተገኝተዋል",
    emptyTitle: "ምንም ምርት አልተገኘም",
    emptySubtitle: "በተለያዩ ቃላት ወይም በቀላል አገላለጽ ይሞክሩ።",
    initialTitle: "በአሊኤክስፕረስ ላይ የሚቀጥለውን ግዢዎን ያግኙ",
    initialSubtitle: "በ AI የተመረጡ ምርቶችን፣ የሻጭ ደረጃዎችን እና የቀጥታ የብር ዋጋዎችን ለማየት ከላይ ይፈልጉ።",
    errorTitle: "ፍለጋው አልተሳካም",
    errorMessage: "ምርቶቹን ማምጣት አልተቻለም። እባክዎ ግንኙነትዎን ፈትሸው እንደገና ይሞክሩ።",
    retry: "እንደገና ሞክር",
    sellerScore: "የሻጭ ደረጃ",
    delivery: "ማድረሻ",
    match: "ተዛማጅነት",
    viewOnAliExpress: "በአሊኤክስፕረስ ይመልከቱ",
    liveFx: "የቀጥታ ምንዛሪ",
    popularQueries: "ተወዳጅ ፍለጋዎች:",
  },
  compare: {
    title: "የምርቶች ማወዳደሪያ",
    subtitle: "ምርጥ ቅናሽ እና የታመነ ሻጭ ለማግኘት እስከ 4 ምርቶችን ጎን ለጎን ያወዳድሩ።",
    noProductsTitle: "ለማወዳደር የተመረጠ ምንም ምርት የለም",
    noProductsSubtitle: "ዋጋቸውን እና ዝርዝር መረጃዎቻቸውን ለማወዳደር ከፍለጋ ውጤቶች ከ 2 እስከ 4 ምርቶችን ይምረጡ።",
    goToSearch: "ወደ ፍለጋ ሂድ",
    barSelected: "ለማወዳደር ተመርጠዋል (እስከ 4)",
    compareNow: "አሁን አወዳድር",
    clear: "አጽዳ",
    remove: "አስወግድ",
    addToCompare: "አወዳድር",
    compared: "ተመርጧል",
    maxReached: "እስከ 4 ዕቃዎች ብቻ ማወዳደር ይቻላል",
    bestValue: "ምርጥ ዋጋ",
    highestRating: "ከፍተኛ ደረጃ",
  },
  savedItems: {
    subtitle: "ሊገዙዋቸው ያሰቡዋቸውን ምርቶች በአንድ ቦታ ላይ ያስቀምጡ።",
    emptyTitle: "እስካሁን የተቀመጡ ምርቶች የሉም",
    emptySubtitle: "ከፍለጋ ውጤቶች ምርቶችን ያስቀምጡ፤ እዚህ ይታያሉ።",
    save: "ምርት አስቀምጥ",
    remove: "ከተቀመጡ አስወግድ",
    errorTitle: "የተቀመጡ ምርቶችን ማምጣት አልተቻለም",
    errorMessage: "ግንኙነትዎን ፈትሸው እንደገና ይሞክሩ።",
  },
  priceAlerts: {
    subtitle: "ምርት የተፈለገው ዋጋ ላይ ሲደርስ ማሳወቂያ ያግኙ።",
    set: "የዋጋ ማሳወቂያ ያዘጋጁ",
    target: "ከዚህ በታች ሲሆን አሳውቀኝ",
    create: "ማሳወቂያ ፍጠር",
    cancel: "ሰርዝ",
    created: "የዋጋ ማሳወቂያ ተፈጥሯል",
    emptyTitle: "እስካሁን የዋጋ ማሳወቂያ የለም",
    emptySubtitle: "ዋጋውን ለመከታተል ከምርት ካርድ ላይ ማሳወቂያ ያዘጋጁ።",
    active: "በመከታተል ላይ",
    triggered: "የተፈለገው ዋጋ ደርሷል",
    delete: "ማሳወቂያን አስወግድ",
    errorTitle: "የዋጋ ማሳወቂያዎችን ማምጣት አልተቻለም",
    errorMessage: "ግንኙነትዎን ፈትሸው እንደገና ይሞክሩ።",
  },
  profilePage: {
    subtitle: "መለያዎን እና የግዢ ምርጫዎችዎን ያስተዳድሩ።",
    account: "የመለያ መረጃ",
    signedInAs: "የገቡት በ",
    savedCount: "የተቀመጡ ምርቶች",
    alertCount: "የዋጋ ማሳወቂያዎች",
    preferences: "ምርጫዎች",
    appearance: "ገጽታ",
    language: "ቋንቋ",
    light: "ብርሃን ገጽታ",
    dark: "ጨለማ ገጽታ",
    english: "English",
    amharic: "አማርኛ",
    loading: "መገለጫዎ በመጫን ላይ…",
    unavailable: "የመለያዎን ብዛት ማምጣት አልተቻለም።",
  },
  actions: {
    toggleTheme: "ገጽታ ይቀይሩ",
    toggleLanguage: "ቋንቋ ይቀይሩ",
    goHome: "ወደ መነሻ ይመለሱ",
    openMenu: "ምናሌ ይክፈቱ",
  },
  theme: {
    light: "ብርሃን",
    dark: "ጨለማ",
  },
  language: {
    label: "ቋንቋ",
  },
  api: {
    label: "ኤ ፒ አይ",
    checking: "በመፈተሽ ላይ",
    ok: "ተገናኝቷል",
    degraded: "በከፊል ይሰራል",
    unreachable: "አይገኝም",
  },
  notFound: {
    title: "ገጹ አልተገኘም",
    description: "የሚፈልጉት ገጽ የለም ወይም ተዛውሯል።",
  },
  placeholder: {
    comingSoon: "በቅርቡ ይመጣል",
    description: "ይህ ገጽ እስካሁን አልተዘጋጀም።",
  },
  landing: {
    nav: {
      features: "ባህሪያት",
      howItWorks: "አሰራር",
      demo: "ማሳያ",
      testimonials: "ምስክርነቶች",
    },
    hero: {
      headline: "በኢትዮጵያ በብልሃት ይሸምቱ ከ ሾፓሊ ጋር",
      headlinePrefix: "በኢትዮጵያ በብልሃት ይሸምቱ ከ",
      headlineHighlight: "ሾፓሊ ጋር",
      subhead: "ምርጥ ምርቶችን የሚያገኝ፣ ዋጋዎችን በብር የሚያወዳድር እና ጊዜዎን የሚቆጥብ የ AI ግዢ ረዳትዎ።",
      imageSearchBadge: "የምስል ፍለጋን ይደግፋል - ፎቶ በማስገባት ምርቶችን ያግኙ!",
      startSearching: "ይጀምሩ",
      exploreDeals: "ቅናሾችን ይመልከቱ",
      watchDemo: "ማሳያውን ይመልከቱ",
      badge: "በ AI የተደገፈ የግዢ ረዳት",
      mockCard: {
        matchScore: "94% AI ተዛማጅነት",
        title: "ገመድ አልባ ጫጫታ የሚቀንስ የጆሮ ማዳመጫ",
        sellerScore: "98.5% የታመነ ሻጭ",
        delivery: "ነፃ ማድረሻ ወደ ኢትዮጵያ",
        etbPrice: "4,250 የኢትዮጵያ ብር",
        usdPrice: "$34.90",
      },
    },
    features: {
      title: "ለምን ሾፓሊን ይመርጣሉ?",
      subtitle: "ሾፓሊን ለኢትዮጵያውያን ሸማቾች ብልጥ ረዳት የሚያደርጉትን ዋና ዋና ባህሪያት ይመልከቱ።",
      aiSearch: {
        title: "የተፈጥሮ ቋንቋ AI ፍለጋ",
        desc: "የሚፈልጉትን በእንግሊዝኛ ወይም በአማርኛ ይግለጹ። የእኛ AI ፍላጎትዎን ተረድቶ ከፍተኛ ደረጃ ያላቸውን የአሊኤክስፕረስ ምርቶች ያገኛል።",
      },
      compare: {
        title: "ያወዳድሩ እና ይቆጥቡ",
        desc: "በዋጋ እና በማጓጓዣ ወጪዎች ላይ ለመቆጠብ እንዲረዳዎ ጎን ለጎን የምርት ንጽጽር።",
      },
      fx: {
        title: "የቀጥታ የብር ተመን",
        desc: "በኢትዮጵያ ብር ትክክለኛ ዋጋ ለማረጋገጥ የቀጥታ የውጭ ምንዛሪ ዝመናዎች።",
      },
      alerts: {
        title: "የዋጋ ማሳወቂያዎች",
        desc: "የምርት ዋጋ ሲቀየር ወይም ሲቀንስ ፈጣን ማሳወቂያዎችን ያግኙ።",
      },
      saved: {
        title: "የተቀመጡ ተወዳጅ ዕቃዎች",
        desc: "ዕቃዎችን በመሳሪያዎችዎ ላይ ያስቀምጡ እና ከመግዛትዎ በፊት በቀላሉ ያደራጁ።",
      },
      i18n: {
        title: "ባለሁለት ቋንቋ ድጋፍ",
        desc: "ሙሉ የአማርኛ እና የእንግሊዝኛ ቋንቋ ድጋፍ ያለው ምቹ የግዢ ተሞክሮ።",
      },
      officialApi: {
        title: "ቀጥተኛ የ API ግንኙነት",
        desc: "ትክክለኛ የምርት መረጃ ለማግኘት ከዓለም አቀፍ የኢኮሜርስ መድረኮች ጋር የተገናኘ።",
      },
      imageSearch: {
        title: "የምስል ፍለጋ",
        desc: "ፎቶ በማስገባት ወይም ፎቶ በማንሳት በቀላሉ ምርቶችን ያግኙ።",
      },
    },
    demo: {
      title: "ሾፓሊ በተግባር",
      subtitle: "ተመጣጣኝ እና ቀላል ግዢ",
    },
    testimonials: {
      title: "ተጠቃሚዎቻችን ምን ይላሉ?",
      subtitle: "በመላው ኢትዮጵያ በሺዎች በሚቆጠሩ ሸማቾች የተወደደ",
      users: [
        {
          name: "አበበ ተ.",
          location: "አዲስ አበባ",
          quote: "ሾፓሊ የኤሌክትሮኒክስ ዋጋዎችን በፍጥነት እንዳወዳድር እና ገንዘብ እንዳድን ረድቶኛል!",
          rating: 5,
        },
        {
          name: "ሃና መ.",
          location: "ባሕር ዳር",
          quote: "አማርኛ መደገፉን በጣም ወድጄዋለሁ። ለቤተሰቤ የኦንላይን ግዢን እጅግ በጣም ቀላል አድርጎታል።",
          rating: 5,
        },
        {
          name: "ሳሙኤል ከ.",
          location: "ሀዋሳ",
          quote: "ወደ ብር የሚቀይረው ምንዛሪ ድንቅ ነው። በመጨረሻም ከመግዛቴ በፊት ትክክለኛውን ዋጋ ማወቅ ችያለሁ።",
          rating: 5,
        },
        {
          name: "ሙሉጌታ ይ.",
          location: "አዲስ አበባ",
          quote: "በየቦታው ዋጋ ለመፈተሽ ጊዜዬን አጠፋ ነበር - አሁን ሾፓሊ ውጤቶችን በቅጽበት ይሰጠኛል!",
          rating: 5,
        },
        {
          name: "ሳራ መ.",
          location: "መቐለ",
          quote: "የዋጋ ማሳወቂያው ላፕቶፔ 15% ሲቀንስ እንዳገኝ ረድቶኛል! በጣም እወደዋለሁ!",
          rating: 5,
        },
      ],
    },
    howItWorks: {
      title: "ሾፓሊ እንዴት ይሰራል?",
      subtitle: "በሶስት ቀላል ደረጃዎች የተዘጋጁ ምርጥ የምርት ምክሮችን ያግኙ",
      step1: {
        number: "01",
        title: "ጥያቄዎን ይጠይቁ",
        desc: "የሚፈልጉትን በእንግሊዝኛ ወይም በአማርኛ ይጻፉ ወይም በምስል ይፈልጉ።",
      },
      step2: {
        number: "02",
        title: "ብልጥ ምክሮችን ያግኙ",
        desc: "የእኛ AI ፍላጎትዎን በመተንተን ምርጥ ምርቶችን ከትክክለኛ ዋጋ ጋር ያገኛል።",
      },
      step3: {
        number: "03",
        title: "ያወዳድሩ እና ይግዙ",
        desc: "ምርቶችን ያወዳድሩ እና ምርጡን አማራጭ በቀጥታ ከመደብሩ ይግዙ።",
      },
    },
    cta: {
      title: "ዛሬውኑ ከሾፓሊ ጋር በብልሃት መሸመት ይጀምሩ",
      subtitle: "በየቀኑ ጊዜ እና ገንዘብ የሚቆጥቡ በሺዎች የሚቆጠሩ ኢትዮጵያውያን ሸማቾችን ይቀላቀሉ።",
      button: "ሾፓሊን አሁን ይሞክሩ",
    },
  },
  footer: {
    rights: "መብቱ በሕግ የተጠበቀ ነው።",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { en, am };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
