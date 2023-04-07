import React from 'react';

function IcNavMenu(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M14 13.3333C14 12.1722 12.8869 11.1845 11.3333 10.8184M10 13.3334C10 11.8606 8.20914 10.6667 6 10.6667C3.79086 10.6667 2 11.8606 2 13.3334M10 8.66671C11.4728 8.66671 12.6667 7.4728 12.6667 6.00004C12.6667 4.52728 11.4728 3.33337 10 3.33337M6 8.66671C4.52724 8.66671 3.33333 7.4728 3.33333 6.00004C3.33333 4.52728 4.52724 3.33337 6 3.33337C7.47276 3.33337 8.66667 4.52728 8.66667 6.00004C8.66667 7.4728 7.47276 8.66671 6 8.66671Z"
        stroke="#989BA0"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default IcNavMenu;
