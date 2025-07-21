import { useRouter } from 'next/router';
import { Fragment, useContext } from 'react';

import { adminStatusContext } from '@/components/devTools/AdminContextProvider';
import { MENU_LIST } from '@/utils/nav';

import GenerationDropDown from './GenerationDropDown';
import { StMenu, StNavWrapper, StSoptLogo, StSubMenu } from './style';
import { IcArrowUpRight } from '@/assets/icons';

function Nav() {
  const router = useRouter();
  const { status } = useContext(adminStatusContext);

  const filteredMenuList =
    status === 'MAKERS'
      ? MENU_LIST.filter(
          (menu) => menu.title === '알림 관리' || menu.title === '배너 관리',
        )
      : MENU_LIST;

  const handleSubMenuClick = (path: string) => {
    if (path.startsWith('/')) {
      router.push(path);
    } else {
      window.open(path, '_blank');
    }
  };

  return (
    <StNavWrapper>
      <header>
        <StSoptLogo>SOPT ADMIN</StSoptLogo>
      </header>
      <GenerationDropDown />
      {filteredMenuList.map((menu) => (
        <Fragment key={menu.title}>
          <StMenu
            currentPage={
              menu.path &&
              menu.path.some((path) => router.pathname.includes(path))
            }
            onClick={() => menu.path && handleSubMenuClick(menu.path[0])}>
            <p>
              <menu.MenuIcon />
              <span>{menu.title}</span>
              {menu.title === '지원서 관리' && <IcArrowUpRight />}
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
        </Fragment>
      ))}
    </StNavWrapper>
  );
}

export default Nav;
