"use server"

//components
import Ancor from "@/components/_ui/Ancor"
import MapComponent from "@/components/_ui/MapComponent";
import { NAVBAR_NAMES, USER_NAMES } from "@/components/home/constants"
import GroupInArticle from "@/components/_ui/GroupInArticle";
import Navbar from "@/components/home/Navbar"
import GroupInSection from "@/components/_ui/GroupInSection";
import Main from "@/components/home/Main";
import CallToAction from "@/components/home/CallToAction";
import ButtonAction from "@/components/_ui/ButtonAction";
import Carrosel from "@/components/home/Carrosel";
import Logo from "@/components/_ui/Logo";
import Menu from "@/components/home/Menu";
import HideMobile from "@/components/_ui/HideMobile";
import HideDesktop from "@/components/_ui/HideDesktop";


function Home() {

  return (
    <Main>
      <Navbar>
        <Menu>
          <HideDesktop>
            <MapComponent names={NAVBAR_NAMES}>
              {item => <Ancor href={item.point}>{item.name}</Ancor>}
            </MapComponent>
          </HideDesktop>
          <MapComponent names={USER_NAMES}>
            {item => <Ancor href={item.point}>{item.name}</Ancor>}
          </MapComponent>
        </Menu>
        <HideMobile>
          <GroupInArticle>
            <MapComponent names={NAVBAR_NAMES}>
              {item => <Ancor href={item.point}>{item.name}</Ancor>}
            </MapComponent>
          </GroupInArticle>
        </HideMobile>
      </Navbar>
      <GroupInSection>
        <CallToAction>
          <Logo />
          <ButtonAction> descubra como </ButtonAction>
        </CallToAction>
        <Carrosel />
      </GroupInSection>
    </Main>
  )
}

export default Home