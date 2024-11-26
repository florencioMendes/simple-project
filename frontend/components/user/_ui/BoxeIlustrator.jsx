import cn from "@/helpers/cn"

function BoxeIlustrator({ children }) {

  const style = {
    a : {
      mobileFirst:"cursor-pointer grid grid-cols-5 w-full items-center bg-white rounded-[2vw]",
      sm: "sm:rounded-[1vw]"
    },
    img : {
        mobileFirst:"w-[65vw] col-span-2",
        sm: "sm:w-[15vw] sm:col-span-1"
    },
    article : {
        mobileFirst:"grid col-span-3",
        sm: "sm:col-span-4"
    }
  }

  return (
    <a className={cn(style.a.mobileFirst, style.a.sm)}>
        <img className={cn(style.img.mobileFirst, style.img.sm)} src="/images/home-produtos.png" alt="imagem box" />
        <article className={cn(style.article.mobileFirst, style.article.sm)}>
            {children}
        </article>
    </a>
  )
}

export default BoxeIlustrator