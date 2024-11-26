import cn from "@/helpers/cn"

function Carrosel({children}) {


  const style = {
    article : {
      mobileFirst:"h-[90vw] w-[85vw] overflow-hidden relative",
      sm: "sm:h-[45vw] sm:w-[40vw]"
    },
    img : {
      mobileFirst:"absolute h-[85vw] top-[10vw] w-auto object-cover",
      sm: "sm:h-[35vw] sm:top-[6.5vw]"
    }
  } 

    return (
      <section className="">
        <article className={cn(style.article.mobileFirst, style.article.sm)}>
          <img className={cn(style.img.mobileFirst, style.img.sm)} src="/images/home-produtos.png" alt="logo completa"/>
        </article>
        {children}
      </section>
    )
  }
  
export default Carrosel