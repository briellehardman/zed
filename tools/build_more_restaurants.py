import concurrent.futures
import glob
import html
import json
import re
import posixpath
import urllib.parse
import urllib.request
from html.parser import HTMLParser
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
RAW = ROOT / "data" / "raw"
NAMES = [
    "97 West Kitchen & Bar", "Ático Fort Worth", "Benito's Restaurant", "Birrieria y Taqueria Cortez", "Blue Mesa Grill",
    "Cherry Coffee Shop", "The Chumley House", "Dusty Biscuit Beignets", "Eatzi's Market & Bakery", "Ellerbe Fine Foods",
    "Fred's Texas Cafe", "Hatsuyuki Handroll Bar", "Italianni's Restaurant", "Joe T. Garcia's", "Kincaid's Hamburgers",
    "Le Margot", "Love Shack", "Panther City BBQ", "Pho Little Saigon", "Pulido's Mexican Restaurant", "Righteous Foods",
    "Waters Restaurant", "West Side Cafe", "Wicked Butcher", "Breakfast Brothers", "Bricks & Horses", "Buonissimo",
    "Cattlemen's Steak House", "Dan's Bagels", "Dos Molina's Mexican Restaurant", "Drew's Place", "Enduro Coffee",
    "Galligaskins Submarines", "King Tut Restaurant", "Local Foods Kitchen", "Los Jimadores Tex-Mex Tequila Factory",
    "Madea's Down Home Cooking", "Nikuya", "Ozzi's Pizza", "Paris 7th", "Prima's Pizza & Pasta", "Quince Riverside",
    "Saint-Emilion Restaurant", "Sabaidee Lao & Thai Street Food", "Teddy Wong's Dumplings & Wine", "The Mont", "The Sour Boule",
    "Tinie's Mexican Cuisine", "Top of the Morning Brunch House", "Walloon's", "Yoichi Omakase", "Beren Meze & Grill House",
    "Wabi House Fort Worth", "Goldee's Barbecue", "Eggsquisite Cafe", "Avoca Coffee Roasters", "Crude Craft Coffee Bar",
    "Rio Dulce Coffee", "HustleBlendz Coffee", "Namaste Grill & Bar", "Thailicious", "Istanbul Grill & Bar",
    "Sikhay Thai Lao Restaurant & Boba Tea & Pho", "Terra Mediterranean", "Sons Coffee", "Pax & Beneficia Coffee",
    "Heim Barbecue", "Angelo's Bar-B-Que", "Railhead Smokehouse", "Cooper's Old Time Pit Bar-B-Que", "Riscky's Steakhouse",
    "Lonesome Dove Western Bistro", "Reata Restaurant", "Clay Pigeon Food & Drink", "Bonnell's Fine Texas Cuisine",
    "Lucile's Stateside Bistro", "Grace Restaurant", "61 Osteria", "Piattello Italian Kitchen", "Bocca Osteria Romana",
    "Nonna Tata", "Cane Rosso Fort Worth", "Zoli's Pizza", "Pie Tap Pizza Workshop + Bar", "Fort Brewery & Pizza",
    "Buffalo Bros", "Rodeo Goat", "Dutch's Hamburgers", "H3 Ranch", "rise soufflé - Fort Worth", "Hudson House - Fort Worth",
    "The Capital Grille - Fort Worth", "Café Modern", "Plank Provisions - Fort Worth", "Eddie V's - Fort Worth",
    "Toro Toro - Fort Worth", "Texas de Brazil - Fort Worth", "Del Frisco's Double Eagle Steakhouse - Fort Worth",
    "The Social House - Fort Worth", "Emilia's",
]

WEBSITE_OVERRIDES = {
    1: "https://www.aticoftworth.com/",
    10: "https://www.fredstexascafe.com/",
    84: "https://www.fortbrewery.com/",
    89: "https://risesouffle.com/",
    92: "https://www.themodern.org/caf%C3%A9-modern",
}

ADDRESS_OVERRIDES = {
    1: "2315 N Main St, Fort Worth, TX 76164",
    10: "7101 Camp Bowie West Blvd, Fort Worth, TX 76116",
    84: "2737 Tillar St, Fort Worth, TX 76107",
    89: "5135 Monahans Ave, Fort Worth, TX 76107",
    92: "3200 Darnell St, Fort Worth, TX 76107",
}

