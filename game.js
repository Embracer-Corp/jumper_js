const GameState = {
  MENU: 0,
  WORKS: 1,
  PAUSED: 2
}

let needTimeToSkip = 0
const game = {
  state: GameState.MENU,
  player: {x: 0, y: 0, realX: 0, realY: 0},
  map: {width:7, height:12, cellSize: 0, color: ['#20BB99', '#502090'], pattern: [
    [0,0,0,0,0,0,0],
    [0,1,1,0,1,1,0],
    [1,0,0,1,0,0,1],
    [1,0,0,0,0,0,1],
    [0,1,0,0,0,1,0],
    [0,0,1,0,1,0,0],
    [0,0,0,1,0,0,0]
  ]},
  start() {
    this.player.x = Math.floor(this.map.width/2); this.player.y = this.map.height
    this.player.realX = (this.player.x + 0.5) * this.map.cellSize; this.player.realY = this.player.y * this.map.cellSize
    this.state = GameState.WORKS
  },
  logic(timePass) {
    let maxSpeed = this.map.cellSize * timePass / 1000
    
    let dx = this.player.realX - (this.player.x + 0.5) * this.map.cellSize
    if (Math.abs(dx) < maxSpeed) {
      this.player.realX = (this.player.x + 0.5) * this.map.cellSize
    } else {      
      this.player.realX -= Math.sign(dx) * maxSpeed
    }
    let dy = this.player.realY - (this.player.y) * this.map.cellSize
    if (Math.abs(dy) < maxSpeed) {
      this.player.realY = (this.player.y) * this.map.cellSize
    } else {      
      this.player.realY -= Math.sign(dy) * maxSpeed
    }

    if (needTimeToSkip > 0) {
      needTimeToSkip -= timePass
      return
    }
    
    //let distance = control.axis
    //multiplication(distance, maxSpeed)
    if (control.keyboard.isGoLeft) {
      this.player.x--
      needTimeToSkip = 1000
    } else if (control.keyboard.isGoRight) {
      this.player.x++
      needTimeToSkip = 1000
    }
    if (this.player.y < this.map.height) {
      this.player.y++
      needTimeToSkip = 1000
    } else if (control.keyboard.isGoUp) {
      this.player.y--
      needTimeToSkip = 1000
    }

  },

  draw(ctx, ctxWidth, ctxHeight, timePass) {
    ctx.clearRect(0, 0, ctxWidth, ctxHeight)
    ctx.font = "12px Lucida Console"
    
    for(let j = 0; j < (settings.screen.orientation == ScreenOrientation.PORTRAIT ? this.map.height : this.map.width); j++) {
      for(let i = 0; i < (settings.screen.orientation == ScreenOrientation.PORTRAIT? this.map.width : this.map.height); i++) {
        if (j < 7) {
          ctx.fillStyle = this.map.color[this.map.pattern[j][i]] + ((i+j)%2?'35':'40')
        } else {
          ctx.fillStyle = (i+j)%2?"#656565":"#707070"
        }
        ctx.fillRect(settings.screen.offset.x + i*this.map.cellSize, settings.screen.offset.y + j*this.map.cellSize, this.map.cellSize, this.map.cellSize)
      }
    }

    ctx.fillStyle = "#F0602030"
    ctx.fillRect(settings.screen.offset.x + this.player.x * this.map.cellSize, settings.screen.offset.y + (this.player.y - 1) * this.map.cellSize, this.map.cellSize, this.map.cellSize)
    ctx.fillStyle = "#902000"
    ctx.fillRect(settings.screen.offset.x + this.player.realX - this.map.cellSize/2, settings.screen.offset.y + this.player.realY - this.map.cellSize, this.map.cellSize, this.map.cellSize)
    
    control.drawStick(ctx, ctxWidth, ctxHeight, timePass)
    if (settings.debug) {
      diagnostic.drawFpsInfo(ctx, ctxWidth, ctxHeight, timePass)
    }
  }
}
