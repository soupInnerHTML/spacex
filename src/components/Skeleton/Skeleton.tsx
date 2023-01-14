import React from 'react';
import ContentLoader, {IContentLoaderProps} from "react-content-loader";

const Skeleton: React.FC<IContentLoaderProps> = ({width, height = 13, speed = 2}) => {
  return <ContentLoader
    {...{width, height, speed}}
    viewBox={`0 0 ${width} 13`}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="3" ry="3" {...{width, height}} />
  </ContentLoader>
}

export default Skeleton;
