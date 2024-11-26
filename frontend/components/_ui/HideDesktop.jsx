import cn from "@/helpers/cn"

function HideDesktop({children}) {

    const style = {
      section : {
        mobileFirst:"grid grid-cols-1 gap-[5vw]",
        sm: "sm:hidden"
      }
    }  
  
    return (
        <section className={cn(style.section.mobileFirst, style.section.sm)}>
            {children}
        </section>
    )
}
  
export default HideDesktop