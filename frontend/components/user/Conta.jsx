import cn from "@/helpers/cn"

//components
import MapComponent from "@/components/_ui/MapComponent";
import GroupInSection from "@/components/_ui/GroupInSection";
import ButtonAction from "@/components/_ui/ButtonAction";
import data from "../../db.json"
import Titulo from "@/components/_ui/Titulo";
import BoxeIlustrator from "@/components/user/_ui/BoxeIlustrator";
import Span from "@/components/_ui/Span";
import DataIlustrator from "@/components/user/_ui/DataIlustrator";
import ScrollSection from "@/components/_ui/ScrollSection";

function Conta() {

  const style = {
    section: {
      mobileFirst: "h-screen",
      sm: "h-screen"
    }
  }

  return (
    <section className={cn(style.section.mobileFirst, style.section.sm)}>
      <GroupInSection variant="colsOne">
        <Titulo>olá, <strong className="text-[#8c52ff]">{data.name.split(" ")[0]}</strong>!</Titulo>
        {Object.keys(data.assinatura).length > 0 ?
          <ScrollSection>
            <MapComponent names={Object.keys(data.assinatura)}>
              {assinatura => (
                <DataIlustrator>
                  <MapComponent names={Object.keys(data.assinatura[assinatura])}>
                    {keyName => <Span money={true} data={true} >{keyName}: {data.assinatura[assinatura][keyName]}</Span>}
                  </MapComponent>
                </DataIlustrator>
              )}
            </MapComponent>
          </ScrollSection>
          :
          <section className="w-full mb-[15vw] sm:mb-[5vw]">
            <p className="font-Poppins_light text-[4vw] sm:text-[1vw] text-center sm:text-left w-8/12 mx-auto sm:mx-0 mb-[10vw] sm:mb-[2vw]">Você não possui <strong className="text-[#8c52ff]">nenhuma assinatura ativa!</strong></p>
            <article className="w-full flex justify-center">
              <ButtonAction>Assine já!</ButtonAction>
            </article>
          </section>
        }

        <Titulo variant="bold">suas boxes</Titulo>
        {Object.keys(data.boxes).length > 0 ?
          <ScrollSection>
            <MapComponent names={Object.keys(data.boxes)}>
              {objectBoxe => (
                <BoxeIlustrator>
                  <MapComponent names={Object.keys(data.boxes[objectBoxe])}>
                    {keyName => <Span money={true} data={true} >{keyName}: {data.boxes[objectBoxe][keyName]}</Span>}
                  </MapComponent>
                </BoxeIlustrator>
              )}
            </MapComponent>
          </ScrollSection>
          :
          <section className="w-full mt-[10vw] sm:mt-[5vw] flex justify-center">
            <p className="font-Poppins text-[4vw] sm:text-[1vw] text-center w-8/12 mx-auto sm:mx-0 mb-[10vw] sm:mb-[2vw]">hmm... você não possui nenhuma box.</p>
          </section>
        }
      </GroupInSection>
    </section>
  )
}

export default Conta