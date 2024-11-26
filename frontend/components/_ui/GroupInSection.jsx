import cn from "@/helpers/cn"

function GroupInSection({ children, variant="default" }) {

  const style = {
    section : {
      mobileFirst:"grid mt-[20vw]",
      sm: "sm:mt-[3vw]"
    }
  }

  const variants = {
    default: {
      section : {
        mobileFirst:"grid-cols-1",
        sm: "sm:grid-cols-2"
      }
    },
    colsOne: {
      section : {
        mobileFirst:"grid-cols-1",
        sm: "sm:grid-cols-1"
      }
    }
  }

    return (
      <section className={cn(style.section.mobileFirst, style.section.sm, variants[variant].section.mobileFirst, variants[variant].section.sm)}>
        {children}
      </section>
    )
  
  }
  
  export default GroupInSection