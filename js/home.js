document.addEventListener("DOMContentLoaded", () => {

  // User welcome title
  const user = JSON.parse(localStorage.getItem("user"));
  const welcomeTitle = document.getElementById("welcomeTitle");
  if (user && welcomeTitle) {
    const name = user.username || user.email.split("@")[0];
    welcomeTitle.textContent = `Welcome back, ${name}!`;
  }

  // Tabs and content container
  const tabs = document.querySelectorAll(".tab-btn");
  const tabContent = document.getElementById("tabContent");

  // Tab click event
  tabs.forEach((btn) => {
    btn.addEventListener("click", () => {
      setActiveTab(btn.dataset.tab);
    });
  });

  // Activate tab + render content
  function setActiveTab(tabName) {
    tabs.forEach((t) => t.classList.remove("active-tab"));
    const activeBtn = document.querySelector(`[data-tab="${tabName}"]`);
    if (activeBtn) activeBtn.classList.add("active-tab");
    renderTab(tabName);
  }

  // Render tab based on recipe data
  function renderTab(tab) {
    tabContent.innerHTML = "";

    if (tab === "continue") {
      const list = RECIPES.filter((r) => r.inProgress);
      loadStaticCards(list);
      return;
    }

    if (tab === "recommended") {
      const list = RECIPES.filter((r) => !r.inProgress);
      loadStaticCards(list);
      return;
    }

    if (tab === "feed") {
      FEED_SOURCE = [...RECIPES];
      feedIndex = 0;
      loadFeedBatch();
      return;
    }
  }

  // Render static cards for Continue/Recommended
  function loadStaticCards(list) {
    if (list.length === 0) {
      tabContent.innerHTML = `<p class="text-gray-500">No recipes to show yet.</p>`;
      return;
    }
    tabContent.innerHTML = list.map(cardTemplate).join("");
  }

  // Recipe card template
  function cardTemplate(r) {
    return `
      <article class="card shadow-soft fadeInUp">
        <img src="${r.img}" class="w-full h-40 object-cover" />
        <div class="card-body">
          <h3 class="font-bold text-gray-900">${r.title}</h3>
          <p class="text-sm text-gray-600">${r.author}</p>
          <div class="card-meta mt-2">
            <span><i class="fa-solid fa-star star"></i> ${r.rating}</span>
            <span><i class="fa-solid fa-clock"></i> ${r.time}</span>
          </div>
        </div>
      </article>
    `;
  }

  // Infinite scroll (Feed tab)
  let feedIndex = 0;
  const FEED_BATCH = 12;
  let FEED_SOURCE = [];

  // Load next batch for feed
  function loadFeedBatch() {
    const next = FEED_SOURCE.slice(feedIndex, feedIndex + FEED_BATCH);
    feedIndex += FEED_BATCH;
    next.forEach((r) => {
      tabContent.insertAdjacentHTML("beforeend", cardTemplate(r));
    });
  }

  // Infinite scroll trigger
  window.addEventListener("scroll", () => {
    const nearBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;

    const feedIsActive = document.querySelector('[data-tab="feed"].active-tab');
    if (feedIsActive && nearBottom) loadFeedBatch();
  });

  // Initial default tab
  setActiveTab("continue");
});
