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
    stroke(255, 100, 0)
    fill(255, 100, 0)
    ellipse(this.pos.x, this.pos.y, 10)
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
    this.pos = createVector((cols - 1) * w + w / 2, (rows - 1) * w + w / 2)
  }
  show(){
    stroke(255, 65, 34)
    fill(255, 65, 34)
    if(items.length == 0){
      stroke(0, 100, 255)
      fill(0, 100, 255)
    }
    ellipse(this.pos.x, this.pos.y, 20)
  }
  checkIfWin(){
    if(items.length == 0 && dist(this.pos.x, this.pos.y, player.pos.x, player.pos.y) < 10){
      pause = true
      return true
    }else{
      return false
    }
  }
}
