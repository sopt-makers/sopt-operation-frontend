import { HTMLAttributes, ReactNode } from 'react';

import { pageWrapperCss } from './style';

export interface PageWrapperProps
  extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title: ReactNode;
  subTitle?: ReactNode; // TODO: 서브타이틀이 들어가는 스펙이 생길 경우 스타일 정의하기
}

const PageWrapper = (props: PageWrapperProps) => {
  const { title, children, ...restProps } = props;

  return (
    <main css={pageWrapperCss} {...restProps}>
      <h1>{title}</h1>
      {children}
    </main>
  );
};

export default PageWrapper;
