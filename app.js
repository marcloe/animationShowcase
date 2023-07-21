if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
  // When ready, auto-scroll 1px to hide URL bar
  window.addEventListener("load", function () {
      // Set a timeout...
      setTimeout(function () {
          // Hide the address bar!
          window.scrollTo(0, 1);
      }, 0);
  });
}

// Navigation Logic

startPage = document.querySelectorAll(".wrapperhome").item(0);
showCase = document.querySelectorAll(".wrapper").item(0);

function switchToShowcase() {

  if(getComputedStyle(showCase).visibility == "hidden" || "undefined") {
      showCase.style.visibility = "visible";
      startPage.style.visibility = "hidden";
    }
    else {
      showCase.style.visibility = "hidden";
      startPage.style.visibility = "visible"
  }
  console.log("click!")
}

document.getElementById('startButton').addEventListener('click', switchToShowcase)

//Animation Loader

let animation1 = bodymovin.loadAnimation({
    // animationData: { /* ... */ },
    container: document.getElementById('map'), // required
    path: 'data1.json', // required
    renderer: 'svg', // required
    loop: false, // optional
    autoplay: false, // optional
    name: "Demo Animation", // optional
});

let touchstartY = 0;
let touchposY = 0;
let realWay;
let maxWay = document.getElementById('map').offsetHeight;
let frameAmount = 90
let frozenFrame = 0;
let animFrame = 0;
let moveDirectionUp = false;

function checkLength() {
  if (touchposY < touchstartY) { //up
    realWay = touchstartY-touchposY;
    moveDirectionUp = true;
    // console.log("UP");
  }
  if (touchposY > touchstartY) { //down
    realWay = touchposY - touchstartY;
    moveDirectionUp = false;
    // console.log("UP");
  }
//   console.log(realWay);
}

document.addEventListener('touchstart', e => {
  touchstartY = e.changedTouches[0].screenY;
  console.log(touchstartY);
  console.log("touchstarted")
})

document.addEventListener('touchmove', e => {
    touchposY = e.changedTouches[0].screenY;
    console.log(touchposY);
    checkLength();

    if (moveDirectionUp) {
        animFrame = frozenFrame+(frameAmount*realWay/maxWay);
        if (animFrame>89) {animFrame=89}
    }

    if (!moveDirectionUp) {
        animFrame = frozenFrame-(frameAmount*realWay/maxWay);
        if (animFrame<1) {animFrame=1}
    }
    console.log(animFrame);
    animation1.goToAndStop(animFrame, true);
})

document.addEventListener('touchend', e => {
    frozenFrame = animFrame;
    animFrame = 0;
    animation1.goToAndStop(frozenFrame, true);
})