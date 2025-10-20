const form = document.getElementById("chatForm");
const input = document.getElementById("userInput");
const messages = document.getElementById("messages");
const template = document.getElementById("messageTemplate");
const avatar = document.getElementById("ganjaBotAvatar");
const statusText = document.getElementById("botStatus");
const avatarImage = document.getElementById("ganjaBotImage");
const avatarVideo = document.getElementById("ganjaBotVideo");
const chatPanel = document.querySelector(".chat-panel");
const chatVideo = document.getElementById("ganjaBotChatVideo");

const VIDEO_ACTIVE_CLASS = "is-video-active";

const generalGuidance = [
  "journal cultivar, dose, and setting so you can repeat winning sessions and skip the misses.",
  "store flower in airtight glass with a 58-62 humidity pack to protect terpenes and potency.",
  "pair cannabinoids with water and light snacks that contain healthy fats to steady absorption.",
  "rotate terpene profiles every few weeks to keep tolerance fresh and broaden therapeutic coverage.",
  "blend THC with equal parts CBD when you want relief without the edge of higher psychoactivity."
];

const thinkingPhrases = [
  "Infusing herbal wisdom...",
  "Harvesting terpene-rich advice...",
  "Checking cannabinoid ratios for you...",
  "Rolling up a mindful response..."
];

const FALLBACK_STRAINS = [
  {
    name: "Blue Dream",
    aliases: ["blue dream"],
    type: "Hybrid (sativa-leaning)",
    lineage: "Blueberry x Haze",
    thc: "17-24%",
    cbd: "<1%",
    terpenes: ["myrcene", "pinene", "caryophyllene"],
    aromas: ["sweet berry", "herbal", "pine"],
    experiences: ["clear-headed euphoria", "creative focus", "gentle body relaxation"],
    bestFor: ["daytime pain relief", "balanced mood", "productive creativity"],
    popularity: "Staple West Coast hybrid known for reliable balance.",
    idealConsumption: "Vaporize around 360 F to keep the berry top notes bright.",
    popularityRank: 1
  },
  {
    name: "Girl Scout Cookies",
    aliases: ["girl scout cookies", "gsc"],
    type: "Hybrid (indica-leaning)",
    lineage: "OG Kush x Durban Poison",
    thc: "19-25%",
    cbd: "<1%",
    terpenes: ["caryophyllene", "limonene", "linalool"],
    aromas: ["sweet dough", "earthy spice", "mint"],
    experiences: ["heavy-hitting euphoria", "full-body comfort", "mood elevation"],
    bestFor: ["stress relief", "late-afternoon unwinding", "appetite support"],
    popularity: "Dessert hybrid classic with nationwide demand.",
    idealConsumption: "Enjoy in a slow-burning joint or low-temp dab for minty sweetness.",
    popularityRank: 2
  },
  {
    name: "OG Kush",
    aliases: ["og kush", "og"],
    type: "Hybrid (indica-leaning)",
    lineage: "Chemdawg x Hindu Kush",
    thc: "19-26%",
    cbd: "<1%",
    terpenes: ["myrcene", "limonene", "caryophyllene"],
    aromas: ["fuel", "earth", "citrus"],
    experiences: ["classic relaxing buzz", "mood melt", "body-soothing relief"],
    bestFor: ["evening wind-down", "pain management", "low-key social time"],
    popularity: "Legacy cultivar anchoring menus since the 90s.",
    idealConsumption: "Pack in glassware or vaporize at 345 F for a bright citrus front.",
    popularityRank: 3
  },
  {
    name: "Granddaddy Purple",
    aliases: ["granddaddy purple", "gdp"],
    type: "Indica",
    lineage: "Purple Urkle x Big Bud",
    thc: "17-23%",
    cbd: "<1%",
    terpenes: ["myrcene", "pinene", "caryophyllene"],
    aromas: ["grape", "berry", "earth"],
    experiences: ["deep body relaxation", "soothing calm", "sleepy comfort"],
    bestFor: ["nighttime rest", "stress relief", "muscle relaxation"],
    popularity: "Perennial favorite for people chasing classic indica effects.",
    idealConsumption: "Decarb into coconut oil or keep flower for twilight bowls.",
    popularityRank: 4
  },
  {
    name: "Sour Diesel",
    aliases: ["sour diesel", "sour d"],
    type: "Sativa",
    lineage: "Chemdawg 91 x Super Skunk",
    thc: "18-24%",
    cbd: "<1%",
    terpenes: ["limonene", "caryophyllene", "myrcene"],
    aromas: ["tangy diesel", "citrus", "skunk"],
    experiences: ["fast-onset cerebral clarity", "energizing uplift", "creative drive"],
    bestFor: ["morning motivation", "focus-driven projects", "mood lift"],
    popularity: "East Coast icon that still rules wake-and-bake menus.",
    idealConsumption: "Vaporize at 365 F or roll skinny joints to moderate intake.",
    popularityRank: 5
  },
  {
    name: "Gorilla Glue #4",
    aliases: ["gorilla glue", "gg4", "gorilla glue #4"],
    type: "Hybrid (indica-leaning)",
    lineage: "Chem's Sister x Sour Dubb x Chocolate Diesel",
    thc: "20-27%",
    cbd: "<1%",
    terpenes: ["caryophyllene", "humulene", "myrcene"],
    aromas: ["diesel", "chocolate", "pine"],
    experiences: ["heavy relaxation", "deep muscle relief", "euphoric calm"],
    bestFor: ["stubborn pain", "evening decompression", "post-work recovery"],
    popularity: "Potent resin bomb prized by veteran consumers.",
    idealConsumption: "Take small vapor draws; expect couch-lock with larger doses.",
    popularityRank: 6
  },
  {
    name: "Wedding Cake",
    aliases: ["wedding cake", "triangle mints"],
    type: "Hybrid (indica-leaning)",
    lineage: "Triangle Kush x Animal Mints",
    thc: "19-26%",
    cbd: "<1%",
    terpenes: ["limonene", "caryophyllene", "linalool"],
    aromas: ["vanilla frosting", "pepper", "earth"],
    experiences: ["balanced body relief", "calm euphoria", "savory dessert finish"],
    bestFor: ["social evenings", "balanced relaxation", "restorative downtime"],
    popularity: "Dessert hybrid darling with national demand.",
    idealConsumption: "Pairs nicely with low-temp dabs or a tightly packed bowl to release the vanilla-pepper profile.",
    popularityRank: 7
  },
  {
    name: "Pineapple Express",
    aliases: ["pineapple express"],
    type: "Hybrid (sativa-leaning)",
    lineage: "Trainwreck x Hawaiian",
    thc: "17-23%",
    cbd: "<1%",
    terpenes: ["limonene", "beta-pinene", "caryophyllene"],
    aromas: ["tropical fruit", "pineapple", "cedar"],
    experiences: ["cheerful energy", "smooth body buzz", "creative spark"],
    bestFor: ["daytime adventures", "social creativity", "errand running"],
    popularity: "Pop-culture favorite that actually delivers upbeat fun.",
    idealConsumption: "Great in a dry herb vape at 360 F or paired with citrus seltzer.",
    popularityRank: 8
  },
  {
    name: "White Widow",
    aliases: ["white widow"],
    type: "Hybrid",
    lineage: "Brazilian Sativa landrace x South Indian Indica",
    thc: "18-25%",
    cbd: "<1%",
    terpenes: ["myrcene", "caryophyllene", "pinene"],
    aromas: ["earth", "pungent", "peppery spice"],
    experiences: ["balanced cerebral buzz", "upbeat focus", "relaxed body ease"],
    bestFor: ["daytime creativity", "light pain relief", "social energy"],
    popularity: "Global classic that bridges old-school and modern tastes.",
    idealConsumption: "Grind gently and vaporize around 355 F to soften the peppery edge.",
    popularityRank: 9
  },
  {
    name: "Runtz",
    aliases: ["runtz", "white runtz"],
    type: "Hybrid",
    lineage: "Gelato x Zkittlez",
    thc: "20-25%",
    cbd: "<1%",
    terpenes: ["limonene", "caryophyllene", "ocimene"],
    aromas: ["candy", "tropical fruit", "cream"],
    experiences: ["euphoric happiness", "body-soft relaxation", "social ease"],
    bestFor: ["celebratory moods", "creative play", "late-day hangouts"],
    popularity: "Candy-coated terp star with relentless hype.",
    idealConsumption: "Pack a fresh bowl or roll a slow-burning joint to savor sweet terps.",
    popularityRank: 10
  }
];

