const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let totalImages = 0;
let imagesLoaded = 0;
let isReady = false;
let arrayOfPhotos = [];

const count = 10;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${accessKey}&count=${count}`;

// function to get array of photos from Unsplash server
async function getPhotos() {
  try {
    isReady = false;
    const response = await fetch(apiUrl);
    arrayOfPhotos = await response.json();
    console.log("Images fetched successfully.");
  } catch (err) {
    console.log(err, "Failed to fetch images");
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



