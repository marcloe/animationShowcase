//Mobile Web App for showcasing animations developed in semester 6 at University of the Arts Berlin

//Making all DOM elements in initial HTLM accessible

const containerElement = document.getElementById('container');
const wrapperElement = document.getElementById('wrapper');
const buttonElement = document.getElementById('button');

// Prepare Page Layout

function setupElements() {

  containerElement.style.height = window.innerHeight + 'px';

  setTimeout(() => {
    window.scrollTo(0, 1);
  }, 0);

  wrapperElement.style.height = (containerElement.clientHeight * 0.85) + 'px';
  buttonElement.style.height = (containerElement.clientHeight * 0.15) + 'px';
}

// Page management

const pages = {

  p0: undefined,
  p1: undefined,
  p2: undefined,
  p3: undefined,
  p4: undefined,
  get current() {
    return this[`p${goToPage.counter}`] || undefined},
};

//Get Frame Count

// Get the frame count of all JSON files

const frameAmount = [];

function fetchAndReadJSON(url) {
  return fetch(url)
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching JSON:', error);
      throw error;
    });
}

Promise.all([
  fetchAndReadJSON('./data1.json'),
  fetchAndReadJSON('./data3.json')
])
  .then(jsonDataArray => {
    frameAmount[0] = jsonDataArray[0].op;
    frameAmount[1] = jsonDataArray[1].op;
  });


// Handle resizes

function handleResize() {
  currentPage = window[`page${goToPage.counter}`];
  currentPage.create();
}

//Handle Resizes

function onResize() {
  setupElements();
  pages.current.create();
  swipeEngine.update();
}

//Contents: Button Texts

const buttonContent = {
  [0]: "Start",
  [1]: 'How do you feel today?',
  [2]: 'Is this a high-energy feeling?',
  [3]: 'Do you feel in control of the situation?',
  [4]: 'Restart showcase',
};

//Inject ButtonText

function injectButtonText() {
  button.textContent = buttonContent[goToPage.counter];
}

// StartPage

pages.p0 = (function() {
  let caption = "4 Interactions";
  let content = [
    "If you have not made yourself familiar with the booklet yet, take a look at it first!",
    "Especially the chapter «Studies», as the interaction studies featured here are iterations of these experiments.",
    "Walk through an exemplary input mask of the emotion diary:",
  ];
  const captionTag = document.createElement('p');
  captionTag.classList.add('caption');
  captionTag.appendChild(document.createTextNode(caption));

  const contentParagraphs = [];
  for (const paragraphText of content) {
    const paragraphTag = document.createElement('p');
    paragraphTag.classList.add('content');
    paragraphTag.appendChild(document.createTextNode(paragraphText));
    contentParagraphs.push(paragraphTag);
  }

  return {
    create: function() {
      wrapperElement.classList.add('text-only');
      wrapperElement.appendChild(captionTag);
      for (const paragraphTag of contentParagraphs) {
        wrapperElement.appendChild(paragraphTag);
      }
    },

    destroy: function() {
      while (wrapperElement.firstChild) {
        wrapperElement.removeChild(wrapperElement.firstChild);
      }
      wrapperElement.innerHTML = '';
      wrapperElement.classList.remove('text-only');
    },
  };
})();


//EndPage

pages.p4 = (function() {
  let caption = "Thank you.";
  let content = [
    "At this point - in a future version of the prototype - your input would be converted into a visualization of your emotional state.",
  ];

  const captionTag = document.createElement('p');
  captionTag.classList.add('caption');
  captionTag.appendChild(document.createTextNode(caption));

  const contentParagraphs = [];
  for (const paragraphText of content) {
    const paragraphTag = document.createElement('p');
    paragraphTag.classList.add('content');
    paragraphTag.appendChild(document.createTextNode(paragraphText));
    contentParagraphs.push(paragraphTag);
  }

  return {
    create: function() {
      wrapperElement.classList.add('text-only');
      wrapperElement.appendChild(captionTag);
      for (const paragraphTag of contentParagraphs) {
        wrapperElement.appendChild(paragraphTag);
      }
    },

    destroy: function() {
      while (wrapperElement.firstChild) {
        wrapperElement.removeChild(wrapperElement.firstChild);
      }
      wrapperElement.innerHTML = '';
      wrapperElement.classList.remove('text-only');
    },
  };
})();