# These saved Yelp listings are the verified branches in their actual nearby cities.
VERIFIED_OTHER_CITY_LISTINGS = {
    12: ("italiannis-restaurant-hurst", "Hurst"),
    24: ("breakfast-brothers-arlington-2", "Arlington"),
    35: ("los-jimadores-tex-mex-tequila-factory-bedford", "Bedford"),
    43: ("sabaidee-lao-and-thai-street-food-dallas", "Dallas"),
}

# One-time Photon results, accepted only when the returned house number, street, city, and state matched the catalog address.
VERIFIED_COORDINATES = {
    13: (32.7870095, -97.3475133),
    14: (32.7869094, -97.3494472),
    15: (32.723355, -97.3316737),
    16: (32.7309917, -97.2977105),
    17: (32.7527885, -97.354724),
    18: (32.7305189, -97.3375533),
    19: (32.7503517, -97.3642387),
    20: (32.7408113, -97.3254528),
    21: (32.7295437, -97.3616358),
    22: (32.7303635, -97.3422168),
    23: (32.7207313, -97.4399303),
    24: (32.7499742, -97.3563823),
    25: (32.84296, -97.186305),
    26: (32.7846445, -97.3481518),
    27: (32.7374098, -97.3933369),
    28: (32.704859, -97.388597),
    29: (32.7887449, -97.3486498),
    30: (32.7381809, -97.3247504),
    31: (32.7441252, -97.4375005),
    32: (32.7314743, -97.3653721),
    33: (32.7510989, -97.3665521),
    34: (32.755708, -97.331821),
    35: (32.7237162, -97.4526544),
    36: (32.7542975, -97.331103),
    37: (32.6699663, -97.1134681),
    38: (32.746789, -97.372881),
    39: (32.7549549, -97.3340548),
    40: (32.7891558, -97.3490358),
    41: (32.716129, -97.3526607),
    42: (32.7900782, -97.3533344),
    43: (32.7299284, -97.4081386),
    44: (32.7704600, -97.3110893),
    45: (32.7305078, -97.4104032),
    46: (32.7332386, -97.3300543),
    47: (32.7086244, -97.3877243),
    48: (32.8507228, -97.1136854),
    49: (32.6307746, -97.2970176),
    50: (32.7542975, -97.331103),
    51: (32.6457183, -97.4237664),
    52: (32.751367, -97.366083),
    53: (32.6582348, -97.3991202),
    54: (32.7270744, -97.3596782),
    55: (32.7513058, -97.3701506),
    56: (32.8256488, -96.8208752),
    57: (32.7334327, -97.3330513),
    58: (32.705026, -97.4753907),
    59: (32.7171830, -97.4413015),
    60: (32.7433843, -97.3257753),
    61: (32.7502617, -97.3596474),
    62: (32.730593, -97.331704),
    63: (32.7305224, -97.3318839),
    64: (32.7313248, -97.3404398),
    65: (32.7315495, -97.3433571),
    66: (32.621385, -97.2339324),
    67: (32.7658958, -97.4787894),
    68: (32.7303139, -97.3400212),
    69: (32.7362346, -97.3261653),
    70: (32.7566459, -97.3335513),
    71: (32.7430992, -97.3290191),
    73: (32.732142, -97.3887383),
    74: (32.754297, -97.332966),
    75: (32.79521, -97.299508),
    76: (32.7502593, -97.3595243),
    72: (32.8725373, -97.2918146),
    77: (32.7469649, -97.3291930),
    78: (32.7535757, -97.3310713),
    79: (32.7304658, -97.3373855),
    80: (32.7587149, -97.3523715),
    81: (32.7312271, -97.3705481),
    82: (32.7924943, -97.3478313),
    83: (32.7888212, -97.3488737),
    84: (32.7883624, -97.3489729),
    85: (32.7534859, -97.3326482),
    86: (32.7588281, -97.3561004),
    87: (32.6894556, -97.4112846),
    88: (32.7393066, -97.3906693),
    89: (32.7529601, -97.3299540),
    90: (32.751162, -97.333183),
    91: (32.6989287, -97.4135386),
    92: (32.7408113, -97.3254528),
    93: (32.730751, -97.340416),
    94: (32.7304690, -97.3330644),
    95: (32.726115, -97.387767),
    96: (32.730587, -97.339544),
    97: (32.7600029, -97.3560986),
    98: (32.7542404, -97.3329284),
    99: (32.7483839, -97.3572266),
    100: (32.7073411, -97.3600915),
    101: (32.7887443, -97.3487059),
    102: (32.7104413, -97.3987763),
    103: (32.7407868, -97.3879049),
    104: (32.7524491, -97.3299119),
    105: (32.7496332, -97.363024),
    106: (32.7085057, -97.4009854),
    107: (32.7516250, -97.3622708),
    108: (32.7557882, -97.3336206),
    109: (32.7567849, -97.3341043),
    110: (32.7524761, -97.3298863),
    111: (32.7507219, -97.3584448),
    112: (32.7505223, -97.3649487),
}

