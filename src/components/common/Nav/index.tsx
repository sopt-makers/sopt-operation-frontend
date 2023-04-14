import React from 'react';

import { IcNavMenu } from '@/assets/icons';

import IcDropDown from '../icons/IcDropDown';
import {
  StGenerationDropdown,
  StMenu,
  StNavWrapper,
  StSoptLogo,
  StSubMenu,
} from './style';

function Nav() {
  const MENU_LIST = [
    {
      title: '출석 관리',
      subMenu: ['출석 세션', '출석 총점'],
    },
  ];

  return (
    <StNavWrapper>
      <header>
        <StSoptLogo>SOPT</StSoptLogo>
        <StGenerationDropdown>
          <span>32기</span>
          <IcDropDown />
        </StGenerationDropdown>
      </header>
      {MENU_LIST.map((menu) => (
        <React.Fragment key={menu.title}>
          <StMenu>
            <p>
              <IcNavMenu />
              <span>{menu.title}</span>
            </p>
          </StMenu>
          {menu.subMenu &&
            menu.subMenu.map((subMenu) => (
              <StSubMenu key={subMenu}>{subMenu}</StSubMenu>
            ))}
        </React.Fragment>
      ))}
    </StNavWrapper>
  );
}

export default Nav;
