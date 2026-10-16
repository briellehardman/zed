const STORAGE_KEY = "swipe-and-bite.saved";
const UI_STORAGE_KEY = "swipe-and-bite.ui-state";
const SWIPE_LOCK_MS = 180;
const MIN_RESTAURANT_IMAGE_WIDTH = 400;
const failedRestaurantImageUrls = new Set();
const restaurantPhotoExclusions = {
	3: ["1vuofcve7yfulhgt", "mv5huolw", "gbvdjlgw", "banner_image"],
	9: ["swiss-pastry-shop-1.jpg", "swiss-pastry-shop-2.jpg"],
	20: ["french quarter meets funky town"],
	30: ["/lunch.png", "/catering.png"],
	31: ["pho-little-saigon-2.png", "pho-little-saigon.png"],
	32: ["happyhour_june2026", "5house-marg_eastland", "closed-holiday", "pulidos-holiday-hours", "birthday-card"],
	41: ["img_4801.jpeg"],
	44: ["enduro_coffee_roaster_2.jpg", "enduro_coffee-08.jpg", "enduro_coffee-01.jpg"],
	45: ["holiday_party", "parties_1.jpg"],
	48: ["altos tequila.jpg", "today - 4.png"],
	65: ["_x8wwzuz2e24s5gacisiwq"],
	67: ["opengraph image", "pattern.png", "bee-happy"],
	70: ["05a8ea999ffd475a881bbe6bc66c3b1e"],
	76: ["/1.png", "terra+white.png", "terra+tagline"],
	77: ["qnvyeMq0s9clndnerr_a8w", "mockupcoldbrew_"],
	79: ["heroimage_withtext", "gold-belly.png"],
	81: ["events_fallback.jpg"],
	85: ["fortworth-r.jpg"],
	90: ["mothers-day-grid-post"],
	94: ["1441148147932-jns99mweltfiwivly8ve", "1441148089518-ibmbvait56nmv7ubh5fd", "delivery"],
	100: ["639138661353544994+2014392.png"],
	101: ["wood-frame.webp"],
	106: ["403_dining.jpg"],
	111: ["holiday_party", "website_casual.jpg"],
};
const recipes = window.SWIPE_BITE_RECIPES;

const restaurants = [
	{
		id: 1,
		name: "Ol' South Pancake House",
		city: "Fort Worth, TX",
		category: "Breakfast",
		cuisine: "American Breakfast",
		price: "$$",
		neighborhood: "University / TCU Area",
		address: "1509 S University Dr, Fort Worth, TX 76107",
		latitude: 32.7301318,
		longitude: -97.3603587,
		placeId: null,
		description: "A classic Fort Worth diner known for pancakes, breakfast plates and late-night breakfast.",
		images: [],
		popularDishes: ["Pancakes", "Breakfast Plates", "French Toast"],
		websiteUrl: "https://www.olsouthpancakehouse.com/",
		menuUrl: "",
		yelpUrl: "",
	},
	{
		id: 2,
		name: "Snooze, an A.M. Eatery",
		city: "Fort Worth, TX",
		category: "Breakfast",
		cuisine: "Breakfast & Brunch",
		price: "$$",
		neighborhood: "West 7th",
		address: "2150 W 7th St Suite 108, Fort Worth, TX 76107",
		latitude: 32.7512958,
		longitude: -97.348778,
		description: "A colorful breakfast and brunch restaurant with pancakes, breakfast hashes, benedicts and other creative breakfast dishes.",
		images: [],
		popularDishes: ["Pancakes", "Breakfast Hash", "Eggs Benedict"],
		websiteUrl: "https://www.snoozeeatery.com/restaurant/texas/left-bank/",
		menuUrl: "",
		yelpUrl: "",
	},
	{
		id: 3,
		name: "Vickery Cafe",
		city: "Fort Worth, TX",
		category: "Breakfast",
		cuisine: "American Cafe",
		price: "$$",
		neighborhood: "West 7th",
		address: "2421 W 7th St Ste 109, Fort Worth, TX 76107",
		latitude: 32.750726,
		longitude: -97.352071,
		description: "A casual neighborhood cafe serving breakfast plates, pancakes, waffles, burgers and comfort food.",
		images: [],
		popularDishes: ["Pancakes", "Waffles", "Breakfast Plates"],
		websiteUrl: "https://vickerycafe.com/",
		menuUrl: "",
		yelpUrl: "",
	},
	{
		id: 4,
		name: "Press Cafe",
		city: "Fort Worth, TX",
		category: "Lunch",
		cuisine: "American",
		price: "$$",
		neighborhood: "Clearfork",
		address: "4801 Edwards Ranch Rd #105, Fort Worth, TX 76109",
		latitude: 32.7071096,
		longitude: -97.3947754,
		placeId: null,
		description: "An all-day cafe by the Trinity Trails with breakfast, salads, sandwiches, burgers and entrees.",
		images: [],
		popularDishes: ["Burgers", "Salads", "Brunch"],
		websiteUrl: "https://www.presscafeftworth.com/",
		menuUrl: "",
		yelpUrl: "",
	},
	{
		id: 5,
		name: "Yolk",
		city: "Fort Worth, TX",
		category: "Breakfast",
		cuisine: "Breakfast & Brunch",
		price: "$$",
		neighborhood: "Downtown",
		address: "305 Main St, Fort Worth, TX 76102",
		latitude: 32.7555406,
		longitude: -97.3317522,
		placeId: null,
		description: "A downtown breakfast restaurant serving pancakes, omelets, benedicts, French toast and lunch dishes.",
		images: [],
		popularDishes: ["French Toast", "Pancakes", "Omelets"],
		websiteUrl: "https://eatyolk.com/",
		menuUrl: "",
		yelpUrl: "",
	},
	{
		id: 6,
		name: "Hurtado Barbecue",
		city: "Fort Worth, TX",
		category: "Lunch",
		cuisine: "Texas Barbecue",
		price: "$$",
		neighborhood: "Near Southside",
		address: "1116 8th Ave, Fort Worth, TX 76104",
		latitude: 32.732519,
		longitude: -97.3440657,
		description: "Texas barbecue with Tex-Mex influences, smoked meats, tacos and barbecue plates.",
		images: [],
		popularDishes: ["Brisket", "Barbecue Tacos", "Smoked Meats"],
		websiteUrl: "https://hurtadobbq.com/locations/fort-worth",
		menuUrl: "",
		yelpUrl: "",
	},
	{
		id: 7,
		name: "Spiral Diner & Bakery",
		city: "Fort Worth, TX",
		category: "Lunch",
		cuisine: "Vegan American",
		price: "$$",
		neighborhood: "Near Southside",
		address: "1314 W Magnolia Ave, Fort Worth, TX 76104",
		latitude: 32.73081,
		longitude: -97.3401273,
		placeId: null,
		description: "A Fort Worth vegan diner serving plant-based comfort food for breakfast, lunch and dinner.",
		images: [],
		popularDishes: ["Biscuits and Gravy", "Breakfast Burrito", "Vegan Burgers"],
		websiteUrl: "https://www.spiraldiner.com/",
		menuUrl: "",
		yelpUrl: "",
	},
	{
		id: 8,
		name: "MELT Ice Creams",
		city: "Fort Worth, TX",
		category: "Sweet Treat",
		cuisine: "Ice Cream",
		price: "$$",
		neighborhood: "Magnolia",
		address: "1201 W Magnolia Ave Ste 115, Fort Worth, TX 76104",
		latitude: 32.7305196,
		longitude: -97.3379376,
		placeId: null,
		description: "A Fort Worth small-batch ice cream shop with rotating flavors and seasonal creations.",
		images: [],
		popularDishes: ["Small-Batch Ice Cream", "Seasonal Flavors", "Ice Cream Cones"],
		websiteUrl: "https://melticecreams.com/",
		menuUrl: "",
		yelpUrl: "",
	},
	{
		id: 9,
		name: "Swiss Pastry Shop",
		city: "Fort Worth, TX",
		category: "Sweet Treat",
		cuisine: "Bakery",
		price: "$$",
		neighborhood: "West Fort Worth",
		address: "3936 W Vickery Blvd, Fort Worth, TX 76107",
		latitude: 32.7295274,
		longitude: -97.3741009,
		description: "A longtime Fort Worth bakery known for cakes, pastries and its famous Black Forest cake.",
		images: [],
		popularDishes: ["Black Forest Cake", "Pastries", "Éclairs"],
		websiteUrl: "https://www.facebook.com/swisspastryshop/",
		menuUrl: "",
		yelpUrl: "",
	},
	{
		id: 10,
		name: "Amorino Gelato",
		city: "Fort Worth, TX",
		category: "Sweet Treat",
		cuisine: "Gelato",
		price: "$$",
		neighborhood: "Clearfork",
		address: "5274 Monahans Ave, Fort Worth, TX 76107",
		latitude: 32.7096209,
		longitude: -97.4012847,
		placeId: null,
		description: "An Italian gelato shop known for flower-shaped gelato cones, crepes and other desserts.",
		images: [],
		popularDishes: ["Gelato", "Rose-Shaped Cone", "Crepes"],
		websiteUrl: "https://www.amorino.com/en-us",
		menuUrl: "",
		yelpUrl: "",
	},
	{
		id: 11,
		name: "Gemelle",
		city: "Fort Worth, TX",
		category: "Dinner",
		cuisine: "Italian",
		price: "$$",
		neighborhood: "River District",
		address: "4400 White Settlement Rd, Fort Worth, TX 76114",
		latitude: 32.7618908,
		longitude: -97.38477,
		placeId: null,
		description: "A casual Italian restaurant from chef Tim Love serving pizza, pasta and Italian-inspired dishes.",
		images: [],
		popularDishes: ["Pizza", "Pasta", "Italian Small Plates"],
		websiteUrl: "https://www.gemelleftw.com/",
		menuUrl: "",
		yelpUrl: "",
	},
	{
		id: 12,
		name: "Don Artemio",
		city: "Fort Worth, TX",
		category: "Dinner",
		cuisine: "Mexican",
		price: "$$$",
		neighborhood: "Cultural District",
		address: "3268 W 7th St, Fort Worth, TX 76107",
		latitude: 32.7513266,
		longitude: -97.3639604,
		description: "An upscale restaurant focused on the food and traditions of northern Mexico.",
		images: [],
		popularDishes: ["Barbacoa Tacos", "Cabrito", "Tamal de Cerdo"],
		websiteUrl: "https://www.donartemio.us/",
		menuUrl: "",
		yelpUrl: "",
	},
];

