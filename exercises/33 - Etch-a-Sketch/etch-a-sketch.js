// grab canvas and it's context, plus the shake button
const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const shakebutton = document.querySelector('.shake');
const MOVE_AMOUNT = 10;

// setup the canvas for drawing
const { width, height } = canvas;
// randomize the starting point of the line
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

// set a hue amount to rainbow-ize the stroke!
let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
// set the style to be round instead of squar, and make the line size bigger
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = MOVE_AMOUNT;

// this will actually start the line drawing, so the starting point shows on the page
ctx.beginPath();
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

// write a draw function
function draw({ key }) {
  // increment hue by 1 for each time
  hue += 3;
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.beginPath();
  // go to where x & y used to be
  ctx.moveTo(x, y);
  // move x & y depending on key direction pressed
  switch (key) {
    case 'ArrowUp':
      y -= MOVE_AMOUNT;
      break;
    case 'ArrowDown':
      y += MOVE_AMOUNT;
      break;
    case 'ArrowRight':
      x += MOVE_AMOUNT;
      break;
    case 'ArrowLeft':
      x -= MOVE_AMOUNT;
      break;
    default:
      break;
  }
  ctx.lineTo(x, y);
  ctx.stroke();
}

// arrow key handlers
function handleKey(e) {
  if (e.key.includes('Arrow')) {
    // prevent the default, which is moving the screen
    e.preventDefault();
    draw({ key: e.key });
  }
}

// handle the shake button press, to clear the canvas
function clearCanvas() {
  canvas.classList.add('shake');
  ctx.clearRect(0, 0, width, height);
  // listen to animation end then remove class, so we can run function multiple times
  canvas.addEventListener(
    'animationend',
    function() {
      canvas.classList.remove('shake');
    },
    { once: true }
  );
  // remove the event listener with once, otherwise it will keep adding a new one each time we click the button
}

// listen for arrow key inputs
window.addEventListener('keydown', handleKey);

// listen for button click to clear canvas
shakebutton.addEventListener('click', clearCanvas);
