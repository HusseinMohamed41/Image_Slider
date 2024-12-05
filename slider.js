// Get the DOM elements for the image-box
let wrapper = document.querySelector(".wrapper"),
  imageBox = document.querySelector(".image-box"),
  images = document.querySelectorAll("img"),
  buttons = document.querySelectorAll(".button")

//Add Pagination Indicators

// Create The Main UL Element
var paginationElement = document.createElement('ul');

// Set ID On Created Ul Element
paginationElement.setAttribute('id', 'pagination-ul');

// Create List Items Based On Slides Count
for (var i = 1; i <= images.length; i++) {

  // Create The LI
  var paginationItem = document.createElement('li');

  // Set Custom Attribute
  paginationItem.setAttribute('data-index', i);

  // Append Items to The Main Ul List
  paginationElement.appendChild(paginationItem);

}

// Add The Created UL Element to The Page
document.getElementById('indicators').appendChild(paginationElement);





let imageIndex = 0,
  intervalid;



// Get Pagination Items | Array.form [ES6 Feature]
var paginationsBullets = Array.from(document.querySelectorAll('#pagination-ul li'));

// Loop through All Bullets Items
for (let i = 0; i < paginationsBullets.length; i++) {
  paginationsBullets[i].onclick = function () {
    imageIndex = parseInt(this.getAttribute('data-index') - 1);
    slideImage()
    theChecker()
  }
}

// Trigger The checker function
theChecker()

// Define function to start automatic image slider
const autoSlide = () => {
  // Start the slideshow by calling slideImage() every 2 seconds
  intervalid = setInterval(() => slideImage(++imageIndex), 2000);
};

// call autoSlide func on page load
autoSlide()

// A function that updates the image-box display to show specified image
const slideImage = () => {
  // Calculate the updated image index
  imageIndex = imageIndex === images.length ? 0 : imageIndex < 0 ? images.length - 1 : imageIndex;
  imageBox.style.transform = `translate(-${(imageIndex) * 100}%)`
  theChecker()

};


// A function that updates the image-box display to show the next or previous image
const updateClick = (e) => {
  // Stop the automatic slideshow
  clearInterval(intervalid);
  //calculate the updated image index on the button clicked
  imageIndex += e.target.id === "next" ? 1 : -1;
  slideImage(imageIndex);
  // Restart the automatic slide show
  autoSlide();
}

// Add event listeners to the navigation buttons
buttons.forEach((button) => button.addEventListener("click", updateClick))

// Add mouseover event listener to wrapper element to stop auto sliding
wrapper.addEventListener("mouseover", () => clearInterval(intervalid));
// Add mouseleave event listener to wrapper element to start auto sliding again
wrapper.addEventListener("mouseleave", autoSlide);

// Create the checker Function
function theChecker() {

  removeAllActive();

  // Set Active class on Current Slide
  images[imageIndex].classList.add('active');

  // Set Active class on Current pagination Item
  paginationElement.children[imageIndex].classList.add('active');
}


// Remove All Active Classes From Images and Pagination Bullets
function removeAllActive() {

  // Loop Through Images
  images.forEach(function (img) {

    img.classList.remove('active');

  });

  // Loop Through Pagination Bullets
  paginationsBullets.forEach(function (bullet) {

    bullet.classList.remove('active');

  });

}

// Swipe Functionality

let isDragStart = false,
  prevPageX,
  prevScrollLeft;

const dragStart = (e) => {
  // updatating global variables value on mouse down event
  isDragStart = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = imageBox.scrollLeft;
}
const dragging = (e) => {
  // scrolling images to left according to mouse pointer
  if (!isDragStart) return;
  e.preventDefault();
  let positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
  imageBox.scrollLeft = prevScrollLeft - positionDiff;
}

const dragStop = () => {
  isDragStart = false;
}

imageBox.addEventListener("mousedown", dragStart);
imageBox.addEventListener("mousemove", dragging);
imageBox.addEventListener("mouseup", dragStop);

// For Mobile Phones
imageBox.addEventListener("touchstart", dragStart);
imageBox.addEventListener("touchmove", dragging);
imageBox.addEventListener("touchend", dragStop);