restaurants.push(...(window.SWIPE_BITE_MORE_RESTAURANTS || []));

restaurants.forEach((restaurant) => {
	restaurant.images = window.SWIPE_BITE_RESTAURANT_PHOTOS?.[restaurant.id] || window.SWIPE_BITE_MORE_RESTAURANT_PHOTOS?.[restaurant.id] || restaurant.images || [];
	restaurant.customerPhotos = window.SWIPE_BITE_CUSTOMER_PHOTOS?.[restaurant.id] || window.SWIPE_BITE_MORE_CUSTOMER_PHOTOS?.[restaurant.id] || [];
	restaurant.popularDishes = (restaurant.popularDishes || []).filter((dish) => dish.trim().toLowerCase() !== "popular dishes");
	restaurant.description = (restaurant.description || "").replace(/known for Popular Dishes,?\s*/i, "known for ");
	const leadImage = restaurant.images[0];
	if (!restaurant.mainImage && leadImage) restaurant.mainImage = typeof leadImage === "string" ? leadImage : leadImage.url;
	if (!restaurant.imageSourceType && leadImage) restaurant.imageSourceType = typeof leadImage === "object" ? leadImage.sourceType || (leadImage.attribution === "Yelp customer photo" ? "customer" : "official") : "official";
	if (restaurant.imageSelectionReviewed === undefined) restaurant.imageSelectionReviewed = Boolean(leadImage);
});

const availableCities = [...new Set(restaurants.map((restaurant) => restaurant.city))];
let restoredUIState = {};
try {
	restoredUIState = JSON.parse(localStorage.getItem(UI_STORAGE_KEY) || "{}") || {};
} catch {
	restoredUIState = {};
}
let selectedCity = availableCities.includes(restoredUIState.city) ? restoredUIState.city : availableCities[0];
let currentPage = ["home", "out", "saved"].includes(restoredUIState.page) ? restoredUIState.page : "home";
let savedView = restoredUIState.savedView === "map" ? "map" : "list";
let savedMapCity = restoredUIState.savedMapCity || "__all__";
let closestMode = Boolean(restoredUIState.closestMode);
let locationModeWasEnabled = Boolean(restoredUIState.locationModeWasEnabled);

const tabs = document.querySelectorAll(".main-tab");
const pages = {
	home: document.querySelector("#page-home"),
	out: document.querySelector("#page-out"),
	saved: document.querySelector("#page-saved"),
};

const cardStages = {
	home: document.querySelector("#home-stage"),
	out: document.querySelector("#out-stage"),
};

const filters = {
	home: document.querySelector("#home-filter"),
	out: document.querySelector("#out-filter"),
};

const citySelect = document.querySelector("#city-select");
const detailDialog = document.querySelector("#detail-dialog");
const detailContent = document.querySelector("#detail-content");
const detailClose = document.querySelector("#detail-close");
const positions = {
	home: Number.isInteger(restoredUIState.homeIndex) ? Math.max(0, restoredUIState.homeIndex) : 0,
	out: Number.isInteger(restoredUIState.outIndex) ? Math.max(0, restoredUIState.outIndex) : 0,
};
const swipeLocks = { home: false, out: false };
const undoHistory = {
	home: restoredUIState.undo?.home || null,
	out: restoredUIState.undo?.out || null,
};
let activeDetail = null;
const preloadedCardImages = new Map();
let savedItems = loadSavedItems();
let lastDetailTrigger = null;

function hasSelectOption(select, value) {
	return [...select.options].some((option) => option.value === value);
}

if (hasSelectOption(filters.home, restoredUIState.homeCategory)) filters.home.value = restoredUIState.homeCategory;
if (hasSelectOption(filters.out, restoredUIState.outCategory)) filters.out.value = restoredUIState.outCategory;

function persistUIState() {
	const homeItems = getVisibleItems("home");
	const outItems = getVisibleItems("out");
	const homeItem = homeItems[positions.home];
	const outItem = outItems[positions.out];
	const detailOpen = detailDialog.open && activeDetail;
	try {
		localStorage.setItem(UI_STORAGE_KEY, JSON.stringify({
			page: currentPage,
			homeCategory: filters.home.value,
			outCategory: filters.out.value,
			city: selectedCity,
			savedView,
			savedMapCity,
			closestMode,
			locationModeWasEnabled,
			homeIndex: positions.home,
			outIndex: positions.out,
			homeId: homeItem?.id ?? null,
			outId: outItem?.id ?? null,
			detailOpen: Boolean(detailOpen),
			detailType: detailOpen ? activeDetail.type : null,
			detailId: detailOpen ? activeDetail.id : null,
			undo: undoHistory,
		}));
	} catch {
		return;
	}
}

function renderCityOptions() {
	citySelect.replaceChildren();
	availableCities.forEach((city) => {
		const option = document.createElement("option");
		option.value = city;
		option.textContent = city;
		citySelect.append(option);
	});
	citySelect.value = selectedCity;
}

function loadSavedItems() {
	try {
		const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
		const storedRecipes = Array.isArray(saved.recipes) ? saved.recipes : [];
		const normalizedRecipes = storedRecipes.map((savedRecipe) => {
			if (savedRecipe && typeof savedRecipe === "object") {
				return {
					...savedRecipe,
					mainImage: savedRecipe.mainImage || "",
					images: Array.isArray(savedRecipe.images) ? savedRecipe.images : [],
					ingredients: Array.isArray(savedRecipe.ingredients) ? savedRecipe.ingredients : [],
					measurements: Array.isArray(savedRecipe.measurements) ? savedRecipe.measurements : [],
					instructions: Array.isArray(savedRecipe.instructions) ? savedRecipe.instructions : [],
				};
			}
			return recipes.find((recipe) => String(recipe.id) === String(savedRecipe));
		}).filter(Boolean);

		const normalizedRestaurants = Array.isArray(saved.restaurants) ? saved.restaurants.map(completeSavedRestaurant) : [];
		if (JSON.stringify(saved.restaurants || []) !== JSON.stringify(normalizedRestaurants)) {
			localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...saved, recipes: storedRecipes, restaurants: normalizedRestaurants }));
		}
		return { recipes: normalizedRecipes, restaurants: normalizedRestaurants };
	} catch {
		return { recipes: [], restaurants: [] };
	}
}

function coordinatesAreValid(latitude, longitude) {
	return latitude !== null && latitude !== undefined && latitude !== ""
		&& longitude !== null && longitude !== undefined && longitude !== ""
		&& Number.isFinite(Number(latitude)) && Number.isFinite(Number(longitude))
		&& Math.abs(Number(latitude)) <= 90 && Math.abs(Number(longitude)) <= 180;
}

function mapsUrlForRestaurant(restaurant) {
	if (coordinatesAreValid(restaurant.latitude, restaurant.longitude)) {
		return `https://www.google.com/maps/search/?api=1&query=${restaurant.latitude},${restaurant.longitude}`;
	}
	const query = encodeURIComponent(`${restaurant.name}, ${restaurant.address || ""}, ${restaurant.city || ""}`);
	return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

function getRestaurantRating(restaurant) {
	if (restaurant.ratingSource !== "Yelp") return null;
	if (restaurant.googleRating !== undefined || restaurant.userRatingsTotal !== undefined || restaurant.ratingPlaceId !== undefined) return null;
	if (typeof restaurant.rating !== "number" || !Number.isFinite(restaurant.rating) || restaurant.rating < 1 || restaurant.rating > 5) return null;
	try {
		const listing = new URL(restaurant.yelpUrl);
		if (listing.hostname !== "www.yelp.com" || !/^\/biz\/[^/]+\/?$/.test(listing.pathname)) return null;
	} catch {
			return null;
	}
	const reviewCount = restaurant.reviewCount === undefined || restaurant.reviewCount === null
		? null
		: Number.isInteger(restaurant.reviewCount) && restaurant.reviewCount > 0 ? restaurant.reviewCount : null;
	return { rating: restaurant.rating, reviewCount };
}

function restaurantRatingMarkup(restaurant) {
	const data = getRestaurantRating(restaurant);
	if (!data) return "";
	const count = data.reviewCount ? ` (${new Intl.NumberFormat("en", { notation: data.reviewCount >= 1000 ? "compact" : "standard", maximumFractionDigits: 1 }).format(data.reviewCount)})` : "";
	return `<span class="card-rating" aria-label="${data.rating.toFixed(1)} out of 5 stars">★ ${data.rating.toFixed(1)}${count}</span>`;
}

async function shareRestaurant(restaurant, button) {
	const url = restaurant.googleMapsUrl || mapsUrlForRestaurant(restaurant) || restaurant.websiteUrl || window.location.href;
	const shareData = { title: restaurant.name, text: `Check out ${restaurant.name} on Swipe & Bite`, url };
	if (typeof navigator.share === "function") {
		try {
			await navigator.share(shareData);
			return;
		} catch (error) {
			if (error?.name === "AbortError") return;
		}
	}
	try {
		if (navigator.clipboard?.writeText) {
			await navigator.clipboard.writeText(url);
		} else {
			const input = document.createElement("textarea");
			input.value = url;
			input.setAttribute("readonly", "");
			input.style.position = "fixed";
			input.style.opacity = "0";
			document.body.append(input);
			input.select();
			const copied = document.execCommand("copy");
			input.remove();
			if (!copied) throw new Error("Clipboard unavailable");
		}
		if (button) {
			const originalText = button.textContent;
			button.textContent = "Link copied";
			window.setTimeout(() => {
				if (button.isConnected) button.textContent = originalText;
			}, 1800);
		}
	} catch {
		if (button) button.textContent = "Could not copy";
	}
}

// Merge older saved IDs with current restaurant data, keeping any coordinates saved previously.
function completeSavedRestaurant(savedRestaurant) {
	const saved = savedRestaurant && typeof savedRestaurant === "object" ? savedRestaurant : { id: savedRestaurant };
	const current = restaurants.find((restaurant) => String(restaurant.id) === String(saved.id));
	const merged = { ...(current || {}), ...saved };
	const catalogHasCoordinates = coordinatesAreValid(current?.latitude, current?.longitude);
	const savedHasCoordinates = coordinatesAreValid(saved.latitude, saved.longitude);
	const coordinateSource = catalogHasCoordinates ? current : savedHasCoordinates ? saved : null;
	merged.latitude = coordinateSource ? Number(coordinateSource.latitude) : null;
	merged.longitude = coordinateSource ? Number(coordinateSource.longitude) : null;
	["name", "city", "address", "cuisine", "price", "category"].forEach((field) => {
		merged[field] = current?.[field] || saved[field] || "";
	});
	const savedAddressHasStreetNumber = /^\s*\d+[a-z]?\b/i.test(saved.address || "");
	if (!savedAddressHasStreetNumber && current?.address) merged.address = current.address;
	if (current?.city) merged.city = current.city;
	merged.placeId = merged.placeId || merged.googlePlaceId || null;
	merged.images = Array.isArray(saved.images) && saved.images.length
		? (Array.isArray(current?.images) ? current.images : saved.images)
		: Array.isArray(current?.images) ? current.images : [];
	merged.mainImage = current?.mainImage || saved.mainImage
		|| (Array.isArray(merged.images) ? (typeof merged.images[0] === "string" ? merged.images[0] : merged.images[0]?.url) : "") || "";
	merged.popularDishes = Array.isArray(merged.popularDishes) ? merged.popularDishes : [];
	if (current) {
		["rating", "googleRating", "yelpRating", "reviewCount", "userRatingsTotal"].forEach((field) => {
			merged[field] = current[field];
		});
	}
	merged.googleMapsUrl = coordinateSource ? mapsUrlForRestaurant(merged) : merged.googleMapsUrl || mapsUrlForRestaurant(merged);
	return merged;
}

function saveItems() {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(savedItems));
}