let strainCatalog = [];
const strainIndex = new Map();
let popularityOrder = [];
let dataReadyResolve;
const dataReady = new Promise((resolve) => {
  dataReadyResolve = resolve;
});

function hydrateStrainIndex() {
  strainIndex.clear();
  strainCatalog.forEach((strain) => {
    strainIndex.set(strain.name.toLowerCase(), strain);
    if (Array.isArray(strain.aliases)) {
      strain.aliases.forEach((alias) => strainIndex.set(alias.toLowerCase(), strain));
    }
  });
  popularityOrder = [...strainCatalog]
    .filter((entry) => typeof entry.popularityRank === "number")
    .sort((a, b) => a.popularityRank - b.popularityRank);
}

async function loadStrainCatalog() {
  try {
    const response = await fetch("cannabis_strains_100.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("Invalid strain dataset");
    }
    strainCatalog = data;
  } catch (error) {
    console.error("Failed to load strain data:", error);
    strainCatalog = [...FALLBACK_STRAINS];
  }
  hydrateStrainIndex();
  dataReadyResolve();
}

loadStrainCatalog();

const effectLibrary = [
  {
    intent: "stress relief and calm",
    keywords: ["stress", "anxiety", "calm", "relax", "relaxation", "tension", "overwhelm", "nerves", "nervous", "worry", "panic"],
    strains: ["Granddaddy Purple", "Do-Si-Dos", "Alien Technology", "ACDC"],
    guidance: "To melt stress and anxious loops, lean into myrcene-heavy indicas or CBD-rich cultivars, breathe slowly, and keep doses measured."
  },
  {
    intent: "sleep support",
    keywords: ["sleep", "insomnia", "rest", "night", "bed", "bedtime", "restless", "tired"],
    strains: ["Slurricane", "Alien Technology", "Northern Lights", "Granddaddy Purple"],
    guidance: "For deeper sleep, choose sedating indicas about an hour before lights out and pair them with a calming tea or magnesium."
  },
  {
    intent: "pain and inflammation",
    keywords: ["pain", "ache", "aches", "aching", "arthritis", "inflammation", "cramps", "migraine", "fibromyalgia", "neuropathy", "injury", "sore"],
    strains: ["Gorilla Glue #4", "Bruce Banner", "Do-Si-Dos", "ACDC"],
    guidance: "For persistent pain, combine THC-forward hybrids rich in beta-caryophyllene and optionally layer in CBD to extend relief."
  },
  {
    intent: "energizing daytime lift",
    keywords: ["energy", "energetic", "focus", "motivated", "motivation", "productivity", "daytime", "morning", "alert", "wake"],
    strains: ["Durban Poison", "Jack Herer", "Super Lemon Haze", "Green Crack"],
    guidance: "For upbeat daytime momentum, pick terpinolene and limonene-heavy sativas with crisp onset and hydrate so you stay bright rather than jittery."
  },
  {
    intent: "creative flow and mood lift",
    keywords: ["creative", "creativity", "mood", "uplift", "happy", "inspired", "inspiration", "art", "music"],
    strains: ["Mimosa", "Strawberry Cough", "Gelato 33", "Blue Dream"],
    guidance: "To stay playful and inspired, citrus-forward sativas and balanced dessert hybrids keep mood elevated without knocking you off task."
  },
  {
    intent: "appetite support and nausea relief",
    keywords: ["appetite", "hungry", "nausea", "nauseous", "vomit", "chemo", "chemotherapy", "eat", "eating"],
    strains: ["Apple Fritter", "Girl Scout Cookies", "Forbidden Fruit", "Runtz"],
    guidance: "For appetite recovery, THC-forward dessert hybrids with sweet spice calm the stomach and spark hunger."
  },
  {
    intent: "social ease and chill",
    keywords: ["social", "friends", "party", "hang", "hangout", "chill", "relax with friends"],
    strains: ["Mimosa", "Gelato 33", "Strawberry Cough", "Pineapple Express"],
    guidance: "For relaxed social vibes, look to balanced citrus and dessert hybrids that lift the mood without racing thoughts."
  },
  {
    intent: "gentle cbd-forward relief",
    keywords: ["cbd", "non intoxicating", "clear headed", "light dose", "microdose", "low thc"],
    strains: ["ACDC", "Harlequin"],
    guidance: "When you want clarity with relief, stick with CBD-dominant cultivars and sip slowly until you find the sweet spot."
  }
];

