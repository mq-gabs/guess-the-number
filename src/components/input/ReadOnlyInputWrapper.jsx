import { useState } from "react"
import Input from "./Input.jsx"
import { evalSequence } from "../../utils/index.js"

const nextInput = {
  first: "second", 
  second: "third",
  third: "fourth"
}

export default function ReadOnlyInputWrapper({
  values,
  endOfGame
}) {
  return (
    <div className="flex gap-4 justify-center">
      {Object.keys(values).map(key => (
        <Input
          key={key}
          name={key}
          value={values[key]}
          disabled
          className={endOfGame ? "correct" : ""}
        />
      ))}
    </div>
  )
}
