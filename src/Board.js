class ExecutionStack {
    constructor (board) {
      console.debug('ExecutionStack :: constructor')
      this.instructions = {'ADD': this.__add}
      this.stack = []
      this.board = board
    }
    __add (coords, executionStack) {
      let [x1, y1, x2, y2] = coords
      executionStack.board.squares[x2][y2] = executionStack.board.squares[x1][y1] * 2
      executionStack.board.points += executionStack.board.squares[x1][y1]
      executionStack.board.squares[x1][y1] = 0
      executionStack.board.hasMoved = true
    }
    push (instruction, ...coords) {
      this.stack.push({coords: coords, instruction: instruction})
    }
    execute () {
      this.stack.forEach((action) => {
        if (Object.keys(this.instructions).includes(action.instruction)) {
          this.instructions[action.instruction](action.coords, this)
        } else {
          console.error('ExecutionStack :: Unknown instruction', action)
        }
      })
      this.stack = []
    }
  }
  
  class Board {
    init (size) {
      console.debug('Board :: init', size)
      this.size = size
      this.squares = []
      this.hasMoved = false
      this.stack = new ExecutionStack(this)
      this.over = false
      this.points = 0
      for (let x = 0; x < size; x++) {
        this.squares[x] = []
        for (let y = 0; y < size; y++) {
          if (Math.random() < 0.3) {
            this.squares[x][y] = (Math.ceil(Math.random() * 2) * 2)
          } else {
            this.squares[x][y] = 0
          }
        }
      }
      console.debug(this.squares)
    }
    get (x, y) {
      return this.squares[x][y]
    }
    set (x, y, value) {
      this.squares[x][y] = value
    }
    move (key) {
      if (this.over) {
        return
      }
      console.debug('Board :: move', key)
      this.hasMoved = false
      let start = {x: 0, y: 0}
      let momentum = {x: 0, y: 0}
      switch (key) {
        case 'up':
          start = {x: 0, y: 0}
          momentum = {x: 1, y: 1}
          break
        case 'down':
          start = {x: 0, y: 3}
          momentum = {x: 1, y: -1}
          break
        case 'left':
          start = {x: 0, y: 3}
          momentum = {x: 1, y: -1}
          break
        case 'right':
          start = {x: 3, y: 3}
          momentum = {x: -1, y: -1}
          break
        default:
          return
      }
  
      for (let x = 0; (start.x + x) < this.size && (start.x + x) >= 0; x += momentum.x) {
        for (let y = 0; (start.y + y) < this.size && (start.y + y) >= 0; y += momentum.y) {
          if (this.squares[start.x + x][start.y + y]) {
            this.moveSquareToBorder(start.x + x, start.y + y, key)
          }
          this.stack.execute()
        }
      }
      if (this.hasMoved) {
        this.addRandomSquare()
        if (this.isOver()) {
          this.over = true
          console.log('You Lost')
        }
      }
    }
    log () {
      let output = ''
      for (let x = 0; x < this.size; x++) {
        for (let y = 0; y < this.size; y++) {
          output += `${this.squares[x][y]}|`
        }
        output += '\n'
      }
      console.log(output)
    }
    isOver () {
      for (let x = 0; x < this.size; x++) {
        for (let y = 0; y < this.size; y++) {
          if (this.squares[x][y] === 0) {
            return false
          } else {
            const neighbours = this.getNeighbours(x, y)
            if (neighbours.includes(this.squares[x][y])) {
              return false
            }
          }
        }
      }
      return true
    }
    getNeighbours (x, y) {
      const neighbours = []
      if (x - 1 > 0) {
        neighbours.push(this.squares[x - 1][y])
      }
      if (x + 1 < this.size) {
        neighbours.push(this.squares[x + 1][y])
      }
      if (y - 1 > 0) {
        neighbours.push(this.squares[x][y - 1])
      }
      if (y + 1 < this.size) {
        neighbours.push(this.squares[x][y + 1])
      }
      return neighbours
    }
    addRandomSquare () {
      let randX = Math.ceil((Math.random() * 4) - 1)
      let randY = Math.ceil((Math.random() * 4) - 1)
      while (this.squares[randX][randY]) {
        randX = Math.ceil((Math.random() * 4) - 1)
        randY = Math.ceil((Math.random() * 4) - 1)
      }
      this.squares[randX][randY] = Math.ceil(Math.random() * 2) * 2
    }
    addSquaresIfNeeded (x1, y1, x2, y2) {
      if (this.squares[x1][y1] === this.squares[x2][y2]) {
          this.stack.push('ADD', x1, y1, x2, y2)
          return true
      }
      return false
    }
    moveSquareToBorder (x, y, key) {
      if (key === 'up') {
        while (y - 1 >= 0) {
          if (this.squares[x][y - 1] === 0) {
            this.squares[x][y - 1] = this.squares[x][y]
            this.squares[x][y] = 0
            this.hasMoved = true
          } else {
            this.addSquaresIfNeeded(x, y, x, y - 1)
          }
          y--
        }
      } else if (key === 'down') {
        while (y + 1 < this.size) {
          if (this.squares[x][y + 1] === 0) {
            this.squares[x][y + 1] = this.squares[x][y]
            this.squares[x][y] = 0
            this.hasMoved = true
          } else {
            this.addSquaresIfNeeded(x, y, x, y + 1)
          }
          y++
        }
      } else if (key === 'left') {
        while (x - 1 >= 0) {
          if (this.squares[x - 1][y] === 0) {
            this.squares[x - 1][y] = this.squares[x][y]
            this.squares[x][y] = 0
            this.hasMoved = true
          } else {
            this.addSquaresIfNeeded(x, y, x - 1, y)
          }
          x--
        }
      } else if (key === 'right') {
        while (x + 1 < this.size) {
          if (this.squares[x + 1][y] === 0) {
            this.squares[x + 1][y] = this.squares[x][y]
            this.squares[x][y] = 0
            this.hasMoved = true
          } else {
              if (this.addSquaresIfNeeded(x, y, x + 1, y)) {
                  x--
              }
          }
          x++
        }
      }
    }
  }
  
  export default new Board()