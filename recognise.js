function Recognise() {
  
  this.check = () => { 
    var curScore = 0, maxScore = 0, tempX = 0, tempY = 0;
    bestNumber = 0;
    for(let i = 0; i < AMOUNT_NUMBER; i++) {
      scoreNumbers[i] = {};
    }
    //calculate the score of each number
    var temp = 0;
    for(let num = 0; num < AMOUNT_NUMBER; num++) {
      curScore = 0;
      for(let y = 0; y < VERT_SQ_CNT; y++) {
        for(let x = 0; x < HORI_SQ_CNT; x++) {
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
    ctx2.fillRect(0, 0, WIDTH_3, HEIGHT_3);
    //write score of 9 numbers
    ctx2.beginPath();
    ctx2.font = "20px Courier New";
    scoreNumbers.sort((a, b) => a.value - b.value);
    console.log(scoreNumbers);
    for(let i = 0; i < AMOUNT_NUMBER; i++) {
      ctx2.strokeText("number " + scoreNumbers[AMOUNT_NUMBER - i - 1].number + ":", 10, HEIGHT_3 / 11 * (i + 1)- 10);
      ctx2.strokeText(scoreNumbers[AMOUNT_NUMBER - i - 1].value + "%", WIDTH_3 / 1.25, HEIGHT_3 / 11 * (i + 1)- 10);
    }
    ctx2.stroke();
    //write the most similar score
    ctx2.beginPath();
    ctx2.font = "25px Courier New";
    ctx2.strokeText("The final number: ", 10, HEIGHT_3 - 10);
    ctx2.strokeText(bestNumber, WIDTH_3 / 1.25 + 20, HEIGHT_3 - 10);
    ctx2.stroke();
  }
} 