const responsibleTopics = [
  {
    title: "Cannabis Science Basics",
    keywords: [
      "science",
      "how cannabis works",
      "endocannabinoid",
      "ecs",
      "cb1",
      "cb2",
      "terpene",
      "terpenes",
      "cannabinoid",
      "pharmacology"
    ],
    expert:
      "Explain how THC, CBD, and supportive cannabinoids interact with CB1 and CB2 receptors, and why terpene content and delivery method change onset, intensity, and duration.",
    plain:
      "Translation: the mix of THC, CBD, and aroma chemicals decides how fast and strong a session feels. Reading lab labels beats guessing from the strain name."
  },
  {
    title: "Dosing Literacy",
    keywords: [
      "dose",
      "dosing",
      "how much",
      "milligram",
      "mg",
      "start low",
      "titrate",
      "dosage"
    ],
    expert:
      "Cover starting doses (1-2 mg THC or 5-10 mg CBD for edibles), titrating slowly, journaling outcomes, factoring in tolerance breaks, and adjusting for body weight or metabolism.",
    plain:
      "Translation: begin tiny, wait for the full effect, write down what happened, and only add more once you know the first amount feels good."
  },
  {
    title: "Consumption Methods & Harm Reduction",
    keywords: [
      "smoking",
      "vaping",
      "vaporizing",
      "joint",
      "bong",
      "edible",
      "tincture",
      "topical",
      "harm reduction",
      "combustion",
      "temperatures"
    ],
    expert:
      "Compare onset and duration for inhalation, vaporization, edibles, tinctures, and topicals. Teach low-temperature vaping, clean gear, and avoiding additives or untested products.",
    plain:
      "Translation: how you take cannabis matters. Inhaling hits fast, edibles last long, and clean tools plus moderate heat keep things smoother on the lungs."
  },
  {
    title: "Mindful Setting & Mindset",
    keywords: [
      "set and setting",
      "environment",
      "mindset",
      "safe space",
      "anxiety",
      "first time",
      "bad trip",
      "prepare"
    ],
    expert:
      "Coach people to choose a comfortable location, supportive company, calming music, hydration, and snacks. Encourage intention setting and breathing techniques to steady anxious moments.",
    plain:
      "Translation: pick a cozy spot, have trusted friends or calm entertainment ready, and sip water so the vibe stays relaxed instead of overwhelming."
  },
  {
    title: "Mixing Cannabis With Other Substances",
    keywords: [
      "alcohol",
      "liquor",
      "wine",
      "beer",
      "caffeine",
      "coffee",
      "nicotine",
      "tobacco",
      "pills",
      "drink",
      "drinking",
      "beer",
      "wine",
      "cocktail",
      "spirits",
      "medication",
      "prescription",
      "interaction",
      "mix"
    ],
    expert:
      "Discuss additive effects with alcohol, stimulants, and depressants. Highlight metabolism conflicts with prescriptions (blood thinners, SSRIs) and encourage medical consults before mixing.",
    plain:
      "Translation: booze or caffeine can intensify the high, and some medications clash with cannabis. If you take pills or plan to drink, cut doses and talk with a doctor first."
  },
  {
    title: "Legal & Safety Awareness",
    keywords: [
      "legal",
      "law",
      "possession",
      "travel",
      "driving",
      "dui",
      "safety",
      "storage",
      "child",
      "pet",
      "compliance"
    ],
    expert:
      "Stay current on local law: possession limits, transport rules, employer policies, testing windows, and safe storage away from kids, pets, and shared spaces.",
    plain:
      "Translation: know your local limits, stash products locked away from kids and pets, and never drive for several hours after consuming."
  },
  {
    title: "Health & Wellness Considerations",
    keywords: [
      "health",
      "wellness",
      "respiratory",
      "mental health",
      "sleep",
      "exercise",
      "nutrition",
      "medical"
    ],
    expert:
      "Address respiratory care, mindful use with anxiety or mood disorders, sleep hygiene, hydration, and pairing cannabis with movement or stretching rather than using it as the sole wellness tool.",
    plain:
      "Translation: keep lungs clean, watch mood changes, hydrate, and pair cannabis with healthy habits like stretching or sleep routines."
  },
  {
    title: "Community Etiquette & Consent",
    keywords: [
      "etiquette",
      "sharing",
      "session",
      "consent",
      "party",
      "social",
      "invite",
      "friends",
      "peer pressure"
    ],
    expert:
      "Promote asking before sharing, labeling potency, respecting non-consumers, and creating inclusive experiences with alternative beverages or activities.",
    plain:
      "Translation: always ask before passing, say what you brought, and keep hangouts comfy for people who skip cannabis."
  },
  {
    title: "Product Quality & Sourcing",
    keywords: [
      "quality",
      "testing",
      "lab",
      "certificate",
      "coa",
      "pesticide",
      "contaminant",
      "sourcing",
      "grow",
      "cultivation",
      "organic"
    ],
    expert:
      "Teach how to read lab reports, spot red flags in packaging, understand cultivation practices, and support reputable dispensaries or growers who test for contaminants.",
    plain:
      "Translation: buy from licensed shops, check the lab results, and skip mystery bags so you know the product is clean."
  }
];

