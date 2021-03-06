const page = document.querySelector(".page_container");
const paint_brush = document.querySelector(".paint_brush");
const canvas = document.querySelector(".canvas");

let paint;
let percentage_darken = 0;  //For shading paint

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
    paint = "custom";
});

const rainbow_paint = document.querySelector(".rainbow_paint");
rainbow_paint.addEventListener('click', function()
{
    paint = "rainbow";
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

//Turn the cursor into a paint brush after clicking on the paint brush
paint_brush.addEventListener("click", function(){
    page.setAttribute("style", "cursor: url('./Images/cursor_brush.png'), auto;");
});


function createCanvas(canvas_size)
{
    let square_size = 500/canvas_size;
    canvas.innerHTML = " ";  //Clears the canvas so we can create new squares
    for(let i=0; i<canvas_size*canvas_size; i++)
    {
        let square = document.createElement("div");
        square.setAttribute("style", `height: ${square_size}px; width: ${square_size}px; margin: 0;`);
        canvas.addEventListener("mousedown", function(){
            square.addEventListener("mouseover", function(){
                paintSquare(square, square_size, paint);
            });
        });
        canvas.appendChild(square);
    }
}

function paintSquare(square, square_size, paintType = "black")
{
    if(paint === "black")
    {
        square.setAttribute("style", `height: ${square_size}px; width: ${square_size}px; margin: 0; background-color: ${paintType};`);
    }
    else if(paint === "shadding")
    {
        percentage_darken+=25.5
        square.setAttribute("style", `height: ${square_size}px; width: ${square_size}px; margin: 0; background-color: rgb(${255/percentage_darken}, ${255/percentage_darken}, ${255/percentage_darken})`);
    }
    else if (paint === "custom")
    {
        const color_picker = document.querySelector(".color_picker");
        const color_picker_span = document.querySelector(".color_picker_span");
        
        color_picker.click();  //Selects the color input button since it's "invisible"
        //This will change the span that represents the custom paint whenever a user picks a color
        color_picker.addEventListener("change", function(){
            paint = `${color_picker.value}`;
            color_picker_span.setAttribute("style", `background-color: ${paint};`);
        });
        square.setAttribute("style", `height: ${square_size}px; width: ${square_size}px; margin: 0; background-color: ${paintType};`);
    }
    else if(paint === "rainbow")
    {
        const rainbow_colors = ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF", "#4B0082", "#9400D3"];
        console.log(`Color = ${rainbow_colors[Math.random(6)]}`);
        square.setAttribute("style", `height: ${square_size}px; width: ${square_size}px; margin: 0; background-color: ${rainbow_colors[Math.floor(Math.random() *6)]};`);
    }
}