CURATED_FIRST_IMAGES = {
    0: ["https://97westkitchenandbar.com/app/uploads/2021/12/20210628_Shot_13-0275.jpg"],
    7: [],
    1: [
        "https://mds-assets.marriott.com/cdn-cgi/image/f=auto/cms-platform-for-marriott/dfwsy-atico/site-images/migrated-images/dine-prawns-and-flat-bread.jpg?cropY=71&cropW=1024&cropH=1138&width=600&height=667",
        "https://mds-assets.marriott.com/cdn-cgi/image/f=auto/cms-platform-for-marriott/dfwsy-atico/site-images/migrated-images/atico-outside-seating.jpg?cropW=1800&cropH=808&width=1800&height=808",
        "https://mds-assets.marriott.com/cdn-cgi/image/f=auto/cms-platform-for-marriott/dfwsy-atico/site-images/migrated-images/fort-worth-view-and-eating.jpg?cropW=1800&cropH=808&width=1800&height=808",
    ],
    89: [
        "https://static.showit.co/v2/shared/Cgo6T4SXRPKV0saaUhqNMQ/marshmallow_soup.jpg/variant/1600/webp",
        "https://static.showit.co/v2/88571/QQZTq46yQAC_wbsy3aWNjA/img_9002.jpg/variant/1600/webp",
        "https://static.showit.co/v2/88571/Pm7bhuLoQRW91_SZv26bAw/img_8783.jpg/variant/1600/webp",
    ],
    18: ["https://pholittlesaigonfw.com/images/inside02.jpg"],
    64: [],
    84: [
        "https://images.squarespace-cdn.com/content/v1/60eddc5daef645328c05f76f/bac735f5-3af9-44e1-887e-0e409caed832/fortphotoshoot5.31-04.jpg",
        "https://images.squarespace-cdn.com/content/v1/60eddc5daef645328c05f76f/0f9455d8-13ab-419c-9b43-e19192cc2817/215022415_4143569165689448_4866518950149249723_n.jpg",
        "https://images.squarespace-cdn.com/content/v1/60eddc5daef645328c05f76f/603db963-9507-456a-b8be-ff178051f19d/DSC04996.jpg",
    ],
    86: [
        "https://www.rodeogoat.com/wp-content/uploads/2023/07/big-tex.jpg",
        "https://www.rodeogoat.com/wp-content/uploads/elementor/thumbs/sugar-burger-qf0ktqkvve7b54v40kyu2ztb68ul5ojgv2w23kyweg.jpg",
        "https://www.rodeogoat.com/wp-content/uploads/elementor/thumbs/whiskey-burger-2-rblwqq276hlk3wst1s9yb1qj3gp96eytdcyaobcps8.jpg",
    ],
    92: [
        "https://www.themodern.org/sites/default/files/2021-05/web-block-test.jpg",
        "https://www.themodern.org/sites/default/files/2021-05/chef_jett_1.jpg",
    ],
    97: [
        "https://images.getbento.com/accounts/532b8149fcdb0e1cb7ac97b632998012/media/images/34481DEL_Fort_Worth_First_Floor_Bar_crop.jpeg?w=1200&fit=crop&auto=compress,format&cs=origin&h=600",
    ],
}

CURATED_YELP_PHOTO_ORDER = {64: [2, 1, 0, 3, 4, 5]}

ALIASES = {
    "benitos taqueria": "benitos",
    "cattlemens fort worth steak house": "cattlemens",
    "waters texas": "waters",
    "pulidos kitchen cantina": "pulidos",
    "nik uya rooftop": "nikuya",
    "chumley house": "chumley",
    "top of the morning": "top of the morning",
    "angelos barbecue": "angelos",
    "the lonesome dove western bistro": "lonesome dove",
    "grace": "grace",
    "the capital grille": "capital grille",
    "eddie vs prime seafood": "eddie v",
    "the social house": "social house",
    "emilias": "emilia",
}


