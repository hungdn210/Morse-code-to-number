function Board() {
 
  this.clear = () => {
    ctx.fillStyle = "white";
      ctx.fillRect(0, 0, width_1, height_1);
      need_clear = 0;
      for(let i = 0; i < horiSqCnt; i++) {
        for(let j = 0; j < vertSqcnt; j++) {
          grid[i][j].seen = 0;
        }
      }
  }
  this.run = () => {
    corNumber = -1;
      this.updateBoard_2();
      this.zoom();
      this.drawBorder();
      this.drawBoard_2();
      recognise.check();
      recognise.drawThirdBoard();
      need_run = 0;
  }
  
  this.zoom = () => {
    //increase the size of picture covered
    ctx1.drawImage(canvas, border.x.min, border.y.min,
      border.x.max - border.x.min, border.y.max - border.y.min, 0, 0, width_2, height_2);
  };

  this.drawBorder = () => {
    //draw red border on the first screen
    ctx.strokeStyle = color_border;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, border.y.min);
    ctx.lineTo(width_1, border.y.min);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, border.y.max);
    ctx.lineTo(width_1, border.y.max);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(border.x.min, 0);
    ctx.lineTo(border.x.min, height_1);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(border.x.max, 0);
    ctx.lineTo(border.x.max, height_1);
    ctx.stroke();
  }
 
  this.drawBoard_2 = () => {
    //check the squares seen
    for(let i = 0; i < width_1; i++) {
      for(let j = 0; j < height_1; j++) {
        var pixel = ctx1.getImageData(i, j, 1, 1);
        var data = pixel.data;
        if(data[0] == rbgColorPen[0] && data[1] == rbgColorPen[1] && data[3] == rbgColorPen[3] && data[4] == rbgColorPen[4]) 
          grid[Math.floor(i / size_grid)][Math.floor(j / size_grid)].seen =  1;
      }
    }
    //draw background 
    ctx1.fillStyle = "#ccc";
    ctx1.fillRect(0, 0, width_2, height_2);
 
    //draw lines
    ctx1.strokeStyle = "black";
    for(let i = 0; i <= width_2; i += size_grid) 
      ctx1.strokeRect(i, 0, i, height_2);
    for(let j = 0; j <= height_2; j += size_grid) 
      ctx1.strokeRect(0, j, width_2, j);

    //draw circle in the squares seen on the right screen
    for(let i = 0; i < horiSqCnt; i++) {
      for(let j = 0; j < vertSqcnt; j++) {
        if(grid[i][j].seen) {
          ctx1.beginPath();
          ctx1.fillStyle = "black";
          var tempX = grid[i][j].x, tempY = grid[i][j].y;
          ctx1.fillRect(tempX - size_grid/2, tempY - size_grid/2 , size_grid, size_grid);
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
    border.x.min = width_1;
    border.y.min = height_1;
    border.x.max = 0;
    border.y.max = 0;
    //find the location of border
    for(let i = 1; i < width_1; i++) {
      for(let j = 1; j < height_1; j++) {
        var pixel = ctx.getImageData(i, j, 1, 1);
        var data = pixel.data;
        if(data[0] == rbgColorPen[0] && data[1] == rbgColorPen[1] && data[3] == rbgColorPen[3] && data[4] == rbgColorPen[4]) {
          //console.log(data);  
          border.x.min == width_1 ? border.x.min = i : 0;
          border.y.min > j ? border.y.min = j : 0;
          border.x.max = i;
          border.y.max = Math.max(border.y.max, j);
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
