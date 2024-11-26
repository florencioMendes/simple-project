import cn from "@/helpers/cn"

function Logo() {

  const style = {
    article : {
      mobileFirst:"flex items-baseline relative",
      sm: ""
    },
    h2 : {
      mobileFirst:"font-Poppins_bold text-green-700 text-[20vw]",
      sm: "sm:text-[7.4vw]"
    },
    h3 : {
      mobileFirst:"font-Poppins_bold text-[13vw] ml-[.5vw] z-40 text-white",
      sm: "sm:text-[5.2vw] sm:ml-[.5vw]"
    },
    span : {
      mobileFirst:"absolute bg-[#8C52FF] w-[50vw] h-[15vw] z-0 left-[37vw] bottom-[7.2vw] default-shadow border-b border-white",
      sm: "sm:w-[20vw] sm:h-[5.5vw] sm:left-[14vw] sm:bottom-[2.8vw]"
    }
  }

    return (
        <article className={cn(style.article.mobileFirst, style.article.sm)}>
          <h2 className={cn(style.h2.mobileFirst, style.h2.sm)}>LOG</h2>
          <h3 className={cn(style.h3.mobileFirst, style.h3.sm)}>logo</h3>
          <span className={cn(style.span.mobileFirst, style.span.sm)}></span>
        </article>
    )
  }
  
  export default Logo