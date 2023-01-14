import React from 'react';
import * as loadingAnim from "../../assets/lottie/99297-loading-files.json";
import Lottie from "react-lottie";

interface ILoadingProps {
  loading: boolean
}

const Loader: React.FC<ILoadingProps> = ({loading}) => {
  if(loading) {
    return (
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: loadingAnim
        }}
      />
    );
  }
  else {
    return null
  }
};

export default Loader;