const typeInsights = {
  indica: {
    overview: "Indica-leaning cultivars lean into body heaviness, deeper relaxation, and sleep support thanks to terpene stacks heavy in myrcene and linalool.",
    bestFor: "nighttime routines, easing tension, recovery days, and setting up restful sleep.",
    strains: ["Granddaddy Purple", "Alien Technology", "Slurricane"]
  },
  sativa: {
    overview: "Sativa expressions generally shine for cerebral uplift, creative focus, and energizing daytime momentum driven by limonene and pinene.",
    bestFor: "morning or afternoon sessions when you want clarity, conversation, or artistic flow.",
    strains: ["Durban Poison", "Jack Herer", "Super Lemon Haze", "Green Crack"]
  },
  hybrid: {
    overview: "Hybrids blend lineage traits, letting you fine-tune between mental uplift and body relief. Modern menus lean heavily on dessert hybrids for their balance.",
    bestFor: "all-day flexibility, mood smoothing, and dialing effects up or down with dose.",
    strains: ["Gelato 33", "Gorilla Glue #4", "Wedding Cake", "Mimosa"]
  }
};

const contextualFallbacks = [
  {
    keywords: ["alcohol", "drink", "drinking", "wine", "beer", "cocktail", "spirits", "mix", "party"],
    response:
      "Mixing cannabis with alcohol or other drinks can multiply the effects. Halve your usual THC dose, hydrate between servings, and give yourself at least two hours before considering more. If you take prescriptions, check with a clinician first."
  },
  {
    keywords: ["legal", "law", "possession", "drive", "driving", "dui", "travel", "airport"],
    response:
      "Regulations change by state or province. Know your possession limits, keep sealed products in the trunk when traveling, and give yourself six hours after inhaled cannabis or eight after edibles before driving."
  },
  {
    keywords: ["storage", "kids", "child", "pet", "safety", "safe storage"],
    response:
      "Store cannabis in airtight containers, out of reach of kids or pets, ideally locked. Label potency on homemade products so everyone knows what they are grabbing."
  }
];

const foodPairings = [
  {
    title: "Pizza Night Pairings",
    keywords: ["pizza", "slice", "pepperoni", "margherita", "deep dish"],
    strains: ["Girl Scout Cookies", "Wedding Cake", "OG Kush"],
    tip: "Hybrid cultivars with caryophyllene mirror pizza's herby spices and keep you relaxed without sinking the vibe.",
    fun: "Fun fact: oregano and basil share terpenes with cannabis, so your slice already has a mini terp entourage.",
    snackIdeas: ["Finish with a drizzle of infused olive oil on the crust", "Sip sparkling water with citrus wedges to refresh your palate"]
  },
  {
    title: "Sweet Treat Sessions",
    keywords: ["dessert", "chocolate", "brownie", "cookie", "ice cream", "sundae", "cake"],
    strains: ["Runtz", "Wedding Cake", "Pineapple Express"],
    tip: "Dessert hybrids amplify creamy, sugary notes and keep the experience upbeat. Add CBD chocolate if you want to take the edge off high THC sweets.",
    fun: "Sweet terpene match: vanilla pairs with linalool and limonene, which show up in many dessert strains.",
    snackIdeas: ["Dip strawberries in melted chocolate and sprinkle crushed hemp seeds", "Alternate bites of sorbet with a citrusy sativa pull"]
  },
  {
    title: "Fresh Fruit & Hydration",
    keywords: ["fruit", "berries", "melon", "grapes", "smoothie", "juice"],
    strains: ["Blue Dream", "Pineapple Express", "Harlequin"],
    tip: "Fruity sativas and CBD-rich cultivars brighten natural sugars and keep you refreshed. Add electrolytes if you're sessioning outdoors.",
    fun: "Fun fact: myrcene shows up in mangoes - eating mango before your session can make THC onset feel smoother and slightly stronger.",
    snackIdeas: ["Blend a mango-lime smoothie with a pinch of sea salt", "Skewer chilled berries and mint leaves for cooling bites"]
  },
  {
    title: "Spicy & Savory Adventures",
    keywords: ["tacos", "wings", "spicy", "nachos", "salsa", "bbq", "barbecue"],
    strains: ["Sour Diesel", "Gorilla Glue #4", "White Widow"],
    tip: "Bold spices pair with limonene and pinene for energy, while GG4 anchors the heat with body comfort. Keep yogurt or guac nearby to cool things down.",
    fun: "Capsaicin from peppers boosts endorphins, so layering spice with cannabis can turn into a double mood-lift.",
    snackIdeas: ["Top nachos with infused queso (keep servings labeled!)", "Use pineapple salsa to mirror the terpenes in energetic sativas"]
  },
  {
    title: "Cozy Movie Snacks",
    keywords: ["popcorn", "chips", "snack", "munchies", "pretzel", "movie"],
    strains: ["Granddaddy Purple", "Northern Lights", "ACDC"],
    tip: "Heavier indicas and CBD cultivars dial down the pace so you actually savor the crunch. Portion snacks ahead of time to keep dosing mindful.",
    fun: "Fun fact: adding nutritional yeast to popcorn brings umami flavor plus B vitamins to power late-night movie sessions.",
    snackIdeas: ["Dust popcorn with garlic parm seasoning and an infused butter drizzle", "Pair kettle chips with a citrus seltzer to stay hydrated"]
  },
  {
    title: "Warm Drinks & Comfort Bites",
    keywords: ["tea", "chai", "cocoa", "hot chocolate", "latte", "coffee", "matcha"],
    strains: ["Harlequin", "ACDC", "Granddaddy Purple"],
    tip: "CBD-forward strains keep caffeine jitters in check. Add infused honey to herbal tea or use decaf coffee when pairing with relaxing indicas.",
    fun: "Fun fact: pairing chamomile tea with myrcene-rich strains doubles down on calming vibes thanks to shared terpenes.",
    snackIdeas: ["Stir in cinnamon-infused honey for a cozy mug", "Serve biscotti or shortbread to soak up any extra cannabinoids"]
  }
];

