const DEFAULT_SIZE = 8;

window.onload = createInitialGrid;


function createInitialGrid() {
    grid.style.cssText = `grid-template-columns: repeat(${DEFAULT_SIZE}, 1fr); grid-template-rows: repeat(${DEFAULT_SIZE}, 1fr)`

    for (let i = 0; i < DEFAULT_SIZE ** 2; i++) {
        const gridElement = document.createElement('div');
        gridElement.classList.add('grid-element');
        gridElement.classList.add('grid-element-border');
        grid.appendChild(gridElement);
    }
    
}


function updateSizeLabel() {
    sizeLabel.textContent =`Grid Size: ${sizeSlider.value} x ${sizeSlider.value}`
}

function updateGridSize() {
    grid.replaceChildren();
    grid.style.cssText = `grid-template-columns: repeat(${sizeSlider.value}, 1fr); grid-template-rows: repeat(${sizeSlider.value}, 1fr)`

    for (let i = 0; i < sizeSlider.value ** 2; i++) {
        const gridElement = document.createElement('div');
        gridElement.classList.add('grid-element');
        gridElement.classList.add('grid-element-border');
        grid.appendChild(gridElement);
    }
}

function clearGridLines() {
    let gridElements = grid.children;
    grid.style.borderTop = '1px solid rgba(149, 149, 149, 1)';
    grid.style.borderLeft = '1px solid rgba(149, 149, 149, 1)';
    for (element of gridElements) {
        element.classList.remove('grid-element-border');
    }
}


const grid = document.querySelector('.grid-container');
const sizeSlider = document.querySelector('#sizeSlider');
const sizeLabel = document.querySelector('#sizeLabel');
sizeSlider.addEventListener('input', updateSizeLabel);
sizeSlider.addEventListener('change', updateGridSize);



const penColourPicker = document.querySelector('#pen-colour');
const bgColourPicker = document.querySelector('#bg-colour');
penColourPicker.addEventListener('input', () => penColourPicker.style.backgroundColor = penColourPicker.value);
bgColourPicker.addEventListener('input', () =>  {
    bgColourPicker.style.backgroundColor = bgColourPicker.value;
    grid.style.backgroundColor = bgColourPicker.value;
});






const toggleGridLinesBtn = document.querySelector('#toggleLinesBtn')
toggleGridLinesBtn.addEventListener('click', clearGridLines);