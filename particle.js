let particleMaxSpeed = 1
let infectionRadius = 50

class Particle {
  constructor(){
    this.pos = createVector(random(2 * w, width), random(2 * w, height))
    this.velocity = createVector(0, 0)
    this.rays = []
    for(let a = 0; a < 360; a += 90){
      this.rays.push(new Ray(this.pos, radians(a)))
    }
    this.xoff = random(10000)
    this.yoff = random(10000)

    this.infected = false
    this.isPlayer = false
    this.skinTone = Math.floor(Math.random() * 3);
  }

  update(){
    this.pos.add(this.velocity)
    this.velocity.limit(particleMaxSpeed)
  }

  checkInfection(particles){
    for(let ray of this.rays){
        //ray.show()
      for(let particle of particles){
        if(particle != this){
          if(this.infected){
        var rangedRay = p5.Vector.mult(ray.dir, 1000)
        if(checkIfInfect(ray.pos.x, ray.pos.y, rangedRay.x, rangedRay.y, particle.pos.x, particle.pos.y, 10)){
          if(dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y) < infectionRadius){
            particle.infected = true
            console.log('particle infected')
            //testSound.play()
          }
        }
      }

        }
      }
      if(this.infected){
      if(checkIfInfect(ray.pos.x, ray.pos.y, rangedRay.x, rangedRay.y, player.pos.x, player.pos.y, 15)){
        if(dist(this.pos.x, this.pos.y, player.pos.x, player.pos.y) < infectionRadius){
          player.infected = true
          console.log('player infected')
          }
        }
      }
    }
  }

  look(walls){
    for(let ray of this.rays){
      let closest = null
      let record = Infinity
      for(let wall of walls){
        const pt = ray.cast(wall)
        if(pt){
        const d = p5.Vector.dist(this.pos, pt)
        if(d < record){
          record = d
          closest = pt
          if(d < 10){
            stroke(255, 0, 0)
            this.push(ray.dir)
          }else{
            stroke(255)
            }
          }
        }
      }
      if(closest){
        stroke(0)
        //line(this.pos.x, this.pos.y, closest.x, closest.y)
      }
    }
  }

  push(dir){
    let posChange = p5.Vector.mult(dir, -10)
    this.setVelocity(posChange)
    //this.pos.add(posChange)
  }

  setPos(x, y){
    this.pos.set(x, y)
  }

  setVelocity(x, y){
    this.velocity.set(x, y)
  }


  show(){
    push()
    if(this.skinTone == 0){
    stroke(255,224,189)
    fill(255,224,189)
  } else if(this.skinTone == 1){
    stroke(234,192,134)
    fill(234,192,134)
  } else if(this.skinTone == 2){
    stroke(255,205,148)
    fill(255,205,148)
  }
    if(this.infected){
      stroke(0, 255, 0)
      fill(0, 255, 0)
    }
    if(this.isPlayer){
      stroke(255, 215, 0)
      fill(255, 215, 0)
      ellipse(this.pos.x, this.pos.y, 15)
      // stroke(255, 0, 0)
      // noFill()
      // ellipse(this.pos.x, this.pos.y, 100)
    }else{
    ellipse(this.pos.x, this.pos.y, 10)
    }
    pop()
  }
}
