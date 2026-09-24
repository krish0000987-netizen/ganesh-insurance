/**
 * GANESH INSURANCE — CORE INTERACTIVE ENGINE
 * Features: 3s Ken-Burns Hero Slideshow, Sticky Header, Consultation Modal,
 * FAQ Accordion & Search, Partner Filters, Mobile Drawer & Form Validation.
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initHeroSlideshow();
  initMobileNav();
  initConsultationModal();
  initFaqAccordion();
  initPartnerFilters();
  initForms();
  initLifeStageSelector();
  initMobileLeadEngine();
});

/* -------------------------------------------------------------
 * 1. STICKY HEADER SCROLL EFFECT
 * ------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* -------------------------------------------------------------
 * 2. HERO SLIDESHOW (Strict 3-Second Auto-Transition)
 * ------------------------------------------------------------- */
function initHeroSlideshow() {
  const slides = document.querySelectorAll('.hero-slide');
  const indicators = document.querySelectorAll('.indicator-bar');
  const prevBtn = document.querySelector('.slider-arrow-btn.prev');
  const nextBtn = document.querySelector('.slider-arrow-btn.next');

  if (!slides.length) return;

  let currentSlide = 0;
  let slideInterval = null;
  const slideDuration = 3000; // Exact 3 seconds as specified

  function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    if (indicators[currentSlide]) {
      indicators[currentSlide].classList.remove('active');
    }

    currentSlide = (index + slides.length) % slides.length;

    slides[currentSlide].classList.add('active');
    if (indicators[currentSlide]) {
      indicators[currentSlide].classList.add('active');
    }
  }

  function startSlideshow() {
    stopSlideshow();
    slideInterval = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, slideDuration);
  }

  function stopSlideshow() {
    if (slideInterval) {
      clearInterval(slideInterval);
      slideInterval = null;
    }
  }

  // Clickable indicators
  indicators.forEach((indicator, idx) => {
    indicator.addEventListener('click', () => {
      goToSlide(idx);
      startSlideshow();
    });
  });

  // Next / Prev Arrows
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goToSlide(currentSlide - 1);
      startSlideshow();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goToSlide(currentSlide + 1);
      startSlideshow();
    });
  }

  // Start immediately
  startSlideshow();
}

/* -------------------------------------------------------------
 * 3. MOBILE NAVIGATION DRAWER
 * ------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const closeBtn = document.querySelector('.mobile-drawer-close');

  if (!toggleBtn || !drawer) return;

  const openDrawer = () => {
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  drawer.addEventListener('click', (e) => {
    if (e.target.classList.contains('mobile-menu-link') || e.target === drawer) {
      closeDrawer();
    }
  });
}

/* -------------------------------------------------------------
 * 4. CONSULTATION MODAL
 * ------------------------------------------------------------- */
function initConsultationModal() {
  const modalBackdrop = document.querySelector('.modal-backdrop');
  if (!modalBackdrop) return;

  const openButtons = document.querySelectorAll('.open-consult-modal, [data-modal-trigger="consultation"]');
  const closeBtn = modalBackdrop.querySelector('.modal-close-btn');

  const openModal = (category = '') => {
    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';

    if (category) {
      const selectField = modalBackdrop.querySelector('#modalInsuranceReq');
      if (selectField) {
        selectField.value = category;
      }
    }
  };

  const closeModal = () => {
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  };

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const category = btn.getAttribute('data-insurance-category') || '';
      openModal(category);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
      closeModal();
    }
  });

  // Modal Form Submission Handler
  const modalForm = modalBackdrop.querySelector('#consultationForm');
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = modalForm.querySelector('[name="fullName"]').value;
      const phone = modalForm.querySelector('[name="mobileNumber"]').value;
      const req = modalForm.querySelector('[name="insuranceRequirement"]').value;
      const city = modalForm.querySelector('[name="city"]').value;

      // Clean WhatsApp message construct
      const text = encodeURIComponent(
        `Hello Ganesh Insurance,\nMy name is ${name} (${city}).\nI would like an insurance consultation regarding: ${req}.\nPlease reach me at: ${phone}.`
      );
      const whatsappUrl = `https://wa.me/919934304389?text=${text}`;

      const modalBody = modalBackdrop.querySelector('.modal-body');
      modalBody.innerHTML = `
        <div style="text-align: center; padding: 24px 10px;">
          <div style="width: 58px; height: 58px; background: rgba(16, 185, 129, 0.15); color: #10B981; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 18px; font-size: 28px;">✓</div>
          <h3 style="font-size: 1.4rem; color: #081224; margin-bottom: 8px;">Consultation Request Received</h3>
          <p style="color: #64748B; font-size: 0.95rem; line-height: 1.6; margin-bottom: 24px;">
            Thank you, <strong>${name}</strong>. An authorized advisor from Ganesh Insurance will review your <strong>${req}</strong> requirements and reach out to <strong>${phone}</strong> shortly.
          </p>
          <div style="display: flex; flex-direction: column; gap: 12px; max-width: 360px; margin: 0 auto;">
            <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp" style="width: 100%;">
              Connect Instantly on WhatsApp
            </a>
            <a href="tel:+919934304389" class="btn btn-navy" style="width: 100%;">
              Call Us: +91 99343 04389
            </a>
          </div>
        </div>
      `;
    });
  }
}

