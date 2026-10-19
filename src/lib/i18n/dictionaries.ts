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
    hero: {
      headline: "Your Smart AI Assistant for AliExpress Shopping",
      subhead: "Shop smarter with natural language AI search, automated deal comparison, real-time USD to ETB currency rates, and instant price drop alerts.",
      startSearching: "Start searching",
      exploreDeals: "Explore deals",
      badge: "AI-Powered AliExpress Companion",
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
      title: "Everything you need to shop AliExpress with confidence",
      subtitle: "Powerful AI tools designed specifically for global and Ethiopian shoppers.",
      aiSearch: {
        title: "Natural Language AI Search",
        desc: "Describe what you want in plain English or Amharic. Our AI understands your intent and finds top-rated AliExpress products.",
      },
      compare: {
        title: "Side-by-Side Comparison",
        desc: "Compare specifications, real buyer reviews, seller credibility scores, and total shipping costs in one clear matrix.",
      },
      fx: {
        title: "Live ETB / USD Rates",
        desc: "Never guess what you're paying in Ethiopian Birr. Real-time FX conversion with transparent timestamped exchange rates.",
      },
      alerts: {
        title: "Price Drop Alerts",
        desc: "Set your target price and let ShopAlly watch the product for you. Get notified the moment the price drops.",
      },
      saved: {
        title: "Curated Saved Items",
        desc: "Bookmark products across devices and organize potential buys before placing your orders.",
      },
      i18n: {
        title: "Bilingual Experience",
        desc: "Full Amharic (አማርኛ) and English localization with instant dark mode theming for day and night shopping.",
      },
    },
    howItWorks: {
      title: "How ShopAlly Works",
      subtitle: "Three simple steps to smarter international shopping.",
      step1: {
        number: "01",
        title: "Search in Plain Language",
        desc: "Type what you're looking for just like speaking to a personal shopper.",
      },
      step2: {
        number: "02",
        title: "AI Scores & Matches",
        desc: "Our model reviews seller ratings, delivery estimates, and price integrity.",
      },
      step3: {
        number: "03",
        title: "Save & Buy with Confidence",
        desc: "Track prices in ETB, compare alternatives, and click directly through to checkout.",
      },
    },
    cta: {
      title: "Ready to find your best deals on AliExpress?",
      subtitle: "Join thousands of shoppers using ShopAlly to save time and money on every purchase.",
      button: "Get started for free",
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
    hero: {
      headline: "ለአሊኤክስፕረስ ግዢዎ ብልጥ የ AI አጋዥ",
      subhead: "በተፈጥሮ ቋንቋ AI ፍለጋ፣ በራስ-ሰር ምርት ማወዳደር፣ የቀጥታ የዶላር ወደ ብር (ETB) ምንዛሪ እና የዋጋ ቅነሳ ማሳወቂያዎች ብልጥ ግዢ ይፈጽሙ።",
      startSearching: "ፍለጋ ይጀምሩ",
      exploreDeals: "ቅናሾችን ይመልከቱ",
      badge: "በ AI የተደገፈ የአሊኤክስፕረስ አጋዥ",
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
      title: "በአሊኤክስፕረስ በልበ ሙሉነት ለመግዛት የሚያስፈልጉዎት ነገሮች",
      subtitle: "በተለይ ለዓለም አቀፍ እና ለኢትዮጵያ ገዢዎች የተዘጋጁ ጠንካራ የ AI መሣሪያዎች።",
      aiSearch: {
        title: "የተፈጥሮ ቋንቋ AI ፍለጋ",
        desc: "የሚፈልጉትን በእንግሊዝኛ ወይም በአማርኛ ይግለጹ። የእኛ AI ፍላጎትዎን ተረድቶ ከፍተኛ ደረጃ ያላቸውን የአሊኤክስፕረስ ምርቶች ያገኛል።",
      },
      compare: {
        title: "ጎን ለጎን ማወዳደሪያ",
        desc: "ዝርዝር መግለጫዎችን፣ የገዢዎች ግምገማዎችን፣ የሻጭ ተዓማኒነት ነጥቦችን እና የማጓጓዣ ወጪዎችን በአንድ ሠንጠረዥ ያወዳድሩ።",
      },
      fx: {
        title: "የቀጥታ የብር እና የዶላር ምንዛሪ",
        desc: "በኢትዮጵያ ብር ምን ያህል እንደሚከፍሉ በግምት አያውቁም። በእውነተኛ ጊዜ የውጭ ምንዛሪ ተመን በትክክለኛ ሰዓት ያግኙ።",
      },
      alerts: {
        title: "የዋጋ ቅነሳ ማሳወቂያዎች",
        desc: "የሚፈልጉትን ዋጋ ያስቀምጡ እና ሾፓሊ ምርቱን እንዲከታተልልዎ ያድርጉ። ዋጋው በወረደበት ቅጽበት ማሳወቂያ ይደርስዎታል።",
      },
      saved: {
        title: "የተቀመጡ ተወዳጅ ዕቃዎች",
        desc: "ዕቃዎችን በመሳሪያዎችዎ ላይ ያስቀምጡ እና ከመግዛትዎ በፊት በቀላሉ ያደራጁ።",
      },
      i18n: {
        title: "ባለሁለት ቋንቋ ተሞክሮ",
        desc: "ሙሉ የአማርኛ እና የእንግሊዝኛ ድጋፍ ከቀን እና የማታ ገጽታ (Dark Mode) ጋር።",
      },
    },
    howItWorks: {
      title: "ሾፓሊ እንዴት ይሰራል?",
      subtitle: "ለተሻለ ዓለም አቀፍ ግዢ ሶስት ቀላል ደረጃዎች።",
      step1: {
        number: "01",
        title: "በቀላል ቋንቋ ይፈልጉ",
        desc: "ለግል ሸማች እንደሚናገሩት የሚፈልጉትን በግልጽ ጽፈው ይጠይቁ።",
      },
      step2: {
        number: "02",
        title: "AI ምርጡን ይመርጣል",
        desc: "የእኛ ሞዴል የሻጭ ደረጃዎችን፣ የማድረሻ ጊዜን እና የዋጋ ትክክለኛነትን ይመረምራል።",
      },
      step3: {
        number: "03",
        title: "አስቀምጠው በልበ ሙሉነት ይግዙ",
        desc: "ዋጋዎችን በብር ይከታተሉ፣ አማራጮችን ያወዳድሩ እና በቀጥታ ወደ ግዢ ይሂዱ።",
      },
    },
    cta: {
      title: "በአሊኤክስፕረስ ላይ ምርጥ ቅናሾችን ለማግኘት ዝግጁ ነዎት?",
      subtitle: "በእያንዳንዱ ግዢ ጊዜንና ገንዘብን ለመቆጠብ ሾፓሊን የሚጠቀሙ በሺዎች የሚቆጠሩ ገዢዎችን ይቀላቀሉ።",
      button: "በነጻ ይጀምሩ",
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
