const STORAGE_KEY = "swipe-and-bite.saved";

const recipeImages = [
	"https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1000&q=85",
	"https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=1000&q=85",
	"https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1000&q=85",
	"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=85",
	"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=85",
	"https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1000&q=85",
	"https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1000&q=85",
	"https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1000&q=85",
	"https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=1000&q=85",
	"https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=1000&q=85",
	"https://images.unsplash.com/photo-1551024506-0bccd307d7e8?auto=format&fit=crop&w=1000&q=85",
	"https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1000&q=85",
];

const recipes = [
	{
		id: 1,
		name: "Avocado Egg Toast",
		category: "Breakfast",
		cookTime: "10 minutes",
		description: "Avocado toast topped with a fried egg.",
		images: [recipeImages[0]],
		sourceName: "",
		sourceUrl: "",
		ingredients: ["2 slices bread", "1 avocado", "2 eggs", "Salt", "Pepper", "Red pepper flakes"],
		instructions: ["Toast the bread.", "Mash the avocado with salt and pepper.", "Spread avocado over toast.", "Cook the eggs in a skillet.", "Place one egg on each piece of toast.", "Add red pepper flakes."],
	},
	{
		id: 2,
		name: "Breakfast Tacos",
		category: "Breakfast",
		cookTime: "15 minutes",
		description: "Easy breakfast tacos with eggs, cheese and avocado.",
		images: [recipeImages[1]],
		sourceName: "",
		sourceUrl: "",
		ingredients: ["4 small tortillas", "4 eggs", "1/2 cup shredded cheese", "1 avocado", "Salsa", "Salt and pepper"],
		instructions: ["Scramble the eggs.", "Warm the tortillas.", "Divide eggs between tortillas.", "Add cheese and avocado.", "Top with salsa."],
	},
	{
		id: 3,
		name: "Berry Yogurt Bowl",
		category: "Breakfast",
		cookTime: "5 minutes",
		description: "A quick yogurt bowl with fruit and granola.",
		images: [recipeImages[2]],
		sourceName: "",
		sourceUrl: "",
		ingredients: ["1 cup yogurt", "1/2 cup berries", "1/4 cup granola", "1 tablespoon honey"],
		instructions: ["Add yogurt to a bowl.", "Top with berries.", "Add granola.", "Drizzle with honey."],
	},
	{
		id: 4,
		name: "Chicken Caesar Wrap",
		category: "Lunch",
		cookTime: "15 minutes",
		description: "Chicken, lettuce and Caesar dressing wrapped in a tortilla.",
		images: [recipeImages[3]],
		sourceName: "",
		sourceUrl: "",
		ingredients: ["1 large tortilla", "1 cup cooked chicken", "1 cup romaine lettuce", "2 tablespoons Caesar dressing", "Parmesan cheese"],
		instructions: ["Chop the chicken and lettuce.", "Mix with Caesar dressing.", "Place mixture on tortilla.", "Add Parmesan.", "Roll tightly and slice."],
	},
	{
		id: 5,
		name: "Chicken Avocado Bowl",
		category: "Lunch",
		cookTime: "20 minutes",
		description: "A simple chicken bowl with avocado and vegetables.",
		images: [recipeImages[4]],
		sourceName: "",
		sourceUrl: "",
		ingredients: ["1 chicken breast", "1 avocado", "1 cup lettuce", "1/2 cup tomatoes", "1/2 cup corn", "Lime", "Salt and pepper"],
		instructions: ["Season and cook the chicken.", "Slice the chicken.", "Add lettuce to a bowl.", "Add tomatoes, corn and avocado.", "Top with chicken.", "Squeeze lime over the bowl."],
	},
	{
		id: 6,
		name: "Turkey Pesto Sandwich",
		category: "Lunch",
		cookTime: "10 minutes",
		description: "Turkey sandwich with pesto, tomato and greens.",
		images: [recipeImages[5]],
		sourceName: "",
		sourceUrl: "",
		ingredients: ["2 slices bread", "4 slices turkey", "1 tablespoon pesto", "Tomato slices", "Arugula"],
		instructions: ["Spread pesto on the bread.", "Add turkey.", "Add tomato and arugula.", "Close sandwich.", "Toast if desired."],
	},
	{
		id: 7,
		name: "Honey Garlic Chicken",
		category: "Dinner",
		cookTime: "30 minutes",
		description: "Chicken cooked in a sweet garlic sauce.",
		images: [recipeImages[6]],
		sourceName: "",
		sourceUrl: "",
		ingredients: ["2 chicken breasts", "2 tablespoons honey", "2 tablespoons soy sauce", "2 cloves garlic", "1 tablespoon olive oil"],
		instructions: ["Cut chicken into pieces.", "Heat olive oil in a skillet.", "Cook chicken until browned.", "Mix honey, soy sauce and garlic.", "Pour sauce over chicken.", "Cook until the sauce thickens."],
	},
	{
		id: 8,
		name: "Steak and Roasted Potatoes",
		category: "Dinner",
		cookTime: "35 minutes",
		description: "Simple steak served with crispy roasted potatoes.",
		images: [recipeImages[7]],
		sourceName: "",
		sourceUrl: "",
		ingredients: ["1 steak", "2 potatoes", "Olive oil", "Garlic powder", "Salt", "Pepper"],
		instructions: ["Preheat oven to 425°F.", "Cut potatoes into pieces.", "Toss potatoes with oil and seasoning.", "Roast for about 25 minutes.", "Season steak.", "Cook steak in a skillet to your preferred doneness.", "Serve together."],
	},
	{
		id: 9,
		name: "Chicken Fajitas",
		category: "Dinner",
		cookTime: "25 minutes",
		description: "Chicken with peppers and onions served in tortillas.",
		images: [recipeImages[8]],
		sourceName: "",
		sourceUrl: "",
		ingredients: ["2 chicken breasts", "1 bell pepper", "1 onion", "Fajita seasoning", "4 tortillas", "1 tablespoon olive oil"],
		instructions: ["Slice chicken, pepper and onion.", "Heat oil in a skillet.", "Cook chicken.", "Add peppers and onions.", "Add fajita seasoning.", "Serve in warm tortillas."],
	},
	{
		id: 10,
		name: "Apple Peanut Butter Bites",
		category: "Snack",
		cookTime: "5 minutes",
		description: "Apple slices topped with peanut butter and granola.",
		images: [recipeImages[9]],
		sourceName: "",
		sourceUrl: "",
		ingredients: ["1 apple", "2 tablespoons peanut butter", "2 tablespoons granola"],
		instructions: ["Slice the apple.", "Spread peanut butter over each slice.", "Sprinkle granola on top."],
	},
	{
		id: 11,
		name: "Loaded Nachos",
		category: "Snack",
		cookTime: "15 minutes",
		description: "Quick nachos topped with cheese, beans, salsa and avocado.",
		images: [recipeImages[1]],
		sourceName: "",
		sourceUrl: "",
		ingredients: ["Tortilla chips", "1 cup shredded cheese", "1/2 cup black beans", "Salsa", "1 avocado"],
		instructions: ["Place chips on a baking sheet.", "Add cheese and beans.", "Bake at 400°F until cheese melts.", "Top with salsa and avocado."],
	},
	{
		id: 12,
		name: "Chocolate Banana Bites",
		category: "Snack",
		cookTime: "10 minutes",
		description: "Banana slices dipped in chocolate.",
		images: [recipeImages[11]],
		sourceName: "",
		sourceUrl: "",
		ingredients: ["2 bananas", "1/2 cup chocolate chips"],
		instructions: ["Slice bananas.", "Melt chocolate.", "Dip banana pieces into chocolate.", "Place on parchment paper.", "Chill until chocolate hardens."],
	},
];

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
		description: "A classic Fort Worth diner known for pancakes, breakfast plates and late-night breakfast.",
		images: [],
		googlePlaces: { placeId: "", photoUrls: [], photoResources: [] },
		popularDishes: ["Pancakes", "Breakfast Plates", "French Toast"],
		websiteUrl: "",
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
		description: "A colorful breakfast and brunch restaurant with pancakes, breakfast hashes, benedicts and other creative breakfast dishes.",
		images: [],
		googlePlaces: { placeId: "", photoUrls: [], photoResources: [] },
		popularDishes: ["Pancakes", "Breakfast Hash", "Eggs Benedict"],
		websiteUrl: "",
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
		description: "A casual neighborhood cafe serving breakfast plates, pancakes, waffles, burgers and comfort food.",
		images: [],
		googlePlaces: { placeId: "", photoUrls: [], photoResources: [] },
		popularDishes: ["Pancakes", "Waffles", "Breakfast Plates"],
		websiteUrl: "",
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
		description: "An all-day cafe by the Trinity Trails with breakfast, salads, sandwiches, burgers and entrees.",
		images: [],
		googlePlaces: { placeId: "", photoUrls: [], photoResources: [] },
		popularDishes: ["Burgers", "Salads", "Brunch"],
		websiteUrl: "",
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
		description: "A downtown breakfast restaurant serving pancakes, omelets, benedicts, French toast and lunch dishes.",
		images: [],
		googlePlaces: { placeId: "", photoUrls: [], photoResources: [] },
		popularDishes: ["French Toast", "Pancakes", "Omelets"],
		websiteUrl: "",
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
		description: "Texas barbecue with Tex-Mex influences, smoked meats, tacos and barbecue plates.",
		images: [],
		googlePlaces: { placeId: "", photoUrls: [], photoResources: [] },
		popularDishes: ["Brisket", "Barbecue Tacos", "Smoked Meats"],
		websiteUrl: "",
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
		description: "A Fort Worth vegan diner serving plant-based comfort food for breakfast, lunch and dinner.",
		images: [],
		googlePlaces: { placeId: "", photoUrls: [], photoResources: [] },
		popularDishes: ["Biscuits and Gravy", "Breakfast Burrito", "Vegan Burgers"],
		websiteUrl: "",
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
		description: "A Fort Worth small-batch ice cream shop with rotating flavors and seasonal creations.",
		images: [],
		googlePlaces: { placeId: "", photoUrls: [], photoResources: [] },
		popularDishes: ["Small-Batch Ice Cream", "Seasonal Flavors", "Ice Cream Cones"],
		websiteUrl: "",
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
		description: "A longtime Fort Worth bakery known for cakes, pastries and its famous Black Forest cake.",
		images: [],
		googlePlaces: { placeId: "", photoUrls: [], photoResources: [] },
		popularDishes: ["Black Forest Cake", "Pastries", "Éclairs"],
		websiteUrl: "",
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
		description: "An Italian gelato shop known for flower-shaped gelato cones, crepes and other desserts.",
		images: [],
		googlePlaces: { placeId: "", photoUrls: [], photoResources: [] },
		popularDishes: ["Gelato", "Rose-Shaped Cone", "Crepes"],
		websiteUrl: "",
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
		address: "",
		description: "A casual Italian restaurant from chef Tim Love serving pizza, pasta and Italian-inspired dishes.",
		images: [],
		googlePlaces: { placeId: "", photoUrls: [], photoResources: [] },
		popularDishes: ["Pizza", "Pasta", "Italian Small Plates"],
		websiteUrl: "",
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
		address: "",
		description: "An upscale restaurant focused on the food and traditions of northern Mexico.",
		images: [],
		googlePlaces: { placeId: "", photoUrls: [], photoResources: [] },
		popularDishes: ["Barbacoa Tacos", "Cabrito", "Tamal de Cerdo"],
		websiteUrl: "",
		menuUrl: "",
		yelpUrl: "",
	},
];

