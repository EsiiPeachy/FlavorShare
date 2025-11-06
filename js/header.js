// header.js
function updateLandingPageUI() {
  console.log("Landing page UI update triggered ✅");

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  console.log("Logged in user from storage:", loggedInUser);

  const signInLink = document.querySelector('nav a[href="sign-in.html"]');
  const uploadBtn = document.getElementById("openModalBtn");

  if (loggedInUser) {
    if (signInLink) {
      signInLink.textContent = "My Profile";
      signInLink.setAttribute("href", "my-profile.html");
      console.log("Updated Sign In → My Profile");
    }

    if (uploadBtn) {
      uploadBtn.setAttribute("href", "upload-recipe.html");
      uploadBtn.removeAttribute("id"); // prevent modal logic
      console.log("Updated Upload button → upload-recipe.html");
    }
  }
}

fetch("header.html")
  .then((res) => res.text())
  .then((data) => {
    const headerEl = document.getElementById("header");
    if (headerEl) {
      headerEl.innerHTML = data;

      // 🧩 Fix: ensure User Pill is present even if stripped by fetch overwrite
      const userPillContainer = headerEl.querySelector(".relative.group");
      if (userPillContainer && userPillContainer.innerHTML.trim() === "") {
        userPillContainer.innerHTML = `
        <div class="group relative inline-block">
          <button
            class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFEFE8] border border-[#E4572E]/40 hover:bg-[#FFDCD0] transition-all duration-200 shadow-sm"
            style="width:auto !important; white-space:nowrap;">
            <svg xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4 text-[#E4572E]" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M5.121 17.804A8 8 0 1118.879 17.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span id="userName" class="text-sm font-medium text-gray-700">Juan</span>
            <svg xmlns="http://www.w3.org/2000/svg"
              class="w-3.5 h-3.5 text-gray-500" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- Dropdown (hidden by default, visible on hover) -->
          <div
            class="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:visible group-hover:opacity-100 transition duration-200 ease-in-out z-50">
            <a href="my-profile.html" class="block px-4 py-2 hover:bg-gray-100">Profile</a>
            <a href="#" id="logoutBtn" class="block px-4 py-2 hover:bg-gray-100">Log Out</a>
          </div>
        </div>
      `;
        console.log("✅ Reinserted user pill HTML after fetch overwrite");
      }

      // 🔐 Check login state from localStorage
      const user = localStorage.getItem("user"); // e.g. set in sign-in-up.js
      const profileLink = document.getElementById("profileLink");

      if (profileLink) {
        if (user) {
          profileLink.textContent = "My Profile";
          profileLink.setAttribute("href", "my-profile.html");
        } else {
          profileLink.textContent = "Sign In";
          profileLink.setAttribute("href", "sign-in.html");
        }
      }

      // 🚀 Run page-specific UI updates if available
      if (typeof updateLandingPageUI === "function") {
        updateLandingPageUI();
      }
    } else {
      console.warn("No #header element found on this page.");
    }
  })
  .catch((err) => console.error("Failed to load header:", err));
