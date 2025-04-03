import InputWrapper from "./components/input/InputWrapper.jsx"
import { genSequence } from "./utils/index.js"

const sequence = genSequence()

function App() {
  return (
    <div className="max-w-[1000px] mx-auto p-8 ">
      <h1 className="text-3xl text-white font-bold text-center mb-4">Guest the number</h1>
      <InputWrapper sequence={sequence} />
    </div>
  )
}

export default App
