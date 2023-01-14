import React from 'react';
import logo from "../../assets/img/SpaceX_logo_black.svg.png";

const Logo: React.FC = () => {
  return (
    <a href={"https://www.spacex.com/"} target={'_blank'} rel="noreferrer">
      <img
        className={'logo'}
        src={logo}
        alt={'logo'}
      />
    </a>
  );
};

export default Logo;
