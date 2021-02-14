/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
const unOrderedList = document.getElementById("navbar__list");
const sections = document.querySelectorAll("section");
const container = document.createDocumentFragment();
let anchors = [];
var scrollToTop = document.querySelector(".scroll_to_top");
var timeOut;

/**
 * End Global Variables
 * Start Helper Functions
 *
 */
var isInViewport = function (elem) {
  var bounding = elem.getBoundingClientRect();
  return bounding.top >= 0 && bounding.bottom <= window.innerHeight;
};
var showNav = () => {
  document.querySelector(".page__header").style.display = "block";
  if (timeOut != null) {
    clearTimeout(timeOut);
  }
  timeOut = setTimeout(() => {
    document.querySelector(".page__header").style.display = "none";
  }, 5000);
};
scrollToTop.addEventListener("click", (event) => {
  event.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
/**
 * End Helper Functions
 * Begin Main Functions
 *
 */
// build the nav
const buildMenu = () => {
  sections.forEach((section) => {
    let anchor = document.createElement("a");
    anchor.classList.add("menu__link");
    let listItem = document.createElement("li");
    anchor.setAttribute("href", `#${section.id}`);
    anchor.textContent = section.getAttribute("data-nav");
    anchors.push(anchor);
    listItem.appendChild(anchor);
    container.appendChild(listItem);
  });
  unOrderedList.appendChild(container);
};
// Add class 'active' to section when near top of viewport
const activeSection = () => {
  window.addEventListener("scroll", () => {
    sections.forEach((section, index) => {
      if (isInViewport(section)) {
        section.classList.add("your-active-class");
        anchors[index].classList.add("active");
      } else {
        section.classList.remove("your-active-class");
        anchors[index].classList.remove("active");
      }
    });
  });
};
// Scroll to anchor ID using scrollTO event
const scrolling = () => {
  anchors.forEach((a, index) => {
    a.addEventListener("click", (event) => {
      event.preventDefault();
      window.scrollTo({
        top: sections[index].offsetTop,
        behavior: "smooth",
      });
    });
  });
};
//Toggle Display to the Nav Bar
window.addEventListener("scroll", showNav);
//Toggle Display to the Scroll To Top Buttom
window.addEventListener("scroll", () => {
  if (window.scrollY > 760) {
    scrollToTop.style.display = "inline";
  } else {
    scrollToTop.style.display = "none";
  }
});
/**
 * End Main Functions
 * Begin Events
 *
 */
// Build menu
buildMenu();
// Scroll to section on link click
scrolling();
// Set sections as active
activeSection();