const availableCities = [...new Set(restaurants.map((restaurant) => restaurant.city))];
let selectedCity = availableCities[0];

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
const positions = { home: 0, out: 0 };
let savedItems = loadSavedItems();
let lastDetailTrigger = null;

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
		const recipeIds = new Set(recipes.map((recipe) => recipe.id));
		const restaurantIds = new Set(restaurants.map((restaurant) => restaurant.id));
		return {
			recipes: Array.isArray(saved.recipes) ? saved.recipes.filter((id) => recipeIds.has(id)) : [],
			restaurants: Array.isArray(saved.restaurants) ? saved.restaurants.filter((id) => restaurantIds.has(id)) : [],
		};
	} catch {
		return { recipes: [], restaurants: [] };
	}
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

function getItemImages(item, type) {
	const recipeOrCuratedImages = Array.isArray(item.images) ? item.images : [];
	const normalizeImages = (images) => images
		.map((image) => typeof image === "string" ? { url: image, attribution: "" } : image)
		.filter((image) => typeof image?.url === "string" && image.url.trim());

	if (type === "restaurant") {
		const googlePhotoUrls = item.googlePlaces?.photoUrls || [];
		return normalizeImages([...recipeOrCuratedImages, ...googlePhotoUrls])
			.slice(0, 10);
	}

	return normalizeImages(recipeOrCuratedImages);
}

