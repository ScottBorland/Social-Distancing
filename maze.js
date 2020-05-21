var cols, rows;
var w = 80;
var grid = [];

var mazeGenerated = false

var current;

var stack = [];

function index(i, j){
    if(i < 0 || j < 0 || i > cols - 1 || j > rows - 1){
        return -1;
    }
    return i + j * cols;
}


function Cell(i, j){
    this.i = i;
    this.j = j;
    this.walls = [true, true, true, true];
    this.visited = false;

    this.checkNeighbours = function(){
        var neighbours = [];

        var top    = grid[index(i, j - 1)];
        var right  = grid[index(i + 1, j)];
        var bottom = grid[index(i, j + 1)];
        var left   = grid[index(i - 1, j)];

        if(top && !top.visited){
            neighbours.push(top);
        }
        if(right && !right.visited){
            neighbours.push(right);
        }
        if(bottom && !bottom.visited){
            neighbours.push(bottom);
        }
        if(left && !left.visited){
            neighbours.push(left);
        }

        if(neighbours.length > 0){
            var r = floor(random(0, neighbours.length));
            return neighbours [r];
        }else{
            return undefined;
        }
    }

    this.highlight = function(){
        var x = this.i * w;
        var y = this.j * w;
        noStroke();
        //fill(0, 0, 255, 100);
        rect(x, y, w, w);
    }

    this.show = function(){
        var x = this.i*w;
        var y = this.j*w;
        //stroke(255);
        // stroke(0, 0, 255)
        // if(this.walls[0]){
        // line(  x,   y, x+w, y);
        // }
        // if(this.walls[1]){
        // line(x+w,   y, x+w, y+w);
        // }
        // if(this.walls[2]){
        // line(x+w, y+w,   x, y+w);
        // }
        // if(this.walls[3]){
        // line(  x, y+w,   x,   y);
        // }

        if(this.visited){
            noStroke();
            //fill(255, 0, 255);
            //fill(34, 56, 75)
            //fill(175, 165, 176)
            fill(51)
            rect(x, y, w, w);
        }
    }
}


function removeWalls(a, b){
    var x = a.i - b.i;
    if(x === 1){
        a.walls[3] = false;
        b.walls[1] = false;
    }else if (x === -1){
        a.walls[1] = false;
        b.walls[3] = false;
    }
    var y = a.j - b.j;
    if(y === 1){
        a.walls[0] = false;
        b.walls[2] = false;
    }else if (y === -1){
        a.walls[2] = false;
        b.walls[0] = false;
    }
}