/* -------------------------------------------------------------
 * 5. FAQ ACCORDION & SEARCH
 * ------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    const answer = item.querySelector('.faq-answer-body');

    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items in same group
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          const otherAns = other.querySelector('.faq-answer-body');
          if (otherAns) otherAns.style.maxHeight = null;
        }
      });

      if (isActive) {
        item.classList.remove('active');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 30 + 'px';
      }
    });
  });

  // Real-time FAQ Search Filter
  const searchInput = document.querySelector('.faq-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();

      faqItems.forEach(item => {
        const questionText = item.querySelector('.faq-question-btn').textContent.toLowerCase();
        const answerText = item.querySelector('.faq-answer-body').textContent.toLowerCase();

        if (questionText.includes(query) || answerText.includes(query)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }
}

/* -------------------------------------------------------------
 * 6. PARTNER CATEGORY FILTER TABS
 * ------------------------------------------------------------- */
function initPartnerFilters() {
  const tabButtons = document.querySelectorAll('.partners-tabs-container .tab-btn');
  const partnerCards = document.querySelectorAll('.partner-card');

  if (!tabButtons.length || !partnerCards.length) return;

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      partnerCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });
}

/* -------------------------------------------------------------
 * 7. FORM SUBMISSIONS (Contact Page Form)
 * ------------------------------------------------------------- */
function initForms() {
  const contactForm = document.querySelector('#contactMainForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = contactForm.querySelector('[name="fullName"]').value;
    const phone = contactForm.querySelector('[name="mobileNumber"]').value;
    const email = contactForm.querySelector('[name="email"]').value;
    const city = contactForm.querySelector('[name="city"]').value;
    const requirement = contactForm.querySelector('[name="insuranceRequirement"]').value;
    const message = contactForm.querySelector('[name="message"]').value;

    const encodedMsg = encodeURIComponent(
      `Hello Ganesh Insurance,\nName: ${name}\nMobile: ${phone}\nEmail: ${email}\nCity: ${city}\nRequirement: ${requirement}\nMessage: ${message}`
    );
    const whatsappLink = `https://wa.me/919934304389?text=${encodedMsg}`;

    contactForm.innerHTML = `
      <div style="background: #F8FAFC; border: 1.5px solid #C5A467; border-radius: 16px; padding: 36px 24px; text-align: center;">
        <div style="width: 54px; height: 54px; border-radius: 50%; background: rgba(197, 164, 103, 0.2); color: #C5A467; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; font-size: 26px;">✓</div>
        <h3 style="color: #081224; font-size: 1.4rem; margin-bottom: 8px;">Consultation Request Submitted</h3>
        <p style="color: #475569; font-size: 0.95rem; line-height: 1.6; margin-bottom: 24px;">
          Thank you, <strong>${name}</strong>. Our senior insurance advisor has received your request regarding <strong>${requirement}</strong>. We will get in touch with you at <strong>${phone}</strong> shortly.
        </p>
        <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
          <a href="${whatsappLink}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp">
            Continue on WhatsApp
          </a>
          <a href="tel:+919934304389" class="btn btn-navy">
            Call Directly
          </a>
        </div>
      </div>
    `;
  });
}

/* -------------------------------------------------------------
 * 8. INTERACTIVE LIFE STAGE SELECTOR (Solutions Page)
 * ------------------------------------------------------------- */
