/* Main Interactivity Logic & Dynamic Visual Effects for Sabrina Akter Portfolio */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileMenu();
  initROICalculator();
  initCaseStudyFilter();
  initCaseStudyModal();
  initModals();
  initPolicyModals();
  initContactForm();
  initCounterAnimation();
  initFAQAccordion();
  initScrollReveal();
  initMouseSpotlight();
});

// --- Theme Toggle (Dark/Light) ---
function initThemeToggle() {
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    updateThemeIcons(true);
  }

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      const isLight = document.body.classList.contains('light-mode');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      updateThemeIcons(isLight);
      showToast(isLight ? 'Switched to Light Mode' : 'Switched to Dark Mode', 'info');
    });
  });
}

function updateThemeIcons(isLight) {
  const icons = document.querySelectorAll('.theme-toggle-btn i');
  icons.forEach(icon => {
    if (isLight) {
      icon.className = 'fas fa-sun text-yellow-500';
    } else {
      icon.className = 'fas fa-moon text-emerald-400';
    }
  });
}

// --- Mobile Navigation ---
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('hidden');
    });

    mobileNav.querySelectorAll('a, button').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.add('hidden');
      });
    });
  }
}

// --- Interactive SEO ROI Calculator ---
function initROICalculator() {
  const trafficInput = document.getElementById('calc-traffic');
  const convRateInput = document.getElementById('calc-conv');
  const orderValInput = document.getElementById('calc-order');

  const trafficVal = document.getElementById('val-traffic');
  const convVal = document.getElementById('val-conv');
  const orderVal = document.getElementById('val-order');

  const resTraffic = document.getElementById('res-traffic');
  const resConversions = document.getElementById('res-conversions');
  const resRevenue = document.getElementById('res-revenue');

  if (!trafficInput) return;

  function calculate() {
    const currentTraffic = parseInt(trafficInput.value);
    const convRate = parseFloat(convRateInput.value);
    const orderVal = parseFloat(orderValInput.value);

    trafficVal.textContent = currentTraffic.toLocaleString() + ' /mo';
    convVal.textContent = convRate + '%';
    orderVal.textContent = '$' + orderVal;

    const projectedTrafficGain = Math.round(currentTraffic * 2.5); 
    const additionalConversions = Math.round(projectedTrafficGain * (convRate / 100));
    const projectedMonthlyRevenueGain = additionalConversions * orderVal;

    resTraffic.textContent = '+' + projectedTrafficGain.toLocaleString() + ' visitors';
    resConversions.textContent = '+' + additionalConversions.toLocaleString() + ' leads/orders';
    resRevenue.textContent = '+$' + projectedMonthlyRevenueGain.toLocaleString();
  }

  [trafficInput, convRateInput, orderValInput].forEach(input => {
    input.addEventListener('input', calculate);
  });

  calculate();
}

// --- Case Studies Filtering ---
function initCaseStudyFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const caseCards = document.querySelectorAll('.case-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-emerald-500', 'text-slate-950', 'font-bold');
        b.classList.add('bg-slate-800', 'text-slate-300');
      });

      btn.classList.remove('bg-slate-800', 'text-slate-300');
      btn.classList.add('bg-emerald-500', 'text-slate-950', 'font-bold');

      const filter = btn.getAttribute('data-filter');

      caseCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// --- Dynamic Case Study Detail Modal (Nakib IT Style Detailed Strategy Breakdown) ---
