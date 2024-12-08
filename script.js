const textColor = document.getElementById("textColor");
const bgColor = document.getElementById("bgColor");
bgColor.value = '#ffffff';
const fontSize = document.getElementById("fontSize");
const clear = document.getElementById("clear");
const save = document.getElementById("save");
const retrieve = document.getElementById("retrieve");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let isDrawing = false;
let x, y;
textColor.addEventListener("change", (e) => {
  ctx.fillStyle = e.target.value;
  ctx.strokeStyle = e.target.value;
});

fontSize.addEventListener("change", (e) => {
  ctx.lineWidth = e.target.value;
});

canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  [x, y] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mousemove", (e) => {
  if (isDrawing) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [x, y] = [e.offsetX, e.offsetY];
  }
});

canvas.addEventListener("mouseup", (e) => {
  isDrawing = false;
});

bgColor.addEventListener("change", (e) => {
  ctx.fillStyle = e.target.value;
  ctx.fillRect(0, 0, 800, 500);
});

fontSize.addEventListener("change", (e) => {
  ctx.lineWidth = e.target.value;
});

clear.addEventListener("click", (e) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

save.addEventListener("click", e => {
  localStorage.setItem('canvasContents', canvas.toDataURL());
  let link = document.createElement('a');
  link.download = 'my-canvas.png';
  link.href = canvas.toDataURL();
  link.click();
});

retrieve.addEventListener("click", e => {
  let savedCanvas = localStorage.getItem("canvasContents");
  if (savedCanvas) {
    let img = new Image();
    img.src = savedCanvas;
    img.onload = function () {
      ctx.drawImage(img, 0, 0);
    }

  }
})
