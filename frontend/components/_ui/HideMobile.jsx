import cn from "@/helpers/cn"

function HideMobile({children}) {

    const style = {
      section : {
        mobileFirst:"hidden",
        sm: "sm:block"
      }
    }  
  
    return (
        <section className={cn(style.section.mobileFirst, style.section.sm)}>
            {children}
        </section>
    )
  }
  
  export default HideMobile