function initCaseStudyModal() {
  const caseModal = document.getElementById('case-modal');
  const closeBtn = document.getElementById('close-case-modal');
  const openBtns = document.querySelectorAll('.open-case-modal');

  const caseData = {
    ecom: {
      tag: "E-Commerce Shopify Case Study",
      title: "Shopify Store Organic Revenue & Free Merchant Listing Scaling",
      client: "Global E-Commerce Account | Target Market: USA & Europe",
      img: "images/proof-gmerchant.jpg",
      problem: "The client suffered from high Facebook paid ads reliance, unoptimized Liquid theme templates causing slow speeds, and zero organic presence in Google Merchant Center free product listings.",
      strategy: [
        "Fixed Google Merchant Center product feed schema & catalog attributes.",
        "Implemented Category SILO content structure targeting high buyer-intent terms.",
        "Accelerated Shopify Liquid theme speeds from 4.8s down to 1.71 seconds.",
        "Integrated rich product snippet schema for stars, price, and stock status."
      ],
      results: [
        { label: "Free Product Impressions", val: "187.38K" },
        { label: "Free Listing Conv. Rate", val: "29.0%" },
        { label: "Direct Free Orders", val: "88 Sales" }
      ]
    },
    local: {
      tag: "Local SEO & Google Maps Case Study",
      title: "Local Service Enterprise 100% Geo-Grid #1 Map Takeover",
      client: "Contracting & Service Enterprise | Local Region",
      img: "images/proof-localgrid.png",
      problem: "Trailing behind local competitors in the Google 3-Pack map grid, receiving fewer than 10 calls per month due to inconsistent NAP directory citations.",
      strategy: [
        "Re-built and optimized Google Business Profile categories, description, and geotagged media.",
        "Created hyper-local service landing pages with localized schema markup.",
        "Ran citywide Local Viking geo-grid rank tracking and targeted neighborhood citations.",
        "Acquired high-authority local niche backlinks and structured review strategies."
      ],
      results: [
        { label: "Inbound Phone Calls", val: "+200% Calls" },
        { label: "Direction Requests", val: "+54% Growth" },
        { label: "Map Rank Grid", val: "100% #1 Spot" }
      ]
    },
    b2b: {
      tag: "B2B Multi-Location Case Study",
      title: "US B2B Exterior Services Multi-Location Search Scaling",
      client: "Multi-Location Enterprise | Georgia, USA",
      img: "images/proof-b2b-gsc.png",
      problem: "Low non-branded organic traffic across 3 key service locations in Georgia, USA, with broken 301 redirect chains and indexing blocks.",
      strategy: [
        "Resolved technical 301 redirect chains and canonical URL duplications.",
        "Built location-specific SILO content hubs targeting commercial B2B buyer intent.",
        "Optimized Google Business Profiles for each location with verified NAP data.",
        "Acquired high-DR contextual outreach backlinks from US industry platforms."
      ],
      results: [
        { label: "GSC Impressions", val: "279,000" },
        { label: "Organic Clicks", val: "1,230 Clicks" },
        { label: "US Organic Traffic", val: "91% US Share" }
      ]
    },
    aeo: {
      tag: "Generative AI (AEO / GEO) Case Study",
      title: "Google AI Overviews & ChatGPT Citation Dominance",
      client: "Digital SaaS & Consulting Platform | Global Search",
      img: "images/proof-aio-generative.png",
      problem: "Total absence from Google's new AI Overviews (SGE) beta recommendations and zero citations inside ChatGPT or Microsoft Copilot answer boxes.",
      strategy: [
        "Structured content headings and concise Q&A snippets optimized for LLM token parsing.",
        "Implemented rich JSON-LD Organization & Specialty Schema definitions.",
        "Built brand entity mentions across high-trust authority platforms.",
        "Certified AEO strategy execution based on HubSpot Academy frameworks."
      ],
      results: [
        { label: "AI Overview Impressions", val: "9,560 Impr." },
        { label: "Daily LLM Citations", val: "185 Daily" },
        { label: "Citation Jump", val: "+444% Growth" }
      ]
    },
    tech: {
      tag: "Technical SEO Audit Case Study",
      title: "150-Point Screaming Frog Audit & Crawl Budget Cleanup",
      client: "Enterprise Web Platform | 10,000+ Indexable Pages",
      img: "images/proof-screamingfrog.png",
      problem: "Severe indexing delays, crawl budget waste from spider traps, 404 broken internal links, and missing canonical tags across 10,000+ pages.",
      strategy: [
        "Executed deep Screaming Frog spider crawl identifying all 4xx, 5xx, and redirect loops.",
        "Cleaned robots.txt rules and updated dynamic XML sitemaps.",
        "Configured proper self-referencing canonical tags to eliminate duplicate content.",
        "Fixed Core Web Vitals LCP, CLS, and INP metrics."
      ],
      results: [
        { label: "Crawl Errors Fixed", val: "100% Clean" },
        { label: "GSC Indexing Speed", val: "Instant" },
        { label: "Technical Score", val: "99 / 100" }
      ]
    },
    backlinks: {
      tag: "High-DR Link Building Case Study",
      title: "400,000 Search Console Impressions via White-Hat Outreach",
      client: "Niche Authority Brand | Global Search",
      img: "images/gsc-proof.png",
      problem: "Stagnant organic authority stuck on Page 2 for high-volume terms due to a weak backlink profile compared to top 3 competitors.",
      strategy: [
        "Conducted competitive backlink gap analysis using Ahrefs and SEMrush.",
        "Executed manual email outreach securing DR50+ contextual guest post placements.",
        "Created linkable digital PR assets and infographics for natural link attraction.",
        "Diversified anchor text profiles to ensure 100% Google penalty safety."
      ],
      results: [
        { label: "Search Impressions", val: "400,000" },
        { label: "Position Jump", val: "40.2 → 21.9" },
        { label: "Organic Clicks", val: "1.1K Clicks" }
      ]
    },
    speed: {
      tag: "Core Web Vitals Speed Case Study",
      title: "1.71s Page Speed & 80ms INP Core Web Vitals Acceleration",
      client: "CMS & E-Commerce Web Store",
      img: "images/proof-shopify-speed.png",
      problem: "Slow 4.5s+ loading speed failing Google Core Web Vitals on mobile devices, causing high bounce rates.",
      strategy: [
        "Compressed all images to next-gen WebP formats.",
        "Eliminated render-blocking JavaScript and CSS resources.",
        "Optimized Interaction to Next Paint (INP) down to 80ms.",
        "Configured browser caching and CDN asset delivery."
      ],
      results: [
        { label: "Page Load Speed", val: "1.71s Fast" },
        { label: "INP Score", val: "80ms Good" },
        { label: "Core Web Vitals", val: "PASSED" }
      ]
    }
  };

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const caseKey = btn.getAttribute('data-case');
      const data = caseData[caseKey];

      if (data && caseModal) {
        document.getElementById('case-modal-tag').textContent = data.tag;
        document.getElementById('case-modal-title').textContent = data.title;
        document.getElementById('case-modal-client').textContent = data.client;
        document.getElementById('case-modal-img').src = data.img;
        document.getElementById('case-modal-problem').textContent = data.problem;

        const strategyList = document.getElementById('case-modal-strategy');
        strategyList.innerHTML = data.strategy.map(item => `
          <li class="flex items-start gap-2">
            <i class="fas fa-check text-emerald-400 mt-1"></i>
            <span>${item}</span>
          </li>
        `).join('');

        const resultsContainer = document.getElementById('case-modal-results');
        resultsContainer.innerHTML = data.results.map(r => `
          <div class="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span class="text-[10px] text-slate-400 block">${r.label}</span>
            <strong class="text-emerald-400 font-bold text-sm">${r.val}</strong>
          </div>
        `).join('');

        caseModal.classList.remove('hidden');
      }
    });
  });

  if (closeBtn && caseModal) {
    closeBtn.addEventListener('click', () => {
      caseModal.classList.add('hidden');
    });

    caseModal.addEventListener('click', (e) => {
      if (e.target === caseModal) caseModal.classList.add('hidden');
    });
  }
}

