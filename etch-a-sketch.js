const page = document.querySelector(".page_container");
const paint_brush = document.querySelector(".paint_brush");
const canvas = document.querySelector(".canvas");
const slider = document.querySelector(".slider");

let canvas_size = document.querySelector(".slider").value;
let square_size = 500/canvas_size;
const square = document.createElement("div");
square.setAttribute("style", `color: red; height: ${square_size}; width: ${square_size};`);

for(let i=0; i<canvas_size; i++)
{
    canvas.appendChild(square);
}

paint_brush.addEventListener("click", function(){
    page.setAttribute("style", "cursor: url('./Images/cursor_brush.png'), auto;");
});

























