let walls = []
let ray
let particles = []
let particle
let xoff = 0
let yoff = 1000
let player

let items = []

let pause = false

let particleSpeed = 3

let testImage
let INTROSCREEN
let gameOver
let introScreen = true
let winScreen = true

let won = false

let exit

function preload() {
   testImage = loadImage('loo roll.jpg')
   INTROSCREEN = loadImage('letterIntro2.jpg')
   gameOver = loadImage('gameOver.jpg')
   winScreen = loadImage('winScreen.jpg')
}

function setup() {
createCanvas(1750, 880);

  cols = floor(width/w);
  rows = floor(height/w);
  frameRate(200);

  for(var j = 0; j < rows; j++){
      for(var i = 0; i < cols; i++){
          var cell = new Cell(i, j);
          grid.push(cell);
        }
    }
    current = grid[grid.length/2 + cols / 2]
		// soundFormats('mp3', 'ogg');
  	// testSound = loadSound('1.mp3');
    for(var i = 0; i < 5; i++){
      let randomXIndex = 1 + floor(Math.random() * (cols-1))
      let randomYIndex = 1+ floor(Math.random() * (rows-1))
      console.log(randomXIndex, randomYIndex)
      items.push(new Item(randomXIndex, randomYIndex))
    }
    exit = new Exit()
}

function keyPressed(){
    if(key == ' '){
      introScreen = !introScreen
    }
  }

/*function draw(){
  background(51)

  for(var i = 0; i < particles.length; i++){

  particles[i].checkInfection(particles)
  //particles[i].look(walls)
  particles[i].checkInfection(particles)
  particles[i].show()
  }
  player.show()
  player.setPos(createVector(mouseX, mouseY))

}*/

function draw() {
	if(!pause){
	background(0)
	for(var i = 0; i < grid.length; i++){
			grid[i].show()
	}
	for(let wall of walls){
		wall.show()
	}
  //draw entrance
  // fill(34, 34, 123)
  // stroke(34, 34 , 123)
  // rect(10, 10, w - 20, w - 20)

  exit.show()
  exit.checkIfWin()

	//particle.setVelocity(map(noise(xoff), 0, 1, -1, 1) * particleSpeed, map(noise(yoff), 0, 1, -1, 1) * particleSpeed)
	for(var i = 0; i < particles.length; i++){
	particles[i].velocity.add(map(noise(particles[i].xoff), 0, 1, -1, 1) * particleSpeed, map(noise(particles[i].yoff), 0, 1, -1, 1) * particleSpeed)

	particles[i].update()
	particles[i].checkInfection(particles)
	particles[i].look(walls)
	particles[i].show()

	particles[i].xoff += 0.01
	particles[i].yoff += 0.01
	}

	if(player){
    for(var i = 0; i < items.length; i++){
      items[i].show()
      if(items[i].checkIfTouchingPlayer()){
        items.splice(i, 1)
      }
    }

		player.setVelocity(createVector(0, 0))
		player.show()
		//player.velocity.add(map(noise(player.xoff), 0, 1, -1, 1) * particleSpeed, map(noise(player.yoff), 0, 1, -1, 1) * particleSpeed)
		var target = createVector(mouseX,mouseY);
    var distance = target.dist(player.pos);
    var mappedDistance = map(distance, 100, 0, 1.5, 0.5);
    target.sub(player.pos);
    target.normalize();
    target.mult(mappedDistance);
    player.velocity.add(target);
		player.look(walls)
		player.update()
		if(player.infected){
      image(gameOver, 0, 0, 1920, 1080)
			pause = true
		}
	}



	if(mazeGenerated == false){
	current.visited = true;
	current.highlight();
	//Step 1
	var next = current.checkNeighbours();
	if(next){
			next.visited = true;
			//Step 2
			stack.push(current);
			//Step 3
			removeWalls(current, next);
			//Step 4
			current = next;
	} else if (stack.length > 0){
			current = stack.pop();
	   }
	}
	if(stack.length == 0 && !mazeGenerated){
			mazeGenerated = true
			for(var k = 0; k < grid.length; k++){
			let x = grid[k].i*w;
			let y = grid[k].j*w;
			if(grid[k].walls[0]){
			if(Math.random() < 0.5){
				walls.push(new Boundary(x, y, x+w, y))
				}
			}
			if(grid[k].walls[1]){
				if(Math.random() < 0.5){
					walls.push(new Boundary(x+w, y, x+w, y+w))
				}
			}
			if(grid[k].walls[2]){
				if(Math.random() < 0.5){
					walls.push(new Boundary(x+w, y+w, x, y+w))
				}
			}
			if(grid[k].walls[3]){
				if(Math.random() < 0.5){
					walls.push(new Boundary(x, y+w, x, y))
				}
			}
		}
		walls.push(new Boundary(0, 0, width, 0))
		walls.push(new Boundary(width, 0, width, height))
		walls.push(new Boundary(width, height, 0, height))
		walls.push(new Boundary(0, height, 0, 0))
		for(var i = 0; i < 25; i++){
			particles.push(new Particle())
			if(Math.random() < 0.3){
				particles[i].infected = true
			}
			}
			player = new Particle()
			player.isPlayer = true
			player.infected = false
			player.setPos(createVector(w/2, w/2))
			//let initialPos = createVector(grid[grid.length/2 + cols / 2].i, grid[grid.length/2 + cols / 2].j)
			// let initialPos = (createVector(100, 200))
			// console.log(grid)
			// console.log(initialPos)
			// player.pos = createVector(initialPos, initialPos)
		}
	}
  // fill(234, 33, 32)
  // rect(0, 0, 1800, 880)
  if(introScreen){
  image(INTROSCREEN, 0, 0, 1920, 1080)
  }
  if(won){
    image(winScreen, 0, 0, 1920, 1080)
  }
}
