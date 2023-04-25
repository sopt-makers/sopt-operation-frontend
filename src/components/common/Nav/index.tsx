import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { IcNavMenu } from '@/assets/icons';
import { MENU_LIST } from '@/utils/nav';

import DropDown from '../DropDown';
import IcDropDown from '../icons/IcDropDown';
import {
  StGenerationDropdown,
  StMenu,
  StNavWrapper,
  StSoptLogo,
  StSubMenu,
} from './style';

const GENERATION_LIST = ['32'];

function Nav() {
  const router = useRouter();
  const [generation, setGeneration] = useState<string>(GENERATION_LIST[0]);
  const [isDropdownOn, setIsDropdownOn] = useState<boolean>(false);

  const handleSubMenuClick = (path: string) => {
    router.push(path);
  };

  return (
    <StNavWrapper>
      <header>
        <StSoptLogo>SOPT</StSoptLogo>
        <StGenerationDropdown>
          <div onClick={() => setIsDropdownOn(!isDropdownOn)}>
            <span>{generation}기</span>
            <IcDropDown />
          </div>
          {isDropdownOn && <DropDown list={GENERATION_LIST} type={'select'} />}
        </StGenerationDropdown>
      </header>
      {MENU_LIST.map((menu) => (
        <React.Fragment key={menu.title}>
          <StMenu
            currentPage={
              menu.path && menu.path.some((path) => router.pathname === path)
            }
            onClick={() => menu.path && handleSubMenuClick(menu.path[0])}>
            <p>
              <IcNavMenu />
              <span>{menu.title}</span>
            </p>
          </StMenu>
          {menu.subMenu &&
            menu.subMenu.map((subMenu, i) => (
              <StSubMenu
                key={subMenu}
                currentPage={menu.path && router.pathname === menu.path[i]}
                isLast={i === menu.subMenu.length - 1}
                onClick={() => handleSubMenuClick(menu.path[i])}>
                {subMenu}
              </StSubMenu>
            ))}
        </React.Fragment>
      ))}
    </StNavWrapper>
  );
}

export default Nav;
