const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let totalImages = 0;
let imagesLoaded = 0;
let isReady = false;
let arrayOfPhotos = [];

// Display error message
function showErrorMessage(message) {
  const brokenImage = document.createElement('img');
  brokenImage.setAttribute('src', 'images/broken image.png');

  const errText = document.createElement('p');
  errText.className = 'err-text';
  errText.textContent = message;

  const retryBtn = document.createElement('button');
  retryBtn.className = 'retry-btn';
  retryBtn.textContent = 'Retry';

  const errDiv = document.createElement('div');
  errDiv.className = 'err-message';

  errDiv.appendChild(brokenImage);
  errDiv.appendChild(errText);
  errDiv.appendChild(retryBtn);

  setTimeout(() => {
    imageContainer.appendChild(errDiv);
  }, 2000);

  retryBtn.addEventListener('click', () => {
    imageContainer.removeChild(errDiv);
    loader.hidden = false;
    loadAndDisplayPhotos();
  });
}

const count = 10;
// const apiUrl = '/api/photos';
const backendUrl = 'https://infinite-image-scroll-backend.onrender.com/api/photos';


// function to get array of photos from Unsplash server
async function getPhotos() {
  try {
    isReady = false;
    const response = await fetch(backendUrl);

    if (!response.ok)
      throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    if (!Array.isArray(data))
      throw new Error("Unexpected response format from backend");

    console.log("Images fetched successfully");
    arrayOfPhotos = data;
  } catch (err) {
    console.log("Failed to fetch images", err);
    showErrorMessage("Oops! We're having trouble loading images. Please try again later.");
  }
}

function shoulLoadMoreImages() {
  imagesLoaded++;
  console.log("imagesLoaded");
  if (imagesLoaded === totalImages) isReady = true;
}

// function to set attributes
function setAttributes(element, attributes) {
  for (let key in attributes)
    element.setAttribute(key, attributes[key]);
}

// function to create box, image element and append in image container
function displayPhotos() {
  loader.hidden = true;
  totalImages = arrayOfPhotos.length;
  arrayOfPhotos.forEach(photo => {
    // create <div> with class box to contain everything
    const box = document.createElement('div');
    // set attributes of box
    setAttributes(box, {
      class: 'box'
    });

    // create <a> to link to Unsplash website
    const item = document.createElement('a');
    // set attributes of item
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank'
    });

    // create image element
    const image = document.createElement('img');
    // set attributes of image
    setAttributes(image, {
      src: photo.urls.regular
      // alt: photo.alt_description,
      // title: photo.alt_description
    });

    // create <a> to link to Unsplash website
    const imageTitle = document.createElement('a');
    setAttributes(imageTitle, {
      href: photo.links.html,
      target: '_blank',
      class: 'img-title'
    })
    imageTitle.textContent = photo.alt_description;

    const overlay = document.createElement('a');
    setAttributes(overlay, {
      href: photo.links.html,
      target: '_blank',
      class: 'overlay'
    })

    image.addEventListener('load', shoulLoadMoreImages);

    // append image in achor
    item.appendChild(image);
    // append anchor in div
    box.appendChild(item);
    // append image title in div
    box.appendChild(imageTitle);
    // append overlay in div
    box.appendChild(overlay);
    // finally append div in image container
    imageContainer.appendChild(box);
  });
  imagesLoaded = 0;
  arrayOfPhotos = [];
}

// Back to Top btn
const backToTopBtn = document.getElementById("backToTopBtn");
let hideTimeout;
let lastScrollTop = window.scrollY;

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Evenet listeners
window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;

  // Show Back to Top btn
  if (currentScroll < lastScrollTop && currentScroll > 100) {
    // User scrolled up and has scrolled down at least 100px
    backToTopBtn.classList.add("show");

    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
      backToTopBtn.classList.remove("show");
    }, 2000);
  } else {
    // hide immediately when scrolling down
    backToTopBtn.classList.remove("show");
  }

  lastScrollTop = currentScroll;

  // Load more images if user is near the bottom
  if ((window.scrollY + window.innerHeight) >= (document.body.offsetHeight - 1000) && isReady) {
    console.log("load more!");
    loadAndDisplayPhotos();
    isReady = false;
  }
});

// function to call getPhotos() and then displayPhotos() synchronously
async function loadAndDisplayPhotos() {
  await getPhotos();
  // waiting for getPhotos() to assign arrayOfPhotos
  displayPhotos();
}


// Initially loading and displaying images
loadAndDisplayPhotos();



