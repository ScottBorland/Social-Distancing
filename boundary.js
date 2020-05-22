class Boundary {
  constructor(x1, y1, x2, y2){
    this.a = createVector(x1, y1)
    this.b = createVector(x2, y2)
  }
  show(){
    strokeWeight(3)
    stroke(255)
    line(this.a.x, this.a.y, this.b.x, this.b.y)
  }
}

class Item {
  constructor(i, j){
    this.gridRef = createVector(i, j)
    this.pos = createVector(this.gridRef.x * w + w / 2, this.gridRef.y * w + w / 2)
    this.bought = false
  }
  show(){
    stroke(50, 0, 255)
    fill(50, 0, 255)
    ellipse(this.pos.x, this.pos.y, 10)
    image(testImage, this.pos.x - 20, this.pos.y - 20, 40, 40)
  }
  checkIfTouchingPlayer(){
    if(dist(this.pos.x, this.pos.y, player.pos.x, player.pos.y) < 10){
      exit.checkIfWin()
      return true
    } else {
      return false
    }
  }
}

class Exit {
  constructor(){
    this.pos = createVector((cols - 1) * w + w / 2 , (rows - 1) * w + w / 2)
  }
  show(){
    stroke(100, 255, 100)
    fill(100, 255, 100)
    if(items.length == 0){
      stroke(50, 255, 0)
      fill(50, 255, 0)
    }
    rect(this.pos.x + 50 - w/2, this.pos.y + 50-w/2, this.pos.x + 10, this.pos.y + 10)
  }
  checkIfWin(){
    if(items.length == 0 && dist(this.pos.x, this.pos.y, player.pos.x -30, player.pos.y-30) < 15){
      pause = true
      won = true
      image(winScreen, 0, 0, 1920, 1080)
      return true
    }else{
      return false
    }
  }
}
