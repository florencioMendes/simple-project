import cn from "@/helpers/cn"

//components
import MapComponent from "@/components/_ui/MapComponent";
import GroupInSection from "@/components/_ui/GroupInSection";
import ButtonAction from "@/components/_ui/ButtonAction";
import { INPUT_PAGAMENTO } from "@/components/user/constants"
import data from "../../db.json"
import Titulo from "@/components/_ui/Titulo";
import BoxeIlustrator from "@/components/user/_ui/BoxeIlustrator";
import Span from "@/components/_ui/Span";
import DataIlustrator from "@/components/user/_ui/DataIlustrator";
import ScrollSection from "@/components/_ui/ScrollSection";
import Form from "@/components/_ui/Form";
import Input from "@/components/_ui/Input";

function Pagamento() {

  const style = {
    section: {
      mobileFirst: "h-screen",
      sm: "h-screen"
    }
  }

  return (
    <section className={cn(style.section.mobileFirst, style.section.sm)}>
      <GroupInSection variant="colsOne">
        <Titulo variant="bold">Seu cartão</Titulo>
        {Object.keys(data.pagamento).length > 0 ?
          <ScrollSection>
            <DataIlustrator>
              <MapComponent names={Object.keys(data.pagamento)}>
                  {keyName => <Span>{keyName}: {data.pagamento[keyName]}</Span>}
              </MapComponent>
            </DataIlustrator>
          </ScrollSection>
          :
          <section className="w-full mb-[15vw] sm:mb-[5vw]">
            <p className="font-Poppins_light text-[4vw] sm:text-[1vw] text-center sm:text-left w-8/12 mx-auto sm:mx-0 mb-[10vw] sm:mb-[2vw]">Você não possui <strong className="text-[#8c52ff]">nenhum cartão salvo!</strong></p>
          </section>
        }

        <Titulo variant="bold">Cartão de crédito</Titulo>
        <Form>
          <MapComponent names={INPUT_PAGAMENTO}>
            {input => (<Input cols_span={input.cols}> {input.name} </Input>)}
          </MapComponent>

          <article className="mt-[15vw] sm:mt-[5vw] mb-[10vw] sm:mb-[5vw] flex justify-center">
            <ButtonAction>Atualizar Cartão</ButtonAction>
          </article>
        </Form>
      </GroupInSection>
    </section>
  )
}

export default Pagamento                   