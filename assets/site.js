/* ======================================================================
   EDIT HERE: everything that changes once the company is registered.
   Leave a value empty ("") until you have the real one; the page then
   shows "registration in progress" or hides it, and never invents details.
   ====================================================================== */
const CONFIG = {
  brand: "Upchar SoftDesk",            // the company / product name
  whatsapp: "919362414164",            // WhatsApp number with country code, digits only, e.g. "919XXXXXXXXX"
  phone: "",                           // e.g. "+91 9XXXX XXXXX"
  email: "",                           // e.g. "hello@yourdomain.in"
  city: "Lucknow, Uttar Pradesh",
  demoUrl: "/demo/open/",               // forwards to the live demo (its address is set in demo/open/index.html)
  tourUrl: "/tour/",
  price: "₹1,200",
  company: {                           // from your registration certificate
    legalName: "Spandana Weg",                   // e.g. "XYZ Healthtech Private Limited"
    type: "Partnership Firm",                        // e.g. "Private Limited Company" or "Proprietorship (Udyam registered)"
    cin: "",                           // Corporate Identification Number (Pvt Ltd only)
    udyam: "",                         // Udyam registration number
    gstin: "09ADUFS6067N1ZW",
    address: ""                        // registered office address
  },
  numbers: [                           // only numbers you can prove
    { value: "1", label: "hospital live, in daily use" },
    { value: "2", label: "editions: hospital and dental" },
    { value: "672", label: "automatic checks before every update" },
    { value: "100", label: "Google Lighthouse speed score" }
  ],
  team: [                              // photo: a file published with the page ("img/...") or a web address ("https://...")
    { name: "Sushant Tiwari", role: "Founder & Owner", qual: "", about: "Builds the software and works with every hospital we set up.", photo: "/img/team-sushant.webp" },
    { name: "P.C. Tiwari", role: "Co-founder", qual: "", about: "Guides the company's direction and its work with hospitals.", photo: "/img/team-pc.webp" },
    { name: "Shivam Tripathi", role: "Finance Director", qual: "", about: "Looks after the company's finances, plans and billing.", photo: "/img/team-shivam.webp" },
    { name: "Dr. Punit Tiwari", role: "Medical Advisor", qual: "MBBS \u00b7 Orthopaedic resident", about: "Brings a doctor's view of the OPD and the wards to the software.", photo: "/img/team-punit.webp" },
    { name: "Aradhana Tiwari", role: "Research & Quality Lead", qual: "B.Sc, M.Sc (Chemistry) \u00b7 PhD ongoing", about: "Checks every feature carefully before it reaches a hospital.", photo: "/img/team-aradhana.webp" }
  ],
  reviews: [                           // only real feedback, with the doctor's permission
    // { name: "Dr. ...", place: "... Hospital, ...", text: "...", stars: 5 }
  ]
};

// A page can show its own screens (the dental page does) by setting window.PAGE_SCREENS first
const SCREENS = window.PAGE_SCREENS || [
  { cat: "Reception", title: "Register a patient in about a minute", text: "Pick the doctor and the fee fills itself in. Returning patients are found by mobile number.", img: "/img/03-opd-new.webp" },
  { cat: "Prescription slip", title: "A clean slip, printed or on WhatsApp", text: "Your logo, the doctor's details and OPD hours, with a private QR code.", img: "/img/04-opd-slip.webp" },
  { cat: "Billing", title: "Bill tests with one click", text: "Quick buttons for common tests, your own price list, and cash, UPI or card.", img: "/img/06-billing.webp" },
  { cat: "Beds & IPD", title: "Every bed at a glance", text: "Live occupancy by ward, advances, operation schedule and bed changes.", img: "/img/08-ipd.webp" },
  { cat: "Discharge", title: "The final bill, worked out for you", text: "Bed days, doctor fees and tests, minus advances, with the balance shown.", img: "/img/10-ipd-bill.webp" },
  { cat: "Owner's reports", title: "Know your collection without asking", text: "Cash, UPI and card, by OPD, tests and IPD, for any day, week or month.", img: "/img/12b-collection.webp" }
];