def norm(text):
    text = html.unescape(text).lower().replace("’", "'")
    text = "".join(ch for ch in __import__("unicodedata").normalize("NFD", text) if not __import__("unicodedata").combining(ch))
    return re.sub(r"[^a-z0-9]+", " ", text).strip()


def canonical_image_url(url):
    """Treat resized/format variants of one image as a single gallery asset."""
    parsed = urllib.parse.urlsplit(url)
    path = re.sub(r"-\d{2,4}x\d{2,4}(?=\.[a-z0-9]+$)", "", parsed.path, flags=re.I)
    path = re.sub(r"/width=\d+|/w_\d+|/h_\d+", "", path, flags=re.I)
    transform_keys = {"w", "width", "h", "height", "format", "quality", "fit", "crop", "auto", "cs", "lossy", "strip", "webp", "compress", "dpr", "resize", "fill", "variant"}
    query = sorted((key, value) for key, value in urllib.parse.parse_qsl(parsed.query) if key.lower() not in transform_keys)
    return f"{parsed.netloc.lower()}{posixpath.normpath(path).lower()}?{urllib.parse.urlencode(query)}"


def image_priority(url, label="", index=0):
    """Rank useful restaurant photos before banners, menus, packaging, and filler."""
    text = norm(f"{label} {urllib.parse.unquote(url)}")
    padded = f" {text} "
    has = lambda terms: any(f" {word} " in padded for word in terms)
    score = 0
    if has(("food", "dish", "plate", "meal", "taco", "burger", "pizza", "pasta", "steak", "brisket", "pho", "pastry", "beignet", "dessert", "gelato", "sushi", "dumpling", "pancake", "souffle")):
        score += 40
    if has(("cocktail", "drink", "coffee", "wine", "bar", "beverage")):
        score += 25
    if has(("interior", "dining", "room", "patio", "ambiance", "atmosphere", "inside", "restaurant")):
        score += 20
    if has(("exterior", "outside", "front", "building")):
        score += 8
    if has(("logo", "icon", "favicon", "favi", "avatar", "sprite", "badge", "seal", "placeholder", "tracking", "dummy", "gift card", "merch", "shirt", "bag", "packaging", "award", "certificate", "sitemap", "map", "horse png", "close", "reload")):
        score -= 100
    if has(("menu", "screenshot")):
        score -= 25
    if has(("banner", "collage", "header", "hero", "social", "facebook", "instagram", "linkedin", "review")):
        score -= 60
    if re.search(r"(?:^|[/_. -])\d{2,3}x\d{2,3}(?:[/_.?&-]|$)|(?:w|width)[=_/-](?:[1-9]\d|1\d\d)(?:[,/&_-]|$)", url, re.I):
        score -= 35
    return score, index


def curate_images(images, source_type, limit=8):
    """Filter, deduplicate, and order one exact restaurant's photo candidates."""
    # Selection pipeline: score quality, reject weak assets, deduplicate canonical URLs, then keep strongest-first order.
    selected = []
    seen = set()
    for index, image in enumerate(images):
        if isinstance(image, str):
            url, label = image, ""
        else:
            url, label = image.get("url", ""), image.get("label", "")
        if not url or image_priority(url, label, index)[0] <= -50:
            continue
        key = canonical_image_url(url)
        if key in seen:
            continue
        seen.add(key)
        selected.append({
            "url": url,
            "attribution": "Official restaurant website" if source_type == "official" else "Yelp customer photo",
            "sourceType": source_type,
            "_priority": image_priority(url, label, index),
        })
    selected.sort(key=lambda image: (-image["_priority"][0], image["_priority"][1]))
    for image in selected:
        image.pop("_priority", None)
    return selected[:limit]


class ImageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.candidates = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "meta" and attrs.get("property", "").lower() in ("og:image", "og:image:url"):
            self.candidates.append((attrs.get("content", ""), ""))
        if tag == "img":
            for key in ("src", "data-src", "data-lazy-src", "data-original"):
                if attrs.get(key):
                    self.candidates.append((attrs[key], " ".join((attrs.get("alt", ""), attrs.get("title", "")))))
            sources = []
            for part in attrs.get("srcset", "").split(","):
                bits = part.strip().split()
                if bits:
                    width = int(re.sub(r"\D", "", bits[1])) if len(bits) > 1 and bits[1].endswith("w") else 0
                    sources.append((width, bits[0]))
            if sources:
                self.candidates.append((max(sources)[1], " ".join((attrs.get("alt", ""), attrs.get("title", "")))))


