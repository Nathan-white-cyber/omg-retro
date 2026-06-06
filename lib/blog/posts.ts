export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  date: string;
  readTime: string;
  coverColor: string;
  content: string;
  tags: string[];
  relatedSlugs: string[];
}

const authors = {
  jake: {
    name: "Jake Rivera",
    avatar: "JR",
    bio: "Jake writes collecting guides for OMG Retro and spends most weekends comparing labels, manuals, and weird regional variants.",
  },
  maria: {
    name: "Maria Santos",
    avatar: "MS",
    bio: "Maria leads testing notes and game spotlights, with a soft spot for RPGs, original hardware, and clean save batteries.",
  },
  chris: {
    name: "Chris Park",
    avatar: "CP",
    bio: "Chris focuses on authenticity checks, cartridge inspection, and helping collectors avoid expensive surprises.",
  },
};

function articleContent({
  title,
  category,
  lead,
  sections,
  quote,
}: {
  title: string;
  category: string;
  lead: string;
  sections: Array<{ heading: string; body: string }>;
  quote: string;
}) {
  return `
    <p>${lead}</p>
    <h2>${sections[0].heading}</h2>
    <p>${sections[0].body}</p>
    <blockquote>${quote}</blockquote>
    <h2>${sections[1].heading}</h2>
    <p>${sections[1].body}</p>
    <h2>${sections[2].heading}</h2>
    <p>${sections[2].body}</p>
    <p>At OMG Retro, every copy we sell is cleaned, inspected, and tested on original hardware before it ships. Whether the article is a ${category.toLowerCase()} piece or a buying checklist, the goal is the same: help you buy games you can trust and actually enjoy playing.</p>
    <p>${title} is part of that larger promise. Good collecting starts with clear information, honest condition notes, and games that arrive ready for your shelf or console.</p>
  `;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "what-does-cib-mean",
    title: "What Does CIB Mean? The Complete Guide to Retro Game Conditions",
    category: "Collecting Guides",
    author: authors.jake,
    date: "January 15, 2026",
    readTime: "7 min read",
    coverColor: "#1FA34A",
    excerpt:
      "CIB, Loose, New/Sealed - if you are new to retro collecting these terms can be confusing. Here is everything you need to know about game conditions and why they matter for value and playability.",
    tags: ["Collecting", "CIB", "Grading", "Conditions"],
    relatedSlugs: ["fake-retro-games-how-to-spot", "gamecube-collecting-guide", "most-valuable-n64-games-2026"],
    content: articleContent({
      title: "What Does CIB Mean? The Complete Guide to Retro Game Conditions",
      category: "Collecting Guides",
      lead:
        "CIB means complete in box, but that small phrase carries a lot of weight in retro game collecting. A complete copy can include the game, original case or box, manual, inserts, maps, registration cards, and sometimes even small promotional materials.",
      sections: [
        {
          heading: "What Complete Really Means",
          body:
            "A CIB listing should be specific about what is included. Cartridge games often need a box and manual to count as complete, while disc games usually need the case artwork and manual. Condition still matters: a torn manual or crushed box can change value even when every piece is present.",
        },
        {
          heading: "Loose, CIB, and New/Sealed",
          body:
            "Loose games are usually the most affordable and best choice for players. CIB copies appeal to collectors who care about display and long-term value. New or sealed games are a different market entirely, where authenticity and seal condition become especially important.",
        },
        {
          heading: "How Condition Affects Value",
          body:
            "Two copies of the same game can sell for very different prices. Clean labels, intact manuals, unbroken case tabs, and original inserts all help. For rare games, the jump from loose to CIB can be dramatic because complete copies are much harder to replace.",
        },
      ],
      quote:
        "A good condition grade should make a buyer more confident, not more confused.",
    }),
  },
  {
    slug: "most-valuable-n64-games-2026",
    title: "The 10 Most Valuable N64 Games Right Now (2026)",
    category: "Top Lists",
    author: authors.jake,
    date: "February 3, 2026",
    readTime: "9 min read",
    coverColor: "#1FA34A",
    excerpt:
      "From Conker to ClayFighter, these are the Nintendo 64 games commanding the highest prices in 2026 and why collectors are still hunting for them.",
    tags: ["N64", "Nintendo 64", "Collecting", "Value"],
    relatedSlugs: ["what-does-cib-mean", "fake-retro-games-how-to-spot", "gamecube-collecting-guide"],
    content: articleContent({
      title: "The 10 Most Valuable N64 Games Right Now (2026)",
      category: "Top Lists",
      lead:
        "Nintendo 64 collecting keeps getting more competitive. The system has a smaller library than many consoles, but demand for clean boxes, manuals, and cult favorites has made certain games surprisingly expensive.",
      sections: [
        {
          heading: "Why N64 Prices Keep Climbing",
          body:
            "N64 boxes were easy to crush and easy to throw away, so complete copies can be scarce. Games with small print runs, late-era releases, or strong multiplayer nostalgia tend to move fastest when clean examples appear.",
        },
        {
          heading: "The Names Collectors Watch",
          body:
            "Conker's Bad Fur Day, ClayFighter Sculptor's Cut, Bomberman 64: The Second Attack, and Goemon titles are still high-interest picks. Condition is the difference between a nice copy and a serious collector piece.",
        },
        {
          heading: "Buying Without Overpaying",
          body:
            "Compare sold prices, check label wear, and be careful with listings that hide box corners or manual backs. A tested loose copy can be the better play if your goal is to experience the game rather than chase a display-grade box.",
        },
      ],
      quote:
        "N64 value is not just rarity. It is rarity plus nostalgia, condition, and whether the game is still fun to play today.",
    }),
  },
  {
    slug: "how-we-test-every-game",
    title: "How We Test Every Game Before It Ships",
    category: "Behind the Scenes",
    author: authors.maria,
    date: "March 12, 2026",
    readTime: "5 min read",
    coverColor: "#CC1E1E",
    excerpt:
      "Every game at OMG Retro goes through a strict testing process before it leaves our hands. Here is exactly what we check and why it matters.",
    tags: ["Quality", "Testing", "Behind the Scenes"],
    relatedSlugs: ["fake-retro-games-how-to-spot", "what-does-cib-mean", "best-snes-rpgs-ranked"],
    content: articleContent({
      title: "How We Test Every Game Before It Ships",
      category: "Behind the Scenes",
      lead:
        "Testing retro games is more than turning them on once. Contacts age, discs scratch, save batteries fail, and old cases hide problems that are easy to miss if you rush.",
      sections: [
        {
          heading: "First We Clean",
          body:
            "Cartridges get contact cleaning, discs get visual inspection, and cases are checked for cracks, water damage, or missing tabs. Cleaning is not cosmetic only; better contact means fewer read issues on original hardware.",
        },
        {
          heading: "Then We Test on Real Hardware",
          body:
            "We boot every game on original or period-appropriate hardware and verify it reaches playable state. For games with saves, we check save behavior where possible and flag battery concerns clearly.",
        },
        {
          heading: "Finally We Pack for Shipping",
          body:
            "A clean tested game can still be ruined by lazy packaging. We protect cases, manuals, and cartridges so what leaves our bench arrives in the condition you expected.",
        },
      ],
      quote:
        "A retro game is only ready to sell when we would be comfortable putting it into our own console.",
    }),
  },
  {
    slug: "gamecube-collecting-guide",
    title: "GameCube Collecting: The Complete Starter Guide",
    category: "Collecting Guides",
    author: authors.jake,
    date: "April 8, 2026",
    readTime: "11 min read",
    coverColor: "#5e3f8e",
    excerpt:
      "The GameCube is having a moment. Prices are rising, CIB copies are getting harder to find, and its library is packed with underrated gems. Here is where to start.",
    tags: ["GameCube", "Collecting", "Nintendo"],
    relatedSlugs: ["what-does-cib-mean", "most-valuable-n64-games-2026", "fake-retro-games-how-to-spot"],
    content: articleContent({
      title: "GameCube Collecting: The Complete Starter Guide",
      category: "Collecting Guides",
      lead:
        "The GameCube library is compact, colorful, and increasingly expensive. It sits in a sweet spot where nostalgia is high, discs are still playable, and many of the best games never received perfect modern replacements.",
      sections: [
        {
          heading: "Start With Playable Staples",
          body:
            "Super Smash Bros. Melee, Mario Kart: Double Dash, Metroid Prime, and Luigi's Mansion are easy recommendations because they show what the system does best. CIB copies are ideal, but tested discs with clean cases are still excellent for players.",
        },
        {
          heading: "Watch Disc and Case Condition",
          body:
            "GameCube discs are small and can be picky when scratched. Check for resurfacing marks, cracks near the center ring, water damage on artwork, and manual condition if you care about complete copies.",
        },
        {
          heading: "Do Not Ignore Underrated Picks",
          body:
            "The library is deeper than first-party hits. Viewtiful Joe, Baten Kaitos, Custom Robo, and Wave Race: Blue Storm are all worth a look before prices climb further.",
        },
      ],
      quote:
        "The best GameCube collection is not the most expensive one. It is the one you actually want to play.",
    }),
  },
  {
    slug: "fake-retro-games-how-to-spot",
    title: "5 Signs a Retro Game is Fake (And How We Spot Them)",
    category: "Collecting Guides",
    author: authors.chris,
    date: "May 20, 2026",
    readTime: "6 min read",
    coverColor: "#003087",
    excerpt:
      "Counterfeit retro games are everywhere and getting harder to spot. Here are the five telltale signs we check on every single purchase.",
    tags: ["Authenticity", "Fakes", "Collecting"],
    relatedSlugs: ["how-we-test-every-game", "what-does-cib-mean", "most-valuable-n64-games-2026"],
    content: articleContent({
      title: "5 Signs a Retro Game is Fake (And How We Spot Them)",
      category: "Collecting Guides",
      lead:
        "Counterfeit games can look convincing at a glance. Labels are sharper, shells are better, and online photos often hide the details that matter.",
      sections: [
        {
          heading: "Labels and Print Quality",
          body:
            "Incorrect gloss, blurry small text, wrong label alignment, and colors that feel slightly off are early warning signs. A label can be damaged and still authentic, so we compare multiple details before making a call.",
        },
        {
          heading: "Shells, Screws, and Boards",
          body:
            "Cartridge shells should match the system, region, and release period. Screw types, plastic texture, board markings, and chip layout all tell a story when the outside is not enough.",
        },
        {
          heading: "Too-Clean Deals",
          body:
            "A rare game listed far below market value deserves extra scrutiny. We would rather reject a questionable copy than pass uncertainty to a customer.",
        },
      ],
      quote:
        "Authenticity is not one clue. It is the pattern formed by label, shell, board, price, and provenance.",
    }),
  },
  {
    slug: "best-snes-rpgs-ranked",
    title: "The Best RPGs on Super Nintendo \u2014 Ranked",
    category: "Game Spotlights",
    author: authors.maria,
    date: "June 5, 2026",
    readTime: "8 min read",
    coverColor: "#9B2FAE",
    excerpt:
      "The SNES had one of the greatest RPG libraries ever assembled. From Chrono Trigger to Secret of Mana, here are the best ones and which copies to look for.",
    tags: ["SNES", "RPG", "Nintendo", "Game Spotlight"],
    relatedSlugs: ["gamecube-collecting-guide", "what-does-cib-mean", "how-we-test-every-game"],
    content: articleContent({
      title: "The Best RPGs on Super Nintendo \u2014 Ranked",
      category: "Game Spotlights",
      lead:
        "The Super Nintendo RPG library still feels special because so many of its games are beautiful, readable, and mechanically sharp decades later.",
      sections: [
        {
          heading: "The Heavy Hitters",
          body:
            "Chrono Trigger, Final Fantasy III, EarthBound, and Secret of Mana are the names everyone knows for good reason. They combine strong art direction, memorable music, and pacing that still holds up.",
        },
        {
          heading: "Great Games Beyond the Obvious",
          body:
            "Lufia II, Breath of Fire II, Illusion of Gaia, and Shadowrun deserve attention too. Some are cheaper than the headline games while still offering the exact SNES-era charm collectors want.",
        },
        {
          heading: "Which Copies to Look For",
          body:
            "Manuals matter for RPGs because maps, charts, and instructions were part of the original experience. If CIB is out of reach, look for clean labels and tested save functionality.",
        },
      ],
      quote:
        "SNES RPGs are collectible because they are historically important and still genuinely playable.",
    }),
  },
];

export const blogCategories = [
  "All",
  "Collecting Guides",
  "Top Lists",
  "Game Spotlights",
  "Behind the Scenes",
  "Retro News",
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedPosts(post: BlogPost) {
  return post.relatedSlugs
    .map((slug) => getBlogPost(slug))
    .filter((item): item is BlogPost => Boolean(item))
    .slice(0, 3);
}

