import { SlMenu } from "react-icons/sl";
import cn from "@/helpers/cn"


function Menu({children}) {

    const style = {
      section: {
        mobileFirst:"group",
        sm: ""
      },
      SlMenu : {
        mobileFirst:"cursor-pointer",
        sm: ""
      },
      article: {
        mobileFirst:"fixed hidden bg-white opacity-0 w-[70vw] grid-cols-1 gap-[5vw] p-[10vw] z-50 rounded-[2vw] default-shadow",
        sm: "sm:w-auto sm:gap-[1vw] sm:p-[2vw] sm:rounded-[1vw]",
        hover: "group-hover:opacity-100 group-hover:grid"
      }
    }  
  
    return (
      <section className={cn(style.section.mobileFirst, style.section.sm)}>
        <SlMenu size={20} className={cn(style.SlMenu.mobileFirst, style.SlMenu.sm)}/>
        <article className={cn(style.article.mobileFirst, style.article.sm, style.article.hover)}>
          {children}
        </article>
      </section>
    )
  }
  
  export default Menu