def official_images(record):
    website = record.get("web", "")
    if not website or not website.startswith(("http://", "https://")):
        return []
    try:
        request = urllib.request.Request(website, headers={"User-Agent": "Mozilla/5.0", "Accept": "text/html"})
        with urllib.request.urlopen(request, timeout=12) as response:
            base = response.geturl()
            source = response.read(1_500_000).decode("utf-8", "ignore")
        parser = ImageParser()
        parser.feed(source)
        images = []
        seen = set()
        ranked = []
        for candidate, label in parser.candidates:
            candidate = html.unescape(candidate).strip()
            if not candidate or candidate.startswith(("data:", "blob:", "//")):
                if candidate.startswith("//"):
                    candidate = "https:" + candidate
                else:
                    continue
            url = urllib.parse.urljoin(base, candidate)
            low = url.lower()
            context = norm(label + " " + url)
            if any(word in context for word in ("logo", "icon", "avatar", "sprite", "badge", "seal", "placeholder", "tracking", "close button", "hamburger", "dummy", "chef hat", "bbq color", "gray white", "daily meal", "join goat", "pax beneficia", "panther city bag", "local green", "asset 1", "asset 2", "asset 3", "street food lao thai v3", "fortbrewery 1")):
                continue
            if re.search(r"(?:w|width)[=_-]?(?:[1-9]\d|1\d\d)(?:[,/_&.-]|$)|(?:^|[/_-])\d{2,3}x\d{2,3}(?:[/_.?-]|$)", low):
                continue
            if not re.search(r"\.(?:jpe?g|png|webp|avif)(?:[/?#]|$)|/image(?:[/?#]|$)|format=", low):
                continue
            dimension_matches = list(re.finditer(r"(?:w|width)[=_/-](\d+)(?:[,/&_-].*?(?:h|height)[=_/-](\d+))?", low))
            dimension_matches.extend(re.finditer(r"(?:^|[/_-])(\d{2,4})x(\d{2,4})(?:[/_.?&-]|$)", low))
            if dimension_matches:
                dimensions = dimension_matches[-1]
                width = int(dimensions.group(1))
                height = int(dimensions.group(2) or 0)
                if width < 320 or (height and (height < 160 or width / height > 2.8 or height / width > 2.0)):
                    continue
            if url in seen:
                continue
            seen.add(url)
            score = 0
            if any(word in context for word in ("food", "dish", "meal", "restaurant", "dining", "interior", "exterior", "brunch", "pizza", "burger", "taco", "coffee", "bread", "dessert", "cocktail", "chef", "menu")):
                score += 6
            if any(word in low for word in ("hero", "banner", "gallery", "food", "dish", "restaurant", "dining", "slider", "home", "burger", "pizza", "brunch", "souffle")):
                score += 3
            if any(word in low for word in ("thumbnail", "thumb", "small", "logo", "seal", "icon", "menu")):
                score -= 8
            ranked.append((score, url, label))
        ranked.sort(key=lambda item: item[0], reverse=True)
        images = [{"url": url, "label": label} for _, url, label in ranked]
        return curate_images(images, "official", limit=8)
    except Exception:
        return []


def load_rows():
    rows = {}
    for filename in sorted(glob.glob(str(RAW / "yelp.*.json"))):
        if filename.endswith(("yelp.000.json", "yelp.012.json", "yelp.045.json")):
            pass
        for row in json.loads(Path(filename).read_text()):
            rows[row["i"]] = row
    return rows


def listing_is_relevant(index, row):
    if index in {84, 92}:
        return False
    if not row.get("slug"):
        return False
    other_city = VERIFIED_OTHER_CITY_LISTINGS.get(index)
    if other_city:
        return row.get("slug") == other_city[0] and row.get("city") == other_city[1]
    if row.get("city") != "Fort Worth":
        return False
    requested = norm(NAMES[index])
    slug = norm(row.get("slug", ""))
    title = norm(row.get("title", ""))
    terms = [word for word in requested.split() if len(word) > 2 and word not in {"fort", "worth", "restaurant", "bar", "house", "the"}]
    alias = next((value for key, value in ALIASES.items() if key in title), "")
    if alias:
        return any(term in alias for term in terms) or alias in requested
    return bool(terms and any(term in slug or term in title for term in terms))


