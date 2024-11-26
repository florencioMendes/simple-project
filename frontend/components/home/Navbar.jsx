import cn from "@/helpers/cn"

function Navbar({children}) {

  const style = {
    nav : {
      mobileFirst:"flex justify-start items-center h-[17vw] gap-[2vw]",
      sm: "sm:h-[7.5vw]"
    },
    img : {
      mobileFirst:"absolute w-[20vw] right-[3.4vw] top-[6vw]",
      sm: "sm:w-[12vw] sm:right-[3.4vw] sm:top-[3.4vw]"
    }
  }  

  return (
    <nav className={cn(style.nav.mobileFirst, style.nav.sm)}>
      {children}
      <img className={cn(style.img.mobileFirst, style.img.sm)} src="/images/logo2.png" alt="logo abreviada" />
    </nav>
  )
}

export default Navbar