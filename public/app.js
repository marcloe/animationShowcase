let animation = bodymovin.loadAnimation({
    // animationData: { /* ... */ },
    container: document.getElementById('map'), // required
    path: 'data.json', // required
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
    animation.goToAndStop(animFrame, true);
})

document.addEventListener('touchend', e => {
    frozenFrame = animFrame;
    animFrame = 0;
    animation.goToAndStop(frozenFrame, true);
})