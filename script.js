const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let totalImages = 0;
let imagesLoaded = 0;
let isReady = false;
let arrayOfPhotos = [];

// const accessKey = 'fjXo-yj-oangq1X0B08w53y2p_FScXAFmGycS959mfs';
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

// function to call getPhotos() and then displayPhotos() synchronously
async function loadAndDisplayPhotos() {
  await getPhotos();
  // waiting for getPhotos() to assign arrayOfPhotos
  displayPhotos();
}

// Evenet listeners
window.addEventListener('scroll', () => {
  if ((window.scrollY + window.innerHeight) >= (document.body.offsetHeight - 1000) && isReady) {
    console.log("load more!");
    loadAndDisplayPhotos();
    isReady = false;
  }
})

// Initially loading and displaying images
loadAndDisplayPhotos();



