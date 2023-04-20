import styled from '@emotion/styled';

import zIndex from '@/utils/zIndex';

export const StSelectWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const StSelect = styled.button`
  background: none;
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 2rem;
  color: ${({ theme }) => theme.color.grayscale.black40};
  display: flex;
  align-items: center;
  gap: 1.2rem;
  transform: translateX(0.6rem);
`;
export const StOptions = styled.ul`
  z-index: ${zIndex.select};
  position: absolute;
  transform: translateY(8rem);
  background-color: ${({ theme }) => theme.color.grayscale.realwhite};
  border-radius: 1rem;
  padding: 0.8rem 0;
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.1);
  animation: appear 0.6s;
  li {
    padding: 0.8rem 2.4rem;
    &:hover {
      background-color: rgba(198, 169, 255, 0.2);
      cursor: pointer;
    }
  }

  @keyframes appear {
    from {
      opacity: 0;
      transform: translateY(7rem);
    }
    to {
      opacity: 1;
      transform: translateY(8rem);
    }
  }
`;