def classify(name, row):
    dishes = row.get("popularDishes", row.get("pop", []))
    text = norm(name + " " + " ".join(dishes))
    if any(word in text for word in ("coffee", "breakfast", "brunch", "bagel", "pancake", "beignet")):
        category = "Breakfast"
    elif any(word in text for word in ("bakery", "pastry", "dessert", "ice cream", "souffle", "gelato", "sour boule")):
        category = "Sweet Treat"
    elif any(word in text for word in ("steak", "fine dining", "omakase", "sushi", "osteria", "italian", "french", "bistro", "modern", "emilia", "reata", "dove", "grille", "seafood")):
        category = "Dinner"
    else:
        category = "Lunch"
    cuisine_rules = [
        (("thai", "lao", "sabaidee", "sikhay"), "Thai & Lao"), (("mexican", "taco", "tex mex", "taqueria", "jimadores", "pulido", "tinie"), "Mexican"),
        (("italian", "pizza", "osteria", "nonna", "bocca", "cane rosso", "zoli"), "Italian"), (("coffee",), "Coffee & Cafe"),
        (("barbecue", "bbq", "bar b que", "smokehouse", "brisket"), "Texas Barbecue"), (("bagel", "brunch", "breakfast", "pancake"), "Breakfast & Brunch"),
        (("sushi", "handroll", "omakase", "hatsuyuki", "yoichi"), "Japanese"), (("mediterranean", "meze", "turkish", "istanbul"), "Mediterranean"),
        (("pho", "vietnamese"), "Vietnamese"), (("dumpling", "chinese", "teddy wong"), "Chinese"), (("steak", "cattlemen", "capital grille", "eddie v", "riscky"), "Steakhouse"),
        (("bakery", "pastry", "beignet", "dessert", "ice cream", "souffle", "sour boule"), "Bakery & Desserts"),
    ]
    cuisine = next((label for words, label in cuisine_rules if any(word in text for word in words)), "American")
    return category, cuisine


