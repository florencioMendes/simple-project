import cn from "@/helpers/cn"

function ScrollSection({ children, variant="default" }) {

  const style = {
    section : {
      mobileFirst:"grid scrollable grid-cols-1 h-[50vw] my-[7vw] rounded-[1vw] overflow-y-auto gap-[5vw]",
      sm: "sm:my-[2vw] sm:h-[20vw] sm:gap-[1vw]"
    }
  }


    return (
      <section className={cn(style.section.mobileFirst, style.section.sm)}>
        {children}
      </section>
    )
  
}
  
export default ScrollSection