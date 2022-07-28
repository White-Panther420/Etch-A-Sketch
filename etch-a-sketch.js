const page = document.querySelector(".page_container");
const paint_brush = document.querySelector(".paint_brush");
const eraser = document.querySelector(".eraser");
const clear_all = document.querySelector(".clear_all");
const canvas = document.querySelector(".canvas");
const color_picker = document.querySelector(".color_picker");
const color_picker_span = document.querySelector(".color_picker_span");

let paint;
let percentage_darken = 0;  //For shading paint

//Turn the cursor into a paint brush after clicking on the paint brush
paint_brush.addEventListener("click", function(){
    page.setAttribute("style", "cursor: url('./Images/cursor_brush.png'), auto;");
});

const black_paint = document.querySelector(".black_paint");
black_paint.addEventListener('click', function()
{
    paint = "black";
});

const shadding_paint = document.querySelector(".shadding_paint");
shadding_paint.addEventListener('click', function()
{
   paint = 'shadding';
});

const custom_paint = document.querySelector(".custom_paint");
custom_paint.addEventListener('click', function()
{
    color_picker.click();  //Selects the color input button since it's "invisible"
    //This will change the span that represents the custom paint whenever a user picks a color
    color_picker.addEventListener("change", function(){
        paint = `${color_picker.value}`;
        color_picker_span.setAttribute("style", `background-color: ${paint}`);
        paint = "custom";
    });
});

const rainbow_paint = document.querySelector(".rainbow_paint");
rainbow_paint.addEventListener('click', function()
{
    paint = "rainbow";
});

//Turn the cursor into an eraser after clicking on the paint brush
eraser.addEventListener("click", function(){
    page.setAttribute("style", "cursor: url('./Images/small_eraser.png'), auto;");
    paint = "eraser";
});

const canvas_size_input = document.querySelector(".prompt_btn");
let canvas_size;
canvas_size_input.addEventListener("click", function(){
    do //Keep prompting user until they enter correct canvas size
    {
        canvas_size = prompt("Please enter a canvas size (1-100)");
        if(canvas_size < 1)
        {
            alert("Error! Canvas size cannot be less than 1. Please reenter.");
        }
        else if (canvas_size > 100)
        {
            alert("Error! Canvas size cannot be greater than 100. Please reenter.");
        }
        else
        {
            createCanvas(canvas_size);
        }
    }while (canvas_size>100 || canvas_size<1)
})

function createCanvas(canvas_size)
{
    let square_size = 500/canvas_size;
    canvas.innerHTML = " ";  //Clears the canvas so we can create new squares
    for(let i=0; i<canvas_size*canvas_size; i++)
    {
        let square = document.createElement("div");
        square.setAttribute("style", `height: ${square_size}px; width: ${square_size}px; margin: 0;`);
        //When user clicks on canvas, they can begin sketching by then hovering the mouse on the canvas
        canvas.addEventListener("mousedown", function(){
            square.addEventListener("mouseover", function(){
                square.classList.add("canvas_square");  //Allows us to later on delete squares
                paintSquare(square, square_size, paint);  
            });
        })
        canvas.appendChild(square);
    }
    clear_all.addEventListener("click", function(){
        let squareNodeList = document.querySelectorAll(".canvas_square");
        deleteCanvas(squareNodeList, square_size);
    });
}

function paintSquare(square, square_size, paintType = "black")
{
    if(paintType === "shadding")
    {
        percentage_darken+=5;
        //We get the curremt square's current bg color (an rgb(x, x, x) value)
        //Then we grab the three rgb values and store them in an array
        let rgb = square.style.backgroundColor;
        rgb = rgb.substring(4, rgb.length-1)
         .replace(/ /g, '')
         .split(',');
        //Add 10 to each rgb value, thus increasing the brightness of the color
        square.setAttribute("style", `height: ${square_size}px; width: ${square_size}px; margin: 0; background-color: rgb(${+rgb[0] + 10}, ${+rgb[1] + 10}, ${+rgb[2]+10})`);
    }
    else if (paintType === "custom")
    {
        square.setAttribute("style", `height: ${square_size}px; width: ${square_size}px; margin: 0; background-color: ${color_picker_span.style.backgroundColor};`);
    }
    else if(paintType === "rainbow")
    {
        const rainbow_colors = ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF", "#4B0082", "#9400D3"];
        square.setAttribute("style", `height: ${square_size}px; width: ${square_size}px; margin: 0; background-color: ${rainbow_colors[Math.floor(Math.random() *6)]};`);
    }
    else if(paintType === "eraser") 
    {
        //Reset color to the same one as the canvas to make it seem like the paint is being erased
        square.setAttribute("style", `height: ${square_size}px; width: ${square_size}px; margin: 0; background-color: rgb(235, 197, 197)`);
    }
    else  //Default black paint
    {
        square.setAttribute("style", `height: ${square_size}px; width: ${square_size}px; margin: 0; background-color: rgb(0, 0, 0)`);
    }
}

function deleteCanvas(squareNodeList, square_size)
{
    //Make each square have the same background as the canvas to make it seem as if they were deleted
    squareNodeList.forEach(square => {
        square.setAttribute("style", `height: ${square_size}px; width: ${square_size}px; margin: 0; background-color: rgb(235, 197, 197)`);
    });
}