let mode = "normal", size = 16, currentColor = '#000000', counter;
const rgbPalette = ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722', '#795548', '#9E9E9E', '#607D8B'];

function generateGrid() {
  const canvas = document.querySelector('.canvas');
  while (canvas.firstChild) {
    canvas.firstChild.remove();
  }
  canvas.style.setProperty('--columnNum', size);
  canvas.style.setProperty('--rowNum', size);
  for (let i = 0; i < size * size; i++) {
    const square = document.createElement('div');
    square.setAttribute('class', 'area');
    square.style.backgroundColor = '#ffffff';
    canvas.appendChild(square);
  }
  cursor();
}

function cursor() {
  const area = document.querySelectorAll('.area');
  area.forEach(box => {
    box.counter = 0;
    box.addEventListener('mouseenter', (e) => {
      switch (mode) {
        case 'normal':
          currentColor = e.target.style.backgroundColor = currentColor;
          break;
        case 'fill':
          area.forEach(box => box.style.backgroundColor = currentColor);
          break;
        case 'rgb':
          e.target.style.backgroundColor = rgbPalette[Math.round(Math.random() * rgbPalette.length)];
          break;
        case 'shade':
          currentColor = '#000000';
          box.counter += 1;
          e.target.style.backgroundColor = currentColor;
          e.target.style.opacity = 0.025 * box.counter;
      }
    })
  })
}

function buttonListener() {
  const button = document.querySelectorAll('button, input');
  button.forEach(btn => {
    btn.addEventListener('click', () => {
      switch (btn.getAttribute('class')) {
        case 'erase':
          mode = 'normal';
          currentColor = '#ffffff';
          break;
        case 'fill':
          mode = 'fill';
          break;
        case 'color':
          mode = 'normal';
          break;
        case 'rgb':
          mode = 'rgb';
          break;
        case 'shade':
          mode = 'shade';
          break;
        case 'clear':
          clear();
          break;
        case 'resize':
          size = prompt("Enter a new grid size. You may choose from 16 to 100.");
          if (size < 16 || size > 100 || size == null) {
            alert("Invalid grid size!");
          }
          else {
            clear();
            generateGrid();
            cursor();
          }
          break;
      }
    })
  })
  const color = document.querySelector('.color');
  color.addEventListener('change', (event) => {
    currentColor = event.target.value;
  })
}

function clear() {
  const square = document.querySelectorAll('.area');
  square.forEach(sqr => {
    sqr.style.backgroundColor = '#ffffff';
    sqr.style.opacity = 1;
  });
}

function runEtch() {
  generateGrid();
  cursor();
  buttonListener();
}

runEtch();