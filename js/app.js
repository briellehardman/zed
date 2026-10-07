const STORAGE_KEY = "swipe-and-bite.saved";

const recipes = [
	{
		id: "lemon-ricotta-pancakes",
		name: "Lemon ricotta pancakes",
		category: "Breakfast",
		description: "Fluffy, bright, and best with a little maple syrup.",
		time: "20 min",
		image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=1000&q=85",
	},
	{
		id: "avocado-toast",
		name: "Avocado toast",
		category: "Breakfast",
		description: "Crispy sourdough, creamy avocado, chili, and lemon.",
		time: "10 min",
		image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1000&q=85",
	},
	{
		id: "green-goddess-bowl",
		name: "Green goddess bowl",
		category: "Lunch",
		description: "Crunchy greens, grains, and a punchy herby dressing.",
		time: "25 min",
		image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=85",
	},
	{
		id: "tomato-pasta",
		name: "Weeknight tomato pasta",
		category: "Dinner",
		description: "A cozy bowl of pasta with garlicky tomato sauce.",
		time: "30 min",
		image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1000&q=85",
	},
	{
		id: "crispy-fish-tacos",
		name: "Crispy fish tacos",
		category: "Dinner",
		description: "Golden fish, crunchy cabbage, and a squeeze of lime.",
		time: "35 min",
		image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=1000&q=85",
	},
	{
		id: "peach-yogurt-parfait",
		name: "Peach yogurt parfait",
		category: "Snacks",
		description: "Sweet peaches layered with yogurt and toasted oats.",
		time: "8 min",
		image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1000&q=85",
	},
];

const restaurants = [
	{
		id: "sunny-side-cafe",
		name: "Sunny Side Cafe",
		category: "Breakfast",
		cuisine: "Cafe · Brunch",
		distance: "0.8 mi away",
		image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=85",
	},
	{
		id: "little-olive",
		name: "Little Olive",
		category: "Lunch",
		cuisine: "Mediterranean",
		distance: "1.2 mi away",
		image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1000&q=85",
	},
	{
		id: "noodle-house",
		name: "Noodle House",
		category: "Dinner",
		cuisine: "Japanese · Ramen",
		distance: "1.6 mi away",
		image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1000&q=85",
	},
	{
		id: "casa-verde",
		name: "Casa Verde",
		category: "Dinner",
		cuisine: "Mexican",
		distance: "2.1 mi away",
		image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=85",
	},
	{
		id: "sugar-and-sage",
		name: "Sugar & Sage",
		category: "Sweet Treat",
		cuisine: "Bakery · Desserts",
		distance: "0.5 mi away",
		image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=1000&q=85",
	},
	{
		id: "bluebird-bakery",
		name: "Bluebird Bakery",
		category: "Sweet Treat",
		cuisine: "Coffee · Patisserie",
		distance: "1.0 mi away",
		image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=85",
	},
];

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

const positions = { home: 0, out: 0 };
let savedItems = loadSavedItems();

function loadSavedItems() {
	try {
		const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
		return {
			recipes: Array.isArray(saved.recipes) ? saved.recipes : [],
			restaurants: Array.isArray(saved.restaurants) ? saved.restaurants : [],
		};
	} catch {
		return { recipes: [], restaurants: [] };
	}
}

function saveItems() {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(savedItems));
}

function getVisibleItems(page) {
	const allItems = page === "home" ? recipes : restaurants;
	const selectedCategory = filters[page].value;

	if (selectedCategory === "All") {
		return allItems;
	}

	return allItems.filter((item) => item.category === selectedCategory);
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
	const detail = isRecipe ? item.time : item.cuisine;
	const detailLabel = isRecipe ? "Ready in" : item.distance;
	const description = isRecipe ? `<p>${item.description}</p>` : "";

	stage.innerHTML = `
		<article class="food-card">
			<div class="food-photo">
				<img src="${item.image}" alt="${item.name}" loading="eager">
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
		const extra = collection === "recipes" ? item.time : item.cuisine;
		const extraLabel = collection === "recipes" ? "Ready in" : item.distance;

		return `
			<article class="saved-card">
				<img src="${item.image}" alt="${item.name}" loading="lazy">
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
			savedItems[itemCollection] = savedItems[itemCollection].filter((id) => id !== remove);
			saveItems();
			renderSavedItems();
		});
	});
}

function renderSavedItems() {
	renderSavedGroup("saved-recipes", "saved-recipes-count", "recipes", recipes);
	renderSavedGroup("saved-places", "saved-places-count", "restaurants", restaurants);
	updateSavedCount();
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

renderCard("home");
renderCard("out");
renderSavedItems();