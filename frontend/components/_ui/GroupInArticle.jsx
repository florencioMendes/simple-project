import cn from "@/helpers/cn"

function GroupInArticle({ children }) {

  const style = {
    article : {
      mobileFirst:"flex gap-[2vw]",
      sm: ""
    }
  }

  return (
    <article className={cn(style.article.mobileFirst, style.article.sm)}>
      {children}
    </article>
  )

}

export default GroupInArticle