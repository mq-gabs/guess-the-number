import InputWrapper from "./components/input/InputWrapper.jsx"
import ReadOnlyInputWrapper from "./components/input/ReadOnlyInputWrapper.jsx"
import { genSequence } from "./utils/index.js"
import { useState } from "react"
import { translate } from "./lang/index.js"

const sequence = genSequence()
console.log({ sequence })

document.title = translate("pageTitle")

function App() {
  const [guesses, setGuesses] = useState([])
  const [endOfGame, setEndOfGame] = useState(false)
  
  const handleAddGuess = (newGuess) => {
    setGuesses(prev => [...prev, newGuess])
    if (newGuess.correctPositionCount === 4) {
      setEndOfGame(true)
    }
  }

  return (
    <div className="max-w-[1000px] mx-auto p-8 ">
      {!endOfGame && (
        <div>
          <h1 className="text-3xl text-white font-bold text-center mb-4">{translate("guessTheNumber")}</h1>
          <div className="flex flex-col gap-4">
            {guesses.map(guess => (
              <div>
                <ReadOnlyInputWrapper
                  values={guess.values} 
                />
                <div className="text-white uppercase font-semibold mt-2 flex justify-center gap-2">
                  <p>{translate("correctValues")}: {guess.correctValuesCount}</p>
                  <p>{translate("correctPositions")}: {guess.correctPositionCount}</p>
                </div>
              </div>
            ))}
            <InputWrapper
              sequence={sequence}
              handleAddGuess={handleAddGuess}
            />
          </div>
        </div>
      )}
      {endOfGame && (
        <div>
          <h1 className="text-3xl text-white font-bold text-center mb-4">{translate("youFoundTheSequence")}</h1>
          <ReadOnlyInputWrapper
            values={guesses[guesses.length-1].values}
            endOfGame
          />
          <div className="flex justify-center mt-4">
            <button className="px-4 py-2 font-semibold mx-auto bg-white text-black rounded rounded-2 cursor-pointer" onClick={() => location.reload()}>{translate("playAgain")}</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
