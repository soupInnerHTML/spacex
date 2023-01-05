import React from 'react';
import {useGetRoadsterInfoQuery} from "./Roadster.generated";
import round from "../../utils/round";
import ContentLoader, {IContentLoaderProps} from "react-content-loader"
import useRefetch from "../../hooks/useRefetch";

const Roadster: React.FC = ({}) => {
  const {data, error, refetch} = useGetRoadsterInfoQuery({
    pollInterval: 1000 //update every
  });

  useRefetch(error, refetch)

  return (
    <div className={'roadster'}>
      <React.Fragment>
        <span className={'roadster__item'}>2022.</span>
        <span className={'roadster__item'}>
          {data?.roadster?.name ?? <Skeleton width={100} />}.
        </span>
        <span className={'roadster__item'}>
          {round(data?.roadster?.speed_kph) || <Skeleton width={50} />} km per hour.
        </span>

        <br/>

        <span className={'roadster__item'}>
          {round(data?.roadster?.earth_distance_km) || <Skeleton width={50} />} km from earth.
        </span>
        <span className={'roadster__item'}>
          {round(data?.roadster?.mars_distance_km) || <Skeleton width={50} />} km to mars.
        </span>
      </React.Fragment>
    </div>
  );
};

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

export default Roadster;
