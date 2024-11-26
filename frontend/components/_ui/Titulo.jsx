import cn from "@/helpers/cn"

function Titulo({ children, variant = "default" }) {

  const style = {
    h1 : {
      mobileFirst:"text-[6vw] capitalize text-center",
      sm: "sm:text-[2.5vw] sm:text-left"
    } 
  }

  const variants = {
    default: {
      h1 : {
        mobileFirst:"font-Poppins",
        sm: ""
      } 
    },
    bold: {
      h1 : {
        mobileFirst:"font-Poppins_bold",
        sm: ""
      } 
    }
  }

  return (
    <h1 className={cn(style.h1.mobileFirst, style.h1.sm, variants[variant].h1.mobileFirst, variants[variant].h1.sm)}>
      {children}
    </h1>
  )
}

export default Titulo