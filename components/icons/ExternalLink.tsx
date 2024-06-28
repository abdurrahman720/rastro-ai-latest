import React from 'react';

type Props = {};

const ExternalLink = (props: Props) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
    >
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M12.6667 9.33333V12.6667C12.6667 13.403 12.0697 14 11.3333 14H3.33333C2.59695 14 2 13.403 2 12.6667V4.66667C2 3.93029 2.59695 3.33333 3.33333 3.33333H6.66667V4.66667H3.33333V12.6667H11.3333V9.33333H12.6667ZM12.6647 4.27614L7.8028 9.13807L6.86 8.19526L11.7219 3.33333H8.66473V2H13.9981V7.33333H12.6647V4.27614Z'
        fill='black'
      />
    </svg>
  );
};

export default ExternalLink;
