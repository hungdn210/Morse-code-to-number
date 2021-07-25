function Board() {
  //clear button
  this.clear = () => {
    cleared = 1;
    ctx.fillStyle = "white";
      ctx.fillRect(0, 0, WIDTH_1, HEIGHT_1);
      need_clear = 0;
      for(let i = 0; i < HORI_SQ_CNT; i++) { 
        for(let j = 0; j < VERT_SQ_CNT; j++) {
          grid[i][j].seen = 0;
        }
      }
  }

  //run button
  this.run = () => {
    if(cleared) {
      this.updateBoard_2();
      this.zoom();
      this.drawBorder();
      this.drawBoard_2();
      recognise.check();
      recognise.drawThirdBoard();
      need_run = 0;
      cleared = 0;
    }
  }
  
  this.zoom = () => {
    //increase the size of picture covered
    ctx1.drawImage(canvas, border.x.min, border.y.min,
      border.x.max - border.x.min, border.y.max - border.y.min, 0, 0, WIDTH_2, HEIGHT_2);
  };

  this.drawBorder = () => {
    //draw red border on the first screen
    ctx.strokeStyle = COLOR_BORDER;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, border.y.min);
    ctx.lineTo(WIDTH_1, border.y.min);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, border.y.max);
    ctx.lineTo(WIDTH_1, border.y.max);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(border.x.min, 0);
    ctx.lineTo(border.x.min, HEIGHT_1);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(border.x.max, 0);
    ctx.lineTo(border.x.max, HEIGHT_1);
    ctx.stroke();
  }
  
  this.checkSeen = (mainX, mainY) => {
    for(let x = mainX * SIZE_GRID; x < (mainX + 1) * SIZE_GRID; x++) {
      for(let y = mainY * SIZE_GRID; y < (mainY + 1) * SIZE_GRID; y++) {
        var pixel = ctx1.getImageData(x, y, 1, 1);
        var data = pixel.data;
        if(data[0] == RBG_COLOR_PEN[0] && data[1] == RBG_COLOR_PEN[1] && data[3] == RBG_COLOR_PEN[3] && data[4] == RBG_COLOR_PEN[4])
          return 1;
      }
    } 
    return 0;
  } 

  this.drawBoard_2 = () => {
    //check the squares seen
    for(let x = 0; x < HORI_SQ_CNT; x++) {
      for(let y = 0; y < VERT_SQ_CNT; y++) {
        this.checkSeen(x, y) ? grid[x][y].seen = 1 : 0;
      }
    }
    
    //draw background 
    ctx1.fillStyle = "#ccc";
    ctx1.fillRect(0, 0, WIDTH_2, HEIGHT_2);
 
    //draw lines
    ctx1.strokeStyle = "black";
    for(let i = 0; i <= WIDTH_2; i += SIZE_GRID) 
      ctx1.strokeRect(i, 0, i, HEIGHT_2);
    for(let j = 0; j <= HEIGHT_2; j += SIZE_GRID) 
      ctx1.strokeRect(0, j, WIDTH_2, j);

    //draw circle in the squares seen on the right screen
    for(let i = 0; i < HORI_SQ_CNT; i++) {
      for(let j = 0; j < VERT_SQ_CNT; j++) {
        if(grid[i][j].seen) {
          ctx1.beginPath();
          ctx1.fillStyle = "black";
          var tempX = grid[i][j].x, tempY = grid[i][j].y;
          ctx1.fillRect(tempX - SIZE_GRID/2, tempY - SIZE_GRID/2 , SIZE_GRID, SIZE_GRID);
          ctx1.fillStyle = "green";
          ctx1.arc(tempX, tempY, 10, 0, 2 * Math.PI);
          ctx1.stroke();
          ctx1.fill();
        }
      }
    }
  }
 
  this.updateBoard_2 = () => {
    //set up Red border 
    border.x.min = WIDTH_1;
    border.y.min = HEIGHT_1;
    border.x.max = 0;
    border.y.max = 0;
    //find the location of border
    scanLeft:
    for(let x = 1; x < WIDTH_1; x++) {
      for(let y = 1; y < HEIGHT_1; y++) {
        var pixel = ctx.getImageData(x, y, 1, 1);
        var data = pixel.data;
        if(data[0] == RBG_COLOR_PEN[0] && data[1] == RBG_COLOR_PEN[1] && data[3] == RBG_COLOR_PEN[3] && data[4] == RBG_COLOR_PEN[4]) {
          border.x.min = x;
          break scanLeft;
        }
      }
    }

    scanRight:
    for(let x = WIDTH_1; x > 0; x--) {
      for(let y = 1; y < HEIGHT_1; y++) {
        var pixel = ctx.getImageData(x, y, 1, 1);
        var data = pixel.data;
        if(data[0] == RBG_COLOR_PEN[0] && data[1] == RBG_COLOR_PEN[1] && data[3] == RBG_COLOR_PEN[3] && data[4] == RBG_COLOR_PEN[4]) {
          border.x.max = x;
          break scanRight;
        }
      }
    }

    scanTop:
    for(let y = 1; y < HEIGHT_1; y++) {
      for(let x = border.x.min; x < border.x.max; x++) {
        var pixel = ctx.getImageData(x, y, 1, 1);
        var data = pixel.data;
        if(data[0] == RBG_COLOR_PEN[0] && data[1] == RBG_COLOR_PEN[1] && data[3] == RBG_COLOR_PEN[3] && data[4] == RBG_COLOR_PEN[4]) {
          border.y.min = y;
          break scanTop;
        }
      }
    }

    scanBottom:
    for(let y = HEIGHT_1; y > 0; y--) {
      for(let x = border.x.min; x < border.x.max; x++) {
        var pixel = ctx.getImageData(x, y, 1, 1);
        var data = pixel.data;
        if(data[0] == RBG_COLOR_PEN[0] && data[1] == RBG_COLOR_PEN[1] && data[3] == RBG_COLOR_PEN[3] && data[4] == RBG_COLOR_PEN[4]) {
          border.y.max = y;
          break scanBottom;
        }
      }
    }

    //fix problems with border 
    if(border.x.max - border.x.min < (border.y.max - border.y.min) / 2) {
      var temp = (border.x.max + border.x.min) / 2;
      border.x.min = temp - (border.y.max - border.y.min) / 4;
      border.x.max = temp + (border.y.max - border.y.min) / 4;
    }

    if(border.y.max - border.y.min < (border.x.max - border.x.min) / 2) {
      var temp = (border.y.max + border.y.min) / 2;
      border.y.min = temp - (border.x.max - border.x.min) / 4;
      border.y.max = temp + (border.x.max - border.x.min) / 4;
    }
  }
}
