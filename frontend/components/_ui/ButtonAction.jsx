import cn from "@/helpers/cn"

function ButtonAction({ children }) {

  const style = {
    button : {
      mobileFirst:"font-Poppins default-shadow cursor-pointer uppercase bg-gray-600 text-white font-bold py-[3vw] px-[15vw] rounded-full text-[4vw]",
      sm: "sm:py-[.5vw] sm:px-[1.5vw] sm:text-[1.5vw]"
    }
  }

  return (
    <button className={cn(style.button.mobileFirst, style.button.sm)} disabled>
      {children}
    </button>
  )
}

export default ButtonAction