function getVisibleItems(page) {
	const allItems = page === "home" ? recipes : restaurants.filter((restaurant) => restaurant.city === selectedCity);
	const selectedCategory = filters[page].value;

	if (selectedCategory === "All") {
		return allItems;
	}

	return allItems.filter((item) => item.category === selectedCategory);
}

function preloadUpcomingImages(page) {
	if (typeof window.Image !== "function") return;
	const items = getVisibleItems(page);
	if (items.length < 2) return;
	const type = page === "home" ? "recipe" : "restaurant";
	for (let offset = 1; offset <= 2 && offset < items.length; offset += 1) {
		const item = items[(positions[page] + offset) % items.length];
		const url = getItemImages(item, type)[0]?.url;
		if (!url || preloadedCardImages.has(url)) continue;
		const image = new window.Image();
		image.decoding = "async";
		image.addEventListener("error", () => {
			if (page === "out") markRestaurantImageFailed(url);
			preloadedCardImages.delete(url);
		}, { once: true });
		if (page === "out") image.addEventListener("load", () => {
			if (image.naturalWidth < MIN_RESTAURANT_IMAGE_WIDTH) markRestaurantImageFailed(url);
		}, { once: true });
		preloadedCardImages.set(url, image);
		image.src = url;
	}
	while (preloadedCardImages.size > 4) {
		preloadedCardImages.delete(preloadedCardImages.keys().next().value);
	}
}

function itemIdMatches(item, id) {
	return id !== null && id !== undefined && String(item.id) === String(id);
}

function restorePosition(page, savedId, savedIndex) {
	const items = getVisibleItems(page);
	const matchingIndex = items.findIndex((item) => itemIdMatches(item, savedId));
	positions[page] = matchingIndex >= 0
		? matchingIndex
		: Math.min(Math.max(0, Number(savedIndex) || 0), Math.max(0, items.length - 1));
}

function undoIsAvailable(page) {
	const undo = undoHistory[page];
	if (!undo || undo.category !== filters[page].value) return false;
	if (page === "out" && undo.city !== selectedCity) return false;
	return getVisibleItems(page).some((item) => itemIdMatches(item, undo.itemId));
}

function finishSwipeLock(page) {
	swipeLocks[page] = false;
	const stage = cardStages[page];
	stage.querySelectorAll("button").forEach((button) => {
		button.disabled = button.hasAttribute("data-undo") && !undoIsAvailable(page);
	});
	stage.removeAttribute("aria-busy");
}

function runSwipeAction(page, item, action) {
	if (swipeLocks[page]) return;
	swipeLocks[page] = true;
	const stage = cardStages[page];
	stage.setAttribute("aria-busy", "true");
	stage.querySelectorAll("button").forEach((button) => { button.disabled = true; });
	if (stage.contains(document.activeElement)) document.activeElement.blur();

	const collection = page === "home" ? "recipes" : "restaurants";
	let addedToSaved = false;
	if (action === "like") {
		const alreadySaved = savedItems[collection].some((savedItem) => {
			const savedId = typeof savedItem === "object" ? savedItem.id : savedItem;
			return itemIdMatches({ id: savedId }, item.id);
		});
		if (!alreadySaved) {
			savedItems[collection].push(collection === "recipes" ? { ...item } : completeSavedRestaurant(item));
			addedToSaved = true;
			saveItems();
			updateSavedCount();
		}
	}

	undoHistory[page] = {
		itemId: item.id,
		category: filters[page].value,
		city: page === "out" ? selectedCity : null,
		addedToSaved,
	};
	positions[page] = (positions[page] + 1) % Math.max(1, getVisibleItems(page).length);
	renderCard(page);
	persistUIState();
	window.setTimeout(() => finishSwipeLock(page), SWIPE_LOCK_MS);
}

function undoLastSwipe(page) {
	if (swipeLocks[page] || !undoIsAvailable(page)) return;
	const undo = undoHistory[page];
	const items = getVisibleItems(page);
	const restoredIndex = items.findIndex((item) => itemIdMatches(item, undo.itemId));
	if (restoredIndex < 0) return;

	swipeLocks[page] = true;
	const stage = cardStages[page];
	stage.setAttribute("aria-busy", "true");
	stage.querySelectorAll("button").forEach((button) => { button.disabled = true; });
	if (stage.contains(document.activeElement)) document.activeElement.blur();
	if (undo.addedToSaved) {
		const collection = page === "home" ? "recipes" : "restaurants";
		savedItems[collection] = savedItems[collection].filter((savedItem) => {
			const savedId = typeof savedItem === "object" ? savedItem.id : savedItem;
			return !itemIdMatches({ id: savedId }, undo.itemId);
		});
		saveItems();
		updateSavedCount();
	}
	positions[page] = restoredIndex;
	undoHistory[page] = null;
	renderCard(page);
	if (currentPage === "saved") renderSavedItems();
	persistUIState();
	window.setTimeout(() => finishSwipeLock(page), SWIPE_LOCK_MS);
}

function getItemImages(item, type) {
	const customerPhotos = type === "restaurant" && Array.isArray(item.customerPhotos)
		? item.customerPhotos.map((photo) => ({ ...photo, attribution: photo.attribution || "Yelp customer photo", sourceType: "customer" }))
		: [];
	const recipeOrCuratedImages = [item.mainImage, ...(Array.isArray(item.images) ? item.images : []), ...customerPhotos].filter(Boolean);
	const seenRestaurantPhotos = new Set();
	const normalizeImages = (images) => images
		.map((image) => typeof image === "string" ? { url: image, attribution: type === "restaurant" ? "Official restaurant website" : "" } : image)
		.filter((image) => typeof image?.url === "string" && image.url.trim())
		.filter((image) => {
			if (type !== "restaurant") return true;
			const imagePath = decodeURIComponent(new URL(image.url, window.location.href).pathname).toLowerCase();
			const rejected = /(?:^|[\/_ .-])(logo|logotype|wordmark|favicon|icon|badge|seal|placeholder|sprite|dummy|close|reload|texture|pattern|gift.?card|award|certificate|screenshot|opengraph|og.?image|holiday.?party|mother.?s.?day|happy.?hour|closed.?holiday)(?:[\/_?. -]|$)/i.test(imagePath)
				|| (restaurantPhotoExclusions[String(item.id)] || []).some((fragment) => imagePath.includes(fragment.toLowerCase()))
				|| /(?:^|[\/:?&,=])(?:w|width)[=_:/-]?(?:[1-3]\d{2})(?:[,/&_-]|$)/i.test(image.url)
				|| /(?:^|[\/_-])\d{2,3}x\d{2,3}(?:[\/_?.&-]|$)/i.test(imagePath);
			return !rejected && !failedRestaurantImageUrls.has(canonicalRestaurantPhotoKey(image.url));
		})
		.filter((image) => {
			if (type !== "restaurant") return true;
			const key = canonicalRestaurantPhotoKey(image.url);
			if (seenRestaurantPhotos.has(key)) return false;
			seenRestaurantPhotos.add(key);
			return true;
		});

	const normalizedImages = normalizeImages(recipeOrCuratedImages);
	if (type === "restaurant") {
		const photoScore = (image) => {
			const path = decodeURIComponent(image.url).toLowerCase();
			if (image.sourceType === "customer") return 0;
			if (/(food|dish|plate|meal|taco|burger|pizza|pasta|steak|brisket|pho|pastry|beignet|dessert|gelato|sushi|dumpling|pancake|souffle|wings|ribs|prawn|flatbread|burrito|seafood|soup|salsa|enchilada|ramen|bao|sandwich|bacon|shrimp|cake|roll|sashimi|noodle|bread|fries)/i.test(path)) return 40;
			if (/(coffee|cocktail|drink|wine|beer|beverage|latte)/i.test(path)) return 22;
			if (/(interior|dining|room|patio|ambiance|atmosphere|inside|restaurant)/i.test(path)) return 12;
			if (/(exterior|outside|front|building)/i.test(path)) return -5;
			return 0;
		};
		return normalizedImages.map((image, index) => ({ image, index, score: photoScore(image) }))
			.sort((a, b) => b.score - a.score || a.index - b.index)
			.map(({ image }) => image)
			.slice(0, 8);
	}
	return type === "restaurant" ? normalizedImages.slice(0, 8) : normalizedImages;
}

function canonicalRestaurantPhotoKey(url) {
	try {
		const parsed = new URL(url, window.location.href);
		parsed.pathname = parsed.pathname.replace(/-\d{2,4}x\d{2,4}(?=\.[a-z0-9]+$)/i, "");
		[...parsed.searchParams.keys()].forEach((key) => {
			if (["w", "width", "h", "height", "format", "quality", "fit", "crop", "auto", "cs", "lossy", "strip", "webp", "compress", "dpr", "resize", "fill", "variant"].includes(key.toLowerCase())) parsed.searchParams.delete(key);
		});
		parsed.hash = "";
		return `${parsed.hostname.toLowerCase()}${parsed.pathname.toLowerCase()}?${parsed.searchParams.toString()}`;
	} catch {
		return url;
	}
}