def main():
    rows = load_rows()
    website_images = {}
    with concurrent.futures.ThreadPoolExecutor(max_workers=12) as pool:
        futures = {}
        for index, name in enumerate(NAMES):
            row = rows.get(index, {})
            website = WEBSITE_OVERRIDES.get(index, row.get("web", "") if listing_is_relevant(index, row) else "")
            if website:
                futures[pool.submit(official_images, {"web": website})] = index
        for future, index in futures.items():
            website_images[index + 13] = future.result()
    for index, images in CURATED_FIRST_IMAGES.items():
        key = index + 13
        current = website_images.get(key, [])
        if index in {7, 64}:
            row = rows.get(index, {})
            photo_ids = row.get("ids", [])
            order = CURATED_YELP_PHOTO_ORDER.get(index, list(range(len(photo_ids))))
            customer_images = [
                f"https://s3-media0.fl.yelpcdn.com/bphoto/{photo_id}/o.jpg"
                for position in order[:6]
                if position < len(photo_ids)
                for photo_id in [photo_ids[position]]
            ]
            customer_images = curate_images(customer_images, "customer", limit=6)
            official_images_for_restaurant = curate_images(images + current, "official", limit=8)
            if index == 64:
                # Sons Coffee's official gallery is product-packaging heavy; use exact-location cafe photos first.
                images = customer_images + [photo for photo in official_images_for_restaurant if photo["url"] not in {item["url"] for item in customer_images}]
            else:
                images = official_images_for_restaurant + [photo for photo in customer_images if photo["url"] not in {item["url"] for item in official_images_for_restaurant}]
        else:
            images = curate_images(images + current, "official", limit=8)
        website_images[key] = images[:8]

    restaurants = []
    customer_photos = {}
    yelp_site_photos = {}
    for index, name in enumerate(NAMES):
        row = rows.get(index, {})
        valid = listing_is_relevant(index, row)
        category, cuisine = classify(name, row)
        city_name = row.get("city", "Fort Worth") if valid else "Fort Worth"
        city = f"{city_name}, TX"
        address = ADDRESS_OVERRIDES.get(index, row.get("addr", "") if valid else "")
        if address and index not in ADDRESS_OVERRIDES:
            address += f", {city_name}, TX"
        if not address:
            address = city
        website = WEBSITE_OVERRIDES.get(index, row.get("web", "") if valid else "")
        slug = row.get("slug", "") if valid else ""
        images = website_images.get(index + 13, [])
        photo_ids = row.get("ids", []) if valid else []
        if valid and row.get("ids"):
            customer_photos[index + 13] = [
                {
                    "thumb": f"https://s3-media0.fl.yelpcdn.com/bphoto/{photo_id}/348s.jpg",
                    "url": f"https://s3-media0.fl.yelpcdn.com/bphoto/{photo_id}/o.jpg",
                    "source": "Yelp",
                    "sourceUrl": f"https://www.yelp.com/biz_photos/{slug}",
                }
                for photo_id in row["ids"][:12]
            ]
            # Keep official photos first, then use exact-listing customer photos only when the official gallery is sparse.
            if images and len(images) < 4:
                official_keys = {canonical_image_url(photo["url"]) for photo in images}
                yelp_supplements = curate_images(
                    [f"https://s3-media0.fl.yelpcdn.com/bphoto/{photo_id}/o.jpg" for photo_id in photo_ids],
                    "customer",
                    limit=6,
                )
                images.extend(photo for photo in yelp_supplements if canonical_image_url(photo["url"]) not in official_keys)
            if not images:
                images = curate_images(
                    [f"https://s3-media0.fl.yelpcdn.com/bphoto/{photo_id}/o.jpg" for photo_id in photo_ids],
                    "customer",
                    limit=6,
                )
        if images:
            yelp_site_photos[index + 13] = images
        dishes = row.get("popularDishes", row.get("pop", [])) if valid else []
        if dishes:
            description = f"A Fort Worth {cuisine.lower()} spot known for {', '.join(dishes[:3])}."
        else:
            description = f"A Fort Worth restaurant serving {cuisine.lower()} cuisine."
        restaurants.append({
            "id": index + 13,
            "name": name,
            "city": city,
            "category": category,
            "cuisine": cuisine,
            "price": row.get("price", "") if valid else "",
            "neighborhood": row.get("hood", "") if valid else "",
            "address": address,
            "latitude": VERIFIED_COORDINATES.get(index + 13, (None, None))[0],
            "longitude": VERIFIED_COORDINATES.get(index + 13, (None, None))[1],
            "placeId": None,
            "description": description,
            "images": images[:8] if images and isinstance(images[0], dict) else [],
            "mainImage": images[0]["url"] if images else "",
            "imageSourceType": images[0]["sourceType"] if images else "",
            "imageSelectionReviewed": index in CURATED_FIRST_IMAGES,
            "popularDishes": dishes[:5],
            "websiteUrl": website,
            "menuUrl": "",
            "yelpUrl": f"https://www.yelp.com/biz/{slug}" if valid and slug else "",
        })

    expected_ids = list(range(13, 113))
    if [restaurant["id"] for restaurant in restaurants] != expected_ids:
        raise ValueError("Generated restaurant IDs must cover 13 through 112 exactly once.")
    missing_coordinates = [
        restaurant for restaurant in restaurants
        if not all(isinstance(restaurant[field], (int, float)) for field in ("latitude", "longitude"))
    ]
    print(f"Added restaurants without coordinates: {len(missing_coordinates)}")
    for restaurant in missing_coordinates:
        print(f"  {restaurant['id']}: {restaurant['name']} | {restaurant['city']} | {restaurant['address']}")

    (ROOT / "js" / "restaurant-data-more.js").write_text("window.SWIPE_BITE_MORE_RESTAURANTS = " + json.dumps(restaurants, ensure_ascii=False, indent=2) + ";\n")
    (ROOT / "js" / "restaurant-photos-more.js").write_text(
        "window.SWIPE_BITE_MORE_RESTAURANT_PHOTOS = " + json.dumps(yelp_site_photos, ensure_ascii=False, indent=2) + ";\n"
        + "window.SWIPE_BITE_MORE_CUSTOMER_PHOTOS = " + json.dumps(customer_photos, ensure_ascii=False, indent=2) + ";\n"
    )
    fallback_covers = sum(restaurant["imageSourceType"] == "customer" for restaurant in restaurants)
    print(f"Wrote {len(restaurants)} restaurants, {len(customer_photos)} exact-location Yelp galleries, {sum(bool(v) for v in website_images.values())} official galleries, {fallback_covers} customer-photo cover fallbacks")


if __name__ == "__main__":
    main()