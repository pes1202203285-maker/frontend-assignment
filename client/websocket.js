const socket = io();
window.socket = socket;

socket.on("connect", () => {
  document.getElementById("status").textContent = "Connected ✅";
});

socket.on("draw", (data) => {
  drawLine(data.x1, data.y1, data.x2, data.y2, data.color, data.size, false);
});

socket.on("clear-canvas", () => {
  clearCanvas();
});

socket.on("user-list", (users) => {
  console.log("Online users:", users);
});