function markRestaurantImageFailed(url) {
	failedRestaurantImageUrls.add(canonicalRestaurantPhotoKey(url));
}

restaurants.forEach((restaurant) => {
	const images = getItemImages(restaurant, "restaurant");
	restaurant.images = images;
	restaurant.mainImage = images[0]?.url || "";
});

function imageOrPlaceholder(item, type, className = "") {
	const images = getItemImages(item, type);
	const image = images[0];
	return image
		? `<img class="${className}" src="${image.url}" alt="${item.name}" loading="lazy" data-photo-fallback data-photo-type="${type}" data-fallback-images="${encodeURIComponent(JSON.stringify(images.map((candidate) => candidate.url)))}">`
		: `<div class="photo-placeholder ${className}" aria-label="No photo added for ${item.name}"><span>Photo not provided</span></div>`;
}

function connectImageFallback(image) {
	if (!image) return;
	let fallbackImages = [];
	try {
		fallbackImages = JSON.parse(decodeURIComponent(image.dataset.fallbackImages || "[]"));
	} catch {
		fallbackImages = [];
	}
	const attemptedImages = new Set([new URL(image.currentSrc || image.src, window.location.href).href]);
	image.addEventListener("error", () => {
		if (image.dataset.photoType === "restaurant") markRestaurantImageFailed(image.currentSrc || image.src);
		const nextImage = fallbackImages.find((url) => !attemptedImages.has(new URL(url, window.location.href).href)
			&& (image.dataset.photoType !== "restaurant" || !failedRestaurantImageUrls.has(canonicalRestaurantPhotoKey(url))));
		if (nextImage) {
			attemptedImages.add(new URL(nextImage, window.location.href).href);
			image.src = nextImage;
			return;
		}
		const placeholder = document.createElement("div");
		placeholder.className = "photo-placeholder image-error-placeholder";
		placeholder.textContent = "Photo unavailable";
		image.replaceWith(placeholder);
	});
}

function galleryMarkup(item, type) {
	const images = getItemImages(item, type);
	const description = type === "restaurant" ? `${item.name} photo` : item.name;

	if (images.length === 0) {
		return `<div class="detail-gallery empty-gallery"><div class="photo-placeholder"><span>${type === "restaurant" ? "Restaurant photos will appear here when available" : "No recipe photo provided"}</span></div></div>`;
	}

	const thumbnails = images.length > 1
		? `<div class="gallery-thumbnails" aria-label="Choose a photo">${images.map((image, index) => `<button class="gallery-thumbnail${index === 0 ? " is-active" : ""}" type="button" data-gallery-index="${index}" aria-label="Show photo ${index + 1}" aria-pressed="${index === 0}"><img src="${image.url}" alt="" loading="lazy"></button>`).join("")}</div>`
		: "";
	const controls = images.length > 1
		? `<button class="gallery-arrow gallery-previous" type="button" data-gallery-step="-1" aria-label="Previous photo">‹</button><button class="gallery-arrow gallery-next" type="button" data-gallery-step="1" aria-label="Next photo">›</button><span class="gallery-count" aria-live="polite">1 / ${images.length}</span>`
		: "";

	return `<div class="detail-gallery" data-gallery data-gallery-alt="${description}"><div class="gallery-main"><img class="detail-hero-image" src="${images[0].url}" alt="${description} 1 of ${images.length}" data-photo-fallback data-photo-type="${type}">${controls}<span class="gallery-credit" aria-live="polite"></span></div>${thumbnails}</div>`;
}

function normalizedCustomerPhotos(item) {
	const seen = new Set();
	return (item.customerPhotos || []).filter((photo) => {
		try {
			const url = new URL(photo.url, window.location.href);
			url.search = "";
			url.hash = "";
			const key = `${url.hostname.toLowerCase()}${url.pathname.toLowerCase()}`;
			if (seen.has(key)) return false;
			seen.add(key);
			return true;
		} catch {
			return false;
		}
	});
}

function customerPhotosMarkup(item, yelpUrl, mapsUrl) {
	const photos = normalizedCustomerPhotos(item);
	if (photos.length === 0) {
		return `<section class="customer-photos"><h3>Photos from customers</h3><p class="customer-photos-empty">Guest photos will appear here. See what diners are sharing on Yelp and Google Maps.</p><p class="detail-source">See more guest photos on <a href="${yelpUrl}" target="_blank" rel="noopener noreferrer">Yelp</a> or <a href="${mapsUrl}" target="_blank" rel="noopener noreferrer">Google Maps</a></p></section>`;
	}

	const preview = photos.slice(0, 6);
	const hiddenCount = photos.length - preview.length;
	const tiles = preview.map((photo, index) => {
		const more = hiddenCount > 0 && index === preview.length - 1 ? `<span class="customer-photo-more">+${hiddenCount}</span>` : "";
		return `<button class="customer-photo" type="button" data-guest-index="${index}" aria-label="Open customer photo ${index + 1} of ${photos.length}"><img src="${photo.thumb}" alt="Customer photo at ${item.name}" loading="lazy">${more}</button>`;
	}).join("");
	return `<section class="customer-photos"><div class="customer-photos-heading"><h3>Photos from customers</h3><button class="customer-photos-all" type="button" data-guest-open>View all ${photos.length}</button></div><div class="customer-photo-grid">${tiles}</div><p class="detail-source">Photos shared by diners on Yelp</p></section>`;
}

function closeGuestGallery() {
	detailDialog.querySelector(".guest-gallery")?.remove();
	detailContent.hidden = false;
}

function openGuestGallery(item, startIndex = null) {
	const photos = normalizedCustomerPhotos(item);
	const shell = detailDialog.querySelector(".detail-dialog-shell");
	closeGuestGallery();
	detailContent.hidden = true;
	detailDialog.scrollTo({ top: 0 });

	const gallery = document.createElement("div");
	gallery.className = "guest-gallery";
	gallery.setAttribute("role", "region");
	gallery.setAttribute("aria-label", `Customer photos of ${item.name}`);
	gallery.innerHTML = `
		<div class="guest-gallery-bar">
			<button class="guest-back" type="button">‹ Back to ${item.name}</button>
			<span>${photos.length} photos from Yelp diners</span>
		</div>
		<div class="guest-grid">${photos.map((photo, index) => `<button class="guest-grid-photo" type="button" data-index="${index}" aria-label="View customer photo ${index + 1} of ${photos.length}"><img src="${photo.thumb}" alt="Customer photo at ${item.name}" loading="lazy"></button>`).join("")}</div>
		<div class="guest-viewer" hidden>
			<button class="guest-viewer-back" type="button">‹ All photos</button>
			<img class="guest-viewer-image" alt="">
			<button class="guest-viewer-arrow guest-viewer-prev" type="button" aria-label="Previous photo">‹</button>
			<button class="guest-viewer-arrow guest-viewer-next" type="button" aria-label="Next photo">›</button>
			<div class="guest-viewer-caption"><span class="guest-viewer-count"></span><a target="_blank" rel="noopener noreferrer">Photo from Yelp · View on Yelp</a></div>
		</div>`;
	shell.append(gallery);

	const viewer = gallery.querySelector(".guest-viewer");
	const viewerImage = gallery.querySelector(".guest-viewer-image");
	let current = 0;
	let touchStartX = null;
	let savedScroll = 0;

	function showPhoto(index) {
		if (viewer.hidden) {
			savedScroll = gallery.scrollTop;
			gallery.scrollTop = 0;
			gallery.style.overflowY = "hidden";
		}
		current = (index + photos.length) % photos.length;
		viewerImage.src = photos[current].url;
		viewerImage.alt = `Customer photo ${current + 1} of ${photos.length} at ${item.name}`;
		gallery.querySelector(".guest-viewer-count").textContent = `${current + 1} / ${photos.length}`;
		gallery.querySelector(".guest-viewer-caption a").href = photos[current].sourceUrl;
		viewer.hidden = false;
		viewer.querySelector(".guest-viewer-back").focus();
	}

	function closeViewer() {
		viewer.hidden = true;
		gallery.style.overflowY = "";
		gallery.scrollTop = savedScroll;
		gallery.querySelector(`[data-index="${current}"]`)?.focus({ preventScroll: true });
	}

	viewerImage.addEventListener("error", () => {
		if (viewerImage.src !== photos[current].thumb) viewerImage.src = photos[current].thumb;
	});
	gallery.querySelectorAll(".guest-grid-photo img").forEach((thumbnail) => {
		thumbnail.addEventListener("error", () => thumbnail.closest(".guest-grid-photo").remove(), { once: true });
	});
	gallery.querySelectorAll(".guest-grid-photo").forEach((button) => {
		button.addEventListener("click", () => showPhoto(Number(button.dataset.index)));
	});

	gallery.querySelector(".guest-back").addEventListener("click", () => {
		closeGuestGallery();
		detailContent.querySelector("[data-guest-open]")?.focus();
	});
	viewer.querySelector(".guest-viewer-back").addEventListener("click", closeViewer);
	viewer.querySelector(".guest-viewer-prev").addEventListener("click", () => showPhoto(current - 1));
	viewer.querySelector(".guest-viewer-next").addEventListener("click", () => showPhoto(current + 1));
	gallery.addEventListener("keydown", (event) => {
		if (viewer.hidden) return;
		if (event.key === "ArrowLeft") showPhoto(current - 1);
		if (event.key === "ArrowRight") showPhoto(current + 1);
	});
	viewer.addEventListener("touchstart", (event) => {
		touchStartX = event.changedTouches[0].clientX;
	}, { passive: true });
	viewer.addEventListener("touchend", (event) => {
		if (touchStartX === null) return;
		const distance = event.changedTouches[0].clientX - touchStartX;
		if (Math.abs(distance) > 40) showPhoto(current + (distance < 0 ? 1 : -1));
		touchStartX = null;
	}, { passive: true });

	if (startIndex === null) {
		gallery.querySelector(".guest-back").focus();
	} else {
		showPhoto(startIndex);
	}
}

function cardPhotoMarkup(item, type, label) {
	const images = getItemImages(item, type);
	const photo = images.length
		? `<img class="card-gallery-image" src="${images[0].url}" alt="${item.name}" loading="eager" data-photo-type="${type}" data-fallback-images="${encodeURIComponent(JSON.stringify(images.map((candidate) => candidate.url)))}">`
		: imageOrPlaceholder(item, type);
	const controls = images.length > 1
		? `<button class="card-gallery-arrow card-gallery-previous" type="button" data-card-gallery-step="-1" aria-label="Previous ${item.name} photo">‹</button><button class="card-gallery-arrow card-gallery-next" type="button" data-card-gallery-step="1" aria-label="Next ${item.name} photo">›</button><span class="card-gallery-count" aria-live="polite">1 / ${images.length}</span>`
		: "";

	return `<div class="food-photo" data-card-gallery data-card-gallery-count="${images.length}">${photo}${controls}<span class="photo-label">${label}</span></div>`;
}