//Animation 1

pages.p1 = (function () {
  let path = 'data1.json';
  let renderer = 'svg';
  let loop = false;
  let autoplay = false;
  let frames;
  let anim;
  let fixatedFrame;

  return {
    get anim() {
      return anim;
    },
    create: function() {
      anim = bodymovin.loadAnimation({
        path: path,
        container: wrapperElement,
        renderer: renderer,
        loop: loop,
        autoplay: autoplay,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      });
      frames = frameAmount[0];
      fixatedFrame = frames;
      anim.goToAndStop((frames/2),true);
      multiplicator = frames/swipeEngine.maxSwipeDist;
    },
    destroy: function() {
      anim.destroy();
      wrapperElement.innerHTML = '';
    },
    fixateFrame: function() {
      fixatedFrame = anim.currentFrame;
    },
    drawAnim: function(distance, moveUp) {
      let multiplicator = frames/swipeEngine.maxSwipeDist
      let subtractor = Math.round(multiplicator*distance);
      if (moveUp) {
        let goTo = (fixatedFrame - subtractor);
        if (goTo <= 1) {goTo = 0;}
        anim.goToAndStop(goTo,true);
      } else if (!moveUp) {
        let goTo = (fixatedFrame + subtractor);
        if (goTo >= frames) {goTo = frames-1;}
        anim.goToAndStop(goTo,true);
      };
    },
  }
})();

// Second Animation

pages.p2 = (function() {
  
  let anim;
  let fixatedAmp;
  let maxAmp;
  let amp;
    
  return {

    get anim() {
      return anim;
    },

    create: function() {

      maxAmp = wrapperElement.clientHeight/2;
      console.log(maxAmp);
      amp = maxAmp/2;

      let sketch = function(p) {

        p.setup = function() {
          let myCanvas = p.createCanvas(wrapperElement.clientWidth,wrapperElement.clientHeight);
          myCanvas.parent(wrapperElement);
          p.noLoop();
        };
    
        p.dampingFactor = function(x) {
            const dampingFactor = 0.05;
            return p.exp(-dampingFactor * x * x);
        };

        p.draw = function() {
          p.background(255);
          p.translate(p.width / 2, (p.height/3)*2);

          const halfWidth = p.width / 40;
          const stepSize = 0.05;

          p.stroke(128);
          p.strokeWeight(4);
          p.beginShape();

          for (let x = -halfWidth; x <= halfWidth; x += stepSize) {
            let y;
            if (x === 0) {
              y = 1;
            } else {
              y = p.sin(p.PI * x) / (p.PI * x);
            }
            
            y *= p.dampingFactor(x);
            
            p.vertex(x * 40, -y * (amp*1.2));
          }
          p.endShape();
        };

        p.drawUpdate = function(goTo) {
          amp = goTo
          p.redraw();
        };

        p.destroy = function() {
          p.remove();
        };
      };

      anim = new p5(sketch);
    },

    destroy: function() {
      anim.destroy();
      anim = null;
      while (wrapperElement.firstChild) {
        wrapperElement.removeChild(wrapperElement.firstChild);
      }
      wrapperElement.innerHTML = '';
    },

    fixateFrame: function() {
      fixatedAmp = amp;
    },

    drawAnim: function(distance, moveUp) {
      let multiplicator = maxAmp/swipeEngine.maxSwipeDist
      let subtractor = Math.round(multiplicator*(distance*1.5));
      if (moveUp) {
        let goTo = (fixatedAmp - subtractor);
        if (goTo <= 0) {goTo = 0;}
        anim.drawUpdate(goTo);
      } else if (!moveUp) {
        let goTo = (fixatedAmp + subtractor);
        if (goTo >= maxAmp) {goTo = maxAmp-1;}
        anim.drawUpdate(goTo);
      };
    },
  }
})();

