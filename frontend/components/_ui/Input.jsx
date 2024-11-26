import cn from "@/helpers/cn"
import { useEffect, useState } from "react"

function Input({ children, cols_span }) {
  const [cols, setCols] = useState("")
  const style = {
    article : {
      mobileFirst:"font-Poppins",
      sm: ""
    },
    label : {
        mobileFirst:"block capitalize italic text-gray-400",
        sm: ""
    },
    input : {
        mobileFirst:"bg-transparent border-0 border-b-2 border-gray-300 focus:border-[#8c52ff] outline-none transition-colors duration-300 w-full",
        sm: ""
    }
  }

  useEffect(()=>{
    // col-span-${cols_span.mobile} sm:
    setCols("col-span-"+cols_span.sm)
  },[cols_span.mobile, cols_span.sm])

  return (
    <article className={cn(style.article.mobileFirst, style.article.sm, cols)}>
        <label htmlFor="" className={cn(style.label.mobileFirst, style.label.sm)}>{children}</label>
        <input name={children} type="text" className={cn(style.input.mobileFirst, style.input.sm)}/>
    </article>
  )
}

export default Input