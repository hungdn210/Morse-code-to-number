const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const canvasPixel = document.getElementById("myCanvasPixel");
const ctx1 = canvasPixel.getContext("2d");
const canvasCompare = document.getElementById("compareCanvas");
const ctx2 = canvasCompare.getContext("2d");
const height_1 = canvas.height;
const width_1 = canvas.width; 
const height_2 = canvasPixel.height;
const width_2 = canvasPixel.width;
const height_3 = canvasCompare.height;
const width_3 = canvasCompare.width;
const size_pen = 15; 
const size_eraser = 20;
const color_pen = "blue";
const color_border = "red";
const rbgColorPen = [0, 0, 255, 255]; // blue 
const horiSqCnt = 6;
const vertSqcnt = 8;
const size_grid = width_2 / horiSqCnt;
const maxPoint = 3;
const minPoint = -3;
const amountNumber = 10;
const speed = 100;

var board, recognise;
var lastMouse = {}, currentMouse = {}, can_draw = 0, device = 0, need_clear = 0, need_run = 0, bestNumber = 0, corNumber = 0;
var grid = [], border = {}, numberData = {}, scoreNumbers = [];

var beep = new Audio('beep.mp3');
var data;
var numberText = "", morseText = "", wordsData= [], letter = {}, timeouts = [], check = 1;

var correctIC = document.getElementById('correct');
var incorrectIC = document.getElementById('incorrect');
var resultPlace = document.getElementById('resultPlace');

function draw() {
  //clear board
  //device = 1 is a pen 
  if(device) {
    ctx.beginPath();
    ctx.lineWidth = size_pen;
    ctx.strokeStyle = color_pen;
    ctx.lineCap = 'round';
    ctx.moveTo(lastMouse.x, lastMouse.y);
    ctx.lineTo(currentMouse.x, currentMouse.y);
    ctx.stroke();
  }
  //when using eraser
  else if(!device) {
    ctx.beginPath();
    ctx.lineWidth = size_eraser;
    ctx.strokeStyle = "white";
    ctx.lineCap = 'round';
    ctx.moveTo(lastMouse.x, lastMouse.y);
    ctx.lineTo(currentMouse.x, currentMouse.y);
    ctx.stroke();
  }
}

function setUpBoard() {
  //clean 3 boards
  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, width_1, height_1);
 
  ctx1.beginPath();
  ctx1.fillStyle = "white";
  ctx1.fillRect(0, 0, width_2, height_2);

  ctx2.beginPath();
  ctx2.fillStyle = "white";
  ctx2.fillRect(0, 0, width_3, height_3);
}

function random(x) {
  return Math.floor(Math.random() * x);
}

function deleteCheckIcon (){
  correctIC.style.display = "none";
  incorrectIC.style.display = "none";
}

function setUpValue() {
  deleteCheckIcon();
  resultPlace.textContent = "__________";
  for (var i = 0; i < timeouts.length; i++) {
    clearTimeout(timeouts[i]);
  }
  timeouts = [];
  beep.pause();
  beep.currentTime = 0;

  //temp
  //set up value of each square of grid
  device = 1;
  need_run = 0;
  corNumber = 0;
  let tempX = size_grid / 2, tempY = size_grid / 2;
  for(let i = 0; i < horiSqCnt; i++) {
    grid[i] = [];
    for(let j = 0; j < vertSqcnt; j++) {
      grid[i][j] = {
        x: tempX,
        y: tempY,
        seen: 0
      }
      tempY += size_grid;
    }
    tempX += size_grid;
    tempY = size_grid / 2;
  }
 
  //set up Red border 
  border = {x: {}, y: {}};
  border.x = {min: width_1, max: 0};
  border.y = {min: height_1, max: 0}
}

function start() {
  setUpBoard();
  setUpValue();
  board = new Board();
  recognise = new Recognise();
  data = new Data();
  data.setUpMorseCode();
  board.drawBoard_2();
}

canvas.addEventListener("mousemove", function (e) {
  checkClick('move', e)
}, false);
canvas.addEventListener("mousedown", function (e) {
  checkClick('down', e)
}, false);
canvas.addEventListener("mouseup", function (e) {
  checkClick('up', e)
}, false);
canvas.addEventListener("mouseout", function (e) {
  checkClick('out', e)
}, false);
 
function checkClick(feature, e) {
  var rect = canvas.getBoundingClientRect();
  lastMouse = currentMouse;
  currentMouse = {x: e.clientX - rect.left, y: e.clientY - rect.top};
  switch(feature) {
    case "down":
      can_draw = 1; 
      draw();
      break;
    case "move":
      if(can_draw) draw();
      break;
    case "up":
    case "out":
      can_draw = 0;
      break;
  }
} 

function checkResult() {
  resultPlace.textContent = numberText;
  if(bestNumber == numberText) correctIC.style.display = "unset";
  else incorrectIC.style.display = "unset";

}

function playSounds() {
  //clear all setTimeOut events
  for (var i = 0; i < timeouts.length; i++) {
    clearTimeout(timeouts[i]);
  }
  timeouts = [];
  
  beep.currentTime = 0;
  let timeTaken = 0;
  //run morse Code
  for(let i = 0; i < morseText.length; i++) {
    switch(morseText[i]) {
      //if it is a dash
      case "-":
        //push the beep and pause
        timeouts.push( setTimeout(() => {
          beep.play();
        }, timeTaken));

        timeTaken += 3 * speed;
        timeouts.push( setTimeout(() => {
          beep.pause();
          beep.currentTime = 0;
        }, timeTaken));

        timeTaken += 1 * speed;
        break;

      //if it is a dot
      case ".":
        //push the beep and pause
        timeouts.push( setTimeout(() => {
          beep.play();
        }, timeTaken));

        timeTaken += 1 * speed;

        timeouts.push( setTimeout(() => {
          beep.pause();
          beep.currentTime = 0;
        }, timeTaken));

        timeTaken += 1 * speed;
        break;
      
      case " ":
        timeTaken += 3 * speed;
        break;

      case "/":
        timeTaken += 1 * speed;
        break;
    }
  }
}