const methodGuidance = [
  {
    label: "edibles",
    keywords: ["edible", "edibles", "gummy", "gummies", "brownie", "baked", "capsule", "capsules", "ingest", "oral"],
    tip: "Edibles take 45-120 minutes to peak. Start with 1-2 mg THC or 5-10 mg CBD, wait for full onset, and clearly label homemade batches."
  },
  {
    label: "vaporizing",
    keywords: ["vape", "vapor", "vaporizer", "cartridge", "cart"],
    tip: "Keep vaporizer temps between 330-370 F to retain terpenes and avoid singeing delicate aromatics."
  },
  {
    label: "flower",
    keywords: ["smoke", "smoking", "flower", "joint", "pre-roll", "bowl", "pipe", "bong"],
    tip: "Use smaller bowls or thin joints for new cultivars so you can gauge potency before committing to a full session."
  },
  {
    label: "tinctures",
    keywords: ["tincture", "sublingual", "drops", "dropper"],
    tip: "Hold tinctures under the tongue for 60 seconds, then swallow for a faster onset than edibles with a 2-3 hour tail."
  },
  {
    label: "topicals",
    keywords: ["topical", "balm", "cream", "salve", "lotion"],
    tip: "Topicals shine for localized relief; massage them in every few hours and pair with light stretching for best results."
  }
];

const seenFallbackPreviews = new Set();
const fallbackTipHistory = new Map();

const delay = (min = 900, max = 1600) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

function addMessage(kind, text) {
  const clone = template.content.firstElementChild.cloneNode(true);
  clone.classList.add(kind);
  const paragraph = clone.querySelector("p");
  paragraph.textContent = text;
  messages.appendChild(clone);
  messages.scrollTo({
    top: messages.scrollHeight,
    behavior: "smooth"
  });
  return clone;
}

function setBotState(state) {
  const active = state === "generating";
  avatar.classList.toggle("is-generating", active);
  chatPanel.classList.toggle("is-generating", active);
  statusText.textContent = active ? "Processing your request..." : "let's get blazed!";
  if (active) {
    startAvatarVideo();
  } else if (avatarVideo.ended || avatarVideo.paused) {
    stopAvatarVideo();
  }
}

function buildResponse(prompt) {
  const incoming = prompt.trim();
  if (!incoming) {
    return "Start with a question about a cultivar, desired effects, or dosing style and I will tailor the guidance.";
  }

  const analysis = analyzeQuestion(incoming);

  if (analysis.strains.length > 0) {
    return renderStrainDetails(analysis);
  }

  if (analysis.popularityQuery) {
    return renderPopularityResponse(analysis);
  }

  if (analysis.effects.length > 0) {
    return renderEffectResponse(analysis);
  }

  if (analysis.foodPairings.length > 0) {
    return renderFoodResponse(analysis);
  }

  if (analysis.responsibleTopics.length > 0) {
    return renderResponsibleResponse(analysis);
  }

  if (analysis.typeMentions.length > 0) {
    return renderTypeResponse(analysis);
  }

  return fallbackResponse(incoming, analysis);
}

function simulateTyping(messageEl) {
  const paragraph = messageEl.querySelector("p");
  const dots = ["...", "..", "....."];
  let frame = 0;
  const interval = window.setInterval(() => {
    paragraph.textContent = dots[frame % dots.length];
    frame += 1;
  }, 280);
  return () => window.clearInterval(interval);
}

