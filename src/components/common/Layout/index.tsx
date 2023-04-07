import { ReactNode } from 'react';

import Header from '@/components/common/Header';
import Nav from '@/components/common/Nav';

import { StLayout } from './style';

interface Props {
  children: ReactNode;
}

function Layout(props: Props) {
  const { children } = props;

  return (
    <StLayout>
      <Nav />
      <div className="main-wrapper">
        <Header />
        <main>{children}</main>
      </div>
    </StLayout>
  );
}

export default Layout;