// --- FAQ Accordion Interactivity ---
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    const content = item.querySelector('.faq-content');
    const icon = item.querySelector('.faq-icon');

    if (header && content) {
      header.addEventListener('click', () => {
        const isOpen = !content.classList.contains('hidden');
        
        // Close all other FAQs
        faqItems.forEach(otherItem => {
          const otherContent = otherItem.querySelector('.faq-content');
          const otherIcon = otherItem.querySelector('.faq-icon');
          if (otherContent) otherContent.classList.add('hidden');
          if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
        });

        if (!isOpen) {
          content.classList.remove('hidden');
          if (icon) icon.style.transform = 'rotate(180deg)';
        }
      });
    }
  });
}

// --- Modals & Workable Direct Email Audit Dispatch ---
function initModals() {
  const modal = document.getElementById('audit-modal');
  const openBtns = document.querySelectorAll('.open-audit-modal');
  const closeBtns = document.querySelectorAll('.close-modal');

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (modal) modal.classList.remove('hidden');
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (modal) modal.classList.add('hidden');
    });
  });

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.add('hidden');
    });
  }

  const auditForm = document.getElementById('audit-form');
  if (auditForm) {
    auditForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const website = document.getElementById('audit-website').value;
      const email = document.getElementById('audit-email').value;

      if (!website || !email) {
        showToast('Please enter both Website URL and Email.', 'warning');
        return;
      }

      showToast(`Opening your email client to send free audit request...`, 'success');
      
      const subject = encodeURIComponent(`Free SEO Audit Request for ${website}`);
      const body = encodeURIComponent(`Hello Sabrina,\n\nI would like to request a free SEO audit for my website.\n\nWebsite URL: ${website}\nContact Email: ${email}\n\nThank you!`);
      
      window.location.href = `mailto:sabrinaakterdigital@gmail.com?subject=${subject}&body=${body}`;
      
      auditForm.reset();
      modal.classList.add('hidden');
    });
  }
}

