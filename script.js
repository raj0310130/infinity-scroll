const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0; 
let photosArray = [];


// UNsplash API
const count = 15;
const apiKey = "vxkOBW1CA8keWkKqAdfoAkYavBnE4ABXTGqJJ7KJJ_k";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check all images were loaded

function imageLoaded () {
imagesLoaded++;
if (imagesLoaded === totalImages) {
 ready = true;
 loader.hidden = true;
}
}

// Create elements for links and photos, and add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run function for each object in photosarray
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement("a");
        item.setAttribute("href", photo.links.html);
        item.setAttribute("target", "_blank");
        // Create <img> for photo
        const img = document.createElement("img");
        img.setAttribute("src", photo.urls.regular);
        img.setAttribute("alt", photo.alt_description);
        img.setAttribute("title", photo.alt_description);
        // Event Listener, check when each is finished laoding
        img.addEventListener("load", imageLoaded);
        // Put img into <a>, and the putting both in imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);

    });

}


// Get photos from Unsplash API
async function getPhotos() {
    try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
    }
    catch (error) {
        // catch errors here
    }
 
}

// Check to see if scrolling near the bottom of page, load more photos

window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
});


// Loading functions
getPhotos();