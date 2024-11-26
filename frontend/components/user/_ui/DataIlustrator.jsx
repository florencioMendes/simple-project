import cn from "@/helpers/cn"

function DataIlustrator({ children }) {

  const style = {
    a: {
      mobileFirst: "cursor-pointer grid grid-cols-1 w-full items-center bg-white rounded-[1vw]",
      sm: "sm:rounded-[2vw]"
    },
    article: {
      mobileFirst: "grid p-[2vw]",
      sm: ""
    }
  }

  return (
    <a className={cn(style.a.mobileFirst, style.a.sm)}>
      <article className={cn(style.article.mobileFirst, style.article.sm)}>
        {children}
      </article>
    </a>
  )
}

export default DataIlustrator