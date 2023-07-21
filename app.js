// Navigation Logic

var overscroll = function(el) {
  el.addEventListener('touchstart', function() {
    var top = el.scrollTop
      , totalScroll = el.scrollHeight
      , currentScroll = top + el.offsetHeight

    //If we're at the top or the bottom of the containers
    //scroll, push up or down one pixel.
    //
    //this prevents the scroll from "passing through" to
    //the body.
    if(top === 0) {
      el.scrollTop = 1
    } else if(currentScroll === totalScroll) {
      el.scrollTop = top - 1
    }
  })

  el.addEventListener('touchmove', function(evt) {
    //if the content is actually scrollable, i.e. the content is long enough
    //that scrolling can occur
    if(el.offsetHeight < el.scrollHeight)
      evt._isScroller = true
  })
}

overscroll(document.querySelector('.scroll'));

document.body.addEventListener('touchmove', function(evt) {
  //In this case, the default behavior is scrolling the body, which
  //would result in an overflow.  Since we don't want that, we preventDefault.
  if(!evt._isScroller) {
    evt.preventDefault()
  }
})


startPage = document.querySelectorAll(".wrapperhome").item(0);
showCase = document.querySelectorAll(".wrapper").item(0);
question = document.getElementById('question');
questionCount = 0;

function switchToShowcase() {

  if(getComputedStyle(showCase).visibility == "hidden" || "undefined") {
    if(questionCount <=2) {
      showCase.style.visibility = "visible";
      startPage.style.visibility = "hidden";
      questionPeriod();
    } else {
      showCase.style.visibility = "hidden";
      startPage.style.visibility = "visible"
      questionCount = 0;
      console.log("backhome")
    }
  }
}

document.getElementById('startButton').addEventListener('click', switchToShowcase)

//QuestionCounter

function infuseQuestion() {
  questionCount+=1
  console.log(questionCount);
  if(questionCount == 1) {
    question.textContent = "How do you feel today?";
    console.log("infused!");
  }
  if(questionCount == 2) {
    question.textContent = "Is this a high-energy feeling?"
    console.log("infused!");
  }
  if (questionCount == 3) {
    question.textContent = "Do you feel in control of the situation?"
    console.log("infused!");
  }


}


//Timer Logic für drawingPeriod

function questionPeriod() {
  console.log("questioningStarted")
  infuseQuestion();
  question.style.visibility = "visible"; // Show the element
  const seconds = 4; // Set the timer duration in seconds
  let remainingSeconds = seconds;

  const timerInterval = setInterval(() => {
    remainingSeconds--;

    if (remainingSeconds <= 0) {
      clearInterval(timerInterval);
      // Call the function to change visibility when the timer reaches zero
      question.style.visibility = "hidden"; // Hide the element after 2 seconds (example)
      drawingPeriod();
    }
  }, 1000); // 1000 milliseconds = 1 second
}

function drawingPeriod() {
  console.log("drawingStarted")

  const seconds = 10; // Set the timer duration in seconds
  let remainingSeconds = seconds;
  const loadingBar = document.getElementById("loadingBar");

  const timerInterval = setInterval(() => {
    remainingSeconds--;
    const progress = (seconds - remainingSeconds) / seconds;
    loadingBar.style.width = progress * 100 + "%";

    if (remainingSeconds <= 0) {
      clearInterval(timerInterval);
      loadingBar.style.width = "0";
      // Call the function to change visibility when the timer reaches zero


      if(questionCount<=2) {
        questionPeriod();
      } else {
        switchToShowcase();
      }

    }
  }, 1000); // 1000 milliseconds = 1 second
}

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