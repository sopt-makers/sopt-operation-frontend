import { ReactNode } from 'react';

import { StTemplateWrapper } from './style';

interface Props {
  title: string;
  children: ReactNode;
}

function OptionTemplate(props: Props) {
  const { title, children } = props;

  return (
    <StTemplateWrapper>
      <p>{title}</p>
      {children}
    </StTemplateWrapper>
  );
}

export default OptionTemplate;