function connectCardGallery(card, images, isRestaurant) {
	const photoArea = card.querySelector(".food-photo");
	const image = photoArea.querySelector(".card-gallery-image");
	if (!image) return;
	let currentIndex = 0;
	let touchStartX = null;
	let fallback = null;
	const attemptedImages = new Set([new URL(images[0].url, window.location.href).href]);

	function tryNextImage() {
		const nextIndex = images.findIndex((candidate) => !attemptedImages.has(new URL(candidate.url, window.location.href).href)
			&& (!isRestaurant || !failedRestaurantImageUrls.has(canonicalRestaurantPhotoKey(candidate.url))));
		if (nextIndex === -1) {
			if (images.length > 1) photoArea.querySelectorAll(".card-gallery-arrow, .card-gallery-count").forEach((control) => control.remove());
			if (!fallback) {
				fallback = document.createElement("div");
				fallback.className = "photo-placeholder card-gallery-fallback";
				fallback.textContent = "Photo unavailable";
				photoArea.append(fallback);
			}
			image.style.visibility = "hidden";
			return false;
		}
		showImage(nextIndex);
		return true;
	}

	function showImage(index) {
		currentIndex = (index + images.length) % images.length;
		for (let checked = 0; checked < images.length && isRestaurant && failedRestaurantImageUrls.has(canonicalRestaurantPhotoKey(images[currentIndex].url)); checked += 1) {
			currentIndex = (currentIndex + 1) % images.length;
		}
		image.src = images[currentIndex].url;
		attemptedImages.add(new URL(images[currentIndex].url, window.location.href).href);
		image.alt = `${card.querySelector("h3").textContent}, photo ${currentIndex + 1} of ${images.length}`;
		const count = photoArea.querySelector(".card-gallery-count");
		if (count) count.textContent = `${currentIndex + 1} / ${images.length}`;
	}

	image.addEventListener("error", () => {
		const failedUrl = new URL(image.currentSrc || image.src, window.location.href).href;
		if (isRestaurant) markRestaurantImageFailed(failedUrl);
		tryNextImage();
	});
	image.addEventListener("load", () => {
		if (isRestaurant && image.naturalWidth < MIN_RESTAURANT_IMAGE_WIDTH) {
			markRestaurantImageFailed(image.currentSrc || image.src);
			tryNextImage();
			return;
		}
		image.style.visibility = "visible";
		fallback?.remove();
		fallback = null;
	});

	if (images.length < 2) return;
	photoArea.querySelectorAll("[data-card-gallery-step]").forEach((button) => {
		button.addEventListener("click", () => showImage(currentIndex + Number(button.dataset.cardGalleryStep)));
	});
	photoArea.addEventListener("touchstart", (event) => {
		touchStartX = event.changedTouches[0].clientX;
	}, { passive: true });
	photoArea.addEventListener("touchend", (event) => {
		if (touchStartX === null) return;
		const distance = event.changedTouches[0].clientX - touchStartX;
		if (Math.abs(distance) > 40) showImage(currentIndex + (distance < 0 ? 1 : -1));
		touchStartX = null;
	}, { passive: true });
}

function connectGallery(gallery, images, type) {
	if (!gallery) return;
	const credit = gallery.querySelector(".gallery-credit");
	if (credit && images[0]?.attribution) credit.textContent = `Photo: ${images[0].attribution}`;
	const mainImage = gallery.querySelector(".detail-hero-image");
	let fallback = null;
	let touchStartX = null;
	mainImage.addEventListener("error", () => {
		if (type === "restaurant") markRestaurantImageFailed(mainImage.currentSrc || mainImage.src);
		if (dropImage(mainImage.getAttribute("src"))) return;
		showFallback();
	});
	mainImage.addEventListener("load", () => {
		if (type === "restaurant" && mainImage.naturalWidth < MIN_RESTAURANT_IMAGE_WIDTH) {
			markRestaurantImageFailed(mainImage.currentSrc || mainImage.src);
			if (dropImage(mainImage.getAttribute("src"))) return;
			showFallback();
			return;
		}
		mainImage.style.visibility = "visible";
		fallback?.remove();
		fallback = null;
	});
	gallery.querySelectorAll(".gallery-thumbnail img").forEach((thumbnail) => {
		thumbnail.addEventListener("error", () => dropImage(thumbnail.getAttribute("src")), { once: true });
	});
	if (images.length < 2) return;
	let currentIndex = 0;

	function showFallback() {
		if (fallback) return;
		fallback = document.createElement("div");
		fallback.className = "photo-placeholder gallery-image-fallback";
		fallback.textContent = "Photo unavailable";
		gallery.querySelector(".gallery-main").append(fallback);
		mainImage.style.visibility = "hidden";
	}

	function dropImage(url) {
		const index = images.findIndex((image) => image.url === url);
		if (type === "restaurant") markRestaurantImageFailed(url);
		if (index === -1 || images.length < 2) return false;
		images.splice(index, 1);
		const thumbnails = [...gallery.querySelectorAll(".gallery-thumbnail")];
		thumbnails[index]?.remove();
		gallery.querySelectorAll(".gallery-thumbnail").forEach((thumbnail, thumbnailIndex) => {
			thumbnail.dataset.galleryIndex = thumbnailIndex;
		});
		if (images.length < 2) gallery.querySelectorAll(".gallery-arrow, .gallery-count, .gallery-thumbnails").forEach((element) => element.remove());
		showImage(index < currentIndex ? currentIndex - 1 : currentIndex);
		return true;
	}

	function showImage(index) {
		currentIndex = (index + images.length) % images.length;
		mainImage.src = images[currentIndex].url;
		mainImage.alt = `${gallery.dataset.galleryAlt} ${currentIndex + 1} of ${images.length}`;
		gallery.querySelector(".gallery-credit").textContent = images[currentIndex].attribution
			? `Photo: ${images[currentIndex].attribution}`
			: "";
		const count = gallery.querySelector(".gallery-count");
		if (count) count.textContent = `${currentIndex + 1} / ${images.length}`;
		gallery.querySelectorAll(".gallery-thumbnail").forEach((thumbnail, thumbnailIndex) => {
			const isActive = thumbnailIndex === currentIndex;
			thumbnail.classList.toggle("is-active", isActive);
			thumbnail.setAttribute("aria-pressed", String(isActive));
		});
	}

	gallery.querySelectorAll("[data-gallery-step]").forEach((button) => {
		button.addEventListener("click", () => showImage(currentIndex + Number(button.dataset.galleryStep)));
	});
	gallery.querySelectorAll("[data-gallery-index]").forEach((button) => {
		button.addEventListener("click", () => showImage(Number(button.dataset.galleryIndex)));
	});
	gallery.querySelector(".gallery-main").addEventListener("touchstart", (event) => {
		touchStartX = event.changedTouches[0].clientX;
	}, { passive: true });
	gallery.querySelector(".gallery-main").addEventListener("touchend", (event) => {
		if (touchStartX === null) return;
		const distance = event.changedTouches[0].clientX - touchStartX;
		if (Math.abs(distance) > 40) showImage(currentIndex + (distance < 0 ? 1 : -1));
		touchStartX = null;
	}, { passive: true });
}

function renderCard(page) {
	const items = getVisibleItems(page);
	const stage = cardStages[page];
	const positionElement = document.querySelector(`#${page}-position`);
	const totalElement = document.querySelector(`#${page}-total`);

	if (positions[page] >= items.length) {
		positions[page] = 0;
	}

	positionElement.textContent = String(items.length ? positions[page] + 1 : 0).padStart(2, "0");
	totalElement.textContent = String(items.length).padStart(2, "0");

	if (items.length === 0) {
		stage.innerHTML = `
			<div class="empty-card">
				<span class="empty-card-mark" aria-hidden="true">✳</span>
				<h3>No bites in this category yet</h3>
				<p>Try another category and see what looks good.</p>
			</div>`;
		return;
	}

	const item = items[positions[page]];
	const isRecipe = page === "home";
	const detail = isRecipe ? item.cookTime : `${item.cuisine || ""}${item.price ? ` · ${item.price}` : ""}`;
	const detailLabel = isRecipe ? "Ready in" : "Cuisine";
	const rating = !isRecipe ? restaurantRatingMarkup(item) : "";
	const descriptionText = item.description || "";
	const itemImages = getItemImages(item, isRecipe ? "recipe" : "restaurant");
	const undoDisabled = !undoIsAvailable(page) || swipeLocks[page];

	stage.innerHTML = `
		<article class="food-card" tabindex="0" aria-label="Open details for ${item.name}" aria-haspopup="dialog">
			${cardPhotoMarkup(item, isRecipe ? "recipe" : "restaurant", isRecipe ? "Made with love" : "Worth the trip")}
			<div class="card-content">
				<div class="card-meta">
					<span class="category-tag">${item.category}</span>
					<span>${detail ? `${detailLabel} · ${detail}` : " "}</span>
				</div>
				<div class="card-title-row"><h3>${item.name}</h3>${rating}</div>
				<p>${descriptionText}</p>
			</div>
			<div class="card-actions" aria-label="Choose what to do with ${item.name}">
				<button class="action-button undo-button" type="button" data-undo aria-label="Undo last swipe" title="Undo last swipe"${undoDisabled ? " disabled" : ""}>
					<svg class="action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<path d="M3 7v6h6"></path><path d="M5.2 13a8 8 0 1 0 2.1-6L3 10"></path>
					</svg>
				</button>
				<button class="action-button skip-button" type="button" data-action="skip" aria-label="Skip ${item.name}" title="Skip"${swipeLocks[page] ? " disabled" : ""}>
					<svg class="action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
						<path d="m6 6 12 12M18 6 6 18"></path>
					</svg>
				</button>
				<button class="action-button like-button" type="button" data-action="like" aria-label="Save ${item.name}" title="Save"${swipeLocks[page] ? " disabled" : ""}>
					<svg class="action-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
						<path d="M12 21.1 3.5 13A5.5 5.5 0 0 1 11.3 5.3L12 6l.7-.7A5.5 5.5 0 0 1 20.5 13L12 21.1Z"></path>
					</svg>
				</button>
			</div>
		</article>`;

	stage.querySelector("[data-action='skip']").addEventListener("click", () => runSwipeAction(page, item, "skip"));
	stage.querySelector("[data-action='like']").addEventListener("click", () => runSwipeAction(page, item, "like"));
	stage.querySelector("[data-undo]").addEventListener("click", () => undoLastSwipe(page));
	const card = stage.querySelector(".food-card");
	connectCardGallery(card, itemImages, !isRecipe);
	card.querySelectorAll("[data-photo-fallback]").forEach(connectImageFallback);
	let pointerStart = null;
	let suppressClick = false;
	card.addEventListener("pointerdown", (event) => {
		if (swipeLocks[page] || event.target.closest("button")) return;
		if (itemImages.length > 1 && event.target.closest(".food-photo")) return;
		pointerStart = { x: event.clientX, y: event.clientY };
	});
	card.addEventListener("pointerup", (event) => {
		if (!pointerStart) return;
		const horizontalDistance = event.clientX - pointerStart.x;
		const verticalDistance = event.clientY - pointerStart.y;
		pointerStart = null;
		if (Math.abs(horizontalDistance) < 85 || Math.abs(verticalDistance) > 75 || swipeLocks[page]) return;
		event.preventDefault();
		suppressClick = true;
		if (horizontalDistance < 0) {
			runSwipeAction(page, item, "skip");
		} else {
			runSwipeAction(page, item, "like");
		}
	});
	card.addEventListener("click", (event) => {
		if (suppressClick) {
			suppressClick = false;
			return;
		}
		if (swipeLocks[page]) return;
		if (!event.target.closest("button")) {
				openDetails(page === "home" ? "recipe" : "restaurant", item, card);
		}
	});
	card.addEventListener("keydown", (event) => {
		if (event.target === card && (event.key === "Enter" || event.key === " ")) {
			event.preventDefault();
			openDetails(page === "home" ? "recipe" : "restaurant", item, card);
		}
	});
	preloadUpcomingImages(page);
}

