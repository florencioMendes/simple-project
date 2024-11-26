import cn from "@/helpers/cn"

function Ancor({ children, href }) {

  const style = {
    a : {
      mobileFirst:"font-Poppins cursor-pointer h-[7vw] text-[5vw] uppercase underline-animation",
      sm: "sm:h-[1.75vw] sm:text-[1.25vw]"
    }
  }

  return (
    <a className={cn(style.a.mobileFirst, style.a.sm)} href={href}>
      {children}
    </a>
  )
}

export default Ancor