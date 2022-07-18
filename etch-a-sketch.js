const page = document.querySelector(".page_container");
const paint_brush = document.querySelector(".paint_brush");
const canvas = document.querySelector(".canvas");
const slider = document.querySelector(".slider");

let paint;

const black_paint = document.querySelector(".black_paint");
black_paint.addEventListener('click', function()
{
    paint = "black";
});

const shadding_paint = document.querySelector(".shadding_paint");
shadding_paint.addEventListener('click', function()
{
    paint = "shadding";
});

const custom_paint = document.querySelector(".custom_paint");
custom_paint.addEventListener('click', function()
{
    paint = "rgb(113, 35, 35)";
});

const rainbow_paint = document.querySelector(".rainbow_paint");
rainbow_paint.addEventListener('click', function()
{
    paint = "rainbow";
});

let canvas_size = document.querySelector(".slider").value;
let canvas_size_text = document.querySelector(".slider_value");
slider.addEventListener("click", function(){
canvas_size_text.textContent = `${canvas_size}x${canvas_size}`;
});

let square_size = 500/canvas_size;

for(let i=0; i<canvas_size*canvas_size; i++)
{
    let square = document.createElement("div");
    square.setAttribute("style", `height: ${square_size}px; width: ${square_size}px; margin: 0;`);
    square.addEventListener("click", function(){
        paintSquare(square, paint);
    });
    canvas.appendChild(square);
}



paint_brush.addEventListener("click", function(){
    page.setAttribute("style", "cursor: url('./Images/cursor_brush.png'), auto;");
});

function paintSquare(square, paintType = "black")
{
    square.setAttribute("style", `height: ${square_size}px; width: ${square_size}px; margin: 0; background-color: ${paintType};`);
}























