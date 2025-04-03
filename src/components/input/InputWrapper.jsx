import { useState } from "react"
import Input from "./Input.jsx"
import { evalSequence } from "../../utils/index.js"

const nextInput = {
  first: "second", 
  second: "third",
  third: "fourth"
}

const prevInput = {
  second: "first",
  third: "second",
  fourth: "third"
}

export default function InputWrapper({
  sequence,
  handleAddGuess,
}) {
  const [values, setValues] = useState({
    first: undefined,
    second: undefined,
    third: undefined,
    fourth: undefined,
  })
  const [currentActive, setCurrentActive] = useState("first")

  const submit = (guess) => {
    const result = evalSequence(sequence, Object.values(guess))
    handleAddGuess({ ...result, values: guess })
      setValues({
        first: " ",
        second: " ",
        third: " ",
        fourth: " ",
      })
    setTimeout(() => {
      setCurrentActive("first")
    }, 1);
  }

  const checkIsValid = (num) => {
    return !Object.values(values).map(v => v).includes(num)
  }

  const handleSetValue = ({ key, value }) => {
    const newValues = {
      ...values,
      [key]: value
    }
    setValues(newValues)

    if (key !== "fourth") {
      setTimeout(() => {
        setCurrentActive(nextInput[key])
      }, 1);
      return
    }

    setCurrentActive(null)

    submit(newValues);
  }

  const handleBackspace = () => {
    if (currentActive !== "first") {
      const newValues = { ...values }
      newValues[currentActive] = " "
      newValues[prevInput[currentActive]] = " "
      setCurrentActive(prevInput[currentActive])
      setValues(newValues)
    }
  }

  return (
    <div className="flex gap-1 md:gap-4 justify-center">
      {Object.keys(values).map(key => (
        <Input
          key={key}
          name={key}
          value={values[key]}
          setValue={v => handleSetValue({ key, value: v })}
          active={currentActive === key}
          onActive={() => setCurrentActive(key)}
          onBackspace={handleBackspace}
          checkIsValid={checkIsValid}
        />
      ))}
    </div>
  )
}
