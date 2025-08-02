document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("etch-a-sketch-container"); // select the containers
    const resetButton = document.getElementById("reset-button");
    const eraserButton = document.getElementById("eraser-button");
    const rainbowButton = document.getElementById("rainbow-button");
    const resizeButton = document.getElementById("resize-button");

    let isDrawing = false; // Track if mouse is down
    let isEraserActive = false; // Track if eraser is active
    let currentColor = "black"; // Default drawing color
    let isRainbowMode = false; // Track if rainbow mode is active

    function createGrid(n) { // function to create grid
        container.innerHTML = "";
        container.style.display = "grid"; 
        container.style.gridTemplateColumns = `repeat(${n}, 1fr)`; // set grid columns and rows
        container.style.gridTemplateRows = `repeat(${n}, 1fr)`;
        container.style.width = "80vh"; // set width and height
        container.style.height = "80vh";
        container.style.border = "2px solid black"; // add border to the grid

        for (let i = 0; i < n * n; i++) { // loop to create cells
            let cell = document.createElement("div"); // create a new div for each cell
            cell.classList.add("grid-cell"); // add class to the cell
            container.appendChild(cell); // append cell to the container
        }

        enableDrawing();
    }

    function enableDrawing() { // function to enable drawing on the grid
        const cells = document.querySelectorAll(".grid-cell"); // select all grid cells
    
        // Function to determine the color to apply
        function getColor() {
            if (isEraserActive) return "white"; // set color to white when eraser mode is active
            if (isRainbowMode) return randomColor(); // set color to random when rainbow mode is active
            return currentColor; // other wise use black as the default color
        }
    
        cells.forEach(cell => {  // add event listeners to each cell
            cell.addEventListener("mousedown", () => { // click to draw
                isDrawing = true;
                cell.style.backgroundColor = getColor();
            });
    
            cell.addEventListener("mouseover", () => { // drag to draw
                if (isDrawing) {
                    cell.style.backgroundColor = getColor();
                }
            });

            document.addEventListener("mouseup", () => {  // stop drawing when mouse is up
                isDrawing = false;
            });
        });
    
        
    }

    function toggleEraser() { // function to toggle eraser mode
        isEraserActive = !isEraserActive; // Toggle eraser state
        eraserButton.classList.toggle("active", isEraserActive); // Toggle button style

        if (isEraserActive) {
            currentColor = "white"; // Set color to erase
        } else {
            currentColor = "black"; // Revert to drawing color
        }
    }

    function toggleRainbowMode(){ // function to toggle rainbow mode
        isRainbowMode = !isRainbowMode; // toggle rainbow mode
        rainbowButton.classList.toggle("active", isRainbowMode);  

    }

    function randomColor() { // function to generate random color 
        let r, g, b; // RGB values
        do {
            r = Math.floor(Math.random() * 256); // generate random number between 0 and 255
            g = Math.floor(Math.random() * 256);
            b = Math.floor(Math.random() * 256);
        } while (r > 240 && g > 240 && b > 240); // ensure color is not too light

        return `rgb(${r}, ${g}, ${b})`;
    }

    function resize() { // function to resize the grid
        let gridSize = prompt("Enter grid size (e.g., 16 for a 16x16 grid):"); // prompt user for grid size
        gridSize = parseInt(gridSize); // convert to integer

        if (isNaN(gridSize) || gridSize < 1 || gridSize > 100) { // check if input is valid
            alert("Please enter a number between 1 and 100.");
            return;
        }

        createGrid(gridSize); // create new grid with the specified size
    }

    function reset() { // function to reset the grid
        const cells = document.querySelectorAll(".grid-cell"); // select all grid cells
        cells.forEach(cell => {
            cell.style.backgroundColor = "white"; // reset color to white
        });
    }

    // add event listeners to all the buttons
    resetButton.addEventListener("click", reset); 
    eraserButton.addEventListener("click", toggleEraser);
    rainbowButton.addEventListener("click", toggleRainbowMode);
    resizeButton.addEventListener("click", resize); 

    resize(); // create initial grid
});
