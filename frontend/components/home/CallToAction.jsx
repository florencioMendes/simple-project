import cn from "@/helpers/cn"

function CallToAction({ children }) {

  const style = {
    h3 : {
      mobileFirst:"font-Poppins_bold text-[#8C52FF] font-bold uppercase text-[3vw] -mt-[3vw]",
      sm: "sm:text-[1.2vw] sm:-mt-[2vw]"
    },
    h2 : {
      mobileFirst:"font-Poppins uppercase text-[6vw] mt-[6vw] my-[1vw]",
      sm: "sm:text-[4vw] sm:mt-[3vw]"
    },
    h1 : {
      mobileFirst:"font-Poppins_bold uppercase leading-none text-[7.7vw] w-full my-[3vw]",
      sm: "sm:text-[5.5vw] sm:w-[26vw] sm:my-[1vw]"
    },
    article : {
      mobileFirst:"mt-[10vw] flex justify-center",
      sm: "sm:mt-[0] sm:justify-start"
    }
  } 

  return (
    <section className="">
      {children[0]}
      <h3 className={cn(style.h3.mobileFirst, style.h3.sm)}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
      <h2 className={style.h2.mobileFirst + " " + style.h2.sm}>Lorem ipsum</h2>
      <h1 className={style.h1.mobileFirst + " " + style.h1.sm}>Lorem ipsu</h1>
      <article className={cn(style.article.mobileFirst, style.article.sm)}>
        {children[1]}
      </article>
    </section>
  )
}

export default CallToAction