const FEATURES = [
  { icon: "i-id", title: "OPD registration", text: "New, follow-up and emergency visits. Choosing the doctor fills in the department and fee.", keys: "opd registration reception register patient new followup emergency visit" },
  { icon: "i-qr", title: "Slips with QR code", text: "Print or WhatsApp the slip. Scan its QR at the desk to open the patient's record.", keys: "slip prescription qr print whatsapp opd slip" },
  { icon: "i-card", title: "Billing in seconds", text: "One-click buttons for common tests, your own price list, and cash, UPI or card, even split.", keys: "billing bill payment cash upi card counter invoice" },
  { icon: "i-flask", title: "Tests & procedures", text: "Investigations, procedures and services from your price list, on the patient's bill.", keys: "tests lab investigation procedure pathology xray price list" },
  { icon: "i-bed", title: "Beds & admissions", text: "Live occupancy by ward. Bed charges are counted by the day automatically.", keys: "beds bed management ipd admission admit ward occupancy ot operation" },
  { icon: "i-file", title: "Discharge & final bill", text: "Advances, charges and discount in one bill, plus a printed discharge summary.", keys: "discharge final bill summary advance discount ipd bill" },
  { icon: "i-chart", title: "Collection reports", text: "Daily OPD, doctor revenue, bed occupancy and collection by payment mode.", keys: "reports collection daily revenue owner accounts income" },
  { icon: "i-users", title: "Staff & salaries", text: "Doctors with fees and registration details, employees and monthly salary tracking.", keys: "staff salaries salary employees doctors payroll" },
  { icon: "i-lock", title: "A login for each person", text: "Reception never sees revenue. Switch off a login the day someone leaves.", keys: "login logins password users roles access staff login security" },
  { icon: "i-shield", title: "ABHA & ABDM ready", text: "Records ABHA and patient consent, and prints your HFR and doctors' HPR IDs.", keys: "abha abdm hfr hpr consent government ayushman" },
  { icon: "i-rupee", title: "Change your own prices", text: "The owner edits the price list and beds, confirmed with their password.", keys: "prices price list rates edit change fees" },
  { icon: "i-db", title: "Your data, always", text: "Nightly encrypted backup, and download a full copy of your data any time.", keys: "backup data download export copy" }
];

const esc = value => String(value).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const waLink = text => CONFIG.whatsapp ? `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}` : null;
const $ = id => document.getElementById(id);

// Brand name everywhere; the header logo shows the second half in blue
for (const el of document.querySelectorAll("[data-brand]")) el.textContent = CONFIG.brand;
// Logo: first word in dark, the rest in blue ("Upchar SoftDesk"); one-word names split at the last capital
const split = CONFIG.brand.includes(" ") ? CONFIG.brand.match(/^(\S+ )(.+)$/) : CONFIG.brand.match(/^(.+?)([A-Z][a-z]+)$/);
document.querySelector("[data-brand-split]").innerHTML = split ? `${esc(split[1])}<b>${esc(split[2])}</b>` : esc(CONFIG.brand);
if ($("year")) $("year").textContent = new Date().getFullYear();

for (const el of document.querySelectorAll("[data-whatsapp]")) {
  const link = waLink(el.dataset.whatsapp);
  if (link) { el.href = link; el.target = "_blank"; el.rel = "noopener"; }
}

// Mobile menu
if ($("menuBtn")) {
const menuBtn = $("menuBtn"), menu = $("menu");
menuBtn.addEventListener("click", () => menuBtn.setAttribute("aria-expanded", String(menu.classList.toggle("open"))));
menu.addEventListener("click", e => { if (e.target.tagName === "A") { menu.classList.remove("open"); menuBtn.setAttribute("aria-expanded", "false"); } });
}

// Features
if ($("searchForm") || $("featureGrid")) {
if ($("featureGrid")) $("featureGrid").innerHTML = FEATURES.map((f, i) => `<div class="feature" data-i="${i}"><span class="ficon"><svg class="icon"><use href="#${f.icon}"/></svg></span><h3>${esc(f.title)}</h3><p>${esc(f.text)}</p></div>`).join("");
const featureEls = [...document.querySelectorAll(".feature")];

function findFeatures(query) {
  const words = query.toLowerCase().split(/[^a-z0-9]+/).filter(w => w.length > 1);
  if (!words.length) return [];
  return FEATURES.map((f, i) => ({ i, score: words.filter(w => (f.keys + " " + f.title.toLowerCase()).includes(w)).length })).filter(r => r.score).sort((a, b) => b.score - a.score);
}
let hitTimer;
function showFeatures(query) {
  const hits = findFeatures(query);
  featureEls.forEach(el => el.classList.remove("hit"));
  if (!hits.length) return false;
  const best = hits[0].score;
  hits.filter(h => h.score === best).forEach(h => featureEls[h.i].classList.add("hit"));
  featureEls[hits[0].i].scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "center" });
  clearTimeout(hitTimer);
  hitTimer = setTimeout(() => featureEls.forEach(el => el.classList.remove("hit")), 4000);
  return true;
}
function search(q) {
  const msg = $("searchMsg");
  if (!q) { if (msg) msg.textContent = "Type what you need, for example billing or beds."; return; }
  if (!$("featureGrid")) {
    if (!findFeatures(q).length) { if (msg) msg.textContent = `We couldn't find "${q}". Ask us on WhatsApp, we may already do it.`; return; }
    location.href = "/features/?q=" + encodeURIComponent(q) + "#features"; return;
  }
  if (msg) msg.textContent = showFeatures(q) ? "" : `We couldn't find "${q}". Ask us on WhatsApp, we may already do it.`;
}
if ($("searchForm")) $("searchForm").addEventListener("submit", e => { e.preventDefault(); search($("q").value.trim()); });
document.querySelectorAll(".chip").forEach(c => c.addEventListener("click", () => { if ($("q")) $("q").value = c.dataset.q; search(c.dataset.q); }));
const startQuery = new URLSearchParams(location.search).get("q");
if (startQuery && $("featureGrid")) setTimeout(() => showFeatures(startQuery), 300);
}

