const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth * 0.9;
canvas.height = 500;

let drawing = false;
let brushColor = "#000000";
let brushSize = 4;
let lastX = 0, lastY = 0;

canvas.addEventListener("mousedown", (e) => {
  drawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mouseup", () => (drawing = false));
canvas.addEventListener("mouseout", () => (drawing = false));

canvas.addEventListener("mousemove", (e) => {
  if (!drawing) return;
  const x = e.offsetX;
  const y = e.offsetY;

  drawLine(lastX, lastY, x, y, brushColor, brushSize, true);
  [lastX, lastY] = [x, y];
});

function drawLine(x1, y1, x2, y2, color, size, emit) {
  ctx.strokeStyle = color;
  ctx.lineWidth = size;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.closePath();

  if (emit) {
    socket.emit("draw", { x1, y1, x2, y2, color, size });
  }
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

window.drawLine = drawLine;
window.clearCanvas = clearCanvas;
