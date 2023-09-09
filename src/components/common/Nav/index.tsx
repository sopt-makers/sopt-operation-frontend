import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { IcNavMenu } from '@/assets/icons';
import { currentGenerationState } from '@/recoil/atom';
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

const GENERATION_LIST = ['33', '32'];

function Nav() {
  const router = useRouter();
  const currentGeneration = useRecoilValue(currentGenerationState);
  const setCurrentGeneration = useSetRecoilState<string>(
    currentGenerationState,
  );
  const [isDropdownOn, setIsDropdownOn] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleSelectedGeneration = (selectedGeneration: string) => {
    setCurrentGeneration(selectedGeneration);
    setIsDropdownOn(false);
  };

  const handleSubMenuClick = (path: string) => {
    router.push(path);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOn(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <StNavWrapper>
      <header>
        <StSoptLogo>SOPT</StSoptLogo>
        <StGenerationDropdown ref={dropdownRef}>
          <div onClick={() => setIsDropdownOn(!isDropdownOn)}>
            <span>{currentGeneration}기</span>
            <IcDropDown />
          </div>
          {isDropdownOn && (
            <DropDown
              list={GENERATION_LIST}
              type={'select'}
              onItemSelected={handleSelectedGeneration}
            />
          )}
        </StGenerationDropdown>
      </header>
      {MENU_LIST.map((menu) => (
        <React.Fragment key={menu.title}>
          <StMenu
            currentPage={
              menu.path &&
              menu.path.some((path) => router.pathname.includes(path))
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
