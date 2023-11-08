import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';

import { IcAttendanceMenu } from '@/assets/icons';
import { useRecoilGenerationSSR } from '@/hooks/useRecoilGenerationSSR';
import { GENERATION_LIST } from '@/utils/generation';
import { MENU_LIST } from '@/utils/nav';

import GenerationDropDown from './GenerationDropDown';
import { StMenu, StNavWrapper, StSoptLogo, StSubMenu } from './style';

function Nav() {
  const router = useRouter();

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleSubMenuClick = (path: string) => {
    router.push(path);
  };

  return (
    <StNavWrapper>
      <header>
        <StSoptLogo>SOPT ADMIN</StSoptLogo>
      </header>
      <GenerationDropDown />
      {MENU_LIST.map((menu) => (
        <React.Fragment key={menu.title}>
          <StMenu
            currentPage={
              menu.path &&
              menu.path.some((path) => router.pathname.includes(path))
            }
            onClick={() => menu.path && handleSubMenuClick(menu.path[0])}>
            <p>
              <menu.MenuIcon />
              <span>{menu.title}</span>
            </p>
          </StMenu>
          {menu.subMenu &&
            menu.subMenu.map((subMenu, i) => (
              <StSubMenu
                key={subMenu}
                currentPage={
                  menu.path && router.pathname.includes(menu.path[i])
                }
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