// Carousel
if ($("track")) {
const track = $("track"), prev = $("prevBtn"), next = $("nextBtn");
const step = () => { const c = track.querySelector(".card"); return c ? c.getBoundingClientRect().width + 20 : 300; };
prev.addEventListener("click", () => track.scrollBy({ left: -step(), behavior: "smooth" }));
next.addEventListener("click", () => track.scrollBy({ left: step(), behavior: "smooth" }));
function arrows() { prev.disabled = track.scrollLeft < 8; next.disabled = track.scrollLeft + track.clientWidth > track.scrollWidth - 8; }
track.addEventListener("scroll", arrows, { passive: true }); addEventListener("resize", arrows); arrows();
}

// Screens with an enlarge view
if ($("screenCards")) {
$("screenCards").innerHTML = SCREENS.map((s, i) => `<article class="shot"><button type="button" data-shot="${i}" aria-label="Enlarge: ${esc(s.title)}"><img src="${esc(s.img)}" alt="${esc(s.title)}" loading="lazy"></button><span class="cat">${esc(s.cat)}</span><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></article>`).join("");
const viewer = $("viewer");
$("screenCards").addEventListener("click", e => {
  const b = e.target.closest("[data-shot]"); if (!b) return;
  const s = SCREENS[b.dataset.shot];
  $("viewerTitle").textContent = s.title; $("viewerImg").src = s.img; $("viewerImg").alt = s.title;
  if (viewer.showModal) viewer.showModal(); else viewer.setAttribute("open", "");
});
$("viewerClose").addEventListener("click", () => viewer.close ? viewer.close() : viewer.removeAttribute("open"));
viewer.addEventListener("click", e => { if (e.target === viewer) viewer.close(); });
}

// Numbers and price
if ($("stats")) $("stats").innerHTML = CONFIG.numbers.map(n => `<div class="stat"><b>${esc(n.value)}</b><span>${esc(n.label)}</span></div>`).join("");
if ($("price")) $("price").firstChild.textContent = CONFIG.price + " ";

// Demo and tour links
if ($("demoLink")) $("demoLink").href = CONFIG.demoUrl;
if ($("tourLink")) { $("tourLink").href = CONFIG.tourUrl; $("tourLink").removeAttribute("target"); }

// Team
if ($("teamList")) {
$("teamList").innerHTML = CONFIG.team.map(m => `
  <article class="member">
    <div class="photo">${m.photo && /^(https:\/\/|\/img\/)/.test(m.photo) ? `<img src="${esc(m.photo)}" alt="${esc(m.name)}" loading="lazy">` : `<svg class="icon" role="img" aria-label="Photo to be added"><use href="#i-person"/></svg>`}</div>
    <div class="member-body"><h3>${esc(m.name)}</h3><div class="role">${esc(m.role)}</div>${m.qual ? `<div class="qual">${esc(m.qual)}</div>` : ""}<p>${esc(m.about)}</p></div>
  </article>`).join("");
}

// Reviews: only real ones
if ($("reviews")) {
$("reviews").innerHTML = CONFIG.reviews.length
  ? CONFIG.reviews.map(r => `<blockquote class="quote" style="margin:0"><div class="qmark">“</div><div style="color:var(--amber)">${"★".repeat(r.stars || 5)}</div><p>${esc(r.text)}</p><footer><b style="color:var(--ink)">${esc(r.name)}</b>, ${esc(r.place)}</footer></blockquote>`).join('<hr style="border:none;border-top:1px solid var(--line);margin:0">')
  : `<div class="empty"><b>Be the first doctor to share feedback</b><span>We are collecting feedback from our first hospitals and doctors. Yours could be the first one here.</span></div>`;
}

