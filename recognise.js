function Recognise() {
  numberData = {
    "0": [
      [-3,  3,  3,  3,  3, -1],
      [ 3,  3, -1, -3,  1,  3],
      [ 3, -2, -3, -3, -3,  3],
      [ 3, -3, -3, -3, -3,  3],
      [ 3, -3, -3, -3, -3,  3],
      [ 3, -3, -3, -3, -3,  3],
      [ 3,  1, -3, -3,  1,  3],
      [ 2,  3,  3,  3,  3,  3]
    ],
    "1": [
      [-3,  1,  3,  3, -1, -3],
      [ 2,  2,  3,  3, -1, -3],
      [-3, -3,  1,  3, -1, -3],
      [-3, -3,  1,  3, -1, -3],
      [-3, -3,  1,  3, -1, -3],
      [-3, -3,  1,  3, -3, -3],
      [-3, -3,  1,  3, -2, -3],
      [ 1,  2,  3,  3,  2,  0]
    ],
    "2": [
      [ 2,  3,  3,  3,  3, -3],
      [ 3,  0, -3, -3,  3,  3],
      [ 0, -3, -3, -3, -2,  3],
      [-3, -3, -3, -2,  1,  2],
      [-3, -3, -3, -1,  3,  1],
      [-3, -3,  0,  3,  2, -3],
      [-3,  2,  3,  0, -3, -3],
      [ 2,  3,  3,  3,  3,  3]
    ],
    "3": [
      [ 3,  3,  3,  3,  3, -1],
      [ 2, -2, -3, -3,  1,  3],
      [-3, -3, -3, -3, -2,  3],
      [-3, -3, -3, -2,  3,  3],
      [-3, -3,  0,  3,  3,  3],
      [-3, -3, -3, -3, -2,  3],
      [-3, -3, -3, -3,  0,  3],
      [ 0,  3,  3,  3,  3,  3]
    ],
    "4": [
      [ 3, -3, -3,  3, -3, -3],
      [ 3, -3, -3,  3, -3, -3],
      [ 3, -3, -3,  3, -3, -3],
      [ 3,  2,  0,  3,  0,  0],
      [ 2,  3,  1,  3,  3,  3],
      [-3, -3, -2,  3, -2, -2],
      [-3, -3, -3,  3, -2, -3],
      [-3, -3, -2,  3, -2, -3]
    ],
    "5": [
      [ 3,  3,  3,  3,  3,  3],
      [ 3, -2, -3, -3, -3, -3],
      [ 3, -3, -3, -3, -3, -3],
      [ 3,  3,  3,  3,  3,  0],
      [ 3,  3, -3, -3,  2,  3],
      [-3, -3, -3, -3, -3,  3],
      [-3, -3, -3, -3,  3,  3],
      [-3,  3,  3,  3,  3,  3]
    ],
    "6": [
      [-3,  1,  3,  3,  2, -3],
      [ 1,  3,  2, -3, -3, -3],
      [ 3,  3, -3, -3, -3, -3],
      [ 3, -2,  2,  0, -2, -3],
      [ 3,  3,  3,  3,  3,  2],
      [ 3,  0, -3, -3,  1,  3],
      [ 1,  2, -3, -3, -2,  3],
      [ 0,  1,  3,  3,  3,  3]
    ],
    "7": [
      [ 3,  3,  3,  3,  3,  3],
      [-3, -3, -2, -2,  0,  3],
      [-3, -3, -3, -2,  3,  2],
      [-3, -3, -3,  1,  3, -3],
      [-3, -3, -3,  3,  0, -3],
      [-3, -3, -2,  3, -3, -3],
      [-3, -2,  3,  2, -3, -3],
      [-3, -2,  3,  0, -3, -3]
    ],
    "8": [
      [ 3,  3,  3,  3,  3,  1],
      [ 3,  1, -3, -3,  0,  1],
      [ 3,  0, -3, -3,  0,  1],
      [ 3,  3,  2,  0,  3,  1],
      [ 0,  3,  3,  3,  3,  3],
      [ 3,  3, -3, -3,  0,  3],
      [ 3,  1, -3, -3, -2,  3],
      [ 0,  3,  3,  3,  3,  3]
    ],
    "9": [
      [ 0,  3,  3,  3,  3,  2],
      [ 3,  3, -2, -1, -1,  3],
      [ 3,  2, -3, -3, -1,  3],
      [ 0,  3,  2,  3,  3,  3],
      [-2,  0,  3,  3,  3,  2],
      [-3, -3, -3, -3, -1,  3],
      [-3, -3, -3, -3, -1,  3],
      [-3, -3, -3, -3, -1,  3]
    ]
  };
  this.check = () => { 
    var curScore = 0, maxScore = 0, tempX = 0, tempY = 0;
    bestNumber = 0;
    for(let i = 0; i < amountNumber; i++) {
      scoreNumbers[i] = {};
    }
    //calculate the score of each number
    var temp = 0;
    for(let num = 0; num <= 9; num++) {
      curScore = 0;
      for(let y = 0; y < vertSqcnt; y++) {
        for(let x = 0; x < horiSqCnt; x++) {
          var curData = numberData[num][y][x];
          grid[x][y].seen ? curScore += curData : curScore -= curData;
        }
      }
      scoreNumbers[num].value = curScore;
      scoreNumbers[num].number = num;
      if(maxScore < curScore) {
        maxScore = curScore;
        bestNumber = num;
      }
    }
  }  
  this.drawThirdBoard = () => {
    
    //clean the screen
    ctx2.beginPath();
    ctx2.fillStyle = "white";
    ctx2.fillRect(0, 0, width_3, height_3);
    //draw score of 9 numbers
    ctx2.beginPath();
    ctx2.font = "20px Courier New";
    scoreNumbers.sort((a, b) => a.value - b.value);
    console.log(scoreNumbers);
    for(let i = 0; i < amountNumber; i++) {
      ctx2.strokeText("number " + scoreNumbers[amountNumber - i - 1].number + ":", 10, height_3 / 11 * (i + 1)- 10);
      ctx2.strokeText(scoreNumbers[amountNumber - i - 1].value + "%", width_3 / 1.25, height_3 / 11 * (i + 1)- 10);
    }
    ctx2.stroke();
    //the most similar score
    ctx2.beginPath();
    ctx2.font = "25px Courier New";
    ctx2.strokeText("The final number: ", 10, height_3 - 10);
    ctx2.strokeText(bestNumber, width_3 / 1.25 + 20, height_3 - 10);
    ctx2.stroke();
  }
  this.learn = () => { 
    if(corNumber != -1) {
      for(let y = 0; y < vertSqcnt; y++) {
        for(let x = 0; x < horiSqCnt; x++) {
          var curData = numberData[corNumber][y][x];
          if(grid[x][y].seen) 
            curData < maxPoint ? curData++ : 0;
          else curData > minPoint ? curData-- : 0;
          numberData[corNumber][y][x] = curData;
        }
      }
    }
  }
} 