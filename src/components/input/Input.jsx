import { useState, useEffect, useRef } from "react"
import clsx from "clsx"

export default function Input({
  name,
  value,
  setValue,
  active,
  onActive,
  onBackspace,
  checkIsValid,
  disabled = false,
  className=""
}) {
  const ref = useRef(null)
  const [isValid, setIsValid] = useState(true)
  const [animationClassName, setAnimationClassName] = useState("");

  const handleKeyPressed = ({ key }) => {
    if (key === "Backspace") {
      onBackspace()
      return
    }

    const num = Number(key)
    if (Number.isNaN(num)) return

    if (!checkIsValid(num)) {
      setIsValid(false)
      setAnimationClassName('animation-shake')
      setTimeout(() => {
        setAnimationClassName('') 
      }, 500);
      return
    }
    setIsValid(true)
    setValue(num)
  }

  useEffect(() => {
    if (active && ref.current) {
      ref.current.focus()
      return
    }

    ref.current.blur()
  }, [active])
  
  return(
    <input
      readOnly
      disabled={disabled}
      ref={ref}
      onKeyDown={handleKeyPressed}
      className={clsx({
        [`p-1 md:p-4 text-[16px] md:text-[32px] text-center text-white bg-gray-600 outline-none rounded rounded-4 aspect-square focus:bg-blue-800 max-w-[100px] w-full ${className}`]:true,
        [`bg-red-400 focus:bg-red-400 ${animationClassName}`]: !isValid
      })}
      value={value}
    />

  )
}
