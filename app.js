(() => {
  const STORAGE_KEY = "invitation-lang";
  const defaultLang = "uz";
  const supported = Object.keys(translations);
  const langLabels = { uz: "УЗ", kk: "ҚАЗ", ru: "РУ", en: "EN" };
  let currentLang = defaultLang;

  const langRoot = document.querySelector("[data-lang-menu]");
  const langToggle = document.querySelector("[data-lang-toggle]");
  const langList = document.querySelector("[data-lang-list]");
  const langCurrent = document.querySelector("[data-lang-current]");

  const getInitialLang = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && supported.includes(saved)) return saved;
    return defaultLang;
  };

  const setMenuOpen = (open) => {
    if (!langRoot || !langToggle || !langList) return;
    langRoot.classList.toggle("is-open", open);
    langToggle.setAttribute("aria-expanded", String(open));
    langList.hidden = !open;
  };

  const applyLanguage = (lang) => {
    currentLang = lang;
    const dict = translations[lang] || translations[defaultLang];
    document.documentElement.lang = htmlLang[lang] || htmlLang[defaultLang];
    if (dict["meta.title"]) document.title = dict["meta.title"];

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key]) el.textContent = dict[key];
    });

    document.querySelectorAll("[data-i18n-href]").forEach((el) => {
      const key = el.getAttribute("data-i18n-href");
      if (dict[key]) el.setAttribute("href", dict[key]);
    });

    if (langCurrent) langCurrent.textContent = langLabels[lang] || lang.toUpperCase();

    document.querySelectorAll(".lang__btn").forEach((btn) => {
      const active = btn.dataset.lang === lang;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-selected", String(active));
    });

    localStorage.setItem(STORAGE_KEY, lang);
    setMenuOpen(false);
  };

  if (langToggle && langList) {
    langToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      setMenuOpen(langList.hidden);
    });

    document.addEventListener("click", (e) => {
      if (!langRoot || langList.hidden) return;
      if (!langRoot.contains(e.target)) setMenuOpen(false);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    });
  }

  document.querySelectorAll(".lang__btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.lang;
      if (supported.includes(lang)) applyLanguage(lang);
    });
  });

  applyLanguage(getInitialLang());

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Scroll reveal

  const revealEls = document.querySelectorAll(".reveal");
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -5% 0px" }
    );
    revealEls.forEach((el) => observer.observe(el));
  }

  // Countdown to the first celebration

  const countdownEl = document.getElementById("countdown");
  if (countdownEl) {
    const target = new Date(countdownEl.dataset.target).getTime();
    const numEls = {
      days: countdownEl.querySelector('[data-count="days"]'),
      hours: countdownEl.querySelector('[data-count="hours"]'),
      minutes: countdownEl.querySelector('[data-count="minutes"]'),
      seconds: countdownEl.querySelector('[data-count="seconds"]'),
    };
    const titleEl = countdownEl.querySelector(".countdown__title");
    let timer;

    const setNum = (el, value) => {
      const text = String(value).padStart(2, "0");
      if (el.textContent === text) return;
      el.textContent = text;
      if (!prefersReducedMotion) {
        el.classList.remove("is-ticking");
        void el.offsetWidth;
        el.classList.add("is-ticking");
      }
    };

    const update = () => {
      const diff = target - Date.now();
      if (diff <= 0) {
        clearInterval(timer);
        Object.values(numEls).forEach((el) => (el.textContent = "00"));
        const dict = translations[currentLang] || translations[defaultLang];
        titleEl.textContent = dict["countdown.done"];
        return;
      }
      setNum(numEls.days, Math.floor(diff / 86400000));
      setNum(numEls.hours, Math.floor(diff / 3600000) % 24);
      setNum(numEls.minutes, Math.floor(diff / 60000) % 60);
      setNum(numEls.seconds, Math.floor(diff / 1000) % 60);
    };

    update();
    timer = setInterval(update, 1000);
  }

  // Floating petals

  const petalsEl = document.querySelector(".petals");
  if (petalsEl && !prefersReducedMotion) {
    const count = window.innerWidth < 720 ? 14 : 22;
    for (let i = 0; i < count; i += 1) {
      const petal = document.createElement("span");
      petal.className = "petal";
      petal.style.left = `${Math.random() * 100}%`;
      petal.style.setProperty("--fall-duration", `${10 + Math.random() * 12}s`);
      petal.style.setProperty("--fall-delay", `${-Math.random() * 20}s`);
      petal.style.setProperty(
        "--fall-drift",
        `${(Math.random() * 12 - 6).toFixed(1)}rem`
      );
      petal.style.setProperty(
        "--fall-spin",
        `${Math.round(180 + Math.random() * 420)}deg`
      );
      const size = (0.45 + Math.random() * 0.5).toFixed(2);
      petal.style.width = `${size}rem`;
      petal.style.height = `${size}rem`;
      petalsEl.appendChild(petal);
    }
  }
})();
