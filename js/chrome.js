/* Shared header / footer injected into every page (English source; Arabic via data-i18n). */
(function () {
  const page = (location.pathname.split("/").pop() || "index.html").toLowerCase();

  const HEADER = `
  <a class="skip-link" href="#main" data-i18n="a11y.skip">Skip to main content</a>
  <div class="topbar">
    <div class="wrap topbar-inner">
      <span data-i18n="top.left">Kuwait's official anti-doping authority · World Anti-Doping Code signatory</span>
      <div class="topbar-links">
        <a href="contact.html"><svg viewBox="0 0 24 24" class="ico"><path d="M4 6h16v12H4z"/><path d="m4 7 8 6 8-6"/></svg>info@kada.gov.kw</a>
        <a href="contact.html" class="num">+965 2222 0000</a>
        <!-- <a href="accessibility.html" data-i18n="top.access">Accessibility</a> -->
        <a href="sitemap.html" data-i18n="top.sitemap">Site map</a>
      </div>
    </div>
  </div>
  <header class="nav">
    <div class="wrap nav-inner">
      <a class="brand" href="index.html" aria-label="KADA home"><img src="assets/logo-dark.png" alt="KADA" width="124" height="52"></a>
      <nav class="links" aria-label="Primary">
        <a href="index.html" data-page="index.html" data-i18n="nav.home">Home</a>
        <div class="dd" data-pages="about.html,vision.html,board.html,structure.html,departments.html,wada.html">
          <a href="about.html" class="has-sub"><span data-i18n="nav.about">About Us</span><svg viewBox="0 0 24 24" class="ico chev"><path d="m6 9 6 6 6-6"/></svg></a>
          <div class="dd-menu">
            <a href="about.html" data-i18n="nav.about1">About KADA</a>
            <a href="vision.html" data-i18n="nav.about2">Vision &amp; Mission</a>
            <a href="board.html" data-i18n="nav.about3">Board Members</a>
            <a href="structure.html" data-i18n="nav.about4">Organizational Structure</a>
            <a href="departments.html" data-i18n="nav.about5">Departments</a>
            <a href="wada.html" data-i18n="nav.about6">WADA Compliance</a>
          </div>
        </div>
        <div class="dd wide" data-pages="services.html,sanctions.html,sanction.html,speakup.html,training.html,course.html,tenders.html,tender.html,supplier.html,prohibited.html,tue.html,data-request.html,assistant.html">
          <a href="services.html" class="has-sub"><span data-i18n="nav.services">E-Services</span><svg viewBox="0 0 24 24" class="ico chev"><path d="m6 9 6 6 6-6"/></svg></a>
          <div class="dd-menu mega">
            <div>
              <b data-i18n="nav.g1">Public</b>
              <a href="sanctions.html" data-i18n="nav.s1">Athlete Sanctions Registry</a>
              <a href="prohibited.html" data-i18n="nav.s2">Prohibited List &amp; Medicine Checker</a>
              <a href="tue.html" data-i18n="nav.s9">Therapeutic Use Exemption (TUE)</a>
              <a href="speakup.html" data-i18n="nav.s3">Speak Up — Anonymous Reporting</a>
              <a href="data-request.html" data-i18n="nav.s4">Data Access Request</a>
            </div>
            <div>
              <b data-i18n="nav.g2">Training &amp; Business</b>
              <a href="training.html" data-i18n="nav.s5">Training &amp; Events Portal</a>
              <a href="tenders.html" data-i18n="nav.s6">Tenders &amp; Procurement</a>
              <a href="supplier.html" data-i18n="nav.s7">Supplier Registration</a>
              <a href="assistant.html" data-i18n="nav.s8">KADA AI Assistant</a>
            </div>
          </div>
        </div>
        <a href="education.html" data-page="education.html" data-i18n="nav.kafah">Education</a>
        <div class="dd" data-pages="news.html,article.html,events.html,event.html,media.html,publications.html">
          <a href="news.html" class="has-sub"><span data-i18n="nav.media">Media</span><svg viewBox="0 0 24 24" class="ico chev"><path d="m6 9 6 6 6-6"/></svg></a>
          <div class="dd-menu">
            <a href="news.html" data-i18n="nav.m1">News &amp; Announcements</a>
            <a href="events.html" data-i18n="nav.m2">Events Calendar</a>
            <a href="media.html" data-i18n="nav.m3">Media Center</a>
            <a href="publications.html" data-i18n="nav.m4">Research &amp; Publications</a>
          </div>
        </div>
        <a href="faq.html" data-page="faq.html" data-i18n="nav.faq">FAQs</a>
        <a href="contact.html" data-page="contact.html" data-i18n="nav.contact">Contact</a>
      </nav>
      <div class="nav-actions">
        <button class="search-btn" type="button" aria-label="Search" data-search-open><svg viewBox="0 0 24 24" class="ico"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg></button>
        <button class="lang" type="button" data-lang-toggle aria-label="Switch language">عربي</button>
        <div class="signin" data-signin>
          <button class="btn btn-ghost signin-btn" type="button" data-signin-open aria-haspopup="dialog">
            <svg viewBox="0 0 24 24" class="ico"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="12" r="2.5"/><path d="M14 10h4M14 14h4"/></svg>
            <span data-i18n="nav.signin">Sign in</span>
          </button>
          <div class="signin-account" data-signin-account hidden>
            <button class="btn btn-ghost signin-btn" type="button" data-account-toggle aria-expanded="false" aria-haspopup="true">
              <span class="signin-ava" data-signin-ava>Y</span>
              <span data-signin-who></span>
            </button>
            <div class="signin-pop" data-account-menu hidden>
              <p class="signin-pop-k" data-i18n="auth.signed">Signed in · presentation account</p>
              <b data-signin-full></b>
              <small data-signin-role></small>
              <a href="account.html" data-auth-home class="signin-home">My account</a>
              <a href="training.html" data-auth-link="public" data-i18n="nav.s5">Training &amp; Events Portal</a>
              <a href="data-request.html" data-auth-link="public" data-i18n="nav.s4">Data Access Request</a>
              <a href="tenders.html" data-auth-link="supplier" data-i18n="nav.s6">Tenders &amp; Procurement</a>
              <a href="platform.html#app" data-auth-link="staff" data-i18n="auth.fieldapp">Field app roles (mobile)</a>
              <button type="button" class="signin-switch" data-auth-switch data-i18n="auth.switch">Switch presentation account</button>
              <button type="button" class="signin-out" data-signin-out data-i18n="auth.out">Sign out</button>
            </div>
          </div>
        </div>
        <a class="btn btn-primary" href="speakup.html"><span data-i18n="nav.speak">Speak Up</span></a>
        <button class="burger" type="button" aria-label="Menu"><i></i><i></i><i></i></button>
      </div>
    </div>
  </header>
  <div class="search-overlay" data-search>
    <div class="wrap">
      <form class="search-big" onsubmit="return false">
        <svg viewBox="0 0 24 24" class="ico"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
        <input type="search" placeholder="Search services, news, publications…" data-i18n-ph="search.ph" aria-label="Search">
        <button type="button" class="search-close" data-search-close aria-label="Close"><svg viewBox="0 0 24 24" class="ico"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
      </form>
      <div class="search-hints">
        <span data-i18n="search.popular">Popular:</span>
        <a href="sanctions.html" data-i18n="nav.s1">Athlete Sanctions Registry</a>
        <a href="prohibited.html" data-i18n="search.h2">Prohibited List 2027</a>
        <a href="training.html" data-i18n="search.h3">Upcoming courses</a>
        <a href="tenders.html" data-i18n="search.h4">Open tenders</a>
      </div>
    </div>
  </div>
  <div class="mobile-menu" aria-hidden="true">
    <a href="index.html" data-i18n="nav.home">Home</a>
    <a href="about.html" data-i18n="nav.about">About Us</a>
    <a href="services.html" data-i18n="nav.services">E-Services</a>
    <a href="education.html" data-i18n="nav.kafah">Education</a>
    <a href="news.html" data-i18n="nav.media">Media</a>
    <a href="faq.html" data-i18n="nav.faq">FAQs</a>
    <a href="contact.html" data-i18n="nav.contact">Contact</a>
    <button class="btn btn-ghost mm-signin" type="button" data-signin-open>
      <svg viewBox="0 0 24 24" class="ico"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="12" r="2.5"/><path d="M14 10h4M14 14h4"/></svg>
      <span data-i18n="nav.signin">Sign in</span>
    </button>
    <a class="btn btn-primary mm-cta" href="speakup.html"><span data-i18n="nav.speak">Speak Up</span></a>
  </div>`;

  const AUTH = `
  <div class="auth-overlay" data-auth hidden>
    <div class="auth-card" role="dialog" aria-modal="true" aria-labelledby="auth-title">
      <button type="button" class="auth-x" data-auth-close aria-label="Close"><svg viewBox="0 0 24 24" class="ico"><path d="M6 6l12 12M18 6 6 18"/></svg></button>

      <div class="auth-step is-on" data-auth-step="choose">
        <p class="kicker" data-i18n="auth.choose.k">Secure sign-in</p>
        <h2 id="auth-title" class="display" data-i18n="auth.choose.t">How are you signing in?</h2>
        <p class="auth-lede" data-i18n="auth.choose.d">One national digital identity for the public and suppliers; agency staff use single sign-on.</p>
        <div class="auth-roles">
          <button type="button" data-auth-pick="public">
            <b data-i18n="auth.pub.t">Public</b>
            <small data-i18n="auth.pub.d">Athletes, coaches, course participants and personal-data requesters — via Kuwait Mobile ID or Sahel.</small>
          </button>
          <button type="button" data-auth-pick="supplier">
            <b data-i18n="auth.sup.t">Supplier</b>
            <small data-i18n="auth.sup.d">Company dashboard, tender documents and bids — via the authorised signatory's Mobile ID.</small>
          </button>
          <button type="button" data-auth-pick="staff">
            <b data-i18n="auth.stf.t">KADA staff</b>
            <small data-i18n="auth.stf.d">Admin application (CMS, operations, executive dashboards) — agency account with single sign-on and multi-factor authentication.</small>
          </button>
        </div>
      </div>

      <div class="auth-step" data-auth-step="who">
        <p class="kicker" data-i18n="auth.who.k">Presentation accounts</p>
        <h2 class="display" data-i18n="auth.who.t">Choose a demo identity</h2>
        <p class="auth-lede" data-i18n="auth.who.d">Each identity shows what that type of user sees after signing in. Nothing is sent to Mobile ID.</p>
        <div class="auth-roles auth-accts" data-auth-who-list></div>
        <div class="auth-acts">
          <button type="button" class="btn btn-ghost" data-auth-back="choose"><span data-i18n="c.back">Back</span></button>
        </div>
      </div>

      <div class="auth-step" data-auth-step="mid">
        <p class="kicker" data-i18n="auth.mid.k">Kuwait Mobile ID</p>
        <h2 class="display" data-i18n="auth.mid.t">Approve this sign-in</h2>
        <p class="auth-lede" data-i18n="auth.mid.d">KADA is requesting Civil ID verification to open your account. Confirm on the simulated Mobile ID prompt below.</p>
        <div class="auth-id">
          <span class="signin-ava lg" data-auth-ava>Y</span>
          <div>
            <b data-auth-mid-name>Yousef Al-Rashidi</b>
            <small class="num" data-auth-mid-id>Civil ID · •••• 2194</small>
          </div>
        </div>
        <div class="auth-acts">
          <button type="button" class="btn btn-ghost" data-auth-back="who"><span data-i18n="c.back">Back</span></button>
          <button type="button" class="btn btn-primary" data-auth-approve>
            <svg viewBox="0 0 24 24" class="ico"><path d="m5 13 4 4L19 7"/></svg>
            <span data-i18n="auth.mid.ok">Approve and continue</span>
          </button>
        </div>
        <p class="auth-note" data-i18n="auth.mid.note">Presentation preview — no real Mobile ID or Sahel request is sent.</p>
      </div>

      <div class="auth-step" data-auth-step="sso">
        <p class="kicker" data-i18n="auth.sso.k">KADA single sign-on</p>
        <h2 class="display" data-i18n="auth.sso.t">Choose a staff account</h2>
        <p class="auth-lede" data-i18n="auth.sso.d">Each account opens the admin application with the permissions of its role. Field roles (inspectors, operations managers, Results Department, committees) use the mobile app, not this one.</p>
        <div class="auth-roles auth-accts" data-auth-sso-list></div>
        <p class="auth-wip" data-auth-wip role="status" hidden></p>
        <div class="auth-acts">
          <button type="button" class="btn btn-ghost" data-auth-back="choose"><span data-i18n="c.back">Back</span></button>
        </div>
      </div>

      <div class="auth-step" data-auth-step="mfa">
        <p class="kicker" data-i18n="auth.mfa.k">Multi-factor authentication</p>
        <h2 class="display" data-i18n="auth.mfa.t">Confirm on your authenticator</h2>
        <p class="auth-lede" data-i18n="auth.mfa.d">A sign-in request was sent to the registered authenticator app. Approve it to open the admin application.</p>
        <div class="auth-id">
          <span class="signin-ava lg" data-auth-ava>A</span>
          <div>
            <b data-auth-mid-name>Abdullah Al-Mutairi</b>
            <small data-auth-mid-role>System administrator</small>
            <small class="num" data-auth-mid-mail>a.almutairi@kada.gov.kw</small>
          </div>
        </div>
        <div class="auth-code num"><span>4</span><span>8</span><span>•</span><span>•</span><span>•</span><span>•</span></div>
        <div class="auth-acts">
          <button type="button" class="btn btn-ghost" data-auth-back="sso"><span data-i18n="c.back">Back</span></button>
          <button type="button" class="btn btn-primary" data-auth-approve>
            <svg viewBox="0 0 24 24" class="ico"><path d="m5 13 4 4L19 7"/></svg>
            <span data-i18n="auth.mfa.ok">Approve and open the admin application</span>
          </button>
        </div>
        <p class="auth-note" data-i18n="auth.mfa.note">Presentation preview — no real authentication takes place.</p>
      </div>
    </div>
  </div>`;

  const FOOTER = `
  <footer class="footer" id="footer">
    <div class="wrap">
      <div class="footer-top">
        <div class="f-brand">
          <img src="assets/logo.png" alt="KADA" width="140" height="58">
          <p data-i18n="ft.about">Kuwait's official anti-doping authority and a World Anti-Doping Code signatory, protecting fair competition and athlete health in the State of Kuwait.</p>
          <div class="social">
            <a href="https://www.instagram.com/kada.kw/" target="_blank" rel="noopener" aria-label="Instagram"><svg viewBox="0 0 24 24" class="ico"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg></a>
            <a href="#" aria-label="X"><svg viewBox="0 0 24 24" class="ico"><path d="M4 4l16 16M20 4 4 20"/></svg></a>
            <a href="#" aria-label="YouTube"><svg viewBox="0 0 24 24" class="ico"><rect x="3" y="6" width="18" height="12" rx="3"/><path d="m10 9 5 3-5 3z"/></svg></a>
          </div>
        </div>
        <div class="f-col">
          <h4 data-i18n="ft.agency">The Agency</h4>
          <a href="about.html" data-i18n="nav.about1">About KADA</a>
          <a href="vision.html" data-i18n="nav.about2">Vision &amp; Mission</a>
          <a href="board.html" data-i18n="nav.about3">Board Members</a>
          <a href="structure.html" data-i18n="nav.about4">Organizational Structure</a>
          <a href="wada.html" data-i18n="nav.about6">WADA Compliance</a>
        </div>
        <div class="f-col">
          <h4 data-i18n="ft.services">E-services</h4>
          <a href="sanctions.html" data-i18n="nav.s1">Athlete Sanctions Registry</a>
          <a href="tue.html" data-i18n="nav.s9">Therapeutic Use Exemption (TUE)</a>
          <a href="speakup.html" data-i18n="nav.speak">Speak Up</a>
          <a href="training.html" data-i18n="nav.s5">Training &amp; Events Portal</a>
          <a href="tenders.html" data-i18n="nav.s6">Tenders &amp; Procurement</a>
          <a href="data-request.html" data-i18n="nav.s4">Data Access Request</a>
        </div>
        <div class="f-col">
          <h4 data-i18n="ft.resources">Resources</h4>
          <a href="publications.html" data-i18n="nav.m4">Research &amp; Publications</a>
          <a href="prohibited.html" data-i18n="nav.s2">Prohibited List &amp; Medicine Checker</a>
          <a href="faq.html" data-i18n="nav.faq">FAQs</a>
          <!-- <a href="accessibility.html" data-i18n="top.access">Accessibility</a> -->
          <a href="sitemap.html" data-i18n="top.sitemap">Site map</a>
        </div>
        <div class="f-col">
          <h4 data-i18n="ft.contact">Contact</h4>
          <a href="contact.html">info@kada.gov.kw</a>
          <a href="contact.html" class="num">+965 2222 0000</a>
          <a href="contact.html" data-i18n="ft.addr">Kuwait City, State of Kuwait</a>
          <a href="contact.html" data-i18n="ft.hours">Sun–Thu · 8:00–14:00</a>
        </div>
      </div>
      <div class="footer-base">
        <span data-i18n="ft.copy">© 2026 Kuwait Anti-Doping Agency. All rights reserved.</span>
        <div class="flagline"><i></i><i></i><i></i></div>
        <span><a href="#" data-i18n="ft.privacy">Privacy policy</a> · <a href="#" data-i18n="ft.terms">Terms of use</a> · <span data-i18n="ft.proposal">Design proposal 04</span></span>
      </div>
    </div>
  </footer>`;

  const h = document.querySelector("[data-chrome-header]");
  const f = document.querySelector("[data-chrome-footer]");
  if (h) h.outerHTML = HEADER;
  if (f) f.outerHTML = FOOTER;
  if (!document.querySelector("[data-auth]")) document.body.insertAdjacentHTML("beforeend", AUTH);

  // Floating AI assistant launcher on every page (self-contained; see js/widget.js)
  const w = document.createElement("script");
  w.src = "js/widget.js"; w.defer = true;
  document.body.append(w);

  // Mark the active top-level link for the current page
  document.querySelectorAll(".links > a[data-page]").forEach((a) => { if (a.dataset.page === page) a.classList.add("active"); });
  document.querySelectorAll(".links .dd[data-pages]").forEach((dd) => {
    if (dd.dataset.pages.split(",").includes(page)) dd.querySelector(":scope > a").classList.add("active");
    dd.querySelectorAll(".dd-menu a").forEach((a) => { if (a.getAttribute("href").toLowerCase() === page) a.classList.add("current"); });
  });
})();
