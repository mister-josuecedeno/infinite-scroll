const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let count = 5;
const apiKey = 'REMOVED to PROTECT APIKEY';
let apiUrl = `download.json`;

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;

  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    count = 10;
  }
}

// Helper function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create elements for Links and Photos -> Add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;

  // ForEach
  photosArray.forEach((photo) => {
    // Create <a> to link to unsplash
    const item = document.createElement('a');

    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });

    // Create <img> for photo
    const img = document.createElement('img');

    setAttributes(img, {
      src: photo.urls.small,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // Event Listener, check when each is finished loading
    img.addEventListener('load', imageLoaded);

    // EXTRA CREDIT - create div to capture photographer information
    const divContentImg = document.createElement('div');
    divContentImg.classList.add('content_img');
    divContentImg.appendChild(item);

    const divImgText = document.createElement('div');

    // put img inside the <a>, then put both inside the imagecontainer element
    item.appendChild(img);

    // EXTRA CREDIT - Add div to capture photographer description
    divContentImg.appendChild(divImgText);
    divImgText.innerText = 'Photo credit: ' + photo.user.name;

    //imageContainer.appendChild(item);
    imageContainer.appendChild(divContentImg);
  });
}

//  Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    // Catch error here
    console.error(error);
  }
}

// Check to see if scrilling near bottom of page Load More Photos
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// On load
getPhotos();
