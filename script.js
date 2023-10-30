const buttons = document.querySelectorAll('.mode');
const canvas = document.querySelector('.canvas');
const color = document.querySelector('input[type="color"]');
const fill = document.querySelector('button[value="fill"]');
const clear = document.querySelector('button[value="clear"]');
const sizes = document.querySelectorAll('.size');
const range = document.querySelector('input[type="range"]');

let selectedColor = '#000000';
let mode = 'normal';
let isMouseDown = false;

function generateGrid(length) {
  while (canvas.firstChild) {
    canvas.firstChild.remove();
  }
  
  canvas.style.setProperty('grid-template-columns', `repeat(${length}, 1fr)`);
  canvas.style.setProperty('grid-template-rows', `repeat(${length}, 1fr)`);

  for (let i = 0; i < length * length; i++) {
    const square = document.createElement('div');
    square.style.backgroundColor = '#ffffff';
    square.style.opacity = 1;
    square.counter = 0;
    canvas.append(square);
  };
}

function reset() {
  buttons.forEach(button => {
    button.classList.remove('selected');
  });
  mode = '';
}

function randomizeColor() {
  return Math.floor(Math.random() * 256);
}

buttons.forEach(button => {
  button.addEventListener('click', e => {
    buttons.forEach(button => {
      button.classList.remove('selected');
    });
    e.target.classList.add('selected');
    mode = e.target.value;
  });
})

canvas.addEventListener('mousedown', e => {
  isMouseDown = true;
  e.preventDefault();
})

canvas.addEventListener('mouseup', () => isMouseDown = false);

color.addEventListener('change', () => {
  selectedColor = color.value;
})

fill.addEventListener('click', () => {
  canvas.childNodes.forEach(square => {
    square.style.backgroundColor = selectedColor;
    square.style.opacity = 1;
  });
  reset();
})

clear.addEventListener('click', () => {
  canvas.childNodes.forEach(square => {
    square.style.backgroundColor = '#ffffff';
    square.style.opacity = 1;
  });
  reset();
})

range.addEventListener('input', () => {
  sizes.forEach(size => {
    size.textContent = `${range.value}`;
  })
})

range.addEventListener('change', () => {
  generateGrid(Number(range.value));
  reset();
})

canvas.addEventListener('mouseover', e => {
  if (mode === '') {
    canvas.style.setProperty('cursor', 'not-allowed');
    return;
  }
  
  canvas.style.setProperty('cursor', 'pointer');
  if (!isMouseDown) return;
  const square = e.target;

  switch (mode) {
    case 'normal':
      square.style.backgroundColor = selectedColor;
      square.style.opacity = 1;
      break;
    case 'shade':
      square.counter += 1;
      square.style.backgroundColor = selectedColor;
      square.style.opacity = 0.1 * square.counter;
      break;
    case 'rgb':
      square.style.backgroundColor = `rgb(${randomizeColor()}, ${randomizeColor()}, ${randomizeColor()})`;
      square.style.opacity = 1;
      break;
    case 'erase':
      square.style.backgroundColor = '#ffffff';
      square.style.opacity = 1;
  }
})

generateGrid(32);
