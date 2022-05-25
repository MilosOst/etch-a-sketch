const DEFAULT_SIZE = 8;

window.onload = createInitialGrid;
window.addEventListener('mouseup', () => mouseDown = false);
window.addEventListener('dragstart', (e) => e.preventDefault());


function createInitialGrid() {
    grid.style.cssText = `grid-template-columns: repeat(${DEFAULT_SIZE}, 1fr); grid-template-rows: repeat(${DEFAULT_SIZE}, 1fr)`;

    for (let i = 1; i <= DEFAULT_SIZE ** 2; i++) {
        const gridElement = document.createElement('div');
        addGridAttributes(gridElement, i);
        addGridEventListeners(gridElement);
        grid.appendChild(gridElement);
    }
}

function createGridMap() {
    let i = 1;
    gridMap = new Map();
    for (let item of grid.children) {
        gridMap[i] = item;
        i++;
    }
    return gridMap;
}

function addGridAttributes(gridElement, index) {
    gridElement.classList.add('grid-element');
    
    if (!linesToggled) gridElement.classList.add('grid-element-border');
    gridElement.setAttribute('draggable', 'false');
    gridElement.setAttribute('data-index', index);
}

function addGridEventListeners(gridElement) {
    gridElement.addEventListener('mousedown', (e) => {
        // Verify that it is the left mouse button being clicked
        if (e.button === 0) {
            mouseDown = true;
        }});

    gridElement.addEventListener('mouseover', changeColour);
    gridElement.addEventListener('click', changeColour);
}

function updateGridSize() {
    grid.replaceChildren();
    grid.style.cssText = `grid-template-columns: repeat(${sizeSlider.value}, 1fr); grid-template-rows: repeat(${sizeSlider.value}, 1fr)`;
    updateGridBGColour();

    for (let i = 1; i <= sizeSlider.value ** 2; i++) {
        const gridElement = document.createElement('div');
        addGridAttributes(gridElement, i);
        addGridEventListeners(gridElement);
        grid.appendChild(gridElement);
    }
}

function updateSizeLabel() {
    sizeLabel.textContent =`Grid Size: ${sizeSlider.value} x ${sizeSlider.value}`;
}

function toggleGridLines() {
    linesToggled = !linesToggled;
    let gridElements = grid.children;

    if (linesToggled) {
        toggleGridLinesBtn.classList.add('btn-on');
        grid.classList.add('grid-toggled');
        for (element of gridElements) {
            element.classList.remove('grid-element-border');
        }
    }
    else {
        toggleGridLinesBtn.classList.remove('btn-on');
        grid.classList.remove('grid-toggled');
        for (element of gridElements) {
            element.classList.add('grid-element-border');
        }
    }
}

function toggleEraser() {
    eraserOn = !eraserOn;
    if (eraserOn) {
        eraserBtn.classList.add('btn-on');
    }
    else {
        eraserBtn.classList.remove('btn-on');
    }
}

function toggleFill() {
    fillOn = !fillOn;
    if (fillOn) {
        fillBtn.classList.add('btn-on');
    }
    else {
        fillBtn.classList.remove('btn-on');
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
    if ((e.type === 'mouseover' && mouseDown) || e.type === 'click') {
        if (fillOn) {
            let gridMap = createGridMap();
            fillArea(e.target, gridMap);
        }
        else if (eraserOn) {
            e.target.style.removeProperty('background-color');
        }
        else {
            e.target.style.backgroundColor = currentColour;
        }
    }
}

function clearGrid() {
    for (let element of grid.children) {
        element.style.removeProperty('background-color');
    }
}


function fillArea(gridElement, gridMap) {
    if (!gridElement || gridElement.style.backgroundColor) {
        return;
    }
    else {
        gridElement.style.backgroundColor = currentColour;
        let index = +gridElement.getAttribute('data-index');
        let gridSize = +sizeSlider.value;

        // Recursively call function adjacent cells
        fillArea(gridMap[index - gridSize], gridMap); // cell above

        // Verify cell is not on right edge
        if (index % gridSize !== 0) fillArea(gridMap[index + 1], gridMap); //Cell to the right

        fillArea(gridMap[index + gridSize], gridMap); // cell below

        // Verify cell is not on left edge
        if ((index - 1) % gridSize !== 0) fillArea(gridMap[index - 1], gridMap); // cell to the left
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



const toggleGridLinesBtn = document.querySelector('#toggleLinesBtn');
toggleGridLinesBtn.addEventListener('click', toggleGridLines);

const clearBtn = document.querySelector('#clearBtn');
const eraserBtn = document.querySelector('#eraserBtn');
const fillBtn = document.querySelector('#fillBtn');

clearBtn.addEventListener('click', clearGrid);
eraserBtn.addEventListener('click', toggleEraser);
fillBtn.addEventListener('click', toggleFill);

let mouseDown = false;
let currentColour = 'black';
let linesToggled = false;
let eraserOn = false;
let fillOn = false;