function applyGooglePlacesDetails(restaurant, placeDetails) {
	if (placeDetails.id) restaurant.googlePlaces.placeId = placeDetails.id;
	if (placeDetails.formattedAddress) restaurant.address = placeDetails.formattedAddress;
	if (placeDetails.websiteUri) restaurant.websiteUrl = placeDetails.websiteUri;
	if (placeDetails.editorialSummary?.text) restaurant.description = placeDetails.editorialSummary.text;
	if (Array.isArray(placeDetails.photos)) {
		restaurant.googlePlaces.photoResources = placeDetails.photos.slice(0, 10).map((photo) => photo.name).filter(Boolean);
		restaurant.googlePlaces.photoUrls = placeDetails.photos
			.map((photo) => ({
				url: photo.photoUri || photo.url,
				attribution: (photo.authorAttributions || []).map((author) => author.displayName).filter(Boolean).join(", "),
			}))
			.filter((photo) => photo.url)
			.slice(0, 10);
	}
}

function imageOrPlaceholder(item, type, className = "") {
	const image = getItemImages(item, type)[0];
	return image
		? `<img class="${className}" src="${image.url}" alt="${item.name}" loading="lazy">`
		: `<div class="photo-placeholder ${className}" aria-label="No photo added for ${item.name}"><span>Photo not provided</span></div>`;
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

	return `<div class="detail-gallery" data-gallery data-gallery-alt="${description}"><div class="gallery-main"><img class="detail-hero-image" src="${images[0].url}" alt="${description} 1 of ${images.length}">${controls}<span class="gallery-credit" aria-live="polite"></span></div>${thumbnails}</div>`;
}