async function handleSubmit(event) {
  event.preventDefault();
  const value = input.value.trim();
  if (!value) {
    return;
  }

  addMessage("user", value);
  input.value = "";

  const placeholderText =
    thinkingPhrases[Math.floor(Math.random() * thinkingPhrases.length)];
  const thinkingMessage = addMessage("bot", placeholderText);
  thinkingMessage.classList.add("is-loading");

  const stopTyping = simulateTyping(thinkingMessage);
  setBotState("generating");

  window.setTimeout(async () => {
    await dataReady;
    stopTyping();
    thinkingMessage.classList.remove("is-loading");
    renderResponse(thinkingMessage, buildResponse(value));
    setBotState("idle");
  }, delay());
}

form.addEventListener("submit", handleSubmit);

function startAvatarVideo() {
  avatar.classList.add(VIDEO_ACTIVE_CLASS);
  avatarImage.setAttribute("aria-hidden", "true");
  try {
    avatarVideo.currentTime = 0;
    const playPromise = avatarVideo.play();
    if (playPromise && typeof playPromise.then === "function") {
      playPromise.catch(() => {
        stopAvatarVideo();
      });
    }
    startChatVideo();
  } catch (error) {
    stopAvatarVideo();
  }
}

function stopAvatarVideo() {
  avatar.classList.remove(VIDEO_ACTIVE_CLASS);
  avatarImage.removeAttribute("aria-hidden");
  avatarVideo.pause();
  if (typeof avatarVideo.currentTime === "number") {
    avatarVideo.currentTime = 0;
  }
  stopChatVideo();
}

avatarVideo.addEventListener("ended", () => {
  if (avatar.classList.contains("is-generating")) {
    startAvatarVideo();
  } else {
    stopAvatarVideo();
  }
});

function startChatVideo() {
  if (!chatVideo) {
    return;
  }
  try {
    chatVideo.currentTime = 0;
    const playPromise = chatVideo.play();
    if (playPromise && typeof playPromise.then === "function") {
      playPromise.catch(() => {
        // If autoplay fails, leave the watermark static.
      });
    }
  } catch (error) {
    // Ignore playback errors silently to avoid disrupting UI.
  }
}

function stopChatVideo() {
  if (!chatVideo) {
    return;
  }
  chatVideo.pause();
  if (typeof chatVideo.currentTime === "number") {
    chatVideo.currentTime = 0;
  }
}

if (chatVideo) {
  chatVideo.addEventListener("ended", () => {
    if (chatPanel.classList.contains("is-generating")) {
      startChatVideo();
    } else {
      stopChatVideo();
    }
  });
}

function renderResponse(messageEl, text) {
  const paragraph = messageEl.querySelector("p");
  const segments = text.split(/\n{2,}/).map((segment) => segment.trim()).filter(Boolean);
  if (segments.length <= 1) {
    paragraph.textContent = text.trim();
    return;
  }

  const fragment = document.createDocumentFragment();
  segments.forEach((segment, index) => {
    const span = document.createElement("span");
    span.textContent = segment;
    fragment.appendChild(span);
    if (index < segments.length - 1) {
      fragment.appendChild(document.createElement("br"));
      fragment.appendChild(document.createElement("br"));
    }
  });

  paragraph.textContent = "";
  paragraph.appendChild(fragment);
}

function analyzeQuestion(question) {
  const lower = question.toLowerCase();
  const timeOfDay = detectTimeOfDay(lower);
  const strains = detectStrains(question);
  const effects = detectEffects(lower);
  const typeMentions = detectTypes(lower);
  const methods = detectMethods(lower);
  const foodPairings = detectFoodPairings(lower);
  const responsibleTopics = detectResponsibleTopics(lower);
  const popularityQuery =
    (lower.includes("popular") ||
      lower.includes("trending") ||
      lower.includes("best seller") ||
      lower.includes("best-selling") ||
      lower.includes("most bought") ||
      lower.includes("top strain") ||
      lower.includes("top shelf") ||
      lower.includes("best strains")) &&
    lower.includes("strain");

  return {
    original: question,
    lower,
    timeOfDay,
    strains,
    effects,
    typeMentions,
    methods,
    foodPairings,
    responsibleTopics,
    popularityQuery
  };
}

function detectStrains(question) {
  const found = [];
  const seen = new Set();
  strainCatalog.forEach((strain) => {
    const aliases = [strain.name, ...strain.aliases];
    for (const alias of aliases) {
      const pattern = new RegExp(`\\b${escapeRegExp(alias)}\\b`, "i");
      if (pattern.test(question)) {
        if (!seen.has(strain.name)) {
          found.push(strain);
          seen.add(strain.name);
        }
        break;
      }
    }
  });
  return found;
}

function detectEffects(lower) {
  const matches = [];
  effectLibrary.forEach((entry) => {
    let score = 0;
    entry.keywords.forEach((keyword) => {
      if (lower.includes(keyword)) {
        score += 1;
      }
    });
    if (score > 0) {
      matches.push({ entry, score });
    }
  });
  matches.sort((a, b) => b.score - a.score);
  return matches;
}

function detectTypes(lower) {
  const mentions = [];
  const typeKeywords = {
    indica: ["indica", "couchlock", "body high"],
    sativa: ["sativa", "head high", "uplifting"],
    hybrid: ["hybrid", "balanced", "50/50"]
  };
  Object.entries(typeKeywords).forEach(([type, keywords]) => {
    if (keywords.some((keyword) => lower.includes(keyword))) {
      mentions.push(type);
    }
  });
  return [...new Set(mentions)];
}

function detectMethods(lower) {
  const hits = [];
  methodGuidance.forEach((method) => {
    if (method.keywords.some((keyword) => lower.includes(keyword))) {
      hits.push(method);
    }
  });
  return hits;
}

