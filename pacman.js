// # Code-Challenge-1
//
// Code problem details:
//
// -----------
//
// Pacman Simulator
//
// Description:
//
// - The application is a simulation of Pacman moving on in a grid, of dimensions 5 units x 5 units.
// - There are no other obstructions on the grid.
// - Pacman is free to roam around the surface of the grid, but must be prevented from moving off the grid. Any movement that would result in Pacman moving off the grid must  be prevented, however further valid movement commands must still be allowed.
// - Create an application that can read in commands of the following form -
//
// ```
// PLACE X,Y,F
//
// MOVE
//
// LEFT
//
// RIGHT
//
// REPORT
// ```
//
// - PLACE will put the Pacman on the grid in positon X,Y and facing NORTH,SOUTH, EAST or WEST.
// - The origin (0,0) can be considered the SOUTH WEST most corner.
// - The first valid command to Pacman is a PLACE command, after that, any sequence of commands may be issued, in any order, including another PLACE command. The application should discard all commands in the sequence until a valid PLACE command has been executed.
// - MOVE will move Pacman one unit forward in the direction it is currently facing.
// - LEFT and RIGHT will rotate Pacman 90 degrees in the specified direction without changing the position of Pacman.
// - REPORT will announce the X,Y and F of Pacman. This can be in any form, but standard output is sufficient.
// - Pacman that is not on the grid can choose the ignore the MOVE, LEFT, RIGHT and REPORT commands.
// - Input can be from a file, or from standard input, as the developer chooses.
// - Provide test data to exercise the application.
//
// **Constraints:**
//
// - Pacman must not move off the grid during movement. This also includes the initial placement of Pacman.
// - Any move that would cause Pacman to fall must be ignored.
//
// Example Input and Output:
// ```
// a)
// PLACE 0,0,NORTH
//
// MOVE
//
// REPORT
//
// Output: 0,1,NORTH
// ```
// ```
// b)
//
// PLACE 0,0,NORTH
//
// LEFT
//
// REPORT
//
// Output: 0,0,WEST
// ```
// ```
// c)
//
// PLACE 1,2,EAST
//
// MOVE
//
// MOVE
//
// LEFT
//
// MOVE
//
// REPORT
//
// Output: 3,3,NORTH
// ```
//
// **Deliverables:**
// - Spend as little or as much time as you like on the challenge.
// - The code you produce can be in any language
// - *It is not required to provide any graphical output* showing the movement of Pacman.
// - The output of the efforts *must be committed back into a Public Repo in Github* and the URL shared back for review.
// - Proving your code works via unit testing is highly encouraged




// create a constant that is the grid (0,0)-(4,4)
// create a direction array that holds N, S, E, W
// create a function that shifts or unshifts the direction array (LEFT, RIGHT)
// create a movement function
// create a report function
// create a function that checks for valid input


const status = {
  'square': [0, 0],
  'directions': ['NORTH', 'EAST', 'SOUTH', 'WEST'],
  'placed': false
};

const possibleDirections = {
  'NORTH' : [1, 0],
  'SOUTH' : [-1, 0],
  'EAST' : [0, 1],
  'WEST' : [0, -1]
};



const changeDirection = function (arr, changeCommand){
  if (changeCommand === 'LEFT') arr.unshift(arr.pop());
  if (changeCommand === 'RIGHT') arr.push(arr.shift());
  return arr;
}


const isPositionLegal = function (x, y){
  if (((status.square[0] + x) < 0 || (status.square[0] + x) > 4) ||
  ((status.square[1] + y) < 0 || (status.square[1] + y) > 4)){
    return false;
  }
  return true;
}


const instruction = function (input){
  if (input === 'MOVE'){
    let x = possibleDirections[status.directions[0]][0];
    let y = possibleDirections[status.directions[0]][1];
    if (isPositionLegal(x, y)){
      status.square[0] += x;
      status.square[1] += y;
    } else {
      console.log('not legal move')
    }
  }

  if (input === 'LEFT' || input === 'RIGHT'){
    status.directions = changeDirection(status.directions, input);
    // console.log(status.directions[0])
  }

  if (input === 'REPORT'){
    if (status.placed){
      return `${status.square[0]},${status.square[1]},${status.directions[0]}`
    }
    return "error, piece hasn't been placed"
  }
}








console.log(instruction('MOVE'), status.square)
console.log(instruction('MOVE'), status.square)
console.log(instruction('REPORT'), '------report')
console.log(instruction('LEFT'), status.square)
console.log(instruction('MOVE'), status.square)
console.log(instruction('MOVE'), status.square)
console.log(instruction('REPORT'), '------report')
console.log(instruction('RIGHT'), status.square)
console.log(instruction('RIGHT'), status.square)
console.log(instruction('MOVE'), status.square)
console.log(instruction('REPORT'), '------report')
console.log(instruction('MOVE'), status.square)
console.log(instruction('MOVE'), status.square)
console.log(instruction('MOVE'), status.square)
console.log(instruction('LEFT'), status.square)
console.log(instruction('MOVE'), status.square)
console.log(instruction('MOVE'), status.square)
console.log(instruction('REPORT'), '------report')
