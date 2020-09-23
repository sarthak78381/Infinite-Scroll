const divMain = document.createElement("div");
const imagecontainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
const button = document.getElementById("button");
button.hidden = true;
let ready = false;
let imageLoaded = 0;
let totalImage = 0;
let counter = 0;
function loadImage() {
  console.log("image loaded");
  imageLoaded++;
  loader.hidden = true;
  if (imageLoaded === totalImage) {
    ready = true;
    imageLoaded = 0;
  }
}

button.addEventListener("click", () => location.reload());

// Unsplash api
const count = 10;
const apiKey = "kFEs_8BMDOzrkbpbPzT_NN5GBPrPvbzBkpRi00n9cc8";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
// Get photos from Unsplash
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    addphoto(data);
  } catch (error) {
    let times = solve();
    if (times === 10) {
      button.hidden = false;
      loader.hidden = true;
    } else {
      getPhotos();
    }
  }
}

function solve() {
  counter++;
  return counter;
}

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function translation(arr) {
  for (let i = 0; i < 10; i++) {
    if (i % 2 === 0) {
      let div1 = document.createElement("div");
      div1.setAttribute("data-aos", "flip-right");
      div1.appendChild(arr[i]);
      imagecontainer.appendChild(div1);
    } else {
      let div2 = document.createElement("div");
      div2.setAttribute("data-aos", "flip-left");
      div2.appendChild(arr[i]);
      imagecontainer.appendChild(div2);
    }
  }
}

function addphoto(data) {
  let arr = [];
  totalImage = data.length;
  data.forEach((element) => {
    let item = document.createElement("a");
    let img = document.createElement("img");
    setAttributes(img, {
      src: element.urls.regular,
      alt: element.alt_description,
      title: element.alt_description,
    });
    setAttributes(item, {
      href: element.links.html,
      target: "_blank",
    });
    img.addEventListener("load", loadImage);
    item.appendChild(img);
    arr.push(item);
  });
  translation(arr);
}

// check to see if scrolling near bottom of page, to load more photos
window.addEventListener("scroll", function () {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
    ready === true
  ) {
    getPhotos();
    ready = false;
    loader.hidden = false;
  }
});

getPhotos();