function detectFoodPairings(lower) {
  const matches = [];
  foodPairings.forEach((entry) => {
    let score = 0;
    entry.keywords.forEach((keyword) => {
      if (lower.includes(keyword)) {
        score += 1;
      }
    });
    if (score > 0) {
      matches.push({ entry, score });
    }
  });
  matches.sort((a, b) => b.score - a.score);
  return matches;
}

function detectResponsibleTopics(lower) {
  const matches = [];
  responsibleTopics.forEach((entry) => {
    let score = 0;
    entry.keywords.forEach((keyword) => {
      if (lower.includes(keyword)) {
        score += 1;
      }
    });
    if (score > 0) {
      matches.push({ entry, score });
    }
  });
  matches.sort((a, b) => b.score - a.score);
  return matches;
}

function detectTimeOfDay(lower) {
  if (lower.includes("night") || lower.includes("evening") || lower.includes("bed")) {
    return "nighttime";
  }
  if (lower.includes("morning") || lower.includes("daytime") || lower.includes("workday")) {
    return "daytime";
  }
  if (lower.includes("afternoon")) {
    return "afternoon";
  }
  return "";
}

function renderStrainDetails(analysis) {
  const strains = analysis.strains.slice(0, 3);
  const details = strains.map((strain) => describeStrain(strain));
  const plainSpeaks = strains.map((strain) => plainLanguage(strain));
  let response = details.join("\n\n");
  response += `\n\nHere's what that means in everyday terms:\n${plainSpeaks.join("\n")}`;

  if (analysis.strains.length > 3) {
    response += `\n\nThere are more cultivars in this family; let me know which effects you want and I will narrow the list.`;
  }

  if (analysis.effects.length > 0) {
    const topEffect = analysis.effects[0].entry.intent;
    response += `\n\nThose picks align nicely with ${topEffect}; adjust your dose slowly until the effect lands where you want it.`;
  }

  const methodNote = gatherMethodTips(analysis.methods);
  if (methodNote) {
    response += `\n\n${methodNote}`;
  }

  return response;
}

function renderEffectResponse(analysis) {
  const match = analysis.effects[0];
  const entry = match.entry;
  const strainDetails = entry.strains
    .map((name) => strainIndex.get(name.toLowerCase()))
    .filter(Boolean)
    .map((strain, index) => `${index + 1}. ${describeStrain(strain, { compact: true })}`);

  let response = `${entry.guidance}\n\nTop matches right now:\n${strainDetails.join("\n")}`;

  const plainSpeaks = entry.strains
    .map((name) => strainIndex.get(name.toLowerCase()))
    .filter(Boolean)
    .map((strain) => `- ${plainLanguage(strain, { compact: true })}`);
  response += `\n\nIn simple terms:\n${plainSpeaks.join("\n")}`;

  if (analysis.timeOfDay) {
    response += `\n\nFor ${analysis.timeOfDay} sessions, start with the cultivar that best suits that time, then fine-tune the dose after journaling the outcome.`;
  }

  if (analysis.typeMentions.length > 0) {
    response += `\n\nYou mentioned ${analysis.typeMentions.join(", ")} vibes - that pairs well with these selections.`;
  }

  const methodNote = gatherMethodTips(analysis.methods);
  if (methodNote) {
    response += `\n\n${methodNote}`;
  }

  return response;
}

function renderTypeResponse(analysis) {
  const segments = analysis.typeMentions.map((type) => {
    const insight = typeInsights[type];
    if (!insight) {
      return "";
    }
    const strainSummaries = insight.strains
      .map((name) => strainIndex.get(name.toLowerCase()))
      .filter(Boolean)
      .map((strain) => `- ${describeStrain(strain, { compact: true })}`)
      .join("\n");

    return `${capitalize(type)} overview: ${insight.overview}\nGreat for ${insight.bestFor}\nRecommended cultivars:\n${strainSummaries}`;
  });

  let response = segments.join("\n\n");

  if (analysis.timeOfDay) {
    response += `\n\nBecause you mentioned ${analysis.timeOfDay} use, start with smaller doses and note how long the effect lasts at that time.`;
  }

  const methodNote = gatherMethodTips(analysis.methods);
  if (methodNote) {
    response += `\n\n${methodNote}`;
  }

  return response;
}

function renderFoodResponse(analysis) {
  const picks = analysis.foodPairings.slice(0, 2);
  const sections = picks.map(({ entry }) => {
    const strainNotes = entry.strains
      .map((name) => strainIndex.get(name.toLowerCase()))
      .filter(Boolean)
      .map((strain) => `- ${plainLanguage(strain, { compact: true })}`)
      .join("\n");
    const snackLine =
      entry.snackIdeas && entry.snackIdeas.length > 0 ? `Snack inspo: ${listToText(entry.snackIdeas)}.` : "";
    return `${entry.title}\n${entry.tip}\n${entry.fun}\nRecommended vibes:\n${strainNotes}\n${snackLine}`.trim();
  });

  let response = sections.join("\n\n");

  if (analysis.foodPairings.length > picks.length) {
    response += `\n\nHungry for more pairings? Ask me about desserts, fruit trays, or your favorite brunch dish and we will match a cultivar.`;
  }

  if (analysis.timeOfDay) {
    response += `\n\nSince you mentioned ${analysis.timeOfDay}, portion the munchies ahead of time so the session stays mindful and delicious.`;
  }

  const methodNote = gatherMethodTips(analysis.methods);
  if (methodNote) {
    response += `\n\n${methodNote}`;
  }

  return response;
}