function initLifeStageSelector() {
  const stageBtns = document.querySelectorAll('.stage-pill-btn');
  const stageCards = document.querySelectorAll('.stage-detail-card');

  if (!stageBtns.length || !stageCards.length) return;

  stageBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      stageBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetStage = btn.getAttribute('data-stage');

      stageCards.forEach(card => {
        if (card.getAttribute('data-stage') === targetStage) {
          card.style.display = 'block';
          card.classList.add('fade-in');
        } else {
          card.style.display = 'none';
          card.classList.remove('fade-in');
        }
      });
    });
  });
}

/* -------------------------------------------------------------
 * 9. MOBILE LEAD GENERATION ENGINE
 * ------------------------------------------------------------- */
function initMobileLeadEngine() {
  // 1. Interactive Category Pill Radios
  const catPills = document.querySelectorAll('.lead-cat-pill');
  catPills.forEach(pill => {
    const radio = pill.querySelector('input[type="radio"]');
    if (!radio) return;

    pill.addEventListener('click', () => {
      const form = pill.closest('form');
      if (form) {
        form.querySelectorAll('.lead-cat-pill').forEach(p => p.classList.remove('active'));
      }
      pill.classList.add('active');
      radio.checked = true;
    });
  });

  // 2. Mobile Quick Lead Forms Submission
  const leadForms = document.querySelectorAll('.mobile-quick-lead-form');
  leadForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const phoneInput = form.querySelector('input[name="mobileNumber"], input[name="leadMobile"]');
      const categoryRadio = form.querySelector('input[name="mobileCategory"]:checked, input[name="leadCategory"]:checked');
      
      const phone = phoneInput ? phoneInput.value.replace(/\D/g, '') : '';
      const category = categoryRadio ? categoryRadio.value : 'Insurance Advisory';

      if (phone.length < 10) {
        alert('Please enter a valid 10-digit mobile number.');
        if (phoneInput) phoneInput.focus();
        return;
      }

      // Record lead in browser storage
      try {
        const leadRecord = {
          phone,
          category,
          timestamp: new Date().toISOString(),
          source: form.getAttribute('data-lead-source') || 'mobile_quick_lead'
        };
        localStorage.setItem('ganesh_insurance_lead_' + Date.now(), JSON.stringify(leadRecord));
      } catch (err) {
        console.warn('Storage unavailable', err);
      }

      // Build personalized WhatsApp Advisory URL
      const leadMsg = encodeURIComponent(
        `Hello Ganesh Insurance,\nI would like to get best quotes and consultation for ${category}.\nMy Mobile Number is: ${phone}.\nPlease connect with me at the earliest.`
      );
      const waUrl = `https://wa.me/919934304389?text=${leadMsg}`;

      // Instant UI confirmation inside the card
      const originalHtml = form.innerHTML;
      form.innerHTML = `
        <div style="text-align: center; padding: 18px 10px; background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.35); border-radius: 12px; margin-top: 6px;">
          <div style="width: 44px; height: 44px; border-radius: 50%; background: #10B981; color: #fff; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px; font-size: 22px;">✓</div>
          <h4 style="color: #fff; font-size: 1.1rem; margin-bottom: 6px;">Quote Request Sent!</h4>
          <p style="color: #CBD5E1; font-size: 0.82rem; line-height: 1.4; margin-bottom: 14px;">
            Connecting you directly to our Senior Advisor for <strong>${category}</strong> via WhatsApp.
          </p>
          <div style="display: flex; gap: 8px; flex-direction: column;">
            <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp" style="width: 100%; font-size: 0.84rem; padding: 10px 14px;">
              Chat on WhatsApp Now
            </a>
            <a href="tel:+919934304389" class="btn btn-navy" style="width: 100%; font-size: 0.84rem; padding: 9px 14px;">
              Direct Call: +91 99343 04389
            </a>
          </div>
        </div>
      `;

      // Auto-trigger WhatsApp in new tab after 600ms
      setTimeout(() => {
        window.open(waUrl, '_blank');
      }, 600);
    });
  });

  // 3. Floating WhatsApp Notification Pulse on Mobile
  const waFloating = document.querySelector('.floating-whatsapp-btn');
  if (waFloating && window.innerWidth <= 768) {
    setTimeout(() => {
      const tooltip = waFloating.querySelector('.tooltip');
      if (tooltip) {
        tooltip.style.opacity = '1';
        tooltip.style.transform = 'translateX(0)';
        setTimeout(() => {
          tooltip.style.opacity = '';
          tooltip.style.transform = '';
        }, 5000);
      }
    }, 3500);
  }
}