// Third Animation

pages.p3 = (function () {
  let path = 'data3.json';
  let renderer = 'svg';
  let loop = false;
  let autoplay = false;
  let frames;
  let anim;
  let fixatedFrame;

  return {
    get anim() {
      return anim;
    },
    create: function() {
      anim = bodymovin.loadAnimation({
        path: path,
        container: wrapperElement,
        renderer: renderer,
        loop: loop,
        autoplay: autoplay,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      });
      frames = frameAmount[1];
      fixatedFrame = frames;
      anim.goToAndStop((frames/2),true);
      multiplicator = frames/swipeEngine.maxSwipeDist;
      console.log(multiplicator);
    },
    destroy: function() {
      anim.destroy();
      wrapperElement.innerHTML = '';
    },
    fixateFrame: function() {
      fixatedFrame = anim.currentFrame;
    },
    drawAnim: function(distance, moveUp) {
      let multiplicator = frames/swipeEngine.maxSwipeDist
      let subtractor = Math.round(multiplicator*distance);
      if (moveUp) {
        let goTo = (fixatedFrame - subtractor);
        if (goTo <= 1) {goTo = 0;}
        anim.goToAndStop(goTo,true);
      } else if (!moveUp) {
        let goTo = (fixatedFrame + subtractor);
        if (goTo >= frames) {goTo = frames-1;}
        anim.goToAndStop(goTo,true);
      };
    },
  }
})();

// Navigation

const goToPage = (function() {
  
  let counter = 0;

  return {
    get counter() {
      return counter;
    },

    first: function() {

      pages.p0.create();
      injectButtonText();
    },

    next: function() {

      pages.current.destroy();

      if (counter==4) {
        counter = 0;
      } else {
        counter++;
      };

      if (counter==0) {
        pages.p0.create();
      }
      if (counter==1) {
        pages.p1.create();
      }
      if (counter==2) {
        pages.p2.create();
      }
      if (counter==3) {
        pages.p3.create();
      }
      if (counter==4) {
        pages.p4.create();
      }
      injectButtonText();
    },
  }
})();

// Swipe

const swipeEngine = (function () {

  let pointA;
  let pointB;
  let distance;
  let maxSwipeDist;

  return {
    safeDiv: function(dividend, divisor) {
      if (divisor === 0) return 0;
      let result = dividend / divisor; 
      if (result > 1) {return 1;}
      return result;
    },
    
    activate: function() {

      maxSwipeDist = (Math.round(wrapperElement.clientHeight*0.7));     

      interact('#wrapper')
      .draggable({

        onstart: (e) => {
          if (pages.current === pages.p0 || pages.current === pages.p4) {
            return;
          };
          console.log("start");
          pointA = e.pageY;
          pages.current.fixateFrame();
        },

        onmove: (e) => {
          if (pages.current === pages.p0 || pages.current === pages.p4) {
            return;
          };
          pointB = e.pageY;
          distance = Math.abs(Math.round(pointB-pointA));
          distance = Math.min(maxSwipeDist,distance);

          if (pointB>pointA) {
            pages.current.drawAnim(distance, false);
          } else if (pointB<pointA) {
            pages.current.drawAnim(distance, true);
          }
        },

        onend: () => {
          if (pages.current === pages.p0 || pages.current === pages.p4) {
            return;
          };
          pages.current.fixateFrame();
        },
        update: function() {
          maxSwipeDist = (Math.round(wrapperElement.clientHeight*0.7));  
        },
      });
    },

    get maxSwipeDist() {
      return maxSwipeDist;
    },

  }
})();

// Add Event Listeners

buttonElement.addEventListener('click', (e) => {
  goToPage.next();
});

wrapperElement.addEventListener('resize', onResize);

// Load page for the first time:

window.addEventListener('load', () => {
  setupElements();
  goToPage.first();
  swipeEngine.activate();
});