const findNeighbours = (matrix, rowsLength, i, j) => {
  const left = ((i-1) >= 0) ? matrix[i-1][j] : null
  const rigth = ((i+1) < rowsLength) ? matrix[i+1][j] : null
  const top = ((j-1) >= 0) ? matrix[i][j-1] : null
  const bottom = ((j+1) < rowsLength) ? matrix[i][j+1] : null
  
  return [left, rigth, top, bottom]
}

const searchInMatrix = (matrix, rowsLength, columnsLength, word) => {
  const positionCached = new Set()
  const foundWordChars = []
  for(let i = 0; i < rowsLength; i++) {
      if(foundWordChars.length === word.length) return true
      for(let j = 0; j < columnsLength; j++) {
          const position = `${i}${j}`
          if(positionCached.has(position)) break
          
          const positionElm = matrix[i][j]
          const charIndex = word.indexOf(positionElm)
          
          if(charIndex >= 0) {
              if(charIndex === (word.length - 1)) {
                  positionCached.add(position)
                  foundWordChars.push(positionElm)
              } else {
                   const neightbours = findNeighbours(matrix, rowsLength, i, j) //
                  if(neightbours.includes(word[charIndex + 1])) {
                      positionCached.add(position)
                      foundWordChars.push(positionElm)
                  } else {
                      return false
                  }
              }
          }
      }   
  }
  return (foundWordChars.length === word.length)
}

const findWord = (matrix, rowsLength, columnsLength, words) => {
  const foundWords = []

  if(!words || (words && Array.isArray(words) && !words.length)) return foundWords
  
  for(let word of words) {
      const found = searchInMatrix(matrix, rowsLength, columnsLength, word)
      if(found) {
          foundWords.push(word)
      }
  }
  
  return foundWords
}

const matrix = [
  ["C", "A", "T"],
  ["O", "S", "K"],
  ["P", "Y", "U"]
]

console.log(findWord(matrix, 3, 3,[ "CAT", "COPY", "ASK", "SOS", "PUT" ]))