function getSavedCollection(type) {
	return type === "recipe" ? "recipes" : "restaurants";
}

function isItemSaved(type, item) {
	const collection = getSavedCollection(type);
	return savedItems[collection].some((savedItem) => {
		const savedId = typeof savedItem === "object" ? savedItem.id : savedItem;
		return String(savedId) === String(item.id);
	});
}

function toggleSavedItem(type, item) {
	const collection = getSavedCollection(type);
	const alreadySaved = isItemSaved(type, item);

	if (alreadySaved) {
		savedItems[collection] = savedItems[collection].filter((savedItem) => {
			const savedId = typeof savedItem === "object" ? savedItem.id : savedItem;
			return String(savedId) !== String(item.id);
		});
	} else {
		savedItems[collection].push(type === "recipe" ? { ...item } : completeSavedRestaurant(item));
	}

	saveItems();
	renderSavedItems();
	return !alreadySaved;
}

function openDetails(type, item, trigger) {
	closeGuestGallery();
	lastDetailTrigger = trigger;
	activeDetail = { type, id: item.id };
	const isRecipe = type === "recipe";
	const category = `<span class="category-tag">${item.category}</span>`;
	const images = getItemImages(item, type);
	const imageMarkup = galleryMarkup(item, type);

	if (isRecipe) {
		const sourceDetails = item.sourceUrl
			? `<p class="detail-source">Source: <a href="${item.sourceUrl}" target="_blank" rel="noopener noreferrer">${item.sourceName || "Original recipe website"}</a></p><a class="detail-link-button" href="${item.sourceUrl}" target="_blank" rel="noopener noreferrer">View Original Recipe</a>`
			: `<p class="detail-source">Source not provided.</p><button class="detail-link-button" type="button" disabled>View Original Recipe</button>`;
		const ingredientList = item.ingredients.map((ingredient, index) => {
			const name = typeof ingredient === "object" ? ingredient.name : ingredient;
			const measurement = typeof ingredient === "object" ? ingredient.measurement : item.measurements?.[index];
			return `<li>${measurement ? `${measurement} ` : ""}${name}</li>`;
		}).join("");
		const instructions = Array.isArray(item.instructions) ? item.instructions : [];
		detailContent.innerHTML = `
			<div class="detail-layout">
				${imageMarkup}
				<div class="detail-body">
					<p class="eyebrow">COOK AT HOME</p>
					<div class="detail-heading-row"><h2 id="detail-title">${item.name}</h2>${category}</div>
					${item.description ? `<p class="detail-description">${item.description}</p>` : ""}
					${item.cookTime ? `<p class="detail-fact"><strong>Cooking time</strong><span>${item.cookTime}</span></p>` : ""}
					<div class="detail-columns">
						<section><h3>Ingredients</h3><ul>${ingredientList}</ul></section>
						${instructions.length ? `<section><h3>Directions</h3><ol>${instructions.map((instruction) => `<li>${instruction}</li>`).join("")}</ol></section>` : ""}
					</div>
					<div class="detail-source-row">${sourceDetails}</div>
					<button class="detail-save-button" type="button" data-detail-save>${isItemSaved(type, item) ? "♥ Saved" : "♡ Save recipe"}</button>
				</div>
			</div>`;
	} else {
		const searchName = encodeURIComponent(`${item.name} ${item.city}`);
		const menuUrl = item.menuUrl || `https://www.google.com/search?q=${searchName}+menu`;
		const websiteUrl = item.websiteUrl || `https://www.google.com/search?q=${searchName}+official+website`;
		const yelpUrl = item.yelpUrl || `https://www.yelp.com/search?find_desc=${encodeURIComponent(item.name)}&find_loc=${encodeURIComponent(item.city)}`;
		const mapsQuery = encodeURIComponent(item.address ? `${item.name}, ${item.address}` : `${item.name}, ${item.city}`);
		const mapsUrl = item.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
		const popularDishes = item.popularDishes.filter((dish) => dish.trim().toLowerCase() !== "popular dishes");
		detailContent.innerHTML = `
			<div class="detail-layout restaurant-detail-layout">
				${imageMarkup}
				<div class="detail-body">
					<p class="eyebrow">EAT OUT · ${item.city}</p>
					<div class="detail-heading-row"><h2 id="detail-title">${item.name}</h2>${category}</div>
					<p class="detail-description">${item.description}</p>
					<dl class="restaurant-facts">
						<div><dt>Cuisine</dt><dd>${item.cuisine}</dd></div>
						<div><dt>Price</dt><dd>${item.price}</dd></div>
						<div><dt>Neighborhood</dt><dd>${item.neighborhood}</dd></div>
						<div><dt>Address</dt><dd>${item.address || "Address not provided yet"}</dd></div>
					</dl>
					${popularDishes.length ? `<section class="popular-dishes"><h3>Popular dishes</h3><ul>${popularDishes.map((dish) => `<li>${dish}</li>`).join("")}</ul></section>` : ""}
					${customerPhotosMarkup(item, yelpUrl, mapsUrl)}
					<div class="detail-actions">
						<button class="detail-save-button" type="button" data-detail-save>${isItemSaved(type, item) ? "♥ Saved" : "♡ Save place"}</button>
						<button class="detail-link-button" type="button" data-share-restaurant>Share</button>
						<a class="detail-link-button" href="${menuUrl}" target="_blank" rel="noopener noreferrer">View Menu</a>
						<a class="detail-link-button" href="${websiteUrl}" target="_blank" rel="noopener noreferrer">Visit Website</a>
						<a class="detail-link-button" href="${mapsUrl}" target="_blank" rel="noopener noreferrer">Google Maps</a>
						<a class="detail-link-button" href="${yelpUrl}" target="_blank" rel="noopener noreferrer">Yelp</a>
					</div>
				</div>
			</div>`;
	}

	connectGallery(detailContent.querySelector("[data-gallery]"), images, type);
	detailContent.querySelectorAll(".customer-photo img").forEach((photo) => {
		photo.addEventListener("error", () => photo.closest(".customer-photo").remove(), { once: true });
	});
	detailContent.querySelectorAll("[data-guest-index]").forEach((tile) => {
		tile.addEventListener("click", () => openGuestGallery(item, Number(tile.dataset.guestIndex)));
	});
	detailContent.querySelector("[data-guest-open]")?.addEventListener("click", () => openGuestGallery(item));
	detailContent.querySelector("[data-detail-save]").addEventListener("click", () => {
		const nowSaved = toggleSavedItem(type, item);
		detailContent.querySelector("[data-detail-save]").textContent = type === "recipe"
			? (nowSaved ? "♥ Saved" : "♡ Save recipe")
			: (nowSaved ? "♥ Saved" : "♡ Save place");
	});
	detailContent.querySelector("[data-share-restaurant]")?.addEventListener("click", (event) => shareRestaurant(item, event.currentTarget));
	detailDialog.showModal();
	detailClose.focus({ preventScroll: true });
	persistUIState();
}

function closeDetails() {
	if (detailDialog.open) {
		detailDialog.close();
		activeDetail = null;
		persistUIState();
		lastDetailTrigger?.focus();
	}
}

function renderSavedGroup(containerId, countId, collection, allItems) {
	const container = document.querySelector(`#${containerId}`);
	const saved = savedItems[collection]
		.map((savedItem) => {
			if (collection === "recipes" && typeof savedItem === "object") return savedItem;
			if (collection === "restaurants") return completeSavedRestaurant(savedItem);
			const savedId = typeof savedItem === "object" ? savedItem.id : savedItem;
			return allItems.find((item) => String(item.id) === String(savedId));
		})
		.filter(Boolean);

	document.querySelector(`#${countId}`).textContent = saved.length;

	if (saved.length === 0) {
		container.innerHTML = `<p class="saved-empty">Nothing saved here yet. Keep swiping to find a favorite.</p>`;
		return;
	}

	container.innerHTML = saved.map((item) => {
		const extra = collection === "recipes" ? item.cookTime : item.cuisine;
		const extraLabel = collection === "recipes" ? "Ready in" : "Cuisine";
		const photo = imageOrPlaceholder(item, collection === "recipes" ? "recipe" : "restaurant", "saved-card-image");

		return `
			<article class="saved-card" tabindex="0" aria-label="Open details for ${item.name}" aria-haspopup="dialog">
				${photo}
				<div class="saved-card-body">
					<span class="category-tag">${item.category}</span>
					<h4>${item.name}</h4>
					<p>${extraLabel} · ${extra}</p>
					<button class="remove-saved" type="button" data-remove="${item.id}" data-collection="${collection}">Remove</button>
				</div>
			</article>`;
	}).join("");
	container.querySelectorAll("[data-photo-fallback]").forEach(connectImageFallback);

	container.querySelectorAll("[data-remove]").forEach((button) => {
		button.addEventListener("click", () => {
			const { remove, collection: itemCollection } = button.dataset;
			savedItems[itemCollection] = savedItems[itemCollection].filter((savedItem) => {
				const savedId = typeof savedItem === "object" ? savedItem.id : savedItem;
				return String(savedId) !== remove;
			});
			saveItems();
			renderSavedItems();
		});
	});

	container.querySelectorAll(".saved-card").forEach((card) => {
		const item = saved.find((savedItem) => String(savedItem.id) === card.querySelector("[data-remove]").dataset.remove);
		const type = collection === "recipes" ? "recipe" : "restaurant";
		card.addEventListener("click", (event) => {
			if (!event.target.closest("button")) openDetails(type, item, card);
		});
		card.addEventListener("keydown", (event) => {
			if (event.target === card && (event.key === "Enter" || event.key === " ")) {
				event.preventDefault();
				openDetails(type, item, card);
			}
		});
	});
}

