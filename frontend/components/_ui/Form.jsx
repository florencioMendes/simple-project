import cn from "@/helpers/cn"

function Form({ children }) {

  const style = {
    form : {
      mobileFirst:"mx-auto my-[5vw] p-4 rounded-md",
      sm: "sm:my-[2vw]"
    },
    section: {
      mobileFirst:"grid grid-cols-1 gap-4",
      sm: "sm:grid-cols-3"
    }
  }

  return (
    <form className={cn(style.form.mobileFirst, style.form.sm)}>
        <section className={cn(style.section.mobileFirst, style.section.sm)}>
            {children[0]}
        </section>
            {children[1]}
    </form>
  )
}

export default Form