function renderResponsibleResponse(analysis) {
  const topics = analysis.responsibleTopics.slice(0, 3);
  const sections = topics.map(({ entry }) => {
    return `${entry.title}\n${entry.expert}\nPlain language: ${entry.plain}`;
  });

  let response = sections.join("\n\n");

  if (analysis.responsibleTopics.length > topics.length) {
    response += `\n\nYou also touched on other safety topics. Ask me about dosing, legal tips, or mixing with other substances and I will break those down too.`;
  }

  if (analysis.timeOfDay) {
    response += `\n\nBecause you mentioned ${analysis.timeOfDay}, plan your dose timing around that part of the day and keep water nearby.`;
  }

  const methodNote = gatherMethodTips(analysis.methods);
  if (methodNote) {
    response += `\n\n${methodNote}`;
  }

  return response;
}

function renderPopularityResponse(analysis) {
  const top = popularityOrder.slice(0, 5);
  const list = top
    .map((strain, index) => `${index + 1}. ${strain.name} (${strain.type}) - ${strain.popularity}`)
    .join("\n");

  const methodNote = gatherMethodTips(analysis.methods);
  let response = `Most-requested strains across US dispensaries right now:\n${list}\n\nTell me how you want to feel and I will drill into the best fit.`;

  if (methodNote) {
    response += `\n\n${methodNote}`;
  }

  return response;
}

function fallbackResponse(question, analysis) {
  const preview = createPreview(question);
  const trendingNames = popularityOrder.slice(0, 3).map((strain) => strain.name);
  const methodNote = gatherMethodTips(analysis.methods);

  if (preview && seenFallbackPreviews.has(preview)) {
    return `We have already touched on "${preview}". Tell me the vibe you want (energy, rest, relief, creativity) or how you plan to consume it so I can zero in on a precise recommendation.${methodNote ? ` ${methodNote}` : ""}`;
  }

  const contextualResponse = getContextualFallback(analysis);
  if (contextualResponse) {
    return methodNote ? `${contextualResponse} ${methodNote}` : contextualResponse;
  }

  const lastTip = preview ? fallbackTipHistory.get(preview) : null;
  const candidateTips = lastTip ? generalGuidance.filter((tip) => tip !== lastTip) : generalGuidance;
  const tip = pickRandom(candidateTips.length > 0 ? candidateTips : generalGuidance);

  let response = `Regarding "${preview}", ${tip}`;
  response += ` Right now the crowd favorites are ${listToText(trendingNames)} - ask for a desired effect or strain name and I will tailor the rundown.`;

  if (methodNote) {
    response += ` ${methodNote}`;
  }

  if (preview) {
    seenFallbackPreviews.add(preview);
    fallbackTipHistory.set(preview, tip);
  }

  return response;
}

function describeStrain(strain, options = {}) {
  const { compact = false } = options;
  const terpText = listToText(strain.terpenes);
  const effectText = listToText(strain.experiences);

  if (compact) {
    return `${strain.name} (${strain.type}) - THC ${strain.thc}, CBD ${strain.cbd}. Terpenes: ${terpText}. Expect ${effectText}.`;
  }

  const aromaText = listToText(strain.aromas);
  const bestForText = listToText(strain.bestFor);
  return `${strain.name} | ${strain.type}\nLineage: ${strain.lineage}\nCannabinoids: THC ${strain.thc} | CBD ${strain.cbd}\nDominant terpenes: ${terpText}\nExpect: ${effectText}\nBest for: ${bestForText}\nAromas: ${aromaText}\nTip: ${strain.idealConsumption}\nNote: ${strain.popularity}`;
}

function plainLanguage(strain, options = {}) {
  const { compact = false } = options;
  const keyEffect = strain.experiences[0] || "balanced relief";
  const simpleType = strain.type.toLowerCase().includes("sativa")
    ? "uplifting"
    : strain.type.toLowerCase().includes("indica")
    ? "relaxing"
    : "balanced";
  const thcText = strain.thc.replace("%", "");
  const cbdText = strain.cbd.replace("%", "");
  const plainDose =
    parseFloat(thcText) <= 5
      ? "very gentle"
      : parseFloat(thcText) <= 15
      ? "moderate"
      : "potent";
  const aroma = strain.aromas[0] || "herbal";

  if (compact) {
    return `${strain.name} feels ${simpleType} with a ${plainDose} buzz and tastes like ${aroma}.`;
  }

  return `${strain.name}: think of a ${plainDose} ${simpleType} experience that tastes like ${aroma} and helps with ${keyEffect}. Take a couple light puffs or a tiny edible portion, wait 30-60 minutes, then decide if you want more.`;
}

function gatherMethodTips(methods) {
  if (!methods || methods.length === 0) {
    return "";
  }
  const tips = [];
  methods.forEach((method) => {
    if (!tips.includes(method.tip)) {
      tips.push(method.tip);
    }
  });
  return tips.join(" ");
}

function createPreview(text) {
  const condensed = text.trim().replace(/\s+/g, " ");
  if (condensed.length <= 80) {
    return condensed;
  }
  return `${condensed.slice(0, 77)}...`;
}

function getContextualFallback(analysis) {
  const lower = analysis.lower;
  for (const entry of contextualFallbacks) {
    if (entry.keywords.some((keyword) => lower.includes(keyword))) {
      return entry.response;
    }
  }
  return "";
}

function listToText(list) {
  if (!list || list.length === 0) {
    return "";
  }
  if (list.length === 1) {
    return list[0];
  }
  if (list.length === 2) {
    return `${list[0]} and ${list[1]}`;
  }
  return `${list.slice(0, -1).join(", ")}, and ${list[list.length - 1]}`;
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
