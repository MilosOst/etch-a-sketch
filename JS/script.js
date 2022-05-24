const DEFAULT_SIZE = 8;

window.onload = createInitialGrid;
window.addEventListener('mouseup', () => mouseDown = false);
window.addEventListener('dragstart', (e) => e.preventDefault());


function createInitialGrid() {
    grid.style.cssText = `grid-template-columns: repeat(${DEFAULT_SIZE}, 1fr); grid-template-rows: repeat(${DEFAULT_SIZE}, 1fr)`

    for (let i = 0; i < DEFAULT_SIZE ** 2; i++) {
        const gridElement = document.createElement('div');
        gridElement.classList.add('grid-element');
        gridElement.classList.add('grid-element-border');
        gridElement.setAttribute('draggable', 'false');
        addGridEventListeners(gridElement);

        grid.appendChild(gridElement);
    }
    
}

function addGridEventListeners(gridElement) {
    gridElement.addEventListener('mousedown', (e) => {
        // Verify that it is the left mouse button being clicked
        if (e.button === 0){
            mouseDown = true;
        }

    });
    gridElement.addEventListener('mouseover', changeColour);
    gridElement.addEventListener('click', (e) => gridElement.style.backgroundColor = penColourPicker.value);
}

function updateGridSize() {
    grid.replaceChildren();
    grid.style.cssText = `grid-template-columns: repeat(${sizeSlider.value}, 1fr); grid-template-rows: repeat(${sizeSlider.value}, 1fr)`

    for (let i = 0; i < sizeSlider.value ** 2; i++) {
        const gridElement = document.createElement('div');
        gridElement.classList.add('grid-element');
        gridElement.classList.add('grid-element-border');
        gridElement.setAttribute('draggable', 'false');
        addGridEventListeners(gridElement);

        grid.appendChild(gridElement);
    }
}

function updateSizeLabel() {
    sizeLabel.textContent =`Grid Size: ${sizeSlider.value} x ${sizeSlider.value}`
}

function toggleGridLines() {
    linesToggled = !linesToggled;
    let gridElements = grid.children;

    if (linesToggled) {
        grid.classList.add('grid-toggled');
        for (element of gridElements) {
            element.classList.remove('grid-element-border');
        }
    }
    else {
        grid.classList.remove('grid-toggled');
        for (element of gridElements) {
            element.classList.add('grid-element-border');
        }
    }
}

function updateGridBGColour() {
    bgColourPicker.style.backgroundColor = bgColourPicker.value;
    grid.style.backgroundColor = bgColourPicker.value;
}

function updatePenColour() {
    penColourPicker.style.backgroundColor = penColourPicker.value;
    currentColour = penColourPicker.value;
}

function changeColour(e) {
    if (e.type === 'mouseover' && mouseDown) {
        console.log(e.type);
        e.target.style.backgroundColor = currentColour;
    }
}




const grid = document.querySelector('.grid-container');
const sizeSlider = document.querySelector('#sizeSlider');
const sizeLabel = document.querySelector('#sizeLabel');
const penColourPicker = document.querySelector('#pen-colour');
const bgColourPicker = document.querySelector('#bg-colour');


sizeSlider.addEventListener('input', updateSizeLabel);
sizeSlider.addEventListener('change', updateGridSize);
penColourPicker.addEventListener('input', updatePenColour);
bgColourPicker.addEventListener('input', updateGridBGColour);



const toggleGridLinesBtn = document.querySelector('#toggleLinesBtn')
toggleGridLinesBtn.addEventListener('click', toggleGridLines);

let mouseDown = false;
let currentColour = 'black';
let linesToggled = false;