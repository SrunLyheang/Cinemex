// Category 
const categoryButton = document.querySelector('.nav-categories');
const category = document.querySelector('#categories');

if (categoryButton && category) {
  categoryButton.addEventListener('click', () => {
    category.classList.toggle('open');
  });
}
// Hamburger menu
const hamburgerBtn = document.getElementById('hamburgerBtn');
const navLinks = document.querySelector('.nav-links');

if (hamburgerBtn && navLinks) {
  hamburgerBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

// Search button
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const noResultsMsg = document.getElementById('noResultsMsg');
let totalVisible = 0;

function filterMovies() {
  if (!searchInput) return;

  const query = searchInput.value.trim().toLowerCase();
  totalVisible = 0;

  document.querySelectorAll('.section').forEach((section) => {
    const cards = section.querySelectorAll('.movie-card');
    let visibleInSection = 0;

    cards.forEach((card) => {
      const title = card.querySelector('h3')
      const searchableText = (title?.textContent || '').toLowerCase();
      const isMatch = searchableText.includes(query) // Check does the movie title contain what user type
      card.style.display = isMatch ? '' : 'none'; // if match show the card, if not hide the card
      if (isMatch) {
        visibleInSection++;
        totalVisible++;
      }// if match add 1 to both counter
    });
    // Only check sections that actually have movies in them
    if (cards.length > 0) {
      section.style.display = visibleInSection > 0 ? '' : 'none';
      // Show the section if at least one movie matched, otherwise hide it

    }
  });

  // Hides the hero banner while searching
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    heroSection.style.display = query !== '' ? 'none' : '';// if user types something Hide the hero banner
  }

  if (noResultsMsg) {
    noResultsMsg.style.display = totalVisible === 0 && query !== '' ? 'block' : 'none';
  }// if nothing match and user type show no results message
}
// Shows the "no results" message only if there's an active search and nothing match
if (searchInput) {
  searchInput.addEventListener('input', filterMovies);//Every time the user types a letter into the search box, run the filterMovies function
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') e.preventDefault(); //prevent enter key from its default which is submitting
  });
}

if (searchButton) {
  searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    filterMovies();
  });
}

// Hero section slider
// creates an array
const heroSlides = [
  { bgUrl: "assets/imagehorror/colony.png" },
  { bgUrl: "assets/imageJuly/Spider.jpg" },
  { bgUrl: "assets/imageJuly/Obsession.jpg" },
  { bgUrl: "assets/imageJuly/supergirl.avif" },
  { bgUrl: "assets/imageJuly/minion.jpg" },
];

let currentSlideIndex = 0;
const heroBg = document.getElementById('heroBg');

function changeHeroSlide() {
  if (!heroBg) return;

  heroBg.classList.add('fade-out');

  setTimeout(() => {
    currentSlideIndex = (currentSlideIndex + 1) % heroSlides.length;
    const slide = heroSlides[currentSlideIndex];
    heroBg.style.backgroundImage = `url('${slide.bgUrl}')`;
    heroBg.classList.remove('fade-out');
  }, 800);
}

setInterval(changeHeroSlide, 5000); // runs the code automatically 5 seconds