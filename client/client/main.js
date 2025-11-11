const colorPicker = document.getElementById("colorPicker");
const sizePicker = document.getElementById("sizePicker");
const undoBtn = document.getElementById("undoBtn");

colorPicker.addEventListener("change", (e) => {
  brushColor = e.target.value;
});

sizePicker.addEventListener("input", (e) => {
  brushSize = e.target.value;
});

undoBtn.addEventListener("click", () => {
  socket.emit("undo");
});
