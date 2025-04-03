import en from "./en.js"
import pt from "./pt.js"

export function translate(key) {
  const texts = navigator.language === "pt-BR" ? pt : en

  return texts[key] || "BLOB..."

}
