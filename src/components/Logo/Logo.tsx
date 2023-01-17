import React from 'react';
import logo from "../../assets/img/SpaceX_logo_black.svg.png";

const Logo: React.FC = () => {
  return (
    <a className={'logo'} href={"https://www.spacex.com/"} target={'_blank'} rel="noreferrer">
      <img
        width={'100%'}
        src={logo}
        alt={'logo'}
      />
    </a>
  );
};

export default Logo;
