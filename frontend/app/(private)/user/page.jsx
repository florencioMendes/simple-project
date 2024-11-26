'use client'

import { useState, useEffect } from 'react';

//components
import Ancor from "@/components/_ui/Ancor"
import MapComponent from "@/components/_ui/MapComponent";
import { NAVBAR_NAMES } from "@/components/user/constants"
import GroupInArticle from "@/components/_ui/GroupInArticle";
import Navbar from "@/components/home/Navbar"
import Menu from "@/components/home/Menu";
import HideMobile from "@/components/_ui/HideMobile";
import HideDesktop from "@/components/_ui/HideDesktop";
import Main from "@/components/user/Main";
import Conta from "@/components/user/Conta";
import Pagamento from "@/components/user/Pagamento";
import Entrega from "@/components/user/Entrega";


function User() {
  const [hash, setHash] = useState('');

  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash);
    };

    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (

    <Main>

      <Navbar>
        <HideDesktop>
          <Menu>
            <MapComponent names={NAVBAR_NAMES}>
              {item => <Ancor href={item.point}>{item.name}</Ancor>}
            </MapComponent>
          </Menu>
        </HideDesktop>
        <HideMobile>
          <GroupInArticle>
            <MapComponent names={NAVBAR_NAMES}>
              {item => <Ancor href={item.point}>{item.name}</Ancor>}
            </MapComponent>
          </GroupInArticle>
        </HideMobile>
      </Navbar>

      {hash ==  "#profile" ? <Conta /> : null}
      {hash ==  "#payment" ? <Pagamento /> : null}
      {hash ==  "#delivery" ? <Entrega /> : null}

    </Main>
  );
}

export default User;