// Contact details
if ($("contactList")) {
const contacts = [];
if (CONFIG.whatsapp) contacts.push({ icon: "i-chat", label: "WhatsApp", value: "+" + CONFIG.whatsapp, link: waLink("Hello, I would like a demo of your hospital software.") });
if (CONFIG.phone) contacts.push({ icon: "i-phone", label: "Phone", value: CONFIG.phone, copy: true });
if (CONFIG.email) contacts.push({ icon: "i-mail", label: "Email", value: CONFIG.email, copy: true });
contacts.push({ icon: "i-pin", label: "Location", value: CONFIG.city });
if (!CONFIG.whatsapp && !CONFIG.phone) contacts.unshift({ icon: "i-phone", label: "Phone & WhatsApp", value: "Being added. Use the form to leave your number and we'll call you." });
$("contactList").innerHTML = contacts.map(c => `
  <div class="citem"><span class="cicon"><svg class="icon"><use href="#${c.icon}"/></svg></span><div><b>${esc(c.label)}</b>
  ${c.link ? `<a href="${esc(c.link)}" target="_blank" rel="noopener">${esc(c.value)}</a>` : `<span>${esc(c.value)}</span>`}
  ${c.copy ? `<button type="button" class="copy" data-copy="${esc(c.value)}">Copy</button>` : ""}</div></div>`).join("");
document.addEventListener("click", async e => {
  const btn = e.target.closest("[data-copy]"); if (!btn) return;
  try { await navigator.clipboard.writeText(btn.dataset.copy); btn.textContent = "Copied"; }
  catch { const r = document.createRange(); r.selectNodeContents(btn.previousElementSibling); getSelection().removeAllRanges(); getSelection().addRange(r); btn.textContent = "Selected"; }
  setTimeout(() => (btn.textContent = "Copy"), 1500);
});
}

// Company details: only real ones
if ($("companyDetails")) {
const co = CONFIG.company;
const rows = [["Name", co.legalName], ["Type", co.type], ["CIN", co.cin], ["Udyam", co.udyam], ["GSTIN", co.gstin], ["Address", co.address || (co.legalName ? CONFIG.city : "")]].filter(r => r[1]);
$("companyDetails").innerHTML = rows.length
  ? rows.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join("")
  : `<dt>Status</dt><dd>Company registration in progress</dd><dt>Based in</dt><dd>${esc(CONFIG.city)}</dd>`;
}

// Star rating
if ($("stars")) {
let rating = 5;
const starsBox = $("stars");
function drawStars() {
  starsBox.innerHTML = [1, 2, 3, 4, 5].map(n => `<button type="button" role="radio" aria-checked="${n === rating}" aria-label="${n} star${n > 1 ? "s" : ""}" class="${n <= rating ? "on" : ""}" data-star="${n}">★</button>`).join("");
}
starsBox.addEventListener("click", e => { const b = e.target.closest("[data-star]"); if (b) { rating = Number(b.dataset.star); drawStars(); } });
drawStars();
}

// Forms open WhatsApp with the message written out
function sendWhatsApp(text, errorEl) {
  const link = waLink(text);
  if (!link) { errorEl.classList.toggle("ok", false); errorEl.textContent = "Our WhatsApp number is being added. Please try again soon."; return; }
  // A real link always works, even where the page may not open windows by itself
  errorEl.classList.add("ok");
  errorEl.innerHTML = 'Your message is ready. <a class="btn btn-sky" target="_blank" rel="noopener" href="' + esc(link) + '">Open WhatsApp to send</a>';
  try { window.open(link, "_blank"); } catch (e) { /* the button above still works */ }
}
if ($("linkForm")) $("linkForm").addEventListener("submit", e => {
  e.preventDefault();
  const phone = $("lPhone").value.replace(/\D/g, ""), err = $("lError");
  if (phone.length !== 10) { err.classList.toggle("ok", false); err.textContent = "Please enter a 10-digit mobile number."; return; }
  sendWhatsApp(`Please send me the ${CONFIG.brand} demo link.\nMy mobile: ${$("lCode").value} ${phone}`, err);
});
if ($("feedbackForm")) $("feedbackForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = $("fbName").value.trim(), text = $("fbText").value.trim(), err = $("fbError");
  if (!name || !text) { err.classList.toggle("ok", false); err.textContent = "Please add your name and your feedback."; return; }
  sendWhatsApp(`Feedback for ${CONFIG.brand}\nName: ${name}\nHospital/clinic: ${$("fbPlace").value.trim() || "-"}\nRating: ${"★".repeat(rating)} (${rating}/5)\n\n${text}`, err);
});
if ($("contactForm")) $("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = $("cName").value.trim(), phone = $("cPhone").value.replace(/\D/g, ""), err = $("cError");
  if (!name || phone.length < 10) { err.classList.toggle("ok", false); err.textContent = "Please add your name and a 10-digit mobile number."; return; }
  sendWhatsApp(`Demo request for ${CONFIG.brand}\nName: ${name}\nMobile: ${phone}\nHospital/clinic: ${$("cPlace").value.trim() || "-"} (${$("cType").value})\n${$("cMsg").value.trim()}`, err);
});
