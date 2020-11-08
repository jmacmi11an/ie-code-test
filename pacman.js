// create an object that holds the piece status
  // has it been placed?
  // what square is it on?
  // what direction is it facing?
// create a direction object that holds N, S, E, W
// create a function that shifts or unshifts the directions array (LEFT, RIGHT)
// create a move function
// create a report function


const status = {
  'square': [0, 0],
  'directions': ['NORTH', 'EAST', 'SOUTH', 'WEST'],
  'placed': false
};

const possibleDirections = {
  'NORTH' : [0, 1],
  'SOUTH' : [0, -1],
  'EAST' : [1, 0],
  'WEST' : [-1, 0]
};

// Helper function that organizes the status directions array so that the 0 position is always the direction that Pacman is facing.
const startDirection = function(direction, arr){
  while (direction !== arr[0]){
    arr.unshift(arr.pop())
  }
  return arr
}

// Helper function that changes Pacman's direction
const changeDirection = function (arr, changeCommand){
  if (changeCommand === 'LEFT') arr.unshift(arr.pop());
  if (changeCommand === 'RIGHT') arr.push(arr.shift());
  return arr;
}

// Helper function that checks to make sure a move doesn't go off the board/grid
const isPositionLegal = function (x = 0, y = 0){
  if (((status.square[0] + x) < 0 || (status.square[0] + x) > 4) ||
  ((status.square[1] + y) < 0 || (status.square[1] + y) > 4)){
    return false;
  }
  return true;
}

// Primary function that receives directions/instructions
const instruction = function (input){

  // For a PLACE command
  if (input.includes('PLACE')){
    status.placed = true;
    status.square = [parseInt(input[6]), parseInt(input[8])]    //this assumes correct input
    status.directions = startDirection(input.slice(10), status.directions)
  }

  // For a MOVE command
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

  // For a LEFT or RIGHT command
  if (input === 'LEFT' || input === 'RIGHT'){
    status.directions = changeDirection(status.directions, input);
    // console.log(status.directions[0])
  }

  // For a REPORT command
  if (input === 'REPORT'){
    return (status.placed) ?
      `${status.square[0]},${status.square[1]},${status.directions[0]}`
      :
      "error, piece hasn't been placed"
  }
}





///////////////////TESTS/////////////////
console.log(instruction('PLACE 0,0,NORTH'), '----------place')
console.log(instruction('MOVE'), '-----------move')
console.log(instruction('REPORT'), '------report')

console.log(instruction('PLACE 0,0,NORTH'), '----------place')
console.log(instruction('LEFT'), '-----------left')
console.log(instruction('MOVE'), '-----------move')
console.log(instruction('MOVE'), '-----------move')
console.log(instruction('REPORT'), '------report')

console.log(instruction('PLACE 1,2,EAST'), '----------place')
console.log(instruction('MOVE'), '-----------move')
console.log(instruction('MOVE'), '-----------move')
console.log(instruction('LEFT'), '-----------left')
console.log(instruction('MOVE'), '-----------move')
console.log(instruction('REPORT'), '------report')