function renderSavedItems() {
	renderSavedGroup("saved-recipes", "saved-recipes-count", "recipes", recipes);
	renderSavedGroup("saved-places", "saved-places-count", "restaurants", getAllRestaurants());
	updateSavedCount();
	if (savedView === "map" && !document.querySelector("#saved-map-view").hidden && pages.saved && !pages.saved.hidden) renderSavedRestaurantMap();
}

let savedRestaurantMap = null;
let savedRestaurantMarkers = new Map();
let savedUserMarker = null;
let savedUserCoordinates = null;
let selectedSavedMapRestaurantId = null;

function escapeHTML(value) {
	return String(value ?? "").replace(/[&<>"']/g, (character) => ({
		"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
	}[character]));
}

function getSavedRestaurants() {
	return savedItems.restaurants.map(completeSavedRestaurant);
}

function getSavedMapCityOptions() {
	return [...new Set(getSavedRestaurants().map((restaurant) => restaurant.city).filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

function renderSavedMapCityOptions() {
	const select = document.querySelector("#saved-map-city");
	const cities = getSavedMapCityOptions();
	select.replaceChildren(new Option("All Cities", "__all__"));
	cities.forEach((city) => select.add(new Option(city, city)));
	if (savedMapCity !== "__all__" && cities.includes(savedMapCity)) select.value = savedMapCity;
	else {
		savedMapCity = "__all__";
		select.value = "__all__";
	}
}

function getVisibleSavedMapRestaurants() {
	const restaurants = getSavedRestaurants();
	return savedMapCity === "__all__" ? restaurants : restaurants.filter((restaurant) => restaurant.city === savedMapCity);
}

function distanceInMiles(from, to) {
	const radians = (degrees) => degrees * Math.PI / 180;
	const latDelta = radians(to.latitude - from.latitude);
	const lonDelta = radians(to.longitude - from.longitude);
	const a = Math.sin(latDelta / 2) ** 2
		+ Math.cos(radians(from.latitude)) * Math.cos(radians(to.latitude)) * Math.sin(lonDelta / 2) ** 2;
	return 3958.7613 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function formatDistance(miles) {
	return `${miles.toFixed(miles < 10 ? 2 : 1)} mi`;
}

function directionsUrl(restaurant) {
	const destination = coordinatesAreValid(restaurant.latitude, restaurant.longitude)
		? `${restaurant.latitude},${restaurant.longitude}`
		: `${restaurant.name}, ${restaurant.address || ""}, ${restaurant.city || ""}`;
	const params = new URLSearchParams({ api: "1", destination });
	if (savedUserCoordinates) params.set("origin", `${savedUserCoordinates.latitude},${savedUserCoordinates.longitude}`);
	if (restaurant.placeId) params.set("destination_place_id", restaurant.placeId);
	return `https://www.google.com/maps/dir/?${params.toString()}`;
}

function savedRestaurantPopup(restaurant, rank) {
	const images = getItemImages(restaurant, "restaurant");
	const image = images[0];
	const distance = savedUserCoordinates && coordinatesAreValid(restaurant.latitude, restaurant.longitude)
		? `<p>${formatDistance(distanceInMiles(savedUserCoordinates, restaurant))} from you</p>` : "";
	const photo = image ? `<img src="${escapeHTML(image.url)}" alt="" loading="lazy" data-photo-fallback data-photo-type="restaurant" data-fallback-images="${encodeURIComponent(JSON.stringify(images.map((candidate) => candidate.url)))}">` : "";
	const rating = restaurantRatingMarkup(restaurant);
	return `<div class="saved-map-popup">${photo}<h3>${escapeHTML(restaurant.name)}</h3>${rating ? `<p>${rating}</p>` : ""}<p>${escapeHTML(restaurant.cuisine || "Restaurant")}${restaurant.price ? ` · ${escapeHTML(restaurant.price)}` : ""}</p><p>${escapeHTML(restaurant.address || "Address unavailable")}</p><p>${escapeHTML(restaurant.city || "")}</p>${distance}<div class="saved-map-popup-actions"><button type="button" data-map-view-restaurant="${escapeHTML(restaurant.id)}">View Restaurant</button><a href="${escapeHTML(directionsUrl(restaurant))}" target="_blank" rel="noopener noreferrer">Directions</a><button type="button" data-map-share-restaurant>Share</button></div></div>`;
}

function ensureSavedRestaurantMap() {
	if (savedRestaurantMap || !window.L) return Boolean(savedRestaurantMap);
	savedRestaurantMap = window.L.map("saved-map", { scrollWheelZoom: true, zoomControl: true }).setView([39.5, -98.35], 4);
	const styleUrl = "https://tiles.openfreemap.org/styles/liberty";
	window.L.maplibreGL({
		style: styleUrl,
		attributionControl: {
			customAttribution: '<a href="https://openfreemap.org/">OpenFreeMap</a> · <a href="https://www.openmaptiles.org/">© OpenMapTiles</a> · Data from <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
		},
	}).addTo(savedRestaurantMap);
	const emptyMessage = document.createElement("div");
	emptyMessage.className = "saved-map-empty-overlay";
	emptyMessage.id = "saved-map-empty-overlay";
	emptyMessage.hidden = true;
	document.querySelector("#saved-map").append(emptyMessage);
	return true;
}

function focusSavedRestaurant(restaurant) {
	if (!savedRestaurantMap || !coordinatesAreValid(restaurant.latitude, restaurant.longitude)) return;
	selectedSavedMapRestaurantId = restaurant.id;
	savedRestaurantMap.setView([restaurant.latitude, restaurant.longitude], Math.max(savedRestaurantMap.getZoom(), 14));
	savedRestaurantMarkers.get(String(restaurant.id))?.openPopup();
	document.querySelectorAll(".saved-nearest button").forEach((button) => {
		button.classList.toggle("is-selected", button.dataset.restaurantId === String(restaurant.id));
	});
}

function renderClosestRestaurants(restaurants) {
	const panel = document.querySelector("#saved-nearest");
	const list = document.querySelector("#saved-nearest-list");
	const count = document.querySelector("#saved-nearest-count");
	const layout = document.querySelector(".saved-map-layout");
	const toggle = document.querySelector("#saved-map-closest");
	toggle.disabled = !savedUserCoordinates;
	toggle.setAttribute("aria-pressed", String(closestMode));
	toggle.classList.toggle("is-active", closestMode);
	if (!savedUserCoordinates || !closestMode) {
		panel.hidden = true;
		layout.classList.remove("has-nearest");
		list.replaceChildren();
		return;
	}
	const nearby = restaurants.filter((restaurant) => coordinatesAreValid(restaurant.latitude, restaurant.longitude))
		.map((restaurant) => ({ restaurant, miles: distanceInMiles(savedUserCoordinates, restaurant) }))
		.sort((a, b) => a.miles - b.miles);
	panel.hidden = false;
	layout.classList.add("has-nearest");
	count.textContent = nearby.length ? `${nearby.length} located` : "No located restaurants";
	list.innerHTML = nearby.map(({ restaurant, miles }, index) => `<li><button type="button" data-restaurant-id="${escapeHTML(restaurant.id)}"><span class="saved-nearest-rank">${index + 1}.</span><span class="saved-nearest-name">${escapeHTML(restaurant.name)}</span><span class="saved-nearest-distance">${formatDistance(miles)}</span></button></li>`).join("");
	list.querySelectorAll("[data-restaurant-id]").forEach((button) => {
		button.addEventListener("click", () => {
			const restaurant = nearby.find((entry) => String(entry.restaurant.id) === button.dataset.restaurantId)?.restaurant;
			if (restaurant) focusSavedRestaurant(restaurant);
		});
	});
}

function renderSavedRestaurantMap() {
	if (savedView !== "map") return;
	if (!ensureSavedRestaurantMap()) {
		document.querySelector("#saved-map-status").textContent = "The map library could not load. Your saved restaurant list is still available.";
		return;
	}
	renderSavedMapCityOptions();
	const visibleRestaurants = getVisibleSavedMapRestaurants();
	const orderedRestaurants = closestMode && savedUserCoordinates
		? [...visibleRestaurants].sort((a, b) => {
			const distanceA = coordinatesAreValid(a.latitude, a.longitude) ? distanceInMiles(savedUserCoordinates, a) : Infinity;
			const distanceB = coordinatesAreValid(b.latitude, b.longitude) ? distanceInMiles(savedUserCoordinates, b) : Infinity;
			return distanceA - distanceB;
		})
		: visibleRestaurants;
	savedRestaurantMarkers.forEach((marker) => marker.remove());
	savedRestaurantMarkers.clear();
	const restaurantCoordinates = [];
	orderedRestaurants.forEach((restaurant, index) => {
		if (!coordinatesAreValid(restaurant.latitude, restaurant.longitude)) return;
		const markerIcon = window.L.divIcon({
			className: "saved-map-marker-wrap",
			iconSize: [27, 32],
			iconAnchor: [13, 30],
			popupAnchor: [0, -28],
			html: `<span class="saved-map-marker"><span>${index + 1}</span></span>`,
		});
		const marker = window.L.marker([restaurant.latitude, restaurant.longitude], { icon: markerIcon }).addTo(savedRestaurantMap);
		marker.bindPopup(savedRestaurantPopup(restaurant, index + 1), { maxWidth: 260 });
		marker.on("popupopen", (event) => {
			const popup = event.popup.getElement();
			connectImageFallback(popup?.querySelector("[data-photo-fallback]"));
			popup?.querySelector("[data-map-view-restaurant]")?.addEventListener("click", (clickEvent) => {
				savedRestaurantMap.closePopup();
				openDetails("restaurant", restaurant, clickEvent.currentTarget);
			});
			popup?.querySelector("[data-map-share-restaurant]")?.addEventListener("click", (clickEvent) => shareRestaurant(restaurant, clickEvent.currentTarget));
		});
		savedRestaurantMarkers.set(String(restaurant.id), marker);
		restaurantCoordinates.push([Number(restaurant.latitude), Number(restaurant.longitude)]);
	});
	if (savedUserCoordinates) {
		if (savedUserMarker) savedUserMarker.remove();
		const userIcon = window.L.divIcon({
			className: "saved-map-marker-wrap",
			iconSize: [20, 20],
			iconAnchor: [10, 10],
			html: '<span class="saved-map-marker is-user" aria-label="Your location"></span>',
		});
		savedUserMarker = window.L.marker([savedUserCoordinates.latitude, savedUserCoordinates.longitude], { icon: userIcon, zIndexOffset: 1000 }).addTo(savedRestaurantMap);
		savedUserMarker.bindPopup("You are here");
	}
	const nearbyCoordinates = savedUserCoordinates
		? restaurantCoordinates.filter(([latitude, longitude]) => distanceInMiles(savedUserCoordinates, { latitude, longitude }) <= 25)
		: restaurantCoordinates;
	const viewCoordinates = savedUserCoordinates
		? [...nearbyCoordinates, [savedUserCoordinates.latitude, savedUserCoordinates.longitude]]
		: restaurantCoordinates;
	if (viewCoordinates.length > 1) {
		savedRestaurantMap.fitBounds(window.L.latLngBounds(viewCoordinates), { padding: [40, 40], maxZoom: 14 });
	} else if (savedUserCoordinates) {
		savedRestaurantMap.setView([savedUserCoordinates.latitude, savedUserCoordinates.longitude], 12);
	} else if (restaurantCoordinates.length === 1) {
		savedRestaurantMap.setView(restaurantCoordinates[0], 14);
	} else if (savedMapCity === "Fort Worth, TX") {
		savedRestaurantMap.setView([32.7555, -97.3308], 11);
	} else if (savedMapCity === "__all__") {
		savedRestaurantMap.setView([39.5, -98.35], 4);
	}
	const emptyMessage = document.querySelector("#saved-map-empty-overlay");
	if (emptyMessage) {
		if (visibleRestaurants.length === 0) {
			emptyMessage.textContent = "Save a restaurant to see it on your map.";
			emptyMessage.hidden = false;
		} else if (restaurantCoordinates.length === 0) {
			emptyMessage.textContent = "No saved restaurant has a confirmed map location yet. They remain in List.";
			emptyMessage.hidden = false;
		} else {
			emptyMessage.hidden = true;
		}
	}
	window.requestAnimationFrame(() => savedRestaurantMap.invalidateSize());
	renderClosestRestaurants(visibleRestaurants);
}

function showSavedRestaurantMap() {
	savedView = "map";
	document.querySelector("#saved-groups").classList.add("is-map-active");
	document.querySelector("#saved-list-button").classList.remove("is-active");
	document.querySelector("#saved-list-button").setAttribute("aria-pressed", "false");
	document.querySelector("#saved-map-button").classList.add("is-active");
	document.querySelector("#saved-map-button").setAttribute("aria-pressed", "true");
	document.querySelector("#saved-list-view").hidden = true;
	document.querySelector("#saved-map-view").hidden = false;
	document.querySelector("#saved-map-status").textContent = locationModeWasEnabled
		? "Map © OpenFreeMap · OpenMapTiles · OpenStreetMap · Tap Use My Location to resume distances."
		: "Map © OpenFreeMap · OpenMapTiles · OpenStreetMap · Restaurant locations are stored with the Saved data.";
	persistUIState();
	if (pages.saved.hidden) return;
	renderSavedRestaurantMap();
	if (window.innerWidth <= 390) {
		window.requestAnimationFrame(() => document.querySelector("#saved-map").scrollIntoView({ block: "center", behavior: "smooth" }));
	}
}

function showSavedRestaurantList() {
	savedView = "list";
	document.querySelector("#saved-groups").classList.remove("is-map-active");
	document.querySelector("#saved-list-button").classList.add("is-active");
	document.querySelector("#saved-list-button").setAttribute("aria-pressed", "true");
	document.querySelector("#saved-map-button").classList.remove("is-active");
	document.querySelector("#saved-map-button").setAttribute("aria-pressed", "false");
	document.querySelector("#saved-list-view").hidden = false;
	document.querySelector("#saved-map-view").hidden = true;
	if (savedRestaurantMap) window.setTimeout(() => savedRestaurantMap.invalidateSize(), 0);
	persistUIState();
}

function requestSavedMapLocation() {
	const status = document.querySelector("#saved-map-status");
	if (!navigator.geolocation) {
		status.textContent = "Location access is needed to show nearby restaurants.";
		closestMode = false;
		persistUIState();
		renderClosestRestaurants(getVisibleSavedMapRestaurants());
		return;
	}
	status.textContent = "Requesting your location…";
	navigator.geolocation.getCurrentPosition((position) => {
		savedUserCoordinates = { latitude: position.coords.latitude, longitude: position.coords.longitude };
		locationModeWasEnabled = true;
		status.textContent = "Your location is shown. Distances are straight-line estimates.";
		persistUIState();
		renderSavedRestaurantMap();
	}, (error) => {
		locationModeWasEnabled = false;
		savedUserCoordinates = null;
		closestMode = false;
		savedUserMarker?.remove();
		savedUserMarker = null;
		persistUIState();
		status.textContent = error.code === error.PERMISSION_DENIED
			? "Location access is needed to show nearby restaurants. Saved restaurants are still shown."
			: "Could not get your location. Saved restaurants are still shown.";
		renderSavedRestaurantMap();
	}, { enableHighAccuracy: false, timeout: 12000, maximumAge: 60000 });
}

function getAllRestaurants() {
	return restaurants;
}

function updateSavedCount() {
	const count = savedItems.recipes.length + savedItems.restaurants.length;
	document.querySelector("#saved-count").textContent = count;
}

function showPage(pageName) {
	currentPage = pageName;
	tabs.forEach((tab) => {
		const isActive = tab.dataset.page === pageName;
		tab.classList.toggle("is-active", isActive);
		tab.setAttribute("aria-selected", isActive);
		tab.tabIndex = isActive ? 0 : -1;
	});

	Object.entries(pages).forEach(([name, page]) => {
		page.hidden = name !== pageName;
		page.classList.toggle("is-active", name === pageName);
	});

	if (pageName === "saved") {
		renderSavedItems();
		if (savedView === "map") void showSavedRestaurantMap();
		else showSavedRestaurantList();
	}
	persistUIState();
}

tabs.forEach((tab) => {
	tab.addEventListener("click", () => showPage(tab.dataset.page));
});

document.querySelector("#saved-map-closest").addEventListener("click", () => {
	if (!savedUserCoordinates) return;
	closestMode = !closestMode;
	persistUIState();
	renderSavedRestaurantMap();
});

document.querySelector("#saved-list-button").addEventListener("click", showSavedRestaurantList);
document.querySelector("#saved-map-button").addEventListener("click", () => { void showSavedRestaurantMap(); });
document.querySelector("#saved-map-city").addEventListener("change", (event) => {
	savedMapCity = event.target.value;
	persistUIState();
	renderSavedRestaurantMap();
});
document.querySelector("#saved-map-location").addEventListener("click", requestSavedMapLocation);

filters.home.addEventListener("change", () => {
	positions.home = 0;
	undoHistory.home = null;
	renderCard("home");
	persistUIState();
});

filters.out.addEventListener("change", () => {
	positions.out = 0;
	undoHistory.out = null;
	renderCard("out");
	persistUIState();
});

citySelect.addEventListener("change", () => {
	selectedCity = citySelect.value;
	positions.out = 0;
	undoHistory.out = null;
	renderCard("out");
	persistUIState();
});

detailClose.addEventListener("click", closeDetails);
detailDialog.addEventListener("close", () => {
	activeDetail = null;
	persistUIState();
	lastDetailTrigger?.focus({ preventScroll: true });
});
detailDialog.addEventListener("cancel", (event) => {
	const gallery = detailDialog.querySelector(".guest-gallery");
	if (!gallery) return;
	event.preventDefault();
	const viewer = gallery.querySelector(".guest-viewer");
	if (viewer.hidden) {
		closeGuestGallery();
	} else {
		viewer.querySelector(".guest-viewer-back").click();
	}
});
detailDialog.addEventListener("click", (event) => {
	if (event.target === detailDialog) closeDetails();
});

function restoreDetailIfRequested() {
	if (!restoredUIState.detailOpen) return;
	const type = restoredUIState.detailType;
	const collection = type === "recipe" ? recipes : type === "restaurant" ? restaurants : [];
	const item = collection.find((candidate) => itemIdMatches(candidate, restoredUIState.detailId));
	if (!item) return;
	let trigger = null;
	if (currentPage === "saved") {
		trigger = [...document.querySelectorAll("#saved-recipes .saved-card, #saved-places .saved-card")]
			.find((card) => itemIdMatches({ id: card.querySelector("[data-remove]")?.dataset.remove }, item.id)) || null;
	}
	if (!trigger && type === "recipe") {
		trigger = cardStages.home.querySelector(".food-card");
	} else if (!trigger) {
		trigger = cardStages.out.querySelector(".food-card");
	}
	if (!trigger) {
		const container = type === "recipe" ? "#saved-recipes" : "#saved-places";
		trigger = [...document.querySelectorAll(`${container} .saved-card`)].find((card) => card.getAttribute("aria-label") === `Open details for ${item.name}`) || null;
	}
	openDetails(type, item, trigger);
}

restorePosition("home", restoredUIState.homeId, positions.home);
restorePosition("out", restoredUIState.outId, positions.out);
if (!undoIsAvailable("home")) undoHistory.home = null;
if (!undoIsAvailable("out")) undoHistory.out = null;
renderCityOptions();
showPage(currentPage);
renderCard("home");
renderCard("out");
renderSavedItems();
restoreDetailIfRequested();
persistUIState();
document.body.classList.remove("app-initializing");