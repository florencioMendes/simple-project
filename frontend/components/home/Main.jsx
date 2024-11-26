import cn from "@/helpers/cn"

function Main({children}) {

  const style = {
    main : {
      mobileFirst:"relative bg-[url('/images/home-fundo.png')] bg-cover bg-center bg-no-repeat px-[7vw] h-[115vh]",
      sm: "sm:h-auto"
    }
  } 

  return (
    <main className={cn(style.main.mobileFirst,  style.main.sm)}>
      {children}
    </main>
  )
}

export default Main                   