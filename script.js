const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const canvasPixel = document.getElementById("myCanvasPixel");
const ctx1 = canvasPixel.getContext("2d");
const canvasCompare = document.getElementById("compareCanvas");
const ctx2 = canvasCompare.getContext("2d");
const HEIGHT_1 = canvas.height;
const WIDTH_1 = canvas.width;  
const HEIGHT_2 = canvasPixel.height;
const WIDTH_2 = canvasPixel.width;
const HEIGHT_3 = canvasCompare.height;
const WIDTH_3 = canvasCompare.width;
const SIZE_PEN = 25; 
const COLOR_PEN = "blue";
const COLOR_BORDER = "red";
const RBG_COLOR_PEN = [0, 0, 255, 255]; // blue 
const HORI_SQ_CNT = 6;
const VERT_SQ_CNT = 8;
const SIZE_GRID = WIDTH_2 / HORI_SQ_CNT;
const AMOUNT_NUMBER = 10;
const SPEED = 100;

var board, recognise;
var lastMouse = {}, currentMouse = {}, can_draw = 0, device = 0, need_clear = 0, need_run = 0, bestNumber = 0, cleared = 0;
var grid = [], border = {}, numberData = {}, scoreNumbers = [];

var beep = new Audio('beep.mp3');
var data;
var numberText = "", morseText = "", wordsData= [], letter = {}, timeouts = [], check = 1;

//set up value of div and button
var correctIC = document.getElementById('correct');
var incorrectIC = document.getElementById('incorrect');
var resultPlace = document.getElementById('resultPlace');

//set up Red border 
border = {x: {}, y: {}};
border.x = {min: WIDTH_1, max: 0};
border.y = {min: HEIGHT_1, max: 0}

function draw() {
  //clear board
  //device = 1 is a pen 
  ctx.beginPath();
  ctx.lineWidth = SIZE_PEN;
  ctx.strokeStyle = COLOR_PEN;
  ctx.lineCap = 'round';
  ctx.moveTo(lastMouse.x, lastMouse.y);
  ctx.lineTo(currentMouse.x, currentMouse.y);
  ctx.stroke();
}

function setUpBoard() {
  //clean 3 boards
  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, WIDTH_1, HEIGHT_1);
 
  ctx1.beginPath();
  ctx1.fillStyle = "white";
  ctx1.fillRect(0, 0, WIDTH_2, HEIGHT_2);

  ctx2.beginPath();
  ctx2.fillStyle = "white";
  ctx2.fillRect(0, 0, WIDTH_3, HEIGHT_3);
}

function random(x) {
  return Math.floor(Math.random() * x);
}

function deleteCheckIcon (){
  correctIC.style.display = "none";
  incorrectIC.style.display = "none";
}

function setUpValue() {
  cleared = 1;
  deleteCheckIcon();
  //reset value of result button
  resultPlace.textContent = "__________";

  //clear all timeOut events
  for (var i = 0; i < timeouts.length; i++) {
    clearTimeout(timeouts[i]);
  }
  timeouts = [];

  //stop the previous sounds  
  beep.pause();
  beep.currentTime = 0;

  //set up value of each square of grid
  device = 1;
  need_run = 0;
  let tempX = SIZE_GRID / 2, tempY = SIZE_GRID / 2;
  for(let i = 0; i < HORI_SQ_CNT; i++) {
    grid[i] = [];
    for(let j = 0; j < VERT_SQ_CNT; j++) {
      grid[i][j] = {
        x: tempX,
        y: tempY,
        seen: 0
      }
      tempY += SIZE_GRID;
    }
    tempX += SIZE_GRID;
    tempY = SIZE_GRID / 2;
  }
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
  deleteCheckIcon();
  //appear the result and correct or incorrect icon
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

        timeTaken += 3 * SPEED;
        timeouts.push( setTimeout(() => {
          beep.pause();
          beep.currentTime = 0;
        }, timeTaken));

        timeTaken += 1 * SPEED;
        break;

      //if it is a dot
      case ".":
        //push the beep and pause
        timeouts.push( setTimeout(() => {
          beep.play();
        }, timeTaken));

        timeTaken += 1 * SPEED;

        timeouts.push( setTimeout(() => {
          beep.pause();
          beep.currentTime = 0;
        }, timeTaken));

        timeTaken += 1 * SPEED;
        break;
      
      case " ":
        timeTaken += 3 * SPEED;
        break;

      case "/":
        timeTaken += 1 * SPEED;
        break;
    }
  }
}