function connectGallery(gallery, images) {
	if (!gallery) return;
	const credit = gallery.querySelector(".gallery-credit");
	if (credit && images[0]?.attribution) credit.textContent = `Photo: ${images[0].attribution}`;
	if (images.length < 2) return;
	let currentIndex = 0;
	let touchStartX = null;

	function showImage(index) {
		currentIndex = (index + images.length) % images.length;
		const image = gallery.querySelector(".detail-hero-image");
		image.src = images[currentIndex].url;
		image.alt = `${gallery.dataset.galleryAlt} ${currentIndex + 1} of ${images.length}`;
		gallery.querySelector(".gallery-credit").textContent = images[currentIndex].attribution
			? `Photo: ${images[currentIndex].attribution}`
			: "";
		gallery.querySelector(".gallery-count").textContent = `${currentIndex + 1} / ${images.length}`;
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
	const detail = isRecipe ? item.cookTime : item.cuisine;
	const detailLabel = isRecipe ? "Ready in" : "Cuisine";
	const description = isRecipe ? `<p>${item.description}</p>` : "";

	stage.innerHTML = `
		<article class="food-card" tabindex="0" aria-label="Open details for ${item.name}" aria-haspopup="dialog">
			<div class="food-photo">
				${imageOrPlaceholder(item, isRecipe ? "recipe" : "restaurant")}
				<span class="photo-label">${isRecipe ? "Made with love" : "Worth the trip"}</span>
			</div>
			<div class="card-content">
				<div class="card-meta">
					<span class="category-tag">${item.category}</span>
					<span>${detailLabel} · ${detail}</span>
				</div>
				<h3>${item.name}</h3>
				${description}
			</div>
			<div class="card-actions" aria-label="Choose what to do with ${item.name}">
				<button class="action-button skip-button" type="button" data-action="skip" aria-label="Skip ${item.name}" title="Skip">
					<svg class="action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
						<path d="m6 6 12 12M18 6 6 18"></path>
					</svg>
				</button>
				<button class="action-button like-button" type="button" data-action="like" aria-label="Save ${item.name}" title="Save">
					<svg class="action-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
						<path d="M12 21.1 3.5 13A5.5 5.5 0 0 1 11.3 5.3L12 6l.7-.7A5.5 5.5 0 0 1 20.5 13L12 21.1Z"></path>
					</svg>
				</button>
			</div>
		</article>`;

	stage.querySelector("[data-action='skip']").addEventListener("click", () => moveToNext(page));
	stage.querySelector("[data-action='like']").addEventListener("click", () => saveCurrentItem(page, item));
	const card = stage.querySelector(".food-card");
	card.addEventListener("click", (event) => {
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
}

function moveToNext(page) {
	positions[page] += 1;
	renderCard(page);
}

function saveCurrentItem(page, item) {
	const collection = page === "home" ? "recipes" : "restaurants";

	if (!savedItems[collection].includes(item.id)) {
		savedItems[collection].push(item.id);
		saveItems();
	}

	updateSavedCount();
	moveToNext(page);
}

function getSavedCollection(type) {
	return type === "recipe" ? "recipes" : "restaurants";
}

function isItemSaved(type, item) {
	return savedItems[getSavedCollection(type)].includes(item.id);
}

function toggleSavedItem(type, item) {
	const collection = getSavedCollection(type);
	const alreadySaved = savedItems[collection].includes(item.id);

	if (alreadySaved) {
		savedItems[collection] = savedItems[collection].filter((id) => id !== item.id);
	} else {
		savedItems[collection].push(item.id);
	}

	saveItems();
	renderSavedItems();
	return !alreadySaved;
}

function openDetails(type, item, trigger) {
	lastDetailTrigger = trigger;
	const isRecipe = type === "recipe";
	const category = `<span class="category-tag">${item.category}</span>`;
	const images = getItemImages(item, type);
	const imageMarkup = galleryMarkup(item, type);

	if (isRecipe) {
		const sourceDetails = item.sourceUrl
			? `<p class="detail-source">Source: <a href="${item.sourceUrl}" target="_blank" rel="noopener noreferrer">${item.sourceName || "Original recipe website"}</a></p><a class="detail-link-button" href="${item.sourceUrl}" target="_blank" rel="noopener noreferrer">View Original Recipe</a>`
			: `<p class="detail-source">Source not provided.</p><button class="detail-link-button" type="button" disabled>View Original Recipe</button>`;
		detailContent.innerHTML = `
			<div class="detail-layout">
				${imageMarkup}
				<div class="detail-body">
					<p class="eyebrow">COOK AT HOME</p>
					<div class="detail-heading-row"><h2 id="detail-title">${item.name}</h2>${category}</div>
					<p class="detail-description">${item.description}</p>
					<p class="detail-fact"><strong>Cooking time</strong><span>${item.cookTime}</span></p>
					<div class="detail-columns">
						<section><h3>Ingredients</h3><ul>${item.ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}</ul></section>
						<section><h3>Directions</h3><ol>${item.instructions.map((instruction) => `<li>${instruction}</li>`).join("")}</ol></section>
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
		const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
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
					<section class="popular-dishes"><h3>Popular dishes</h3><ul>${item.popularDishes.map((dish) => `<li>${dish}</li>`).join("")}</ul></section>
					<div class="detail-actions">
						<button class="detail-save-button" type="button" data-detail-save>${isItemSaved(type, item) ? "♥ Saved" : "♡ Save place"}</button>
						<a class="detail-link-button" href="${menuUrl}" target="_blank" rel="noopener noreferrer">View Menu</a>
						<a class="detail-link-button" href="${websiteUrl}" target="_blank" rel="noopener noreferrer">Visit Website</a>
						<a class="detail-link-button" href="${mapsUrl}" target="_blank" rel="noopener noreferrer">Google Maps</a>
						<a class="detail-link-button" href="${yelpUrl}" target="_blank" rel="noopener noreferrer">Yelp</a>
					</div>
				</div>
			</div>`;
	}

	connectGallery(detailContent.querySelector("[data-gallery]"), images);
	detailContent.querySelector("[data-detail-save]").addEventListener("click", () => {
		const nowSaved = toggleSavedItem(type, item);
		detailContent.querySelector("[data-detail-save]").textContent = type === "recipe"
			? (nowSaved ? "♥ Saved" : "♡ Save recipe")
			: (nowSaved ? "♥ Saved" : "♡ Save place");
	});
	detailDialog.showModal();
	detailClose.focus();
}

function closeDetails() {
	if (detailDialog.open) {
		detailDialog.close();
		lastDetailTrigger?.focus();
	}
}

function renderSavedGroup(containerId, countId, collection, allItems) {
	const container = document.querySelector(`#${containerId}`);
	const saved = savedItems[collection]
		.map((id) => allItems.find((item) => item.id === id))
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

	container.querySelectorAll("[data-remove]").forEach((button) => {
		button.addEventListener("click", () => {
			const { remove, collection: itemCollection } = button.dataset;
			savedItems[itemCollection] = savedItems[itemCollection].filter((id) => String(id) !== remove);
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
}

function getAllRestaurants() {
	return restaurants;
}

function updateSavedCount() {
	const count = savedItems.recipes.length + savedItems.restaurants.length;
	document.querySelector("#saved-count").textContent = count;
}

function showPage(pageName) {
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
	}
}

tabs.forEach((tab) => {
	tab.addEventListener("click", () => showPage(tab.dataset.page));
});

filters.home.addEventListener("change", () => {
	positions.home = 0;
	renderCard("home");
});

filters.out.addEventListener("change", () => {
	positions.out = 0;
	renderCard("out");
});

citySelect.addEventListener("change", () => {
	selectedCity = citySelect.value;
	positions.out = 0;
	renderCard("out");
});

detailClose.addEventListener("click", closeDetails);
detailDialog.addEventListener("close", () => lastDetailTrigger?.focus());
detailDialog.addEventListener("click", (event) => {
	if (event.target === detailDialog) closeDetails();
});

renderCityOptions();
renderCard("home");
renderCard("out");
renderSavedItems();