import styled from '@emotion/styled';

export const StListHeader = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5rem;

  & > h1 {
    font-weight: 600;
    font-size: 20px;
    line-height: 25px;
    letter-spacing: -0.02em;
  }
`;

export const StMemberInfo = styled.tr`
  & > td:first-of-type {
    width: 10%;
  }
  & > td.identify {
    width: 13.5%;
  }
  & > td:nth-of-type(4) {
    width: 13%;
  }
  & > td:nth-of-type(5) {
    width: 15%;
  }
  & > td.attendance {
    width: 5%;
  }
  & > td:last-of-type {
    width: 12%;
  }
`;
