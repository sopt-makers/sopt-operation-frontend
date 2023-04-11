import React, { useState } from 'react';

import { IcNavMenu } from '@/assets/icons';

import DropDown from '../DropDown';
import IcDropDown from '../icons/IcDropDown';
import {
  StGenerationDropdown,
  StMenu,
  StNavWrapper,
  StSoptLogo,
  StSubMenu,
} from './style';

const MENU_LIST = [
  {
    title: '출석 관리',
    subMenu: ['출석 세션', '출석 총점'],
  },
];

const GENERATION_LIST = ['32'];

function Nav() {
  const [generation, setGeneration] = useState<string>(GENERATION_LIST[0]);
  const [isDropdownOn, setIsDropdownOn] = useState<boolean>(false);

  return (
    <StNavWrapper>
      <header>
        <StSoptLogo>SOPT</StSoptLogo>
        <StGenerationDropdown>
          <div onClick={() => setIsDropdownOn(!isDropdownOn)}>
            <span>{generation}기</span>
            <IcDropDown />
          </div>
          {isDropdownOn && <DropDown list={GENERATION_LIST} />}
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