// --- Workable Contact Form Direct Email Dispatch ---
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const website = document.getElementById('contact-website')?.value || 'N/A';
    const budget = document.getElementById('contact-budget')?.value || 'N/A';
    const message = document.getElementById('contact-message').value;

    if (!name || !email || !message) {
      showToast('Please complete all required fields.', 'warning');
      return;
    }

    showToast(`Dispatching message to sabrinaakterdigital@gmail.com...`, 'success');

    const subject = encodeURIComponent(`New SEO Client Inquiry from ${name}`);
    const body = encodeURIComponent(`Hi Sabrina,\n\nName: ${name}\nEmail: ${email}\nWebsite URL: ${website}\nMonthly Budget: ${budget}\n\nProject Requirements & Goals:\n${message}\n\nBest regards,\n${name}`);

    window.location.href = `mailto:sabrinaakterdigital@gmail.com?subject=${subject}&body=${body}`;
    form.reset();
  });
}

// --- Dynamic Real-time Stat Counter Animation ---
function initCounterAnimation() {
  const counters = document.querySelectorAll('.counter-val');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = parseFloat(counter.getAttribute('data-target'));
          const suffix = counter.getAttribute('data-suffix') || '';
          const isFloat = counter.getAttribute('data-float') === 'true';
          let count = 0;
          const duration = 1500;
          const steps = 40;
          const increment = target / steps;
          const stepTime = duration / steps;

          const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
              counter.textContent = (isFloat ? target.toFixed(1) : Math.round(target)) + suffix;
              clearInterval(timer);
            } else {
              counter.textContent = (isFloat ? count.toFixed(1) : Math.round(count)) + suffix;
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const statSection = document.getElementById('stats-section');
  if (statSection) observer.observe(statSection);
}

// --- Scroll Reveal Effect ---
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.stat-card, .glass-card, .faq-item');
  
  revealElements.forEach(el => el.classList.add('reveal-item'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => observer.observe(el));
}

// --- Interactive Mouse Spotlight Glow ---
function initMouseSpotlight() {
  const cards = document.querySelectorAll('.stat-card, .glass-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

// --- Toast Notification Helper ---
function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  
  const icon = type === 'success' ? 'fa-check-circle text-emerald-400' :
               type === 'warning' ? 'fa-exclamation-triangle text-amber-400' : 'fa-info-circle text-cyan-400';

  toast.innerHTML = `<i class="fas ${icon} text-lg"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// --- Google Compliant Privacy Policy & Terms of Service Modals ---
function initPolicyModals() {
  const privacyModal = document.getElementById('privacy-modal');
  const termsModal = document.getElementById('terms-modal');

  const openPrivacyBtn = document.getElementById('open-privacy-btn');
  const openTermsBtn = document.getElementById('open-terms-btn');

  const closePrivacyBtns = [document.getElementById('close-privacy-modal'), document.getElementById('close-privacy-btn')];
  const closeTermsBtns = [document.getElementById('close-terms-modal'), document.getElementById('close-terms-btn')];

  if (openPrivacyBtn && privacyModal) {
    openPrivacyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      privacyModal.classList.remove('hidden');
    });
  }

  if (openTermsBtn && termsModal) {
    openTermsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      termsModal.classList.remove('hidden');
    });
  }

  closePrivacyBtns.forEach(btn => {
    if (btn && privacyModal) {
      btn.addEventListener('click', () => privacyModal.classList.add('hidden'));
    }
  });

  closeTermsBtns.forEach(btn => {
    if (btn && termsModal) {
      btn.addEventListener('click', () => termsModal.classList.add('hidden'));
    }
  });

  if (privacyModal) {
    privacyModal.addEventListener('click', (e) => {
      if (e.target === privacyModal) privacyModal.classList.add('hidden');
    });
  }

  if (termsModal) {
    termsModal.addEventListener('click', (e) => {
      if (e.target === termsModal) termsModal.classList.add('hidden');
    });
  }
}
