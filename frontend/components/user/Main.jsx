import cn from "@/helpers/cn"

function Main({children}) {

  const style = {
    section : {
      mobileFirst:"relative bg-gradient-to-r from-[#EDEDED] px-[7vw] h-[290vw]",
      sm: "sm:h-[85vw]"
    }
  } 

  return (
    <section className={cn(style.section.mobileFirst,  style.section.sm)}>
      {children}
    </section>
  )
}

export default Main                   