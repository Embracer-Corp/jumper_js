const GameState = {
  MENU: 0,
  WORKS: 1,
  PAUSED: 2
}

const game = {
  state: GameState.MENU,
  player: {x: 0, y: 0, size: 50, speed: 100, collision:false},
  map: {width:7, height:12, cellSize: 0},

  logic(timePass) {
    let maxSpeed = this.player.speed * timePass / 1000
    let distance = control.axis
    multiplication(distance, maxSpeed)
    
    if (this.player.x - this.player.radius + distance.x < 0) {
      distance.x = this.player.radius - this.player.x
    } else if (this.player.x + this.player.radius + distance.x > this.map.width * this.map.cellSize) {
      distance.x = this.map.width * this.map.cellSize - this.player.radius - this.player.x
    }
    if (this.player.y - this.player.radius + distance.y < 0) {
      distance.y = this.player.radius - this.player.y
    } else if (this.player.y + this.player.radius + distance.y > this.map.height * this.map.cellSize) {
      distance.y = this.map.height * this.map.cellSize - this.player.radius - this.player.y
    }

    let isCollision = false
    // for(let c in map)
    // {
    //   //console.log(`R:${this.player.radius}, x:${this.player.x.toFixed(2)}, y:${this.player.y.toFixed(2)}, a:${map[c].x}, b:${map[c].y}, dy2:${this.player.radius*this.player.radius - this.player.y*this.player.y}, dx:${Math.sqrt(this.player.radius*this.player.radius - this.player.x*this.player.x)}`)
    //   if(Math.abs(Math.sqrt(this.player.radius*this.player.radius - this.player.y*this.player.y) - map[c].y) <= 0.1 && Math.abs(Math.sqrt(this.player.radius*this.player.radius - this.player.x*this.player.x) - map[c].x) <= 0.1) {
    //     isCollision = true
    //   }
    //   if(this.player.x >= map[c].x && this.player.x <= map[c].w + map[c].x &&
    //      this.player.y >= map[c].y && this.player.y <= map[c].h + map[c].y )
    //   {
    //     isCollision = true
    //   }
    // }
    this.player.collision = isCollision
      
    this.player.x += distance.x
    this.player.y += distance.y
      
  },

  draw(ctx, ctxWidth, ctxHeight, timePass) {
    ctx.clearRect(0, 0, ctxWidth, ctxHeight);
    ctx.font = "12px bold Lucida Console";

    // for (let j = Math.floor((this.player.camera.y-ctxHeight/2)/this.map.cellSize); j < (this.player.camera.y+ctxHeight/2)/this.map.cellSize; j++) {    
    //   for (let i = Math.floor((this.player.camera.x-ctxWidth/2)/this.map.cellSize); i < (this.player.camera.x+ctxWidth/2)/this.map.cellSize; i++) {
    //     if (i < 0 || i >= this.map.width/this.map.cellSize || j < 0 || j >= this.map.height/this.map.cellSize) { continue }
    //     ctx.fillStyle = (i+j)%2?"#707580":"#707070"
    //     ctx.fillRect(ctxWidth/2 -this.player.camera.x + i*this.map.cellSize, ctxHeight/2 -this.player.camera.y + j*this.map.cellSize, this.map.cellSize, this.map.cellSize)
    //   }
    // }

    // ctx.strokeStyle = this.player.collision?"#FF2000":"#000"
    // for(let c in map)
    // {
    //   ctx.fillStyle = "#307540"
    //   ctx.beginPath(); ctx.rect(ctxWidth/2 -this.player.camera.x + map[c].x, ctxHeight/2 -this.player.camera.y + map[c].y, map[c].w, map[c].h)
    //   ctx.fill(); ctx.stroke()
    //   ctx.fillStyle = "#000"
    //   let text = `x: ${map[c].x.toFixed(2)}, y:${map[c].y.toFixed(2)}`
    //   ctx.fillText(text, ctxWidth/2 -this.player.camera.x + map[c].x + 5, ctxHeight/2 -this.player.camera.y + map[c].y + 15)
    // }

    ctx.fillStyle = "#902000"
    
    ctx.beginPath(); ctx.arc(this.player.x, this.player.y, this.player.radius, 0, 2 * Math.PI)
    ctx.fill(); ctx.stroke()
    ctx.fillStyle = "#000"
    ctx.fillRect(this.player.x - 1, this.player.y - 1, 2, 2)
    let text = `x: ${this.player.x.toFixed(2)}, y:${this.player.y.toFixed(2)}`
    ctx.fillText(text, this.player.x - ctx.measureText(text).width/2, this.player.y+15)

    if (control.mouse.hold != null) {
      ctx.fillStyle = "#00000030";
      ctx.beginPath();ctx.arc(control.mouse.hold.x, control.mouse.hold.y, control.stickAreaRadius, 0, 2 * Math.PI);
      ctx.fill(); ctx.stroke()
      ctx.beginPath();ctx.arc(control.mouse.hold.x, control.mouse.hold.y, control.stickSizeRadius, 0, 2 * Math.PI);
      ctx.fill()
      ctx.fillStyle = "#333333";
      ctx.beginPath();ctx.arc(control.mouse.x, control.mouse.y, control.stickSizeRadius, 0, 2 * Math.PI);
      ctx.fill(); ctx.stroke()
    }
    if (control.touch0.hold != null) {
      ctx.fillStyle = "#00000030";
      ctx.beginPath();ctx.arc(control.touch0.hold.x, control.touch0.hold.y, control.stickAreaRadius, 0, 2 * Math.PI);
      ctx.fill(); ctx.stroke()
      ctx.beginPath();ctx.arc(control.touch0.hold.x, control.touch0.hold.y, control.stickSizeRadius, 0, 2 * Math.PI);
      ctx.fill()
      ctx.fillStyle = "#333333";
      ctx.beginPath();ctx.arc(control.touch0.x, control.touch0.y, control.stickSizeRadius, 0, 2 * Math.PI);
      ctx.fill(); ctx.stroke()
    }
    
  }
}
