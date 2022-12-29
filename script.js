var selectedColor = '#000000', mode = 'normal', isMouseDown = false;

const buttons = document.querySelectorAll('.mode');
const canvas = document.querySelector('.canvas');
const color = document.querySelector('input[type="color"]');
const fill = document.querySelector('button[value="fill"]');
const clear = document.querySelector('button[value="clear"]');
const size = document.querySelector('.size');
const range = document.querySelector('input[type="range"]');

canvas.onmousedown = (e) => {
  isMouseDown = true;
  e.preventDefault();
}

canvas.onmouseup = () => {
  isMouseDown = false;
}

color.addEventListener('change', () => {
  selectedColor = color.value;
})

buttons.forEach(button => {
  button.addEventListener('click', e => {
    buttons.forEach(button => {
      button.classList.remove('selected');
    });
    e.target.classList.add('selected');
    mode = e.target.value;  
  });
})

fill.addEventListener('click', () => {
  canvas.childNodes.forEach(box => {
    box.style.backgroundColor = selectedColor;
    box.style.opacity = 1;
  });
  reset();
})

clear.addEventListener('click', () => {
  canvas.childNodes.forEach(box => {
    box.style.backgroundColor = '#ffffff';
    box.style.opacity = 1;
  });
  reset();
})

range.addEventListener('input', () => {
  size.textContent = `${range.value}`;
})

range.addEventListener('change', () => {
  generateGrid(Number(range.value));
  reset();
})

canvas.addEventListener('mouseover', e => {
  if (!isMouseDown) return;
  let box = e.target;
  switch (mode) {
    case 'normal':
      box.style.backgroundColor = selectedColor;
      box.style.opacity = 1;    
      break;
    case 'shade':
      box.counter += 1;
      box.style.backgroundColor = selectedColor;
      box.style.opacity = 0.1 * box.counter;    
      break;
    case 'rgb':
      box.style.backgroundColor = `rgb(${randomizer()}, ${randomizer()}, ${randomizer()})`;
      box.style.opacity = 1;    
      break;
    case 'erase':
      box.style.backgroundColor = '#ffffff';
      box.style.opacity = 1;    
      break;
  }
})

function generateGrid(length) {
  while (canvas.firstChild) {
    canvas.firstChild.remove();
  }
  canvas.style.setProperty('grid-template-columns', 'repeat(' + length + ', 1fr)');
  canvas.style.setProperty('grid-template-rows', 'repeat(' + length + ', 1fr)');
  for (let i = 0; i < length * length; i++) {
    const square = document.createElement('div');
    square.style.backgroundColor = '#ffffff';
    square.style.opacity = 1;
    square.counter = 0;
    canvas.appendChild(square);
  };
}

function randomizer() {
  return Math.floor(Math.random() * 255);
}

function reset() {
  buttons.forEach(button => {
    button.classList.remove('selected');
  });
  mode = "";
}

generateGrid(32);