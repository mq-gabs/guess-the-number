import { useState } from "react"
import Input from "./Input.jsx"
import { evalSequence } from "../../utils/index.js"

const nextInput = {
  first: "second", 
  second: "third",
  third: "fourth"
}

export default function InputWrapper({
  sequence,
}) {
  const [values, setValues] = useState({
    first: undefined,
    second: undefined,
    third: undefined,
    fourth: undefined,
  })
  const [currentActive, setCurrentActive] = useState("first")

  const submit = () => {
    const result = evalSequence(sequence, Object.values(values))
    console.log({ result })
  }

  const checkIsValid = (num) => {
    return !Object.values(values).map(v => v).includes(num)
  }

  const handleSetValue = ({ key, value }) => {
    setValues(prev => ({
      ...prev,
      [key]: value
    }))

    if (key !== "fourth") {
      setTimeout(() => {
        setCurrentActive(nextInput[key])
      }, 1);
      return
    }

    setCurrentActive(null)

    submit();
  }

  return (
    <div className="flex gap-4 justify-center">
      {Object.keys(values).map(key => (
        <Input
          key={key}
          name={key}
          value={values[key]}
          setValue={v => handleSetValue({ key, value: v })}
          active={currentActive === key}
          onActive={() => setCurrentActive(key)}
          checkIsValid={checkIsValid}
        />
      ))}
    </div>
  )
}
