const control = {
  touch0: {x: 0, y: 0, hold: null}, stickAreaRadius: 100, stickSizeRadius: 30,
  mouse: {x: 0, y: 0, hold: null},
  keyboard: {isGoLeft: false, isGoRight: false, isGoUp: false, isGoDown: false},
  
  get axis() {
    let res = { x: this.keyboard.isGoRight - this.keyboard.isGoLeft, y: this.keyboard.isGoDown - this.keyboard.isGoUp }
    if (this.mouse.hold != null) {
      res.x += this.mouse.x - this.mouse.hold.x
      res.y += this.mouse.y - this.mouse.hold.y
    } else if(this.touch0.hold != null) {
      res.x += this.touch0.x - this.touch0.hold.x
      res.y += this.touch0.y - this.touch0.hold.y
    }
    
    if (Math.sqrt(res.x * res.x + res.y * res.y) < (this.stickAreaRadius - this.stickSizeRadius)) {
      multiplication(res, 1/(this.stickAreaRadius - this.stickSizeRadius))
    } else {
      normalize(res, 1) 
    }
    return res
  }
}


// --- touch ---
addEventListener('touchstart', function(ev) {
  ev.preventDefault()

  if (document.fullscreenElement == null) { canvas.requestFullscreen() }
  if (ev.targetTouches.length > 2) { settings.debug = !settings.debug }
  for (var i=0; i < ev.targetTouches.length; i++) {
    if (i > 0) break
    control['touch'+i].hold = {x: ev.changedTouches[i].pageX + canvas.offsetLeft, y: ev.changedTouches[i].pageY + canvas.offsetTop }
    control['touch'+i].x = ev.changedTouches[i].pageX + canvas.offsetLeft
    control['touch'+i].y = ev.changedTouches[i].pageY + canvas.offsetTop
  }
}, false)

addEventListener("touchend", function(ev) {
  ev.preventDefault()
  control['touch0'].hold = null
}, false)

addEventListener("touchmove", function(ev) {
  ev.preventDefault()
  control['touch0'].x = ev.changedTouches[0].pageX + canvas.offsetLeft
  control['touch0'].y = ev.changedTouches[0].pageY + canvas.offsetTop
}, false)


// --- mouse ---
function onMouseUpdate(e) {
  control.mouse.x = e.x - canvas.offsetLeft
  control.mouse.y = e.y - canvas.offsetTop  
}

addEventListener('mousemove', onMouseUpdate, false)
addEventListener('mouseenter', onMouseUpdate, false)

addEventListener("mousedown", function(e) {
  control.mouse.hold = {x: e.layerX, y: e.layerY }
})
addEventListener("mouseup", function() {
  control.mouse.hold = null
})


// --- keyboard ---
addEventListener("keydown", function(e) {
  // if (e.ctrlKey || e.altKey) return
  if ('type' in e && e['type'] == 'keydown') { console.log("key pressed '"+e.key+"'") }
  switch (e.key) {
    case settings.keys.left:
      control.isGoLeft = true
      break
    case settings.keys.right:
      control.isGoRight = true
      break
    case settings.keys.up:
      control.isGoUp = true
      break
    case settings.keys.down:
      control.isGoDown = true
      break
    case ' ':
      settings.debug = !settings.debug
      break
  }
})
addEventListener("keyup", function(e) {
  switch (e.key) {
    case settings.keys.left:
      control.isGoLeft = false
      break
    case settings.keys.right:
      control.isGoRight = false
      break
    case settings.keys.up:
      control.isGoUp = false
      break
    case settings.keys.down:
      control.isGoDown = false
      break
  }
})