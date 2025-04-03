export function genSequence() {
  const digits = [0,1,2,3,4,5,6,7,8,9]
  let nums = []
  for (let i = 0; i < 4; i++) {
    const pos = Math.floor(Math.random() * digits.length)
    nums.push(digits[pos])
    digits.splice(pos, 1)
  }

  return nums
}

export function evalSequence(target, guess) {
  let pos = 0
  let correctValuesCount = 0
  let correctPositionCount = 0

  for (const val of guess) {
    if (target?.includes(val)) {
      correctValuesCount += 1
      if (target[pos] === val) {
        correctPositionCount += 1
      }
    }

    pos += 1
  }
      
  return {
    correctValuesCount,
    correctPositionCount
  } 
}
